const simCode = 

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
