/**
 * Lightweight 2D Canvas Simulations for Work, Energy & Power
 * Replaces heavy Three.js simulations with interactive, slider-driven Canvas sims
 */

// ============================================================
// HELPER: Create a Canvas + Controls inside a container
// ============================================================
function createSimCanvas(container, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width || 600;
  canvas.height = height || 300;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.borderRadius = '12px';
  container.appendChild(canvas);
  return canvas;
}

function createSlider(parent, label, min, max, value, step, color) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;align-items:center;gap:10px;padding:6px 12px;background:rgba(255,255,255,0.9);border-radius:10px;margin:4px 0;font-family:Inter,sans-serif;font-size:0.85rem;color:#1e293b;backdrop-filter:blur(8px);border:1px solid rgba(226,232,240,0.5);';
  const lbl = document.createElement('span');
  lbl.style.cssText = 'font-weight:600;min-width:80px;';
  lbl.textContent = label;
  const input = document.createElement('input');
  input.type = 'range'; input.min = min; input.max = max; input.value = value; input.step = step || 1;
  input.style.cssText = `flex:1;accent-color:${color || '#6366f1'};cursor:pointer;height:6px;`;
  const val = document.createElement('span');
  val.style.cssText = 'font-weight:700;min-width:40px;text-align:right;color:' + (color || '#6366f1');
  val.textContent = value;
  wrap.append(lbl, input, val);
  parent.appendChild(wrap);
  return { input, val };
}

function createStatDisplay(parent, label, unit, color) {
  const wrap = document.createElement('div');
  wrap.style.cssText = `display:flex;justify-content:space-between;padding:8px 14px;background:rgba(255,255,255,0.92);border-radius:10px;margin:3px 0;font-family:Inter,sans-serif;font-size:0.9rem;border-left:4px solid ${color || '#6366f1'};`;
  const lbl = document.createElement('span');
  lbl.style.cssText = 'font-weight:500;color:#475569;';
  lbl.textContent = label;
  const val = document.createElement('span');
  val.style.cssText = `font-weight:700;color:${color || '#6366f1'};font-family:monospace;`;
  val.textContent = '0 ' + unit;
  wrap.append(lbl, val);
  parent.appendChild(wrap);
  return { el: val, update: (v) => { val.textContent = v + ' ' + unit; } };
}

// ============================================================
// SIM 9: Mass vs KE (double mass → double KE)
// ============================================================
export function initSim9() {
  const container = document.getElementById('sim9-canvas');
  const controlsContainer = document.getElementById('sim9-controls');
  if (!container) return () => {};
  container.innerHTML = '';
  if (controlsContainer) controlsContainer.innerHTML = '';

  const canvas = createSimCanvas(container, 500, 250);

  const ctx = canvas.getContext('2d');

  const controls = document.createElement('div');
  controls.style.cssText = 'padding: 8px; z-index: 10; margin-top: auto; display: flex; flex-direction: column; gap: 8px;';
  
  if (controlsContainer) {
    controlsContainer.appendChild(controls);
  } else {
    controls.style.cssText = 'position:absolute;bottom:8px;left:8px;right:8px;z-index:10;';
    container.appendChild(controls);
  }

  const massSlider = createSlider(controls, 'Mass (kg)', 1, 20, 5, 1, '#8b5cf6');
  const velSlider = createSlider(controls, 'Velocity (m/s)', 1, 15, 5, 1, '#06b6d4');

  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const mass = parseInt(massSlider.input.value);
    const vel = parseInt(velSlider.input.value);
    const ke = 0.5 * mass * vel * vel;

    // Bar chart
    const barW = 60, maxH = 140;
    const keH = Math.min(maxH, (ke / 2250) * maxH);

    // Graph Grid (Bg)
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.3)'; ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
        const y = H - 40 - (i / 4) * maxH;
        ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(W - 40, y); ctx.stroke();
    }

    // KE bar
    const grad = ctx.createLinearGradient(W / 2 - barW / 2, H - 40 - keH, W / 2 - barW / 2, H - 40);
    grad.addColorStop(0, '#f59e0b'); // amber-500
    grad.addColorStop(1, '#ea580c'); // orange-600
    
    // Bar shadow/glow
    ctx.shadowColor = 'rgba(234, 88, 12, 0.4)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(W / 2 - barW / 2, H - 40 - keH, barW, keH, [12, 12, 0, 0]);
    ctx.fill();
    ctx.shadowBlur = 0; // reset
    ctx.shadowOffsetY = 0;

    // Ground line
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(50, H - 40); ctx.lineTo(W - 50, H - 40); ctx.stroke();

    // Labels
    ctx.font = 'bold 16px Inter'; ctx.fillStyle = '#1e293b'; ctx.textAlign = 'center';
    ctx.fillText('KE = ½mv²', W / 2, 25);

    ctx.font = 'bold 26px Inter'; ctx.fillStyle = '#ea580c';
    ctx.fillText(ke.toFixed(0) + ' J', W / 2, H - 50 - keH);

    // Moving object visualization
    const objSize = 15 + mass;
    ctx.fillStyle = '#818cf8';
    ctx.beginPath(); ctx.arc(100, H / 2, objSize, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = `${Math.min(14, 8 + mass / 2)}px Inter`;
    ctx.fillText(mass + 'kg', 100, H / 2 + 4);

    // Velocity arrow
    const arrowLen = vel * 8;
    ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(100 + objSize + 5, H / 2);
    ctx.lineTo(100 + objSize + 5 + arrowLen, H / 2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(100 + objSize + 5 + arrowLen, H / 2);
    ctx.lineTo(100 + objSize + arrowLen - 3, H / 2 + 6);
    ctx.closePath(); ctx.fillStyle = '#ea580c'; ctx.fill();
    ctx.font = 'bold 13px Inter'; ctx.fillStyle = '#ea580c';
    ctx.fillText(vel + ' m/s', 100 + objSize + arrowLen / 2, H / 2 - 12);

    // Formula
    ctx.font = '13px monospace'; ctx.fillStyle = '#475569'; ctx.textAlign = 'center';
    ctx.fillText(`½ × ${mass} × ${vel}² = ${ke.toFixed(0)} J`, W / 2, H - 15);
  }

  massSlider.input.addEventListener('input', () => { massSlider.val.textContent = massSlider.input.value; draw(); });
  velSlider.input.addEventListener('input', () => { velSlider.val.textContent = velSlider.input.value; draw(); });
  draw();

  return function cleanup() { container.innerHTML = ''; };
}

