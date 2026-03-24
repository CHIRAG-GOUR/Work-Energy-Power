const fs = require('fs');

const pathOne = 'src/pages/ChapterOneOne.jsx';
let contentOne = fs.readFileSync(pathOne, 'utf8');

if (!contentOne.includes('CustomVideoPlayer')) {
    // Inject import
    contentOne = contentOne.replace("import React", "import React from 'react';\nimport CustomVideoPlayer from '../components/CustomVideoPlayer';\n//");
    
    // Make sure we have the import if it didn't match perfectly
    if (!contentOne.includes("import CustomVideoPlayer")) {
        contentOne = "import CustomVideoPlayer from '../components/CustomVideoPlayer';\n" + contentOne;
    }
}

// Replace zaceSCDATjg iframe
contentOne = contentOne.replace(
    /<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/zaceSCDATjg"[^>]*><\/iframe>|<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/zaceSCDATjg"[^>]*\/>/g,
    `<CustomVideoPlayer src="/videos/zacescdatjg.mp4" title="Work and Energy: Definition of Work in Physics" />`
);

// Replace d6MhIBpmJnE iframe
contentOne = contentOne.replace(
    /<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/d6MhIBpmJnE"[^>]*><\/iframe>|<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/d6MhIBpmJnE"[^>]*\/>/g,
    `<CustomVideoPlayer src="/videos/d6mhibpmjne.mp4" title="Work Done by a Constant Force" />`
);

// Replace WL7__D14kGc iframe
contentOne = contentOne.replace(
    /<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/WL7__D14kGc"[^>]*><\/iframe>|<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/WL7__D14kGc"[^>]*\/>/g,
    `<CustomVideoPlayer src="/videos/wl7_d14kgc.mp4" title="Positive & negative work | Khan Academy" />`
);

fs.writeFileSync(pathOne, contentOne);
console.log('Chapter 1.1 updated');

const pathThree = 'src/pages/ChapterOneThree.jsx';
let contentThree = fs.readFileSync(pathThree, 'utf8');

if (!contentThree.includes('CustomVideoPlayer')) {
    // Inject import
    contentThree = "import CustomVideoPlayer from '../components/CustomVideoPlayer';\n" + contentThree;
}

// Replace d6MhIBpmJnE iframe
contentThree = contentThree.replace(
    /<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/d6MhIBpmJnE"[^>]*><\/iframe>|<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/d6MhIBpmJnE"[^>]*\/>/g,
    `<CustomVideoPlayer src="/videos/d6mhibpmjne.mp4" title="Work Done by a Constant Force" />`
);

// Replace WL7__D14kGc iframe
contentThree = contentThree.replace(
    /<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/WL7__D14kGc"[^>]*><\/iframe>|<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/WL7__D14kGc"[^>]*\/>/g,
    `<CustomVideoPlayer src="/videos/wl7_d14kgc.mp4" title="Positive & negative work | Khan Academy" />`
);

fs.writeFileSync(pathThree, contentThree);
console.log('Chapter 1.3 updated');

