// Shared derived copy. Keep editorial introductions separate from changing book metadata.
export function readingSummary(books) {
  if (!books.length) throw new Error('Reading archive must not be empty');
  const latest = books.reduce((a, b) => a.day > b.day ? a : b);
  const [, month, day] = latest.date.split('-').map(Number);
  const date = `${month} 月 ${day} 日`;
  return {
    count: books.length, latest,
    scope: `已经整理到 Day ${latest.day}，最新一篇是 ${date}的《${latest.title}》。下面留了当天的文稿节选；这些是 Cola 生成的导读，我还没有逐页对照原书。`,
    summary: `我让 Cola 每天拆一本书，但光给我几句金句肯定不够。我想先知道它讲了什么，再看看跟我有什么关系。现在已经存了 ${books.length} 篇，最新的是《${latest.title}》。`,
    proof: `${books.length} 篇文稿都能在这里翻，最新到 ${latest.date}。最早四天的互动卡片另外留作早期版本，可以展开回看。`,
    status: `文稿更新到 Day ${latest.day} · ${latest.date}`,
    saved: `${books.length} 篇文稿保存在 Obsidian，最早四天另存为早期卡片`,
    progress: `到 ${date}，Obsidian 里已经存到 Day ${latest.day}《${latest.title}》。中间还在小修，比如材料说明别堵在开头、引号别一层套一层。每天写完只是第一步，我还得愿意看。`,
    intro: `我让 Cola 每天拆一本书，先讲它到底在讲什么、为什么会写成这样，再看看里面哪些东西跟我有关。要是只给我一串漂亮句子，我第二天就忘了，那我做这个干嘛。现在已经存到 Day ${latest.day}，${date}这篇也放进来了。`,
    history: `头三天改得最多。先写成八段拆解，我又嫌重点太散，才改成围绕一两个洞见展开，最后把复习卡也一起做出来。到 ${date}，已经有 Day 01 到 Day ${latest.day} 的文稿，后面几篇都能在上面翻到。`
  };
}
