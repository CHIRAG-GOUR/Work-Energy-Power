const fs = require('fs');
let fileContent = fs.readFileSync('src/lib/simulations.js', 'utf8');

const newSimulations = 
export function initSim11(container) {
  if (!container) return () => {};
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#e2e8f0');
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 5, 15);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 10, 5);
  scene.add(dirLight);

  const groundGeo = new THREE.BoxGeometry(10, 0.5, 10);
  const groundMat = new THREE.MeshStandardMaterial({ color: '#94a3b8' });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.y = -0.25;
  scene.add(ground);

  const blockGeo = new THREE.BoxGeometry(1, 1, 1);
  const blockMat = new THREE.MeshStandardMaterial({ color: '#ef4444' });
  const block = new THREE.Mesh(blockGeo, blockMat);
  block.position.set(0, 0.5, 0);
  scene.add(block);

  const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 8, 8);
  const poleMat = new THREE.MeshBasicMaterial({ color: '#475569' });
  const pole = new THREE.Mesh(poleGeo, poleMat);
  pole.position.set(-2, 4, 0);
  scene.add(pole);

  let targetHeight = 0.5;
  const timeOffset = Date.now();

  const animate = () => {
    const animationId = requestAnimationFrame(animate);
    const time = (Date.now() - timeOffset) * 0.001; 
    targetHeight = 3.5 + Math.sin(time) * 3; 
    block.position.y += (targetHeight - block.position.y) * 0.1;
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
  
  const handleResize = () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
    renderer.dispose();
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  };
}

export function initSim12(container) {
  if (!container) return () => {};
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#334155');
  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 5, 20);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(10, 10, 5);
  scene.add(dirLight);

  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(8, 0);
  shape.lineTo(0, 6);
  shape.lineTo(0, 0);
  
  const extrudeSettings = { depth: 2, bevelEnabled: false };
  const rampGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  const rampMat = new THREE.MeshStandardMaterial({ color: '#64748b' });
  const ramp = new THREE.Mesh(rampGeo, rampMat);
  ramp.position.set(-4, -2, -1);
  scene.add(ramp);

  const cartGeo = new THREE.BoxGeometry(0.8, 0.5, 1.2);
  const cartMat = new THREE.MeshStandardMaterial({ color: '#38bdf8' });
  const cart = new THREE.Mesh(cartGeo, cartMat);
  scene.add(cart);

  let state = 0; 
  let progress = 0;
  
  const startY = 4;
  const startX = -3.8;
  const endY = -1.8;
  const endX = 3.8;

  const animate = () => {
    const animationId = requestAnimationFrame(animate);
    if (state === 0) {
      cart.position.set(startX, startY, 0);
      cart.rotation.z = 0;
      progress += 0.01;
      if (progress > 1) { state = 1; progress = 0; }
    } else if (state === 1) {
      progress += 0.02; 
      const currentX = startX + (endX - startX) * progress;
      const currentY = startY + (endY - startY) * progress;
      cart.position.set(currentX, currentY, 0);
      
      const dx = endX - startX;
      const dy = endY - startY;
      cart.rotation.z = Math.atan2(dy, dx);
      if (progress >= 1) { state = 2; progress = 0; }
    } else if (state === 2) {
      cart.position.set(endX, endY, 0);
      progress += 0.01;
      if (progress > 1) { state = 0; progress = 0; }
    }

    controls.update();
    renderer.render(scene, camera);
  };
  animate();
  
  const handleResize = () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
    renderer.dispose();
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  };
}
;

if (!fileContent.includes('initSim11')) {
    fs.writeFileSync('src/lib/simulations.js', fileContent + '\n\n' + newSimulations);
    console.log('Appended sims 11 and 12 to simulations file');
} else {
    console.log('Sims already exist');
}
