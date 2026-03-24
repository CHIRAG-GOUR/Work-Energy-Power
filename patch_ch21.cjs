const fs = require('fs');
let content = fs.readFileSync('src/pages/ChapterTwoOne.jsx', 'utf8');

if (!content.includes('import { initSim5')) {
    content = content.replace("import React from 'react';", "import React, { useEffect } from 'react';\nimport { initSim5, initSim6 } from '../lib/simulations';");
}

if (!content.includes('useEffect(() => {')) {
    content = content.replace("const ChapterTwoOne = () => {", "const ChapterTwoOne = () => {\n  useEffect(() => {\n    initSim5();\n    initSim6();\n  }, []);\n");
}

const sim5JSX = \
        <article className="glass-card fade-in" style={{ gridColumn: '1 / -1', background: '#fff7ed', border: '2px solid #fdba74', padding: '1rem', marginTop: '1rem' }}>
          <h3 style={{ color: '#c2410c', textAlign: 'center', marginBottom: '1rem' }}>Interactive: The Energy Handshake (Cricket)</h3>
          <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', background: '#ffedd5', boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.05)' }}>
            <canvas id="sim5-canvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
            
            <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
               <button id="sim5-btn-bowl" className="btn-primary" style={{ background: '#ea580c', color: 'white', padding: '10px 24px', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 4px 0 #9a3412', border: 'none', cursor: 'pointer' }}>Bowl Ball</button>
               <button id="sim5-btn-reset" className="btn-secondary" style={{ background: '#64748b', color: 'white', padding: '10px 24px', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.2rem', border: 'none', cursor: 'pointer' }}>Reset</button>
            </div>
            
            <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.9)', padding: '15px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
               <div style={{ marginBottom: '8px', color: '#b91c1c', fontWeight: 'bold' }}>Ball Energy: <span id="sim5-stat-balle">0 J</span></div>
               <div style={{ color: '#b45309', fontWeight: 'bold' }}>Wicket Energy: <span id="sim5-stat-wickete">0 J</span></div>
            </div>
          </div>
        </article>
\;

if (!content.includes('sim5-canvas')) {
    content = content.replace('alt="Energy" />\\n          </div>\\n        </article>', 'alt="Energy" />\\n          </div>\\n        </article>\\n' + sim5JSX);
}

const sim6JSX = \
        <article className="glass-card fade-in" style={{ gridColumn: '1 / -1', background: '#fff1f2', border: '2px solid #fda4af', padding: '1rem', marginTop: '1rem' }}>
          <h3 style={{ color: '#be123c', textAlign: 'center', marginBottom: '1rem' }}>Interactive: Potential to Kinetic Energy</h3>
          <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', background: '#ffe4e6', boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.05)' }}>
            <canvas id="sim6-canvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
            
            <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
               <button id="sim6-btn-drop" className="btn-primary" style={{ background: '#e11d48', color: 'white', padding: '10px 24px', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 4px 0 #9f1239', border: 'none', cursor: 'pointer' }}>Drop Hammer</button>
               <button id="sim6-btn-reset" className="btn-secondary" style={{ background: '#64748b', color: 'white', padding: '10px 24px', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.2rem', border: 'none', cursor: 'pointer' }}>Reset Platform</button>
            </div>
            
            <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(255,255,255,0.9)', padding: '15px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
               <div style={{ color: '#be123c', fontWeight: 'bold' }}>Status: <span id="sim6-stat-energy">100% Potential Energy (Stored)</span></div>
            </div>
          </div>
        </article>
\;

if (!content.includes('sim6-canvas')) {
    content = content.replace('alt="Storing Energy" />\\n          </div>\\n        </article>', 'alt="Storing Energy" />\\n          </div>\\n        </article>\\n' + sim6JSX);
}

fs.writeFileSync('src/pages/ChapterTwoOne.jsx', content);
console.log('Patched ChapterTwoOne.jsx');