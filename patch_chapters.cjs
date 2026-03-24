const fs = require('fs');

// Patch Chapter 2.3
let ch23 = fs.readFileSync('src/pages/ChapterTwoThree.jsx', 'utf8');

const ch23_newHeader = `<div className="header-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ color: '#ea580c', fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Module 2</h2>
          <h1 className="bouncy-header" style={{ color: '#9a3412', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
             <span>Chapter</span> <span>3</span> <span>:</span> <span>Kinetic</span> <span>Energy</span>
          </h1>
          <p className="subtitle" style={{ textAlign: 'center', fontSize: '1.2rem', color: '#b45309', marginTop: '0.5rem', fontWeight: 'bold' }}>The Energy of Speed</p>
        </div>`;
ch23 = ch23.replace(/<div className="header-content">([\s\S]*?)<\/div>/, ch23_newHeader);

if (!ch23.includes('initSim9')) {
    ch23 = ch23.replace(/import React, { useEffect } from 'react';/, "import React, { useEffect } from 'react';\nimport { initSim9, initSim10 } from '../lib/simulations';");
    ch23 = ch23.replace(/const ChapterTwoThree = \(\) => {/, "const ChapterTwoThree = () => {\n  useEffect(() => {\n    initSim9();\n    initSim10();\n  }, []);\n");
}

const sim9Html = `
      {/* Activity 1 (Simulation 9) */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.5s', gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '2rem', background: 'linear-gradient(145deg, #fffbeb, #ccfbf1)', border: '1px solid #5eead4' }}>
        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
          <h2 style={{ fontSize: '2rem', color: '#0f766e', marginBottom: '1rem' }}>Interactive: Mass vs Kinetic Energy</h2>
          <p style={{ color: '#115e59', fontSize: '1.05rem', lineHeight: '1.6' }}>Observe how changing the mass of a moving object affects its kinetic energy. Drop different mass blocks at the same speed and see the impact!</p>
        </div>
        <div style={{ flex: '1 1 45%', minWidth: '300px', background: '#000', borderRadius: '1.5rem', overflow: 'hidden', minHeight: '300px', position: 'relative' }}>
          <canvas id="sim9-canvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
          <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.7)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Sim: Mass & Energy</div>
        </div>
      </article>
`;
if (!ch23.includes('sim9-canvas')) {
    ch23 = ch23.replace(/<\/div>\s*<\/article>\s*<\/div>/, `</div>\n      </article>\n${sim9Html}\n    </div>`);
}

const sim10Html = `
      {/* Activity 2 (Simulation 10) */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.6s', gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '2rem', background: 'linear-gradient(145deg, #fdf4ff, #fae8ff)', border: '1px solid #f0abfc' }}>
         <div style={{ flex: '1 1 45%', minWidth: '300px', background: '#000', borderRadius: '1.5rem', overflow: 'hidden', minHeight: '300px', position: 'relative' }}>
          <canvas id="sim10-canvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
          <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.7)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Sim: Velocity & Energy</div>
         </div>
         <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
          <h2 style={{ fontSize: '2rem', color: '#86198f', marginBottom: '1rem' }}>Interactive: Velocity vs Kinetic Energy</h2>
          <p style={{ color: '#701a75', fontSize: '1.05rem', lineHeight: '1.6' }}>Increase the speed (velocity) of the vehicle. Notice how the kinetic energy increases drastically!</p>
        </div>
      </article>
`;
if (!ch23.includes('sim10-canvas')) {
    ch23 = ch23.replace(/<\/article>\s*<\/div>\s*$/, `</article>\n${sim10Html}\n    </div>\n`);
}

fs.writeFileSync('src/pages/ChapterTwoThree.jsx', ch23);

// Patch Chapter 2.1 Title
let ch21 = fs.readFileSync('src/pages/ChapterTwoOne.jsx', 'utf8');
const ch21_newHeader = `<div className="header-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ color: '#ea580c', fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Module 2</h2>
          <h1 className="bouncy-header" style={{ color: '#9a3412', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
             <span>Chapter</span> <span>1</span> <span>:</span> <span>Energy</span>
          </h1>
        </div>`;
ch21 = ch21.replace(/<div className="header-content">([\s\S]*?)<\/div>/, ch21_newHeader);
fs.writeFileSync('src/pages/ChapterTwoOne.jsx', ch21);

// Add Route to App.jsx for ChapterTwoTwo
let appStr = fs.readFileSync('src/App.jsx', 'utf8');
if (!appStr.includes('ChapterTwoTwo')) {
    appStr = appStr.replace(/import ChapterTwoThree/, "import ChapterTwoTwo from './pages/ChapterTwoTwo';\nimport ChapterTwoThree");
    appStr = appStr.replace(/<Route path="\/2\.3"/, `<Route path="/2.2" element={<ChapterTwoTwo />} />\n        <Route path="/2.3"`);
    fs.writeFileSync('src/App.jsx', appStr);
}
