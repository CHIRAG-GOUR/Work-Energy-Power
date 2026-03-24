import fs from 'fs';

const mainPath = 'src/main.js';
let mainContent = fs.readFileSync(mainPath, 'utf-8');

const tqzPath = 'C:/Users/HP/AppData/Roaming/Code/User/History/372f0987/Tqz0.js';
let tqzContent = fs.readFileSync(tqzPath, 'utf-8');

// Remove import three from Tqz0
tqzContent = tqzContent.replace("import * as THREE from 'three';", "");

// Find where scroll progress starts
const scrollIndex = mainContent.indexOf('// ==========================================\r\n// SCROLL PROGRESS BAR');
const scrollIndexFallback = mainContent.indexOf('// ==========================================\n// SCROLL PROGRESS BAR');

const correctIndex = scrollIndex !== -1 ? scrollIndex : scrollIndexFallback;

let bottomContent = mainContent.substring(correctIndex);

const topContent = import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
;

fs.writeFileSync(mainPath, topContent + '\n' + tqzContent + '\n\n' + bottomContent);
console.log('Merged successfully');
