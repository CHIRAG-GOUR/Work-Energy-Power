import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

export function initSim1() {
  const canvas1 = document.getElementById('sim1-canvas');
  if(!canvas1) return;
  const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1, antialias: true, alpha: true });
  renderer1_ = renderer1;
  renderer1.setSize(canvas1.clientWidth, canvas1.clientHeight);
  renderer1.setPixelRatio(window.devicePixelRatio);
  renderer1.shadowMap.enabled = true;

  const scene1 = new THREE.Scene();
  scene1.background = new THREE.Color(0xe2e8f0);

  const camera1 = new THREE.PerspectiveCamera(45, canvas1.clientWidth / canvas1.clientHeight, 0.1, 100);
  camera1.position.set(0, 10, 25);
  
  const controls1 = new OrbitControls(camera1, renderer1.domElement);
  controls1.enableDamping = true;

  // Lighting
  scene1.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dirL1 = new THREE.DirectionalLight(0xffffff, 0.8);
  dirL1.position.set(5, 10, 5);
  dirL1.castShadow = true;
  scene1.add(dirL1);

  // Floor
  const floorGeo = new THREE.PlaneGeometry(50, 50);
  const floorMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene1.add(floor);

  // Group for Grid helper
  const gridHelper = new THREE.GridHelper(50, 50, 0xcccccc, 0xcccccc);
  gridHelper.position.y = 0.01;
  scene1.add(gridHelper);

  // The Wall
  const wallGeo = new THREE.BoxGeometry(8, 8, 2);
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.9 });
  const wall = new THREE.Mesh(wallGeo, wallMat);
  wall.position.set(-6, 4, 0);
  wall.castShadow = true;
  scene1.add(wall);

  // The Pebble
  const pebbleGeo = new THREE.DodecahedronGeometry(1.5, 1);
  const pebbleMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.6 });
  const pebble = new THREE.Mesh(pebbleGeo, pebbleMat);
  pebble.position.set(5, 1.5, 0);
  pebble.castShadow = true;
  scene1.add(pebble);
  
  // Character (Simple representation)
  const charGroup = new THREE.Group();
  const charBodyGeo = new THREE.CapsuleGeometry(1, 4, 4, 8);
  const charBodyMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
  const charBody = new THREE.Mesh(charBodyGeo, charBodyMat);
  charBody.position.y = 2.5;
  charGroup.add(charBody);
  
  const charHeadGeo = new THREE.SphereGeometry(1, 16, 16);
  const charHeadMat = new THREE.MeshStandardMaterial({ color: 0xfcd34d });
  const charHead = new THREE.Mesh(charHeadGeo, charHeadMat);
  charHead.position.y = 4.5;
  charGroup.add(charHead);
  
  charGroup.castShadow = true;
  scene1.add(charGroup);
  charGroup.position.set(0, 0, 0);


  let state = 'idle'; // idle, pushing_wall, pushing_pebble
  let targetNode = null;
  let forceApplied = 0;
  let displacement = 0;
  let charStartPos = 0;
  
  const btnWall = document.getElementById('sim1-btn-wall');
  const btnPebble = document.getElementById('sim1-btn-pebble');
  const btnReset = document.getElementById('sim1-btn-reset');
  const statForce = document.getElementById('sim1-stat-force');
  const statDisp = document.getElementById('sim1-stat-disp');
  const statWork = document.getElementById('sim1-stat-work');

  if(btnWall) btnWall.addEventListener('click', () => {
    state = 'pushing_wall';
    targetNode = wall;
    charGroup.position.set(wall.position.x + 4, 0, wall.position.z);
    charGroup.rotation.y = -Math.PI / 2;
  });

  if(btnPebble) btnPebble.addEventListener('click', () => {
    state = 'pushing_pebble';
    targetNode = pebble;
    charGroup.position.set(pebble.position.x - 3, 0, pebble.position.z);
    charGroup.rotation.y = Math.PI / 2;
    charStartPos = charGroup.position.x;
  });

  if(btnReset) btnReset.addEventListener('click', () => {
    state = 'idle';
    targetNode = null;
    forceApplied = 0;
    displacement = 0;
    charGroup.position.set(0, 0, 0);
    charGroup.rotation.y = 0;
    pebble.position.set(5, 1.5, 0);
    pebble.rotation.set(0,0,0);
    updateUI();
  });

  function updateUI() {
    if(!statForce) return;
    statForce.innerText = forceApplied.toFixed(0) + ' N';
    statDisp.innerText = displacement.toFixed(2) + ' m';
    statWork.innerText = (forceApplied * displacement).toFixed(0) + ' J';
    
    if(forceApplied > 0 && displacement == 0) {
        statWork.style.color = 'var(--error-color)';
    } else if (forceApplied > 0 && displacement > 0) {
        statWork.style.color = 'var(--success-color)';
    } else {
        statWork.style.color = '#334155';
    }
  }

  function animateSim1() {
    sim1Req = requestAnimationFrame(animateSim1);

    if (state === 'pushing_wall') {
      forceApplied = Math.min(forceApplied + 5, 200); 
      displacement = 0; 
      charGroup.position.x = wall.position.x + 4 + (Math.random() * 0.1 - 0.05);
    } else if (state === 'pushing_pebble') {
      forceApplied = 10; 
      if(pebble.position.x < 15) {
          pebble.position.x += 0.05;
          pebble.rotation.z -= 0.05;
          charGroup.position.x += 0.05;
          displacement = Math.abs(charGroup.position.x - charStartPos);
      }
    }
    
    if(state !== 'idle') {
      updateUI();
    }

    controls1.update();
    renderer1.render(scene1, camera1);
  }
  animateSim1();
  
  const handleResize = () => {
     if(canvas1 && renderer1) {
         camera1.aspect = canvas1.clientWidth / canvas1.clientHeight;
         camera1.updateProjectionMatrix();
         renderer1.setSize(canvas1.clientWidth, canvas1.clientHeight);
     }
  };
  window.addEventListener('resize', handleResize);
}


