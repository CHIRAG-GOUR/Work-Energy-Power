const fs = require('fs');

const simsCode = `
export function initSim13(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#334155');

  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 5, 12);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const light = new THREE.DirectionalLight(0xffffff, 1.5);
  light.position.set(5, 10, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  // Ground
  const groundGeo = new THREE.BoxGeometry(10, 0.5, 10);
  const groundMat = new THREE.MeshLambertMaterial({ color: '#166534' });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.y = -0.25;
  scene.add(ground);

  // Ball
  const ballGeo = new THREE.SphereGeometry(0.5, 32, 32);
  const ballMat = new THREE.MeshPhongMaterial({ color: '#ef4444' });
  const ball = new THREE.Mesh(ballGeo, ballMat);
  scene.add(ball);

  // UI elements injected into dom
  const ui = document.createElement('div');
  ui.style.position = 'absolute';
  ui.style.top = '10px';
  ui.style.left = '10px';
  ui.style.color = 'white';
  ui.style.fontFamily = 'monospace';
  ui.style.fontSize = '14px';
  ui.style.pointerEvents = 'none';
  container.appendChild(ui);

  let height = 4;
  let velocity = 0;
  const gravity = -9.8;
  let clock = new THREE.Clock();

  const m = 20; // mass
  const g = 10; // gravity for calculation

  const animate = () => {
    const frameId = requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.1);
    
    velocity += gravity * dt;
    height += velocity * dt;

    if (height < 0.5) {
       height = 0.5;
       velocity = -velocity * 0.8; // bounce
       if (Math.abs(velocity) < 1) {
           height = 4; // reset animation
           velocity = 0;
       }
    }

    ball.position.y = height;
    
    // update ui
    const calcH = Math.max(0, height - 0.5);
    const pe = Math.round(m * g * calcH * 20); // scaled for show
    const totalE = 800; // max initial: 20 * 10 * 4
    const ke = Math.max(0, totalE - pe);

    ui.innerHTML = \`<div style="margin-bottom:4px;">Total Energy: \${totalE} J</div>
                    <div style="background:#581c87; padding:2px; width: \${pe/4}px; margin-bottom:4px;">PE: \${pe} J</div>
                    <div style="background:#b91c1c; padding:2px; width: \${ke/4}px;">KE: \${Math.round(ke)} J</div>\`;

    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  const handleResize = () => {
    if(!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
    try {
      container.removeChild(renderer.domElement);
      if (ui.parentNode) container.removeChild(ui);
    } catch(e){}
    renderer.dispose();
  };
}

export function initSim14(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#1e293b');

  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 5, 12);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const light = new THREE.DirectionalLight(0xffffff, 1.5);
  light.position.set(2, 10, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  // Stairs
  const stairMat = new THREE.MeshLambertMaterial({ color: '#475569' });
  for(let i=0; i<5; i++){
     const block = new THREE.Mesh(new THREE.BoxGeometry(4, 0.5, 1), stairMat);
     block.position.set(0, i * 0.5, -i * 1);
     scene.add(block);
  }

  // Alex (Fast) & Ben (Slow)
  const boxGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const alex = new THREE.Mesh(boxGeo, new THREE.MeshPhongMaterial({ color: '#3b82f6' })); // Blue
  const ben = new THREE.Mesh(boxGeo, new THREE.MeshPhongMaterial({ color: '#eab308' })); // Yellow
  scene.add(alex); scene.add(ben);

  const ui = document.createElement('div');
  ui.style.position = 'absolute';
  ui.style.top = '10px';
  ui.style.left = '10px';
  ui.style.color = 'white';
  ui.style.fontFamily = 'monospace';
  ui.style.fontSize = '14px';
  container.appendChild(ui);

  let time = 0;
  let clock = new THREE.Clock();
  
  const animate = () => {
    const frameId = requestAnimationFrame(animate);
    time += clock.getDelta();

    // Loop every 10 seconds
    const cycle = time % 10;
    
    // Alex takes 3 seconds to climb
    const alexProgress = Math.min(1, cycle / 3);
    // Ben takes 8 seconds to climb
    const benProgress = Math.min(1, cycle / 8);

    alex.position.set(-1, stairMat.position?.y || 0 + alexProgress * 2.5, -alexProgress * 4);
    ben.position.set(1, stairMat.position?.y || 0 + benProgress * 2.5, -benProgress * 4);

    ui.innerHTML = \`<div style="margin-bottom:8px; color:#3b82f6; font-weight:bold;">ALEX (Fast) Power: High <br/> Progress: \${(alexProgress*100).toFixed(0)}%</div>
                    <div style="color:#eab308; font-weight:bold;">BEN (Slow) Power: Low <br/> Progress: \${(benProgress*100).toFixed(0)}%</div>\`;

    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  const handleResize = () => {
    if(!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
    try {
      container.removeChild(renderer.domElement);
      if (ui.parentNode) container.removeChild(ui);
    } catch(e){}
    renderer.dispose();
  };
}
`;

fs.appendFileSync('src/lib/simulations.js', simsCode);