// ============================================================
// SIM 10: Velocity vs KE (double v → 4× KE)
// ============================================================
export function initSim10() {
  const container = document.getElementById('sim10-canvas');
  const controlsContainer = document.getElementById('sim10-controls');
  if (!container) return () => {};
  container.innerHTML = '';
  if (controlsContainer) controlsContainer.innerHTML = '';

  const canvas = createSimCanvas(container, 500, 250);

  const ctx = canvas.getContext('2d');

  const controls = document.createElement('div');
  controls.style.cssText = 'padding: 8px; z-index: 10; margin-top: auto; display: flex; flex-direction: column; gap: 8px;';
  
  if (controlsContainer) {
    controlsContainer.appendChild(controls);
  } else {
    controls.style.cssText = 'position:absolute;bottom:8px;left:8px;right:8px;z-index:10;';
    container.appendChild(controls);
  }

  const velSlider = createSlider(controls, 'Velocity', 1, 20, 5, 1, '#06b6d4');

  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const vel = parseInt(velSlider.input.value);
    const mass = 10;
    const ke = 0.5 * mass * vel * vel;

    // Graph: Plot KE vs v
    const graphL = 60, graphR = W - 40, graphT = 40, graphB = H - 60;
    const graphW = graphR - graphL, graphH = graphB - graphT;

    // Axes and Grid
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.4)'; ctx.lineWidth = 1;
    // Horizontal grid
    for (let i = 0; i <= 4; i++) {
        const y = graphB - (i / 4) * graphH;
        ctx.beginPath(); ctx.moveTo(graphL, y); ctx.lineTo(graphR, y); ctx.stroke();
    }
    // Vertical grid
    for (let i = 0; i <= 5; i++) {
        const x = graphL + (i / 5) * graphW;
        ctx.beginPath(); ctx.moveTo(x, graphT); ctx.lineTo(x, graphB); ctx.stroke();
    }

    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(graphL, graphT - 10); ctx.lineTo(graphL, graphB); ctx.lineTo(graphR + 10, graphB); ctx.stroke();

    // Axis labels
    ctx.font = '11px Inter'; ctx.fillStyle = '#64748b'; ctx.textAlign = 'center';
    ctx.fillText('Velocity (m/s)', (graphL + graphR) / 2, graphB + 30);
    ctx.save(); ctx.translate(20, (graphT + graphB) / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('KE (Joules)', 0, 0); ctx.restore();

    // Curve (parabola) with filled area
    const maxV = 20, maxKE = 0.5 * mass * maxV * maxV;
    
    // Create fill gradient
    const curveGrad = ctx.createLinearGradient(0, graphT, 0, graphB);
    curveGrad.addColorStop(0, 'rgba(168, 85, 247, 0.4)'); // purple-500
    curveGrad.addColorStop(1, 'rgba(168, 85, 247, 0.05)');
    
    ctx.fillStyle = curveGrad;
    ctx.beginPath();
    ctx.moveTo(graphL, graphB); // Start at bottom left
    for (let v = 0; v <= maxV; v += 0.5) {
      const x = graphL + (v / maxV) * graphW;
      const y = graphB - ((0.5 * mass * v * v) / maxKE) * graphH;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(graphR, graphB); // Down to bottom right
    ctx.closePath();
    ctx.fill();

    // The Stroke Line
    ctx.strokeStyle = '#a855f7'; ctx.lineWidth = 4;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let v = 0; v <= maxV; v += 0.5) {
      const x = graphL + (v / maxV) * graphW;
      const y = graphB - ((0.5 * mass * v * v) / maxKE) * graphH;
      if (v === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Current point
    const cx = graphL + (vel / maxV) * graphW;
    const cy = graphB - (ke / maxKE) * graphH;
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();

    // Dotted lines to axes
    ctx.setLineDash([4, 4]); ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, graphB); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(graphL, cy); ctx.stroke();
    ctx.setLineDash([]);

    // Value labels
    ctx.font = 'bold 13px Inter'; ctx.fillStyle = '#ef4444'; ctx.textAlign = 'center';
    ctx.fillText(ke.toFixed(0) + ' J', cx, cy - 15);
    ctx.font = '11px Inter'; ctx.fillStyle = '#64748b';
    ctx.fillText(vel, cx, graphB + 15);

    // Title
    ctx.font = 'bold 13px Inter'; ctx.fillStyle = '#1e293b'; ctx.textAlign = 'center';
    ctx.fillText('KE ∝ v² (Parabolic relationship)', W / 2, 20);
  }

  velSlider.input.addEventListener('input', () => { velSlider.val.textContent = velSlider.input.value; draw(); });
  draw();

  return function cleanup() { container.innerHTML = ''; };
}