export function initSim2() {
    const canvas2 = document.getElementById('sim2-canvas');
    if(!canvas2) return;
    const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2, antialias: true, alpha: true });
    renderer2_ = renderer2;
    renderer2.setSize(canvas2.clientWidth, canvas2.clientHeight);
    renderer2.setPixelRatio(window.devicePixelRatio);
    renderer2.shadowMap.enabled = true;
  
    const scene2 = new THREE.Scene();
    scene2.background = new THREE.Color(0xf0fdfa); // soft mint
  
    const camera2 = new THREE.PerspectiveCamera(45, canvas2.clientWidth / canvas2.clientHeight, 0.1, 100);
    camera2.position.set(0, 15, 30);
    
    const controls2 = new OrbitControls(camera2, renderer2.domElement);
    controls2.enableDamping = true;
  
    // Lighting
    scene2.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirL2 = new THREE.DirectionalLight(0xffffff, 0.9);
    dirL2.position.set(10, 20, 10);
    dirL2.castShadow = true;
    scene2.add(dirL2);
  
    // Floor
    const floorGeo = new THREE.PlaneGeometry(80, 20);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, roughness: 0.9 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene2.add(floor);
    
    // Path marker
    const pathGeo = new THREE.PlaneGeometry(80, 2);
    const pathMat = new THREE.MeshBasicMaterial({color: 0x9ca3af});
    const path = new THREE.Mesh(pathGeo, pathMat);
    path.rotation.x = -Math.PI / 2;
    path.position.y = 0.01;
    scene2.add(path);
  
    // Bull/Cart Group
    const cartGroup = new THREE.Group();
    
    // Cart Base
    const cartBaseGeo = new THREE.BoxGeometry(6, 1, 4);
    const cartMat = new THREE.MeshStandardMaterial({color: 0x8b5cf6}); // purple
    const cartBase = new THREE.Mesh(cartBaseGeo, cartMat);
    cartBase.position.y = 1.5;
    cartBase.castShadow = true;
    cartGroup.add(cartBase);
    
    // Wheels
    const whGeo = new THREE.CylinderGeometry(1, 1, 0.5, 16);
    const whMat = new THREE.MeshStandardMaterial({color: 0x1e293b});
    
    const wheel1 = new THREE.Mesh(whGeo, whMat);
    wheel1.rotation.x = Math.PI / 2;
    wheel1.position.set(-2, 1, 2.25);
    cartGroup.add(wheel1);
    
    const wheel2 = wheel1.clone();
    wheel2.position.set(2, 1, 2.25);
    cartGroup.add(wheel2);
    
    const wheel3 = wheel1.clone();
    wheel3.position.set(-2, 1, -2.25);
    cartGroup.add(wheel3);
    
    const wheel4 = wheel1.clone();
    wheel4.position.set(2, 1, -2.25);
    cartGroup.add(wheel4);
    
    // Load
    const boxGeo = new THREE.BoxGeometry(2,2,2);
    const boxMat = new THREE.MeshStandardMaterial({color: 0xf59e0b});
    const l1 = new THREE.Mesh(boxGeo, boxMat);
    l1.position.set(-1, 3, 0);
    cartGroup.add(l1);
    const l2 = new THREE.Mesh(boxGeo, boxMat);
    l2.position.set(1.5, 3, 0);
    cartGroup.add(l2);
    
    // Bull (Simplified)
    const bullGeo = new THREE.BoxGeometry(4, 3, 2.5);
    const bullMat = new THREE.MeshStandardMaterial({color: 0x14b8a6});
    const bull = new THREE.Mesh(bullGeo, bullMat);
    bull.position.set(6, 2, 0);
    bull.castShadow = true;
    cartGroup.add(bull);
    
    // Rope
    const ropeGeo = new THREE.CylinderGeometry(0.1, 0.1, 3);
    const ropeMat = new THREE.MeshStandardMaterial({color: 0x475569});
    const rope = new THREE.Mesh(ropeGeo, ropeMat);
    rope.rotation.z = Math.PI / 2;
    rope.position.set(3.5, 2, 0);
    cartGroup.add(rope);
  
    cartGroup.position.set(-15, 0, 0);
    scene2.add(cartGroup);
  
    // Logic
    let isPulling = false;
    let force = 0;
    let displacement = 0;
    let startX = cartGroup.position.x;
    
    const btnPull = document.getElementById('sim2-btn-pull');
    const btnReset = document.getElementById('sim2-btn-reset');
    
    const statForce = document.getElementById('sim2-stat-force');
    const statDisp = document.getElementById('sim2-stat-disp');
    const statWork = document.getElementById('sim2-stat-work');
    
    if(btnPull) {
        btnPull.addEventListener('mousedown', () => isPulling = true);
        btnPull.addEventListener('mouseup', () => { isPulling = false; force = 0; updateUI();});
        btnPull.addEventListener('mouseleave', () => { isPulling = false; force = 0; updateUI(); });
        
        btnPull.addEventListener('touchstart', (e) => { e.preventDefault(); isPulling = true; });
        btnPull.addEventListener('touchend', (e) => { e.preventDefault(); isPulling = false; force = 0; updateUI();});
    }
  
    if(btnReset) btnReset.addEventListener('click', () => {
        isPulling = false;
        force = 0;
        displacement = 0;
        cartGroup.position.x = startX;
        wheel1.rotation.y = 0; wheel2.rotation.y = 0; wheel3.rotation.y = 0; wheel4.rotation.y = 0;
        updateUI();
    });
    
    function updateUI() {
        if(!statForce) return;
        statForce.innerText = force.toFixed(0) + ' N';
        statDisp.innerText = displacement.toFixed(2) + ' m';
        statWork.innerText = (force * displacement).toFixed(0) + ' J';
    }
  
    function animateSim2() {
      sim2Req = requestAnimationFrame(animateSim2);
  
      if(isPulling && cartGroup.position.x < 20) {
          force = 140; // Constant force when pulling
          const speed = 0.08;
          cartGroup.position.x += speed;
          displacement = cartGroup.position.x - startX;
          
          // Animate wheels
          const rotSpeed = speed / 1; // v = r * w
          wheel1.rotation.y -= rotSpeed;
          wheel2.rotation.y -= rotSpeed;
          wheel3.rotation.y -= rotSpeed;
          wheel4.rotation.y -= rotSpeed;
          
          // Bull bobbing
          bull.position.y = 2 + Math.sin(Date.now() * 0.01) * 0.2;
          
          updateUI();
      } else if (!isPulling) {
        bull.position.y = 2; // Reset bobbing
      }
  
      controls2.update();
      renderer2.render(scene2, camera2);
    }
    animateSim2();
    
    // Resize handler
    const handleResize = () => {
       if(canvas2 && renderer2) {
           camera2.aspect = canvas2.clientWidth / canvas2.clientHeight;
           camera2.updateProjectionMatrix();
           renderer2.setSize(canvas2.clientWidth, canvas2.clientHeight);
       }
    };
    window.addEventListener('resize', handleResize);
}
let sim3Req;
let renderer3_;

