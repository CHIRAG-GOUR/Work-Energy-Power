const fs = require('fs');

const codeToAppend = `
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
`;

let text = fs.readFileSync('src/lib/simulations.js', 'utf8');
text += codeToAppend;
fs.writeFileSync('src/lib/simulations.js', text);
console.log('Appended initSim4');