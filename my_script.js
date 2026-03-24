const fs = require('fs');
let code = fs.readFileSync('src/pages/ChapterTwoOne.jsx', 'utf8');
code = code.replace(/\{.*?image-(\d+)\.png\}/g, '{\${PREFIX}/s/articles/69c23526765c381e969f6171/images/image-.png\}');
fs.writeFileSync('src/pages/ChapterTwoOne.jsx', code);