export function cleanupSim3() {
   if (sim3Req) cancelAnimationFrame(sim3Req);
   if (renderer3_) renderer3_.dispose();
}

export function initSim3() {
    const canvas3 = document.getElementById('sim3-canvas');
    if(!canvas3) return;
            const renderer3 = new THREE.WebGLRenderer({ canvas: canvas3, antialias: true, alpha: true });
    renderer3_ = renderer3;
    renderer3.setSize(canvas3.clientWidth, canvas3.clientHeight);
    renderer3.setPixelRatio(window.devicePixelRatio);
    renderer3.shadowMap.enabled = true;
  
    const scene3 = new THREE.Scene();
    scene3.background = new THREE.Color(0xf8fafc); 
  
    const camera3 = new THREE.PerspectiveCamera(45, canvas3.clientWidth / canvas3.clientHeight, 0.1, 100);
    camera3.position.set(0, 8, 20);
    
    const controls3 = new OrbitControls(camera3, renderer3.domElement);
    controls3.enableDamping = true;
  
    scene3.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirL3 = new THREE.DirectionalLight(0xffffff, 0.9);
    dirL3.position.set(5, 20, 10);
    dirL3.castShadow = true;
    scene3.add(dirL3);
  
    const floorGeo = new THREE.PlaneGeometry(50, 50);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.8 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene3.add(floor);
    
    const gridHelper = new THREE.GridHelper(50, 50, 0x94a3b8, 0x94a3b8);
    gridHelper.position.y = 0.01;
    scene3.add(gridHelper);
    
    const boxGeo = new THREE.BoxGeometry(2, 2, 2);
    const boxMat = new THREE.MeshStandardMaterial({color: 0xf59e0b}); 
    const luggage = new THREE.Mesh(boxGeo, boxMat);
    luggage.position.set(0, 1, 0); 
    luggage.castShadow = true;
    scene3.add(luggage);
    
    const dirUp = new THREE.Vector3(0, 1, 0);
    const dirDown = new THREE.Vector3(0, -1, 0);
    const arrowUp = new THREE.ArrowHelper(dirUp, luggage.position, 0.01, 0x3b82f6, 0.5, 0.3); 
    const arrowDown = new THREE.ArrowHelper(dirDown, luggage.position, 3, 0xef4444, 0.5, 0.3); 
    scene3.add(arrowUp);
    scene3.add(arrowDown);
  
    let isLifting = false;
    let mass = 15; 
    let g = 10; 
    let gravityForce = mass * g; 
    let appliedForce = 0;
    let displacement = 0;
    let startY = 1;
    
    const btnLift = document.getElementById('sim3-btn-lift');
    const btnReset = document.getElementById('sim3-btn-reset');
    
    const statAppForce = document.getElementById('sim3-stat-app-force');
    const statGravForce = document.getElementById('sim3-stat-grav-force');
    const statDisp = document.getElementById('sim3-stat-disp');
    const statAppWork = document.getElementById('sim3-stat-app-work');
    const statGravWork = document.getElementById('sim3-stat-grav-work');
    
    if(btnLift) {
        btnLift.addEventListener('mousedown', () => isLifting = true);
        btnLift.addEventListener('mouseup', () => { isLifting = false; appliedForce = luggage.position.y > startY ? gravityForce : 0; updateUI();}); 
        btnLift.addEventListener('mouseleave', () => { isLifting = false; appliedForce = luggage.position.y > startY ? gravityForce : 0; updateUI(); });
        btnLift.addEventListener('touchstart', (e) => { e.preventDefault(); isLifting = true; });
        btnLift.addEventListener('touchend', (e) => { e.preventDefault(); isLifting = false; appliedForce = luggage.position.y > startY ? gravityForce : 0; updateUI();});
    }

    if(btnReset) {
        btnReset.addEventListener('click', () => {
            isLifting = false;
            appliedForce = 0;
            displacement = 0;
            luggage.position.y = startY;
            updateUI();
        });
    }
    
    function updateUI() {
        if(!statAppForce) return;
        statAppForce.innerText = appliedForce.toFixed(0) + ' N';
        statGravForce.innerText = '-' + gravityForce.toFixed(0) + ' N';
        statDisp.innerText = displacement.toFixed(2) + ' m';
        statAppWork.innerText = '+' + (appliedForce * displacement).toFixed(0) + ' J';
        statGravWork.innerText = '-' + (gravityForce * displacement).toFixed(0) + ' J';
    }
  
    function animateSim3() {
      sim3Req = requestAnimationFrame(animateSim3);
  
      if(isLifting && luggage.position.y < 8) {
          appliedForce = 225; 
          const speed = 0.05;
          luggage.position.y += speed;
          displacement = luggage.position.y - startY;
          updateUI();
      } else if (!isLifting && luggage.position.y > startY) {
          appliedForce = gravityForce; 
      } else if (!isLifting && luggage.position.y <= startY) {
          appliedForce = 0;
      }
      
      arrowUp.position.copy(luggage.position);
      arrowUp.setLength(appliedForce > 0 ? appliedForce / 50 : 0.001);
      
      arrowDown.position.copy(luggage.position);
      arrowDown.setLength(gravityForce / 50); 
  
      controls3.update();
      renderer3.render(scene3, camera3);
    }
    animateSim3();
    updateUI();
    
    window.addEventListener('resize', () => {
       if(canvas3 && renderer3) {
           camera3.aspect = canvas3.clientWidth / canvas3.clientHeight;
           camera3.updateProjectionMatrix();
           renderer3.setSize(canvas3.clientWidth, canvas3.clientHeight);
       }
    });
}
// ==========================================
// SIMULATION 4: PLOUGHING BULLOCKS
// ==========================================
export function initSim4() {
    const canvas4 = document.getElementById('sim4-canvas');
    if(!canvas4) return;
    
    // Check if we already have a renderer attached
    if (canvas4.__simInitialized) return;
    canvas4.__simInitialized = true;

    const renderer4 = new THREE.WebGLRenderer({ canvas: canvas4, antialias: true, alpha: true });
    renderer4.setSize(canvas4.clientWidth, canvas4.clientHeight);
    renderer4.setPixelRatio(window.devicePixelRatio);
    renderer4.shadowMap.enabled = true;
    
    const scene4 = new THREE.Scene();
    scene4.background = new THREE.Color(0xfef3c7); // warm sky

    const camera4 = new THREE.PerspectiveCamera(45, canvas4.clientWidth / canvas4.clientHeight, 0.1, 100);
    camera4.position.set(-15, 15, 25);
    camera4.lookAt(0, 0, 0);

    const controls4 = new OrbitControls(camera4, renderer4.domElement);
    controls4.enableDamping = true;

    scene4.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirL4 = new THREE.DirectionalLight(0xffedd5, 1);
    dirL4.position.set(10, 20, -10);
    dirL4.castShadow = true;
    scene4.add(dirL4);

    // Floor (Unploughed field)
    const floorGeo = new THREE.PlaneGeometry(60, 20);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0xa3e635, roughness: 1.0 }); // grassy
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene4.add(floor);

    // Ploughed dirt trail (starts at 0 width, grows backward)
    const trailGeo = new THREE.PlaneGeometry(1, 3);
    const trailMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 1.0 }); // dark dirt
    const trail = new THREE.Mesh(trailGeo, trailMat);
    trail.rotation.x = -Math.PI / 2;
    trail.position.set(-20, 0.05, 0); 
    scene4.add(trail);

    // Group for Bullocks and Plough
    const ploughGroup = new THREE.Group();

    // The Plough (Wedge shape)
    const ploughGeo = new THREE.ConeGeometry(1, 3, 4);
    const ploughMat = new THREE.MeshStandardMaterial({ color: 0x92400e }); // wood
    const ploughMesh = new THREE.Mesh(ploughGeo, ploughMat);
    ploughMesh.rotation.x = -Math.PI / 2;
    ploughMesh.rotation.z = Math.PI / 4;
    ploughMesh.position.set(0, 1, 0);
    ploughMesh.castShadow = true;
    ploughGroup.add(ploughMesh);

    // Yoke & Beam
    const beamGeo = new THREE.CylinderGeometry(0.1, 0.1, 4);
    const beamMat = new THREE.MeshStandardMaterial({ color: 0x92400e });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.rotation.z = Math.PI / 2;
    beam.position.set(2, 1.5, 0);
    ploughGroup.add(beam);

    const yokeGeo = new THREE.CylinderGeometry(0.2, 0.2, 4);
    const yoke = new THREE.Mesh(yokeGeo, beamMat);
    yoke.rotation.x = Math.PI / 2;
    yoke.position.set(4, 2, 0);
    ploughGroup.add(yoke);

    // Bullocks (Simplified white cubes with horns)
    function createBullock(zOffset) {
        const bGroup = new THREE.Group();
        const bGeo = new THREE.BoxGeometry(3, 2, 1.5);
        const bMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc });
        const bMesh = new THREE.Mesh(bGeo, bMat);
        bMesh.position.y = 1;
        bMesh.castShadow = true;
        bGroup.add(bMesh);

        // horns
        const hornGeo = new THREE.ConeGeometry(0.1, 1, 4);
        const hornMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
        const h1 = new THREE.Mesh(hornGeo, hornMat);
        h1.position.set(1, 2.5, 0.5);
        h1.rotation.z = -Math.PI / 4;
        bGroup.add(h1);
        const h2 = new THREE.Mesh(hornGeo, hornMat);
        h2.position.set(1, 2.5, -0.5);
        h2.rotation.z = -Math.PI / 4;
        bGroup.add(h2);

        bGroup.position.set(4, 0, zOffset);
        return bGroup;
    }

    const bullock1 = createBullock(-1.5);
    const bullock2 = createBullock(1.5);
    ploughGroup.add(bullock1);
    ploughGroup.add(bullock2);

    ploughGroup.position.set(-20, 0, 0);
    scene4.add(ploughGroup);

    let isPulling = false;
    let force = 0;
    let displacement = 0;
    let startX = -20;
    let maxDisplacement = 15; // as per question

    const btnPull = document.getElementById('sim4-btn-pull');
    const btnReset = document.getElementById('sim4-btn-reset');
    
    const statForce = document.getElementById('sim4-stat-force');
    const statDisp = document.getElementById('sim4-stat-disp');
    const statWork = document.getElementById('sim4-stat-work');

    if(btnPull) {
        btnPull.addEventListener('mousedown', () => isPulling = true);
        btnPull.addEventListener('mouseup', () => { isPulling = false; force = 0; updateUI();});
        btnPull.addEventListener('mouseleave', () => { isPulling = false; force = 0; updateUI(); });
        
        btnPull.addEventListener('touchstart', (e) => { e.preventDefault(); isPulling = true; });
        btnPull.addEventListener('touchend', (e) => { e.preventDefault(); isPulling = false; force = 0; updateUI();});
    }

    if(btnReset) {
        btnReset.addEventListener('click', () => {
            isPulling = false;
            force = 0;
            displacement = 0;
            ploughGroup.position.x = startX;
            trail.scale.set(1, 1, 1);
            trail.position.x = startX;
            updateUI();
        });
    }

    function updateUI() {
        if(statForce) statForce.innerText = force.toFixed(0) + ' N';
        if(statDisp) statDisp.innerText = displacement.toFixed(2) + ' m';
        if(statWork) statWork.innerText = (force * displacement).toFixed(0) + ' J';
    }

    function animateSim4() {
        requestAnimationFrame(animateSim4);

        if(isPulling && displacement <= maxDisplacement) {
            force = 140; // Constant force of 140 N
            const speed = 0.05;
            ploughGroup.position.x += speed;
            displacement = ploughGroup.position.x - startX;

            // Grow the trail length to match displacement.
            // A PlaneGeometry of width 1 scales normally.
            if (displacement > 0.01) {
                trail.scale.set(displacement, 1, 1);
                // Center of the trail is half the displacement from start
                trail.position.x = startX + (displacement / 2);
            }

            // Bobbing motion for bullocks
            bullock1.position.y = Math.sin(Date.now() * 0.01) * 0.2;
            bullock2.position.y = Math.sin(Date.now() * 0.01 + 1) * 0.2;

            updateUI();
        } else if (!isPulling) {
            bullock1.position.y = 0;
            bullock2.position.y = 0;
        }

        controls4.update();
        renderer4.render(scene4, camera4);
    }
    animateSim4();

    window.addEventListener('resize', () => {
        if(canvas4 && renderer4) {
            camera4.aspect = canvas4.clientWidth / canvas4.clientHeight;
            camera4.updateProjectionMatrix();
            renderer4.setSize(canvas4.clientWidth, canvas4.clientHeight);
        }
    });
}
 

