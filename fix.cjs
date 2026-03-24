const fs = require('fs'); 
let c = fs.readFileSync('src/lib/simulations.js', 'utf8'); 
c = c.replace(/const THREE = require\('three'\);[\r\n]*/, ''); 
c = c.replace(/const OrbitControls =[\r\n\s]*require\('three\/examples\/jsm\/controls\/OrbitControls'\)\.OrbitControls;[\r\n]*/, ''); 
fs.writeFileSync('src/lib/simulations.js', c);
console.log('Fixed requires in simulations.js');
