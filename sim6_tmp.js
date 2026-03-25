// ============================================================
// SIM 6: Hammer & Nail (Swinging Hammer)
// ============================================================
export function initSim6() {
  const container = document.getElementById('sim6-canvas');
  if (!container) return () => {};
  container.innerHTML = '';

  const canvas = createSimCanvas(container, 500, 300);
  const ctx = canvas.getContext('2d');

  const controls = document.createElement('div');
  controls.style.cssText = 'position:absolute;bottom:8px;left:8px;right:8px;z-index:10;display:flex;gap:10px;align-items:center;background:rgba(255,255,255,0.8);padding:8px;border-radius:12px;';
  container.appendChild(controls);

  const pullSlider = createSlider(controls, 'Pullback Angle', 0, 90, 45, 1, '#f97316');
  
  const btnWrap = document.createElement('div');
  const btn = document.createElement('button');
  btn.textContent = 'Swing';
  btn.style.cssText = 'padding:6px 12px;background:#e11d48;color:white;border:none;border-radius:8px;font-weight:bold;cursor:pointer;';
  btnWrap.appendChild(btn);
  controls.appendChild(btnWrap);

  let state = 'idle'; // idle, swinging, hit
  let currentAngle = parseInt(pullSlider.input.value);
  let nailDepth = 0;
  let maxAngle = currentAngle;
  let angularVel = 0;

  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Ground & Board
    ctx.fillStyle = '#e2e8f0'; ctx.fillRect(0, H - 40, W, 40);
    
    const boardX = W/2 - 60, boardY = H - 80;
    ctx.fillStyle = '#b45309'; ctx.fillRect(boardX, boardY, 120, 40);
    ctx.fillStyle = '#fef3c7'; ctx.font = '12px Inter'; ctx.fillText('WOOD', W/2 - 20, boardY + 25);

    // Nail
    const nailX = W/2 + 20, nailY = boardY - 30 + nailDepth;
    ctx.fillStyle = '#94a3b8'; ctx.fillRect(nailX - 2, nailY, 4, 30); // Body
    ctx.fillStyle = '#64748b'; ctx.fillRect(nailX - 8, nailY - 4, 16, 4); // Head

    // Pivot & Hammer Arm
    const pivotX = W/2 - 50, pivotY = boardY - 80;
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath(); ctx.arc(pivotX, pivotY, 5, 0, Math.PI*2); ctx.fill();

    ctx.save();
    ctx.translate(pivotX, pivotY);
    ctx.rotate(-currentAngle * Math.PI / 180); // Pullback is negative angle
    
    // Arm
    ctx.fillStyle = '#d4d4d8';
    ctx.fillRect(0, -3, 80, 6);
    
    // Hammer Head
    ctx.fillStyle = '#475569';
    ctx.fillRect(70, -15, 20, 30);
    ctx.fillStyle = '#334155';
    ctx.fillRect(90, -10, 5, 20); // Striking face
    
    ctx.restore();

    // UI Stats
    const pe = (maxAngle * 1.5).toFixed(0);
    const ke = state === 'hit' ? '0' : (state === 'swinging' ? (maxAngle*1.5 - currentAngle*1.5).toFixed(0) : '0');
    
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fillRect(10, 10, 150, 70);
    ctx.strokeStyle = '#f97316'; ctx.strokeRect(10, 10, 150, 70);
    
    ctx.font = 'bold 12px Inter'; ctx.fillStyle = '#3b82f6'; ctx.textAlign = 'left';
    ctx.fillText(\`Potential Energy: \${pe} J\`, 20, 30);
    ctx.fillStyle = '#ef4444';
    ctx.fillText(\`Kinetic Energy: \${ke} J\`, 20, 50);
    ctx.fillStyle = '#10b981';
    ctx.fillText(\`Work Done: \${nailDepth > 0 ? pe : '0'} J\`, 20, 70);
  }

  let animId;
  function animate() {
    if (state === 'swinging') {
      angularVel += 0.5; // Gravity accelerating
      currentAngle -= angularVel;
      
      if (currentAngle <= 0) { // Hit
        currentAngle = 0;
        state = 'hit';
        nailDepth = Math.min(25, nailDepth + maxAngle * 0.3);
        angularVel = 0;
      }
    } else if (state === 'idle') {
      currentAngle = parseInt(pullSlider.input.value);
      maxAngle = currentAngle;
    }
    
    draw();
    animId = requestAnimationFrame(animate);
  }

  btn.addEventListener('click', () => {
    if (state === 'idle') {
      state = 'swinging';
    } else {
      state = 'idle';
      nailDepth = 0;
    }
  });

  pullSlider.input.addEventListener('input', () => {
    if(state === 'idle') {
      pullSlider.val.textContent = pullSlider.input.value;
      currentAngle = parseInt(pullSlider.input.value);
      maxAngle = currentAngle;
    }
  });

  animate();
  return function cleanup() {
    cancelAnimationFrame(animId);
    container.innerHTML = '';
  };
}
