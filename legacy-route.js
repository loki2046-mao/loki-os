/* Retain old shared links, without retaining a second navigation system. */
(()=>{const p=location.hash.slice(1).split('/');let next='/works.html';if(p[0]==='catalogue'){next=p[1]==='works'?(p[2]?'/projects/'+encodeURIComponent(p[2])+'.html':'/works.html'):(p[2]?'/methods/'+encodeURIComponent(p[2])+'/':p[1]==='personal'?'/life.html#collection':'/methods/');}location.replace(next);})();
