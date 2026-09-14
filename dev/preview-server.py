#!/usr/bin/env python3
"""Local static preview with persistent, cookie-deduplicated visit counts."""
import argparse, hashlib, json, re, secrets, sqlite3
from datetime import datetime
from functools import partial
from http.cookies import SimpleCookie
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit
from zoneinfo import ZoneInfo

class VisitStore:
    def __init__(self, path):
        self.path = path
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        with sqlite3.connect(path) as db:
            db.executescript('''CREATE TABLE IF NOT EXISTS visitors (visitor TEXT PRIMARY KEY);
            CREATE TABLE IF NOT EXISTS daily_visitors (day TEXT, visitor TEXT, PRIMARY KEY(day,visitor));
            CREATE TABLE IF NOT EXISTS pageviews (day TEXT PRIMARY KEY, count INTEGER NOT NULL);''')
    def read(self, visitor=None, day=None):
        day = day or datetime.now(ZoneInfo('Asia/Shanghai')).date().isoformat()
        with sqlite3.connect(self.path, timeout=10) as db:
            if visitor:
                db.execute('INSERT OR IGNORE INTO visitors VALUES (?)', (visitor,))
                db.execute('INSERT OR IGNORE INTO daily_visitors VALUES (?,?)', (day,visitor))
                db.execute('INSERT INTO pageviews VALUES (?,1) ON CONFLICT(day) DO UPDATE SET count=count+1', (day,))
            return dict(todayUV=db.execute('SELECT count(*) FROM daily_visitors WHERE day=?',(day,)).fetchone()[0],
                todayPV=db.execute('SELECT coalesce(sum(count),0) FROM pageviews WHERE day=?',(day,)).fetchone()[0],
                totalUV=db.execute('SELECT count(*) FROM visitors').fetchone()[0],
                totalPV=db.execute('SELECT coalesce(sum(count),0) FROM pageviews').fetchone()[0],
                date=day, timezone='Asia/Shanghai', scope='local')

class Handler(SimpleHTTPRequestHandler):
    def json_response(self, status, data, cookie=None):
        payload=json.dumps(data).encode()
        self.send_response(status)
        self.send_header('Content-Type','application/json; charset=utf-8')
        self.send_header('Cache-Control','no-store')
        self.send_header('Content-Length',str(len(payload)))
        if cookie: self.send_header('Set-Cookie',f'loki_visitor={cookie}; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax')
        self.end_headers(); self.wfile.write(payload)
    def do_GET(self):
        path=urlsplit(self.path).path
        if path=='/api/visits':
            return self.json_response(200,self.server.visits.read())
        if any(p.startswith('.') for p in unquote(path).split('/') if p):
            return self.send_error(404)
        super().do_GET()
    def do_HEAD(self):
        if any(p.startswith('.') for p in unquote(urlsplit(self.path).path).split('/') if p):
            return self.send_error(404)
        super().do_HEAD()
    def do_POST(self):
        if urlsplit(self.path).path!='/api/visits': return self.send_error(404)
        origin=self.headers.get('Origin')
        if origin and urlsplit(origin).netloc!=self.headers.get('Host'): return self.send_error(403)
        if self.headers.get('X-Loki-Visit')!='1': return self.send_error(400)
        # Reject payloads: the endpoint needs no URLs, names, referrers or device information.
        if self.headers.get('Transfer-Encoding') or self.headers.get('Content-Length','0')!='0': return self.send_error(400)
        cookie=SimpleCookie()
        try: cookie.load(self.headers.get('Cookie',''))
        except Exception: pass
        token=cookie['loki_visitor'].value if 'loki_visitor' in cookie else ''
        fresh=not re.fullmatch('[a-f0-9]{64}',token)
        if fresh: token=secrets.token_hex(32)
        try: result=self.server.visits.read(hashlib.sha256(token.encode()).hexdigest())
        except sqlite3.Error: return self.json_response(503,{'error':'统计暂不可用'})
        self.json_response(200,result,token if fresh else None)

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--port',type=int,required=True)
    parser.add_argument('--directory',default=str(Path(__file__).resolve().parent.parent))
    parser.add_argument('--database',default=str(Path(__file__).resolve().parent/'.local/visits.sqlite3'))
    args=parser.parse_args()
    server=ThreadingHTTPServer(('127.0.0.1',args.port),partial(Handler,directory=args.directory))
    server.visits=VisitStore(args.database)
    print(f'Local preview: http://127.0.0.1:{server.server_port}',flush=True)
    server.serve_forever()