// ============================================================
// SIM 13: Falling Ball - PE vs KE (Conservation)
// ============================================================
export function initSim13(container) {
  if (!container) return () => {};
  container.innerHTML = '';

  const canvas = createSimCanvas(container, 500, 400);
  const ctx = canvas.getContext('2d');

  let ballY = 40, falling = false, totalH = 300;
  const mass = 2, g = 10;
  const ballX = 120, groundY = 360;
  const totalE = mass * g * (totalH / 10);

  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const height = Math.max(0, (groundY - ballY - 20) / (groundY - 40));
    const pe = totalE * height;
    const ke = totalE - pe;

    // Background gradient
    ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, W, H);

    // Height markers
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const y = 40 + i * (groundY - 40) / 10;
      ctx.beginPath(); ctx.moveTo(60, y); ctx.lineTo(170, y); ctx.stroke();
      ctx.font = '10px Inter'; ctx.fillStyle = '#94a3b8'; ctx.textAlign = 'right';
      ctx.fillText((10 - i) + 'm', 55, y + 4);
    }

    // Ground
    ctx.fillStyle = '#cbd5e1'; ctx.fillRect(50, groundY, 140, 10);

    // Ball
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(ballX, ballY, 15, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(mass + 'kg', ballX, ballY + 4);

    // Energy bars on the right
    const barX = 250, barW = 50, maxBarH = 280;

    // PE bar (blue)
    const peH = (pe / totalE) * maxBarH;
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath(); ctx.roundRect(barX, 40 + maxBarH - peH, barW, peH, [6, 6, 0, 0]); ctx.fill();
    ctx.font = '11px Inter'; ctx.fillStyle = '#3b82f6'; ctx.textAlign = 'center';
    ctx.fillText('PE', barX + barW / 2, 40 + maxBarH + 18);
    ctx.fillText(pe.toFixed(0) + 'J', barX + barW / 2, 35 + maxBarH - peH);

    // KE bar (red)
    const keH = (ke / totalE) * maxBarH;
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.roundRect(barX + 70, 40 + maxBarH - keH, barW, keH, [6, 6, 0, 0]); ctx.fill();
    ctx.font = '11px Inter'; ctx.fillStyle = '#ef4444';
    ctx.fillText('KE', barX + 70 + barW / 2, 40 + maxBarH + 18);
    ctx.fillText(ke.toFixed(0) + 'J', barX + 70 + barW / 2, 35 + maxBarH - keH);

    // Total bar (green)
    ctx.fillStyle = '#10b981';
    ctx.beginPath(); ctx.roundRect(barX + 140, 40 + maxBarH - maxBarH, barW, maxBarH, [6, 6, 0, 0]); ctx.fill();
    ctx.font = '11px Inter'; ctx.fillStyle = '#10b981';
    ctx.fillText('Total', barX + 140 + barW / 2, 40 + maxBarH + 18);
    ctx.fillText(totalE.toFixed(0) + 'J', barX + 140 + barW / 2, 35);

    // Title
    ctx.font = 'bold 14px Inter'; ctx.fillStyle = '#1e293b'; ctx.textAlign = 'center';
    ctx.fillText('PE + KE = Constant', W / 2, 20);

    // Click instruction
    if (!falling && ballY <= 41) {
      ctx.font = '12px Inter'; ctx.fillStyle = '#94a3b8';
      ctx.fillText('Click to drop the ball', W / 2, H - 8);
    }
  }

  let animId;
  function animate() {
    if (falling && ballY < groundY - 20) {
      ballY += 3;
    } else if (falling) {
      falling = false;
    }
    draw();
    animId = requestAnimationFrame(animate);
  }

  canvas.addEventListener('click', () => {
    if (!falling && ballY >= groundY - 21) {
      ballY = 40; falling = false;
    } else if (!falling) {
      falling = true;
    }
  });

  animate();
  return function cleanup() {
    cancelAnimationFrame(animId);
    container.innerHTML = '';
  };
}

// ============================================================
// SIM 14: Stair Race - Power = Work / Time
// ============================================================
