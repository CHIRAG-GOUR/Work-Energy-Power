const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

if (!content.includes('ChapterTwoSix')) {
  // Update imports
  content = content.replace(
    "import ChapterTwoFive from './pages/ChapterTwoFive';", 
    "import ChapterTwoFive from './pages/ChapterTwoFive';\nimport ChapterTwoSix from './pages/ChapterTwoSix';\nimport ChapterTwoSeven from './pages/ChapterTwoSeven';"
  );
  
  // Update routes
  content = content.replace(
    '<Route path="/2.5" element={<ChapterTwoFive />} />', 
    '<Route path="/2.5" element={<ChapterTwoFive />} />\n                    <Route path="/2.6" element={<ChapterTwoSix />} />\n                    <Route path="/2.7" element={<ChapterTwoSeven />} />'
  );
  
  fs.writeFileSync('src/App.jsx', content);
}
