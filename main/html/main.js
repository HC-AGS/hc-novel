// main.js - 小说库主页逻辑（纯前端）
let BOOKS = [];
let CURRENT = null;

async function init() {
  try {
    const res = await fetch('novel_index.json', { cache: 'no-cache' });
    BOOKS = await res.json();
    renderList(BOOKS.map(b => b.name));
    document.getElementById('stats').textContent = `共 ${BOOKS.length} 本 · 点击书名查看详情，可直接开始阅读`;
  } catch (e) {
    document.getElementById('stats').textContent = '索引加载失败：' + e.message;
  }
  document.getElementById('search').addEventListener('input', onSearch);
}

function renderList(names) {
  const list = document.getElementById('bookList');
  const empty = document.getElementById('empty');
  list.innerHTML = '';
  if (names.length === 0) { empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  names.forEach(n => {
    const b = BOOKS.find(x => x.name === n);
    const span = document.createElement('span');
    span.className = 'book-item' + (CURRENT === n ? ' active' : '');
    span.dataset.name = n;
    span.textContent = n + ' ';
    const c = document.createElement('span');
    c.className = 'chap';
    c.textContent = '(' + (b ? b.chapterCount : 0) + ') ';
    span.appendChild(c);
    span.addEventListener('click', () => openDetail(n));
    list.appendChild(span);
    list.appendChild(document.createTextNode(' '));
  });
}

function onSearch(e) {
  const q = e.target.value.trim().toLowerCase();
  if (!q) { renderList(BOOKS.map(b => b.name)); return; }
  renderList(BOOKS.filter(b => b.name.toLowerCase().includes(q)).map(b => b.name));
}

function openDetail(name) {
  const b = BOOKS.find(x => x.name === name);
  if (!b) return;
  CURRENT = name;
  document.getElementById('dName').textContent = b.name;
  document.getElementById('dChap').textContent = b.chapterCount + ' 章';
  document.getElementById('dChapNum').textContent = b.chapterCount + ' 章';
  document.getElementById('dAuthor').textContent = b.author || '—';
  document.getElementById('dDesc').textContent = b.desc || '（暂无简介）';
  document.getElementById('dRead').href = 'epub.html?book=' + encodeURIComponent(b.name) + '&chap=1';
  const d = document.getElementById('detail');
  d.classList.add('show');
  d.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

init();