// ==========================================
// SIMULATION 5: CRICKET BALL & WICKET (Energy Transfer)
// ==========================================
export function initSim5() {
  const canvas = document.getElementById('sim5-canvas');
  if(!canvas) return;
  
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffedd5); // warm amber-50 match

  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 5, 20);
  
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't go below ground

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const dirL = new THREE.DirectionalLight(0xffffff, 0.8);
  dirL.position.set(5, 10, 5);
  dirL.castShadow = true;
  scene.add(dirL);

  // Ground (Pitch)
  const groundGeo = new THREE.PlaneGeometry(40, 10);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0xcd853f, roughness: 0.9 }); // dirt color
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Wickets
  const wicketGroup = new THREE.Group();
  const stumpGeo = new THREE.CylinderGeometry(0.15, 0.15, 2.5);
  const stumpMat = new THREE.MeshStandardMaterial({ color: 0xffd700 }); 
  
  for(let i=0; i<3; i++) {
    const stump = new THREE.Mesh(stumpGeo, stumpMat);
    stump.position.set(5, 1.25, i*0.5 - 0.5);
    stump.castShadow = true;
    wicketGroup.add(stump);
  }
  
  // Bails
  const bailGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.5);
  const bail1 = new THREE.Mesh(bailGeo, stumpMat);
  bail1.rotation.x = Math.PI/2;
  bail1.position.set(5, 2.55, -0.25);
  wicketGroup.add(bail1);
  const bail2 = new THREE.Mesh(bailGeo, stumpMat);
  bail2.rotation.x = Math.PI/2;
  bail2.position.set(5, 2.55, 0.25);
  wicketGroup.add(bail2);

  scene.add(wicketGroup);

  // Cricket Ball
  const ballGeo = new THREE.SphereGeometry(0.3, 32, 32);
  const ballMat = new THREE.MeshStandardMaterial({ color: 0xdc2626 }); // Dark red
  const ball = new THREE.Mesh(ballGeo, ballMat);
  ball.position.set(-10, 0.3, 0);
  ball.castShadow = true;
  scene.add(ball);

  let state = 'idle'; // idle, rolling, hit
  let ballVelocity = 0;
  let wicketRotation = 0;
  let wicketVelocity = 0;

  const btnBowl = document.getElementById('sim5-btn-bowl');
  const btnReset = document.getElementById('sim5-btn-reset');
  const statBallE = document.getElementById('sim5-stat-balle');
  const statWicketE = document.getElementById('sim5-stat-wickete');

  if(btnBowl) {
      btnBowl.addEventListener('click', () => {
        if(state === 'idle') {
            state = 'rolling';
            ballVelocity = 0.4;
        }
      });
  }

  if(btnReset) {
      btnReset.addEventListener('click', () => {
        state = 'idle';
        ball.position.set(-10, 0.3, 0);
        wicketGroup.rotation.z = 0;
        wicketGroup.position.set(0, 0, 0);
        ballVelocity = 0;
        wicketVelocity = 0;
        if(statBallE) statBallE.innerText = '0 J';
        if(statWicketE) statWicketE.innerText = '0 J';
      });
  }

  function animate() {
    requestAnimationFrame(animate);

    if (state === 'rolling') {
      ball.position.x += ballVelocity;
      ball.rotation.z -= ballVelocity;
      if(statBallE) statBallE.innerText = '100 J (Kinetic)';
      if(statWicketE) statWicketE.innerText = '0 J';

      // Collision
      if (ball.position.x >= 4.7) {
        state = 'hit';
        ballVelocity = 0.05; // Slows down
        wicketVelocity = 0.2; // Wicket inherits energy
      }
    } else if (state === 'hit') {
      ball.position.x += ballVelocity;
      ball.rotation.z -= ballVelocity;
      if(ballVelocity > 0) ballVelocity *= 0.95; // friction

      wicketGroup.rotation.z -= wicketVelocity * 0.5;
      wicketGroup.position.x += wicketVelocity;
      wicketGroup.position.y += wicketVelocity * 0.5;
      wicketVelocity *= 0.95;

      if(statBallE) statBallE.innerText = '20 J (Decreased)';
      if(statWicketE) statWicketE.innerText = '80 J (Transferred!)';
    }

    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    if(canvas && renderer) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
  });
}

