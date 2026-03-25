// ============================================================
// SIM 5: Energy Handshake (Cricket Game)
// ============================================================
export function initSim5() {
  const container = document.getElementById('sim5-canvas');
  if (!container) return () => {};
  container.innerHTML = '';

  const canvas = createSimCanvas(container, 600, 300);
  const ctx = canvas.getContext('2d');

  const controls = document.createElement('div');
  controls.style.cssText = 'position:absolute;bottom:8px;left:8px;right:8px;z-index:10;display:flex;gap:10px;align-items:center;background:rgba(255,255,255,0.7);padding:8px;border-radius:12px;';
  container.appendChild(controls);

  const speedSlider = createSlider(controls, 'Bowling Speed', 10, 40, 25, 1, '#ea580c');

  let state = 'idle'; // idle, bowling, hit
  let ballX = 80, ballY = 200, t = 0;
  let wicketAngle = 0;
  let batsmanSwing = 0;

  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Pitch & Ground
    ctx.fillStyle = '#16a34a'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#d97706'; ctx.fillRect(50, 180, 500, 80); // Pitch
    ctx.fillStyle = '#fde68a'; ctx.fillRect(50, 175, 500, 5); // Crease line
    ctx.fillStyle = '#fff'; ctx.fillRect(100, 180, 2, 80); // Bowling crease
    ctx.fillRect(450, 180, 2, 80); // Batting crease

    // Bowler (Left side)
    const bowlerX = 80, bowlerY = 160;
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(bowlerX-10, bowlerY, 20, 30); // Body
    ctx.fillStyle = '#fcd34d';
    ctx.beginPath(); ctx.arc(bowlerX, bowlerY-10, 10, 0, Math.PI*2); ctx.fill(); // Head
    // Bowler arm
    ctx.strokeStyle = '#fcd34d'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(bowlerX, bowlerY);
    if (state === 'idle') {
      ctx.lineTo(bowlerX+15, bowlerY-15);
    } else {
      ctx.lineTo(bowlerX+10, bowlerY+10);
    }
    ctx.stroke();

    // Wickets (Right side)
    const stumpX = 480;
    const stumpY = 180;
    ctx.save();
    ctx.translate(stumpX, stumpY);
    if (wicketAngle > 0) {
      ctx.translate(0, 40); // Pivot at base
      ctx.rotate((wicketAngle) * Math.PI / 180);
      ctx.translate(0, -40);
    }
    ctx.fillStyle = '#b45309';
    ctx.fillRect(-10, -40, 4, 40); // Off stump
    ctx.fillRect(0, -40, 4, 40); // Middle stump
    ctx.fillRect(10, -40, 4, 40); // Leg stump
    if (wicketAngle === 0) {
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(-12, -42, 28, 3); // Bails
    }
    ctx.restore();

    // Batsman
    const batX = 460, batY = 150;
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(batX-10, batY, 20, 30); // Body
    ctx.fillStyle = '#fcd34d';
    ctx.beginPath(); ctx.arc(batX, batY-10, 10, 0, Math.PI*2); ctx.fill(); // Head
    ctx.fillStyle = '#0f172a';
    ctx.beginPath(); ctx.arc(batX, batY-10, 11, Math.PI, Math.PI*2); ctx.fill(); // Helmet
    
    // Bat swing
    ctx.save();
    ctx.translate(batX-5, batY+10);
    if (state === 'hit') {
      ctx.rotate(-batsmanSwing * Math.PI / 180);
    } else {
      ctx.rotate(45 * Math.PI / 180); // Stance
    }
    ctx.fillStyle = '#d97706';
    ctx.fillRect(-3, -5, 6, 40); // Bat handle & blade
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(-4, 10, 8, 30); // Bat face
    ctx.restore();

    // Ball
    if (state !== 'idle') {
      ctx.fillStyle = '#dc2626';
      ctx.beginPath(); ctx.arc(ballX, ballY, 6, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(ballX, ballY, 6, 0, Math.PI * 2); ctx.stroke();
    } else {
      ctx.fillStyle = '#dc2626';
      ctx.beginPath(); ctx.arc(bowlerX+15, bowlerY-15, 6, 0, Math.PI * 2); ctx.fill();
    }

    // Energy UI
    const speed = parseInt(speedSlider.input.value);
    const ke = (0.5 * 0.16 * speed * speed).toFixed(1);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fillRect(W - 190, 10, 180, 60);
    ctx.strokeStyle = '#ea580c'; ctx.strokeRect(W - 190, 10, 180, 60);
    ctx.font = 'bold 13px Inter'; ctx.fillStyle = '#b91c1c'; ctx.textAlign = 'left';
    ctx.fillText(\`Ball KE: \${state === 'idle' ? '0' : (state === 'bowling' ? ke : '0')} J\`, W - 180, 30);
    ctx.fillStyle = '#b45309';
    ctx.fillText(\`Wicket Energy: \${wicketAngle > 0 ? ke : '0'} J\`, W - 180, 55);

    if (state === 'hit') {
      ctx.font = 'bold 24px Inter'; ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 4;
      ctx.fillText('BOWLED! ENERGY TRANSFERRED!', W/2, 60);
      ctx.shadowBlur = 0;
    }
  }

  let animId;
  function animate() {
    const speed = parseInt(speedSlider.input.value);
    
    if (state === 'bowling') {
      t += 0.05 * (speed / 20);
      ballX = 80 + t * 400;
      ballY = 160 + t * 50; 
      
      if (ballY > 210) {
         ballY = 210 - (ballY - 210) * 0.5; 
      }

      if (ballX >= 475) {
        state = 'hit';
        batsmanSwing = 90; 
      }
    } else if (state === 'hit') {
      if (wicketAngle < 90) {
        wicketAngle += speed * 0.2;
      }
      ballX += speed * 0.1;
      ballY += 2;
      if(ballY > 210) ballY = 210;
    }

    draw();
    animId = requestAnimationFrame(animate);
  }

  canvas.addEventListener('click', () => {
    if (state === 'idle' || state === 'hit') {
      state = 'bowling';
      ballX = 80;
      ballY = 160;
      t = 0;
      wicketAngle = 0;
      batsmanSwing = 45;
    }
  });

  speedSlider.input.addEventListener('input', () => {
    speedSlider.val.textContent = speedSlider.input.value;
  });

  animate();
  return function cleanup() {
    cancelAnimationFrame(animId);
    container.innerHTML = '';
  };
}
