const fs = require('fs');

const mainJsStr = fs.readFileSync('src/main.js', 'utf8');

// split on sections
const sim1Split = mainJsStr.indexOf('// =========================================='); // the scroll progress part is right before sim1
const firstPart = mainJsStr.substring(0, sim1Split);
const restPart = mainJsStr.substring(sim1Split);

// Remove 'import ./style.css' etc
let bgCode = firstPart.replace(/import '.\/style.css'/g, '');

const wrapperBg = `
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function initBackground() {
    ${bgCode.replace(/const canvas = document\.querySelector\('#bg-canvas'\);/g, "const canvas = document.querySelector('#bg-canvas'); if(!canvas) return;")}
    
    return () => {
        // cleanup func
        renderer.dispose();
    };
}
`;

fs.mkdirSync('src/lib', { recursive: true });
fs.writeFileSync('src/lib/background.js', wrapperBg);

// Now for simulations
let simCode = restPart.replace(/window\.addEventListener\('DOMContentLoaded', \(\) => {[\s\S]*?}\);/g, '');
// Sim cleanup: we need to handle requestAnimationFrame cleanup ideally, but letting the browser handle it across SPA navigations isn't terrible if we just want a quick port.

// To be safe, let's inject a cleanup return in initSim1 and initSim2
let simCodeWrapped = `
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// We added simple cleanup tracking
let sim1Req;
let sim2Req;
let renderer1_, renderer2_;

export function cleanupSim1() {
   if (sim1Req) cancelAnimationFrame(sim1Req);
   if (renderer1_) renderer1_.dispose();
}
export function cleanupSim2() {
   if (sim2Req) cancelAnimationFrame(sim2Req);
   if (renderer2_) renderer2_.dispose();
}

${simCode}
`;
// Replace requestAnimationFrame with updating the req refs
simCodeWrapped = simCodeWrapped.replace(/requestAnimationFrame\(animateSim1\);/g, 'sim1Req = requestAnimationFrame(animateSim1);');
simCodeWrapped = simCodeWrapped.replace(/requestAnimationFrame\(animateSim2\);/g, 'sim2Req = requestAnimationFrame(animateSim2);');
simCodeWrapped = simCodeWrapped.replace(/const renderer1 =/g, 'renderer1_ =');
simCodeWrapped = simCodeWrapped.replace(/renderer1\./g, 'renderer1_.');
simCodeWrapped = simCodeWrapped.replace(/const renderer2 =/g, 'renderer2_ =');
simCodeWrapped = simCodeWrapped.replace(/renderer2\./g, 'renderer2_.');

// Ensure stats update UI script handles null cleanly
// Wait, the existing script has `if(canvas1) return;` 

fs.writeFileSync('src/lib/simulations.js', simCodeWrapped);
console.log('Legacy JS split successfully');
