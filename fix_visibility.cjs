const fs = require('fs');

let c1 = fs.readFileSync('src/pages/ChapterOneOne.jsx', 'utf8');
c1 = c1.replace(/style=\{\{\s*display:\s*'none'\s*\}\}/g, '');
c1 = c1.replace(/className="route-view hidden"/g, 'className="route-view"');
fs.writeFileSync('src/pages/ChapterOneOne.jsx', c1);

let c2 = fs.readFileSync('src/pages/ChapterOneTwo.jsx', 'utf8');
c2 = c2.replace(/style=\{\{\s*display:\s*'none'\s*\}\}/g, '');
c2 = c2.replace(/className="route-view hidden"/g, 'className="route-view"');
fs.writeFileSync('src/pages/ChapterOneTwo.jsx', c2);

console.log('Fixed visibility.');