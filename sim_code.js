// ==========================================
// SIMULATION 1: PEBBLE VS WALL
// ==========================================
function initSim1() {
  const canvas1 = document.getElementById('sim1-canvas');
  if(!canvas1) return;
  const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1, antialias: true, alpha: true });
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
  // Grid texture pattern
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

  btnWall.addEventListener('click', () => {
    state = 'pushing_wall';
    targetNode = wall;
    charGroup.position.set(wall.position.x + 4, 0, wall.position.z);
    charGroup.rotation.y = -Math.PI / 2;
  });

  btnPebble.addEventListener('click', () => {
    state = 'pushing_pebble';
    targetNode = pebble;
    charGroup.position.set(pebble.position.x - 3, 0, pebble.position.z);
    charGroup.rotation.y = Math.PI / 2;
    charStartPos = charGroup.position.x;
  });

  btnReset.addEventListener('click', () => {
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
    requestAnimationFrame(animateSim1);

    if (state === 'pushing_wall') {
      forceApplied = Math.min(forceApplied + 5, 200); // Exert 200N
      displacement = 0; // Wall doesn't move
      
      // Char shake
      charGroup.position.x = wall.position.x + 4 + (Math.random() * 0.1 - 0.05);

    } else if (state === 'pushing_pebble') {
      forceApplied = 10; // Exert 10N
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
  
  // Resize handler
  window.addEventListener('resize', () => {
     if(canvas1 && renderer1) {
         camera1.aspect = canvas1.clientWidth / canvas1.clientHeight;
         camera1.updateProjectionMatrix();
         renderer1.setSize(canvas1.clientWidth, canvas1.clientHeight);
     }
  });
}

// ==========================================
// SIMULATION 2: THE PULL ENGINE (Cart)
// ==========================================
function initSim2() {
    const canvas2 = document.getElementById('sim2-canvas');
    if(!canvas2) return;
    const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2, antialias: true, alpha: true });
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
    
    btnPull.addEventListener('mousedown', () => isPulling = true);
    btnPull.addEventListener('mouseup', () => { isPulling = false; force = 0; updateUI();});
    btnPull.addEventListener('mouseleave', () => { isPulling = false; force = 0; updateUI(); });
    
    btnPull.addEventListener('touchstart', (e) => { e.preventDefault(); isPulling = true; });
    btnPull.addEventListener('touchend', (e) => { e.preventDefault(); isPulling = false; force = 0; updateUI();});
  
    btnReset.addEventListener('click', () => {
        isPulling = false;
        force = 0;
        displacement = 0;
        cartGroup.position.x = startX;
        wheel1.rotation.y = 0; wheel2.rotation.y = 0; wheel3.rotation.y = 0; wheel4.rotation.y = 0;
        updateUI();
    });
    
    function updateUI() {
        statForce.innerText = force.toFixed(0) + ' N';
        statDisp.innerText = displacement.toFixed(2) + ' m';
        statWork.innerText = (force * displacement).toFixed(0) + ' J';
    }
  
    function animateSim2() {
      requestAnimationFrame(animateSim2);
  
      if(isPulling && cartGroup.position.x < 20) {
          force = 50; // Constant force when pulling
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
    window.addEventListener('resize', () => {
       if(canvas2 && renderer2) {
           camera2.aspect = canvas2.clientWidth / canvas2.clientHeight;
           camera2.updateProjectionMatrix();
           renderer2.setSize(canvas2.clientWidth, canvas2.clientHeight);
       }
    });
  }


// Initialize Sims after DOM loads
window.addEventListener('DOMContentLoaded', () => {
   initSim1();
   initSim2();
});
// ==========================================
// CLIENT-SIDE ROUTER
// ==========================================
function updateRouter() {
    const views = document.querySelectorAll('.route-view');
    const path = window.location.pathname.replace(/\/$/, '') || window.location.hash.replace(/^#/, '');
    
    // Default route
    let targetId = 'view-chapter-1.1';
    
    if (path.includes('chapter-1.2')) {
        targetId = 'view-chapter-1.2';
    } else if (path.includes('chapter-1.1')) {
        targetId = 'view-chapter-1.1';
    }

    views.forEach(view => {
        if (view.id === targetId) {
            view.classList.remove('hidden');
            view.style.display = 'contents'; // override inline style if any
        } else {
            view.classList.add('hidden');
            view.style.display = 'none'; // override inline style if any
        }
    });

    // Reset scroll when routing
    window.scrollTo(0, 0);
}

// Listen to popstate for pushState navigation and hashchange
window.addEventListener('popstate', updateRouter);
window.addEventListener('hashchange', updateRouter);

// Set initial route
document.addEventListener('DOMContentLoaded', () => {
    updateRouter();
});

// Expose a global navigate function for standard html links (Optional)
window.navigateChapter = (path) => {
    window.history.pushState({}, '', path);
    updateRouter();
};
/ /   = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
 
 / /   F U L L S C R E E N   L O G I C 
 
 / /   = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
 
 c o n s t   f s B t n   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' f u l l s c r e e n - b t n ' ) ; 
 
 i f   ( f s B t n )   { 
 
     f s B t n . a d d E v e n t L i s t e n e r ( ' c l i c k ' ,   ( )   = >   { 
 
         i f   ( ! d o c u m e n t . f u l l s c r e e n E l e m e n t )   { 
 
             d o c u m e n t . d o c u m e n t E l e m e n t . r e q u e s t F u l l s c r e e n ( ) . c a t c h ( e r r   = >   { 
 
                 c o n s o l e . l o g ( ` E r r o r   a t t e m p t i n g   t o   e n a b l e   f u l l - s c r e e n   m o d e :   $ { e r r . m e s s a g e } ` ) ; 
 
             } ) ; 
 
             f s B t n . i n n e r T e x t   =   ' � S"   E x i t   F u l l s c r e e n ' ; 
 
         }   e l s e   { 
 
             d o c u m e n t . e x i t F u l l s c r e e n ( ) ; 
 
             f s B t n . i n n e r T e x t   =   ' � : �   F u l l s c r e e n ' ; 
 
         } 
 
     } ) ; 
 
 } 
 
 
