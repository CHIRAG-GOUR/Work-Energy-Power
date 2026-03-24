const fs = require('fs');

function replaceIframe(filePath, regex, replacement) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('import CustomVideoPlayer')) {
        content = content.replace("import React", "import React\nimport CustomVideoPlayer from '../components/CustomVideoPlayer';");
    }
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
}

// Chapter 2.6
replaceIframe(
    'src/pages/ChapterTwoSix.jsx',
    /<div style=\{\{ position: 'relative', paddingBottom: '56\.25%', height: 0, overflow: 'hidden', borderRadius: '1\.5rem', border: '4px solid #f9a8d4', boxShadow: '0 10px 25px -5px rgba\(0,0,0,0\.1\)' \}\}>[\s\S]*?<\/iframe>\s*<\/div>/g,
    `<CustomVideoPlayer src="/videos/t0ShHdtB8jA.mp4" title="Law of Conservation of Energy" />`
);

// Chapter 2.4 - first video (eBsU9DVa7ws)
replaceIframe(
    'src/pages/ChapterTwoFour.jsx',
    /<div style=\{\{ position: 'relative', paddingBottom: '56\.25%', height: 0, overflow: 'hidden', borderRadius: '1\.5rem', border: '4px solid #fbd38d', boxShadow: '0 10px 25px -5px rgba\(0,0,0,0\.1\)' \}\}>[\s\S]*?<\/iframe>\s*<\/div>/g,
    `<CustomVideoPlayer src="/videos/eBsU9DVa7ws.mp4" title="The Difference Between Kinetic and Potential Energy" />`
);

// Chapter 2.4 - second video (paPGNsx-Uak)
replaceIframe(
    'src/pages/ChapterTwoFour.jsx',
    /<div style=\{\{ position: 'relative', paddingBottom: '56\.25%', height: 0, overflow: 'hidden', borderRadius: '1rem', border: '2px solid #d946ef', marginTop: '1\.5rem' \}\}>[\s\S]*?<\/iframe>\s*<\/div>/g,
    `<CustomVideoPlayer src="/videos/paPGNsx-Uak.mp4" title="Slinky Test" />`
);

// Chapter 2.3
replaceIframe(
    'src/pages/ChapterTwoThree.jsx',
    /<iframe width="100%" height="250" src="https:\/\/www\.youtube\.com\/embed\/eBsU9DVa7ws\?end=58" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen><\/iframe>/g,
    `<CustomVideoPlayer src="/videos/eBsU9DVa7ws.mp4" title="Kinetic Energy In Action" />`
);