// ==========================================
// SIMULATION 6: POTENTIAL TO KINETIC (Hammer & Nail)
// ==========================================
export function initSim6() {
  const canvas = document.getElementById('sim6-canvas');
  if(!canvas) return;
  
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xfff1f2); // rose-50

  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 8, 18);
  
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 3, 0);

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dirL = new THREE.DirectionalLight(0xffffff, 0.8);
  dirL.position.set(10, 15, 10);
  dirL.castShadow = true;
  scene.add(dirL);

  // Wood Block
  const woodGeo = new THREE.BoxGeometry(6, 4, 4);
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.8 });
  const wood = new THREE.Mesh(woodGeo, woodMat);
  wood.position.y = 2;
  wood.receiveShadow = true;
  wood.castShadow = true;
  scene.add(wood);

  // Nail
  const nailGroup = new THREE.Group();
  const nailBody = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.01, 2), new THREE.MeshStandardMaterial({ color: 0xa0a0a0, metalness: 0.8 }));
  nailBody.position.y = 1;
  const nailHead = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.1), new THREE.MeshStandardMaterial({ color: 0xa0a0a0, metalness: 0.8 }));
  nailHead.position.y = 2;
  nailGroup.add(nailBody);
  nailGroup.add(nailHead);
  nailGroup.position.set(0, 3, 0); // initial height
  scene.add(nailGroup);

  // Hammer
  const hammerGroup = new THREE.Group();
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 3), new THREE.MeshStandardMaterial({ color: 0xcd853f }));
  handle.rotation.z = Math.PI/2;
  const head = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1, 1), new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.6 }));
  head.position.x = 1.2;
  hammerGroup.add(handle);
  hammerGroup.add(head);
  hammerGroup.position.set(0, 8, 0); // start high
  scene.add(hammerGroup);

  let state = 'raised'; // raised, falling, driven
  let velocity = 0;
  
  const btnDrop = document.getElementById('sim6-btn-drop');
  const btnReset = document.getElementById('sim6-btn-reset');
  const statEnergy = document.getElementById('sim6-stat-energy');

  if(btnDrop) {
      btnDrop.addEventListener('click', () => {
        if(state === 'raised') state = 'falling';
      });
  }

  if(btnReset) {
      btnReset.addEventListener('click', () => {
        state = 'raised';
        velocity = 0;
        hammerGroup.position.set(0, 8, 0);
        nailGroup.position.set(0, 3, 0);
        if(statEnergy) statEnergy.innerText = '100% Potential Energy (Stored)';
      });
  }

  function animate() {
    requestAnimationFrame(animate);

    if (state === 'falling') {
      velocity += 0.02; // gravity 
      hammerGroup.position.y -= velocity;
      
      if(statEnergy) statEnergy.innerText = 'Converting to Kinetic Energy...';

      // Hit nail head (nail Group y=3, head is at y=2 local -> 5 global)
      // Hammer head is at center 0 local -> y decreases
      if (hammerGroup.position.y <= 5.5) {
        state = 'driven';
        hammerGroup.position.y = 4.5;
        // drive nail
        nailGroup.position.y = 2; // sinks 1 unit
        if(statEnergy) statEnergy.innerText = 'Work Done! (Nail Driven)';
      }
    }

    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    if(canvas && renderer) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
  });
}
;



