const fs = require('fs');
const path = 'src/pages/ChapterTwoSeven.jsx';
let content = fs.readFileSync(path, 'utf8');

// Inject CustomVideoPlayer import
if (!content.includes("import CustomVideoPlayer")) {
    content = content.replace(
        "import React, { useEffect, useRef } from 'react';", 
        "import React, { useEffect, useRef } from 'react';\nimport CustomVideoPlayer from '../components/CustomVideoPlayer';"
    );
}

// Replace the iframe container with the custom video player
content = content.replace(
    /<div style=\{\{\s*position:\s*'relative',\s*paddingBottom:\s*'56\.25%',\s*height:\s*0,\s*overflow:\s*'hidden',\s*borderRadius:\s*'1\.5rem',\s*border:\s*'4px\s*solid\s*#93c5fd',\s*boxShadow:\s*'0\s*10px\s*25px\s*-5px\s*rgba\(0,0,0,0\.1\)'\s*\}\}>[\s\S]*?<\/div>/,
    `<CustomVideoPlayer src="/videos/rate_of_work.mp4" title="Rate of Doing Work" />`
);

// If the above regex fails for any reason, let's catch the exact iframe string:
if (content.includes("https://www.youtube.com/embed/bGlWtF4LHB4")) {
    content = content.replace(
        /<div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '1.5rem', border: '4px solid #93c5fd', boxShadow: '0 10px 25px -5px rgba\\(0,0,0,0.1\\)' }}>\s*<iframe\s*src="https:\/\/www\.youtube\.com\/embed\/bGlWtF4LHB4"[\s\S]*?<\/iframe>\s*<\/div>/g,
        `<CustomVideoPlayer src="/videos/rate_of_work.mp4" title="Rate of Doing Work" />`
    );
}

// Ensure math expressions are styled properly using JSX safe spans where necessary, avoiding raw unescaped '$' if it's breaking Vite.
// Actually Vite handles $ perfectly fine in plain strings within HTML elements unless it's inside curly braces expecting JS.
// Just writing it back out to save.
fs.writeFileSync(path, content);
console.log('Chapter 2.7 Video Replaced');
