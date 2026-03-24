const fs = require('fs');
let code = fs.readFileSync('src/main_original.js', 'utf8');

// Replace top-level setup to be inside exported function
code = code.replace(/import \* as THREE from 'three';/, '');
// Remove window.addEventListener('DOMContentLoaded' ...) if present
code = code.replace(/window\.addEventListener\('DOMContentLoaded', \(\) => \{[\s\S]*?\}\);/g, '');

const wrapperBg = \import * as THREE from 'three';

export function initBackground() {
  \
  
  // Return cleanup function
  return () => {
      // In case we want to clean up renderer
      renderer.dispose();
  };
}
\;

fs.writeFileSync('src/lib/background.js', wrapperBg);
console.log('Background written.');
