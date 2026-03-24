const fs = require('fs');

const path2_2 = 'src/pages/ChapterTwoTwo.jsx';
let c2_2 = fs.readFileSync(path2_2, 'utf8');

if (!c2_2.includes('import CustomVideoPlayer')) {
    c2_2 = c2_2.replace("import React", "import React\nimport CustomVideoPlayer from '../components/CustomVideoPlayer';");
}

c2_2 = c2_2.replace(
    /<div style=\{\{ position: 'relative', paddingBottom: '56\.25%', height: 0, overflow: 'hidden', borderRadius: '1\.5rem', border: '4px solid #fbd38d', boxShadow: '0 10px 25px -5px rgba\(0,0,0,0\.1\)' \}\}>[\s\S]*?<\/iframe>\s*<\/div>/g,
    `<CustomVideoPlayer src="/videos/XiNx7YBnM-s.mp4" title="Different Forms Of Energy | Physics" />`
);
fs.writeFileSync(path2_2, c2_2);

console.log('ChapterTwoTwo updated');
