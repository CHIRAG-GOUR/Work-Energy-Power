const fs = require('fs');
let code = fs.readFileSync('src/lib/background.js', 'utf8');

// The file has imports at the beginning, but also inside initBackground().
// Let's remove ALL imports and put them back only once at the top.

code = code.replace(/import\s+\*\s+as\s+THREE\s+from\s+'three';/g, '');
code = code.replace(/import\s+\{\s*OrbitControls\s*\}\s+from\s+'three\/examples\/jsm\/controls\/OrbitControls\.js';/g, '');

const newCode = `import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

${code}
`;

fs.writeFileSync('src/lib/background.js', newCode);

let simCode = fs.readFileSync('src/lib/simulations.js', 'utf8');
simCode = simCode.replace(/import\s+\*\s+as\s+THREE\s+from\s+'three';/g, '');
simCode = simCode.replace(/import\s+\{\s*OrbitControls\s*\}\s+from\s+'three\/examples\/jsm\/controls\/OrbitControls\.js';/g, '');

const newSimCode = `import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

${simCode}
`;

fs.writeFileSync('src/lib/simulations.js', newSimCode);
console.log('Fixed imports');