// ==========================================
// SIMULATION 7: Ball Drop on Sand (Potential -> Work / Depression)
// ==========================================
export function initSim7() {
  const canvas = document.getElementById('sim7-canvas');
  if(!canvas || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xccfbf1);

  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 5, 12);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 0, 0);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 10, 5);
  scene.add(dirLight);

  // Sand bed
  const sandGeo = new THREE.BoxGeometry(8, 2, 8);
  const sandMat = new THREE.MeshStandardMaterial({ color: 0xd2b48c }); // Sand color
  const sand = new THREE.Mesh(sandGeo, sandMat);
  sand.position.y = -1;
  scene.add(sand);

  // Ball
  const ballGeo = new THREE.SphereGeometry(0.5, 32, 32);
  const ballMat = new THREE.MeshStandardMaterial({ color: 0x115e59, metalness: 0.3, roughness: 0.4 });
  const ball = new THREE.Mesh(ballGeo, ballMat);
  scene.add(ball);

  let state = { height: 2, dropping: false, yVel: 0 };
  ball.position.y = state.height;

  // UI overlay
  const uiDiv = document.createElement('div');
  uiDiv.style.position = 'absolute';
  uiDiv.style.bottom = '10px';
  uiDiv.style.left = '10px';
  uiDiv.style.display = 'flex';
  uiDiv.style.gap = '10px';
  canvas.parentElement.appendChild(uiDiv);

  [1.5, 3, 4.5, 6].forEach((h, i) => { // Scaled heights
    const btn = document.createElement('button');
    btn.innerHTML = 'Drop ' + ['25cm','50cm','1m','1.5m'][i];
    btn.style.padding = '8px 12px';
    btn.style.background = '#0d9488';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.borderRadius = '5px';
    btn.style.cursor = 'pointer';
    btn.onclick = () => {
      state.height = h;
      ball.position.y = h;
      ball.position.x = (i - 1.5) * 1.5; // Spread them out
      state.dropping = true;
      state.yVel = 0;
    };
    uiDiv.appendChild(btn);
  });

  function animate() {
    requestAnimationFrame(animate);
    
    if(state.dropping) {
      state.yVel -= 0.05; // Gravity
      ball.position.y += state.yVel;
      
      const sinkDepth = state.height * 0.15; // Deeper for higher drops
      if(ball.position.y <= 0 - sinkDepth + 0.5) {
        ball.position.y = 0 - sinkDepth + 0.5;
        state.dropping = false;
        // Visual indicator of depth could be added here
      }
    }
    
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

// ==========================================
// SIMULATION 8: Moving Trolley & Wooden Block
// ==========================================
export function initSim8() {
  const canvas = document.getElementById('sim8-canvas');
  if(!canvas || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xfae8ff);

  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 4, 10);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dLight.position.set(5, 10, 5);
  scene.add(dLight);

  // Table
  const table = new THREE.Mesh(new THREE.BoxGeometry(12, 0.5, 4), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
  table.position.y = -0.25;
  scene.add(table);

  // Trolley
  const trolleyGeo = new THREE.BoxGeometry(1.5, 1, 1);
  const trolleyMat = new THREE.MeshStandardMaterial({ color: 0x86198f });
  const trolley = new THREE.Mesh(trolleyGeo, trolleyMat);
  trolley.position.set(-4, 0.5, 0);
  scene.add(trolley);

  // Block
  const blockGeo = new THREE.BoxGeometry(1, 1, 1);
  const blockMat = new THREE.MeshStandardMaterial({ color: 0xc2410c }); // Wooden color
  const block = new THREE.Mesh(blockGeo, blockMat);
  block.position.set(0, 0.5, 0);
  scene.add(block);

  let state = { running: false, mass: 1, vel: 0, blockVel: 0 };

  const uiDiv = document.createElement('div');
  uiDiv.style.position = 'absolute';
  uiDiv.style.bottom = '10px';
  uiDiv.style.left = '10px';
  canvas.parentElement.appendChild(uiDiv);

  const startBtn = document.createElement('button');
  startBtn.innerHTML = 'Add Mass & Release';
  startBtn.style.padding = '8px 12px';
  startBtn.style.background = '#701a75';
  startBtn.style.color = 'white';
  startBtn.style.border = 'none';
  startBtn.style.borderRadius = '5px';
  startBtn.style.cursor = 'pointer';
  uiDiv.appendChild(startBtn);

  startBtn.onclick = () => {
    trolley.position.x = -4;
    block.position.x = 0;
    state.mass += 1;
    if(state.mass > 3) state.mass = 1;
    startBtn.innerHTML = 'Run with Mass = ' + state.mass;
    
    trolley.scale.y = 1 + (state.mass * 0.2); // Visually heavier
    state.vel = state.mass * 0.05 + 0.05;
    state.blockVel = 0;
    state.running = true;
  };

  function animate() {
    requestAnimationFrame(animate);
    
    if(state.running) {
      if(trolley.position.x < -0.75) {
        trolley.position.x += state.vel;
      } else {
        // Collision!
        if(state.blockVel === 0) {
          state.blockVel = state.vel * 0.8; // Transfer energy (less perfect)
        }
        
        let friction = 0.01;
        if(state.blockVel > 0) {
          block.position.x += state.blockVel;
          state.blockVel -= friction;
          if(state.blockVel <= 0) {
            state.blockVel = 0;
            state.running = false;
          }
        }
      }
    }
    
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

// ==========================================
// SIMULATION 9: Mass vs Kinetic Energy (Chapter 2.3)
// ==========================================
export function initSim9() {
  const canvas = document.getElementById('sim9-canvas');
  if(!canvas || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xccfbf1);

  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 5, 12);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  scene.add(new THREE.DirectionalLight(0xffffff, 0.5));

  // Ground
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const uiDiv = document.createElement('div');
  uiDiv.style.position = 'absolute';
  uiDiv.style.bottom = '10px';
  uiDiv.style.left = '50%';
  uiDiv.style.transform = 'translateX(-50%)';
  uiDiv.style.display = 'flex';
  uiDiv.style.gap = '10px';
  canvas.parentElement.appendChild(uiDiv);

  let objects = [];

  [1, 2, 3].forEach((m, i) => {
    // Blocks of different mass
    const geo = new THREE.BoxGeometry(m*0.5, m*0.5, m*0.5);
    const mat = new THREE.MeshStandardMaterial({ color: i === 0 ? 0xef4444 : i===1 ? 0x3b82f6 : 0x10b981 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set((i - 1) * 3, 5, 0);
    scene.add(mesh);
    objects.push({ mesh, mass: m, yVel: 0, dropping: false });

    const btn = document.createElement('button');
    btn.innerHTML = 'Drop Mass ' + m + 'kg';
    btn.style.padding = '8px';
    btn.style.cursor = 'pointer';
    btn.onclick = () => {
      objects[i].mesh.position.y = 5;
      objects[i].yVel = 0;
      objects[i].dropping = true;
    };
    uiDiv.appendChild(btn);
  });

  function animate() {
    requestAnimationFrame(animate);
    
    objects.forEach(obj => {
      if(obj.dropping) {
        obj.yVel -= 0.05; // Constant gravity, same speed for all
        obj.mesh.position.y += obj.yVel;
        
        if(obj.mesh.position.y <= obj.mass*0.25) {
          obj.mesh.position.y = obj.mass*0.25;
          obj.dropping = false;
          
          // Flash effect to show energy impact (bigger flash for bigger mass)
          const flash = new THREE.PointLight(0xffaa00, obj.mass * 2, 5);
          flash.position.copy(obj.mesh.position);
          scene.add(flash);
          setTimeout(() => scene.remove(flash), 150);
        }
      }
    });

    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

// ==========================================
// SIMULATION 10: Velocity vs Kinetic Energy (Chapter 2.3)
// ==========================================
export function initSim10() {
  const canvas = document.getElementById('sim10-canvas');
  if(!canvas || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xfae8ff);

  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 3, 10);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(0, 10, 5);
  scene.add(dirLight);

  // Track
  const track = new THREE.Mesh(new THREE.BoxGeometry(16, 0.2, 2), new THREE.MeshStandardMaterial({ color: 0x64748b }));
  scene.add(track);

  // Car
  const car = new THREE.Mesh(new THREE.BoxGeometry(1, 0.5, 0.5), new THREE.MeshStandardMaterial({ color: 0xd946ef }));
  car.position.set(-6, 0.35, 0);
  scene.add(car);

  const uiDiv = document.createElement('div');
  uiDiv.style.position = 'absolute';
  uiDiv.style.bottom = '10px';
  uiDiv.style.left = '50%';
  uiDiv.style.transform = 'translateX(-50%)';
  uiDiv.style.color = '#701a75';
  uiDiv.style.fontFamily = 'monospace';
  uiDiv.style.textAlign = 'center';
  canvas.parentElement.appendChild(uiDiv);

  let state = { v: 1, running: false, carX: -6 };

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '1';
  slider.max = '5';
  slider.value = '1';
  slider.style.width = '200px';
  
  const vLabel = document.createElement('div');
  vLabel.innerHTML = 'Velocity: ' + state.v + ' m/s | KE ∝ ' + (state.v*state.v);
  
  const goBtn = document.createElement('button');
  goBtn.innerHTML = 'Go!';
  goBtn.style.padding = '5px 15px';
  goBtn.onclick = () => {
    state.carX = -6;
    car.position.x = -6;
    state.running = true;
  };

  slider.oninput = (e) => {
    state.v = parseInt(e.target.value);
    vLabel.innerHTML = 'Velocity: ' + state.v + ' m/s | KE ∝ ' + (state.v*state.v);
  };

  uiDiv.appendChild(slider);
  uiDiv.appendChild(vLabel);
  uiDiv.appendChild(goBtn);

  function animate() {
    requestAnimationFrame(animate);
    
    if(state.running) {
      state.carX += state.v * 0.05;
      car.position.x = state.carX;
      
      if(state.carX > 6) {
        state.running = false;
      }
    }
    
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}
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

    ui.innerHTML = `<div style="margin-bottom:4px;">Total Energy: ${totalE} J</div>
                    <div style="background:#581c87; padding:2px; width: ${pe/4}px; margin-bottom:4px;">PE: ${pe} J</div>
                    <div style="background:#b91c1c; padding:2px; width: ${ke/4}px;">KE: ${Math.round(ke)} J</div>`;

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

    ui.innerHTML = `<div style="margin-bottom:8px; color:#3b82f6; font-weight:bold;">ALEX (Fast) Power: High <br/> Progress: ${(alexProgress*100).toFixed(0)}%</div>
                    <div style="color:#eab308; font-weight:bold;">BEN (Slow) Power: Low <br/> Progress: ${(benProgress*100).toFixed(0)}%</div>`;

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
