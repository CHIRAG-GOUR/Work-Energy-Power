
const fs = require('fs');
let code = fs.readFileSync('src/pages/ChapterOneThree.jsx', 'utf8');
const searchStr = '<div style={{ gridColumn: \'1 / -1\', display: \'flex\', justifyContent: \'space-between\', marginTop: \'2rem\' }}>';
let start = code.indexOf(searchStr);
if (start !== -1) {
  let inner1 = code.indexOf('</div>', start);
  let end = code.indexOf('</div>', inner1 + 1); // since it contains buttons, not nested divs? Wait, it just contains 2 buttons. 
  // Wait, let's just find the closing tag safely. Let's find '</button>' twice, then '</div>'.
  
  // Or just regex replace the block
  code = code.replace(/<div style=\{\{ gridColumn: '1 \/ -1', display: 'flex', justifyContent: 'space-between', marginTop: '2rem' \}\}>[\s\S]*?<\/div>/g, '');
  
  fs.writeFileSync('src/pages/ChapterOneThree.jsx', code);
  console.log('Removed from ChapterOneThree.jsx', code.includes(searchStr));
}

