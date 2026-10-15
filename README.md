# 小说库（main/）

纯前端小说阅读网站，无任何后端。

## 目录
- `novel/` 小说主文件夹，按子文件夹分类，内容为解压后的 EPUB（OEBPS 里是 chapterN.xhtml，章节号 1..N）
- `html/` 网页层
  - `main.html` 小说平台主页（横排展示 + 搜索 + 详情 + 阅读入口）
  - `epub.html` 全功能阅读器（直接读取 xhtml，含进度记忆）
  - `main.js` 主页逻辑
  - `novel_index.json` 索引（name / author / desc / location / chapterCount）

入口：根目录 `index.html` 重定向到 `main/html/main.html`。
