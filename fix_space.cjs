const fs = require('fs');
const glob = require('glob');
const path = require('path');

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove paddingBottom: '56.25%', height: 0 from inline styles wrapping CustomVideoPlayer
    let newContent = content.replace(/paddingBottom:\s*'56\.25%',\s*height:\s*0,\s*/g, '');
    
    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent);
        console.log(`Updated styles in ${file}`);
    }
});
