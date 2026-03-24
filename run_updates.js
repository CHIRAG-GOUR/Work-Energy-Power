const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Give the Windmill a pole and separate the spinning blades
const oldWindmillRegex = /<div id="windmill-icon">[\s\S]*?<\/div>/;
// Use backticks for string literal
const newWindmill = \<div id="windmill-container" style="position: absolute; top: 50%; left: 50%; width: 40px; height: 40px; transform: translate(-50%, -50%);">
    <!-- Pole -->
    <svg viewBox="0 0 100 100" width="40" height="40" style="position:absolute; top:0; left:0;">
      <path d="M46,50 L54,50 L58,100 L42,100 Z" fill="#64748b" />
    </svg>
    <!-- Blades -->
    <svg id="windmill-blade" viewBox="0 0 100 100" width="40" height="40" fill="#3b82f6" style="position:absolute; top:0; left:0; transform-origin: center;">
      <path d="M50 50 L50 10 A15 15 0 0 1 65 25 Z" />
      <path d="M50 50 L90 50 A15 15 0 0 1 75 65 Z" />
      <path d="M50 50 L50 90 A15 15 0 0 1 35 75 Z" />
      <path d="M50 50 L10 50 A15 15 0 0 1 25 35 Z" />
      <circle cx="50" cy="50" r="6" fill="#1e293b" />
      <circle cx="50" cy="50" r="3" fill="#e2e8f0" />
    </svg>
  </div>\;
html = html.replace(oldWindmillRegex, newWindmill);

// Handle the javascript that rotates the windmill
html = html.replace('const windmill = document.getElementById("windmill-icon");', '');
html = html.replace('circle.style.strokeDashoffset = (circumference - (scrollPercent * circumference)) || 0;', 'circle.style.strokeDashoffset = (circumference - (scrollPercent * circumference)) || 0;\n      const blade = document.getElementById("windmill-blade");\n      if(blade) blade.style.transform = "rotate(" + (scrollPercent * 720) + "deg)";');
html = html.replace(/windmill\.style\.transform = "translate\[\s\S]*?deg\)";/, '');


// 2. Add Simulations & Footer
const simsHtml = \
        <!-- Simulation 1: Interactive Work Simulator -->
        <article class="glass-card fade-in" style="animation-delay: 0.9s; grid-column: 1 / -1; margin-top: 1rem;">
          <h2>Interactive Mod 1: Calculate Work</h2>
          <p>Push the box! Adjust the <strong>Force</strong> and <strong>Displacement</strong> to see how much mechanical work is done across the floor.</p>
          <div class="simulation-container">
            <div class="sim-controls">
              <label><strong>Applied Force:</strong> <span id="force-val">50</span> Newtons</label>
              <input type="range" id="force-slider" min="0" max="100" value="50">
              
              <label><strong>Displacement:</strong> <span id="dist-val">5</span> Meters</label>
              <input type="range" id="dist-slider" min="0" max="20" value="5">
            </div>
            <div class="sim-visual">
              <div id="sim-box" class="sim-box">📦</div>
              <div class="sim-ground"></div>
            </div>
            <div class="sim-result">
              <h3>Work Done = <span id="work-result">250</span> Joules</h3>
            </div>
          </div>
        </article>

        <!-- Simulation 2: Power Simulator -->
        <article class="glass-card fade-in" style="animation-delay: 1.0s; grid-column: 1 / -1; margin-top: 1rem;">
          <h2>Interactive Mod 2: Power Race</h2>
          <p>This runner needs to do <strong>1000 Joules</strong> of work to finish the sprint. Adjust how <strong>fast</strong> they complete it to observe the total Power generated.</p>
          <div class="simulation-container">
             <div class="sim-controls">
              <label><strong>Time taken:</strong> <span id="time-val">10</span> Seconds</label>
              <input type="range" id="time-slider" min="2" max="20" value="10">
            </div>
            <div class="sim-visual">
              <div id="sim-runner" class="sim-runner" style="animation-duration: 10s;">🏃‍♂️</div>
              <div class="sim-track"></div>
            </div>
            <div class="sim-result">
              <h3>Power Output = <span id="power-result">100</span> Watts</h3>
            </div>
          </div>
        </article>

        <!-- Chapter Footer -->
        <footer class="app-footer fade-in" style="animation-delay: 1.1s;">
          Chapter 1 | skillizee.io
        </footer>
\;

if (!html.includes('Interactive Mod 1')) {
  let mainEnd = html.lastIndexOf('</main>');
  html = html.substring(0, mainEnd) + simsHtml + '\n      ' + html.substring(mainEnd);
}

// 3. Inject JS logic for sims
const simScript = \
  <script>
    // Simulation 1
    const fSlider = document.getElementById('force-slider');
    const dSlider = document.getElementById('dist-slider');
    const box = document.getElementById('sim-box');
    const wResult = document.getElementById('work-result');
    const fVal = document.getElementById('force-val');
    const dVal = document.getElementById('dist-val');

    if(fSlider) {
      function updateWorkSim() {
        const f = fSlider.value;
        const d = dSlider.value;
        fVal.innerText = f;
        dVal.innerText = d;
        wResult.innerText = f * d;
        box.style.left = (d / 20 * 85) + '%'; 
      }
      fSlider.addEventListener('input', updateWorkSim);
      dSlider.addEventListener('input', updateWorkSim);
      updateWorkSim();
    }

    // Simulation 2
    const tSlider = document.getElementById('time-slider');
    const rResult = document.getElementById('power-result');
    const tVal = document.getElementById('time-val');
    const runner = document.getElementById('sim-runner');

    if(tSlider) {
      tSlider.addEventListener('input', () => {
        const t = tSlider.value;
        tVal.innerText = t;
        rResult.innerText = Math.round(1000 / t);
        runner.style.animationDuration = \\\\s\\\;
      });
    }
  </script>
\;

// Append script before closing html/body if not already there
if (!html.includes('function updateWorkSim()')) {
  html = html.replace('</html>', simScript + '\n</html>');
}

html = html.replace(/windmill\.style\.transform = "translate\(-50%,\s*-50%\) rotate\("\s*\+\s*\(scrollPercent \* 720\)\s*\+\s*"deg\)";/g, '');

fs.writeFileSync('index.html', html);
console.log('HTML updated successfully.');
