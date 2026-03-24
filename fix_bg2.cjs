const fs = require('fs');
let code = fs.readFileSync('src/main_original.js', 'utf8');

code = code.replace(/import \* as THREE from 'three';/, '');
code = code.replace(/const canvas = document\.querySelector\('#bg-canvas'\);/, 'const canvas = document.querySelector("#bg-canvas"); if(!canvas) return;');
code = code.replace(/function animate\(\) \{[\s\S]*?requestAnimationFrame\(animate\);/, 'let aid; function animate() { reqId = requestAnimationFrame(animate);'); // optional cleanup

const wrapped = `import * as THREE from 'three';

export function initBackground() {
    let reqId;
${code}
    return () => {
        if(reqId) cancelAnimationFrame(reqId);
        if(renderer) renderer.dispose();
    };
}
`;

fs.writeFileSync('src/lib/background.js', wrapped);
console.log('Background ready.');