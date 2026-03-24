import * as THREE from 'three';

export function initBackground() {
    let reqId;


// -------------------------------------------------------------
// 1. SETUP & PERSPECTIVE
// -------------------------------------------------------------
const canvas = document.querySelector("#bg-canvas"); if(!canvas) return;
const scene = new THREE.Scene();

const bgColor = 0xfffcf2; // Watercolor paper bg
scene.background = new THREE.Color(bgColor);

// Push camera further back and use a narrow FOV for that flat architectural sketch look
const camera = new THREE.PerspectiveCamera(22, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.position.set(20, 150, 300); 
camera.lookAt(-10, -5, -40);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// -------------------------------------------------------------
// 2. LIGHTING
// -------------------------------------------------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xfffccf, 1.3);
dirLight.position.set(100, 150, 50);
scene.add(dirLight);

// Add an extra fill light to further brighten shaded areas
const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-100, 50, -50);
scene.add(fillLight);

// -------------------------------------------------------------
// 3. MATERIALS (Clean 3D Style)
// -------------------------------------------------------------

function createInkedMesh(geometry, color) {
  // Keeping function name for compatibility, but removing the "ink" outlines
  const material = new THREE.MeshStandardMaterial({ 
    color: color, 
    roughness: 0.8, 
    metalness: 0.1 
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

const updatableObjects = [];

// -------------------------------------------------------------
// 4. SCENE CONSTRUCTION
// -------------------------------------------------------------

// ==========================================
// A. Background Rolling Hills & Gardens 
// ==========================================
const hillGroup = new THREE.Group();
hillGroup.position.set(0, -60, -220);
scene.add(hillGroup);

const hillColors = [0xa8d070, 0x8cba51, 0x7aab42];
for (let i = 0; i < 4; i++) {
  const hillGeo = new THREE.SphereGeometry(80, 64, 16);
  const hill = createInkedMesh(hillGeo, hillColors[i % 3]);
  hill.position.set(-150 + (i * 100), 0, -i * 10);
  hill.scale.set(1.5, 0.4, 0.8);
  hillGroup.add(hill);
}

// Windmills
function createWindmill(x, y, z, parentGroup = hillGroup) {
  const group = new THREE.Group();
  const baseGeo = new THREE.CylinderGeometry(0.5, 1.5, 25, 8);
  const base = createInkedMesh(baseGeo, 0xf0f0f0);
  base.position.y = 12.5;
  group.add(base);

  const nacelle = createInkedMesh(new THREE.BoxGeometry(2, 2, 3), 0xdfdfdf);
  nacelle.position.set(0, 25, 0);
  group.add(nacelle);

  const bladesGroup = new THREE.Group();
  bladesGroup.position.set(0, 25, 1.5);

  const bladeGeo = new THREE.BoxGeometry(0.5, 14, 0.1);
  for (let i = 0; i < 3; i++) {
    const blade = createInkedMesh(bladeGeo, 0xffffff);
    blade.position.y = 7;
    const pivot = new THREE.Group();
    pivot.rotation.z = (Math.PI * 2 / 3) * i;
    pivot.add(blade);
    bladesGroup.add(pivot);
  }

  group.add(bladesGroup);
  group.position.set(x, y, z);
  parentGroup.add(group);

  updatableObjects.push({
    update: (time) => { bladesGroup.rotation.z -= 0.015; }
  });
}
createWindmill(-120, 25, -20);
createWindmill(-80, 28, -25);
createWindmill(-40, 25, -15);
createWindmill(-10, 22, -10);

// ==========================================
// B. Midground: River, Dam & Boat
// ==========================================
// Base water
const waterGeo = new THREE.BoxGeometry(800, 5, 80);
const waterMaterial = new THREE.MeshStandardMaterial({ 
  color: 0x3a82c4, 
  roughness: 0.1, 
  metalness: 0.2,
  transparent: true,
  opacity: 0.85
});
const waterMesh = new THREE.Mesh(waterGeo, waterMaterial);
waterMesh.position.set(0, -8, -100);
scene.add(waterMesh);

// Add subtle non-inked waves to make water feel real without black outlines
const wavesGroup = new THREE.Group();
wavesGroup.position.set(0, -5.4, -100);
scene.add(wavesGroup);
const waveGeo = new THREE.BoxGeometry(12, 0.1, 0.8);
const waveMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 });
for(let i=0; i<40; i++) {
  const wave = new THREE.Mesh(waveGeo, waveMat);
  wave.position.set(-200 + Math.random() * 400, 0, -30 + Math.random() * 60);
  // store initial X for looping
  wave.userData.startX = wave.position.x;
  wave.userData.speed = 0.2 + Math.random() * 0.4;
  wavesGroup.add(wave);
  
  updatableObjects.push({
    update: () => {
      wave.position.x += wave.userData.speed;
      if (wave.position.x > 200) wave.position.x = -200;
    }
  });
}

// Boat moving across the river
const boatGroup = new THREE.Group();
const hullGeo = new THREE.BoxGeometry(12, 3, 5);
const hull = createInkedMesh(hullGeo, 0x824b33);
boatGroup.add(hull);
const cabinGeo = new THREE.BoxGeometry(6, 4, 3);
const cabin = createInkedMesh(cabinGeo, 0xefefef);
cabin.position.set(-2, 3.5, 0);
boatGroup.add(cabin);

boatGroup.position.set(-150, -5.5, -85);
scene.add(boatGroup);

updatableObjects.push({
  update: () => {
    boatGroup.position.x += 0.25;
    boatGroup.position.y = -5.5 + Math.sin(Date.now() * 0.002) * 0.2; // slight bobbing
    if(boatGroup.position.x > 200) boatGroup.position.x = -200;
  }
});

// Detailed Walking Bridge across the river
const damGroup = new THREE.Group();
// Main path
const walkwayGeo = new THREE.BoxGeometry(180, 2, 8);
const walkway = createInkedMesh(walkwayGeo, 0x8a725d); // Wooden walkway
damGroup.add(walkway);

// Supports and railings
for(let i = -80; i <= 80; i += 16) {
   // Concrete or stone pillar
   const pillar = createInkedMesh(new THREE.BoxGeometry(4, 18, 8.5), 0x7c858d);
   pillar.position.set(i, -6, 0);
   damGroup.add(pillar);

   // Wooden side railing
   if (i < 80) {
      const railL = createInkedMesh(new THREE.BoxGeometry(16, 0.8, 0.8), 0x5a4838);
      railL.position.set(i + 8, 3, 3.5);
      damGroup.add(railL);

      const railR = createInkedMesh(new THREE.BoxGeometry(16, 0.8, 0.8), 0x5a4838);
      railR.position.set(i + 8, 3, -3.5);
      damGroup.add(railR);
   }
}

// Position straight across the river
damGroup.position.set(40, -2, -120);
scene.add(damGroup);

// Riverbank Trees
const treeGeo = new THREE.ConeGeometry(2, 12, 5);
for(let i=0; i<35; i++) {
  const tree = createInkedMesh(treeGeo, 0x1f3c30);
  tree.position.set(-150 + (i*6) + Math.random()*4, -2, -65 + Math.random()*6);
  scene.add(tree);
}

// Solar Panel Component
function createSolarPanel() {
  const panelGroup = new THREE.Group();

  // Concrete stand
  const stand = createInkedMesh(new THREE.BoxGeometry(6, 4, 6), 0x9fa4a8);
  stand.position.y = 2;
  panelGroup.add(stand);

  // Large slanted panel surface (Classic dark blue)
  const panelFace = createInkedMesh(new THREE.BoxGeometry(10, 0.5, 12), 0x1e3f66);
  panelFace.position.set(0, 4.5, 0);
  panelFace.rotation.x = Math.PI / 6;
  panelGroup.add(panelFace);

  return panelGroup;
}

// ==========================================
// C. Foreground Grids (Solar Panels & Farms)
// ==========================================
const groundGeo = new THREE.BoxGeometry(450, 10, 150);
const groundMesh = createInkedMesh(groundGeo, 0xaccc7a);
groundMesh.position.set(-100, -12, 10);
scene.add(groundMesh);

// Create beautiful raised dirt beds with white/gray rim
function createFarmBed() {
  const bedGroup = new THREE.Group();
  const border = createInkedMesh(new THREE.BoxGeometry(10, 2, 10), 0xdbe2e8);
  bedGroup.add(border);
  const dirt = createInkedMesh(new THREE.BoxGeometry(8, 2.2, 8), 0x7c5a3d);
  bedGroup.add(dirt);
  return bedGroup;
}

const gridStartX = -180;
const gridStartZ = -15;
for (let row = 0; row < 5; row++) {
  for (let col = 0; col < 12; col++) {
    const px = gridStartX + (col * 14);
    const pz = gridStartZ + (row * 14);
    
    if (col < 5) {
      // Left side: Dark blue Solar Panels
      const panel = createSolarPanel();
      panel.position.set(px, -7, pz);
      scene.add(panel);
    } else if (col >= 6) {
      // Right side: Farm Beds
      const bed = createFarmBed();
      bed.position.set(px, -6, pz);
      scene.add(bed);
    }
  }
}

// ==========================================
// HUMAN / CHARACTER ENGINE
// ==========================================
function createHumanoid(skinColor, shirtColor, pantsColor, isFarmer=false) {
  const personGroup = new THREE.Group();
  
  // Pivot helper for limbs
  const createLimb = (geom, color, yOffset) => {
      const pivot = new THREE.Group();
      const mesh = createInkedMesh(geom, color);
      mesh.position.y = -yOffset;
      pivot.add(mesh);
      return pivot;
  };

  // Hips at Y=1.4
  const torsoGeo = new THREE.BoxGeometry(1.2, 1.8, 0.8);
  const torso = createInkedMesh(torsoGeo, shirtColor);
  torso.position.y = 2.3; // Center of Torso
  personGroup.add(torso);

  // Head at Y=3.6
  const headGeo = new THREE.SphereGeometry(0.5, 12, 12);
  const head = createInkedMesh(headGeo, skinColor);
  head.position.y = 3.6;
  personGroup.add(head);

  // Farmer Straw Hat 
  if(isFarmer) {
      const brim = createInkedMesh(new THREE.CylinderGeometry(1.0, 1.0, 0.1, 16), 0xe8c37d);
      brim.position.y = 4.0;
      personGroup.add(brim);
      const crown = createInkedMesh(new THREE.CylinderGeometry(0.6, 0.6, 0.4, 16), 0xe8c37d);
      crown.position.y = 4.2;
      personGroup.add(crown);
  }

  // Legs attached at Y=1.4
  const legL = createLimb(new THREE.BoxGeometry(0.5, 1.6, 0.5), pantsColor, 0.8);
  legL.position.set(-0.35, 1.4, 0);
  personGroup.add(legL);

  const legR = createLimb(new THREE.BoxGeometry(0.5, 1.6, 0.5), pantsColor, 0.8);
  legR.position.set(0.35, 1.4, 0);
  personGroup.add(legR);

  // Arms attached at Y=3.0
  const armL = createLimb(new THREE.BoxGeometry(0.4, 1.5, 0.4), skinColor, 0.75);
  armL.position.set(-0.8, 3.0, 0);
  personGroup.add(armL);

  const armR = createLimb(new THREE.BoxGeometry(0.4, 1.5, 0.4), skinColor, 0.75);
  armR.position.set(0.8, 3.0, 0);
  personGroup.add(armR);

  // Provide animation hooks on the object itself
  personGroup.userData = { legL, legR, armL, armR, torso };
  
  return personGroup;
}

// ----------------------------------------
// Spawn ONLY 4 Farmers & Make them Roam
// ----------------------------------------
const farmers = [];
const farmerColors = [
    {shirt: 0x824242, pants: 0x2f4c6e}, // Red shirt, blue overalls
    {shirt: 0x3d7068, pants: 0x47392e}, // Green shirt, brown pants
    {shirt: 0xbd9155, pants: 0x223547}, // Yellow shirt, blue pants
    {shirt: 0x6e8aab, pants: 0x54473b}  // Blue shirt, brown pants
];

// Drop them in 4 distinct farm bed locations
const farmerSpots = [
    {x: -96, z: -1}, {x: -68, z: 13}, {x: -40, z: -1}, {x: -26, z: 27}
];

for(let i = 0; i < 4; i++) {
   const farmer = createHumanoid(0xfcae91, farmerColors[i].shirt, farmerColors[i].pants, true);
   
   // The dirt floor is at y = -5
   farmer.position.set(farmerSpots[i].x, -5, farmerSpots[i].z);
   scene.add(farmer);

   // Animation Parameters
   const speed = 0.0008 + Math.random() * 0.0004;
   const radiusX = 2 + Math.random();
   const radiusZ = 2 + Math.random();
   const offset = Math.random() * 100;
   const startX = farmer.position.x;
   const startZ = farmer.position.z;

   updatableObjects.push({
      update: (time) => {
         const t = time * speed + offset;
         
         // Roam in a circle inside the farm bed
         const dx = Math.cos(t) * radiusX;
         const dz = Math.sin(t) * radiusZ;
         farmer.position.x = startX + dx;
         farmer.position.z = startZ + dz;
         
         // Orient them in the direction of movement
         farmer.rotation.y = -Math.atan2(dz, dx);

         // Walking cycle
         const walkCycle = Math.sin(time * speed * 6);
         farmer.userData.legL.rotation.x = walkCycle * 0.5;
         farmer.userData.legR.rotation.x = -walkCycle * 0.5;
         farmer.userData.armL.rotation.x = -walkCycle * 0.3;
         farmer.userData.armR.rotation.x = walkCycle * 0.3;

         // Bobbing slightly
         farmer.position.y = -5 + Math.abs(walkCycle) * 0.1;
      }
   });
}

// ==========================================
// F. Right side Balcony & 2 Observers
// ==========================================
// Giant Purple Base Balcony
const balcony = createInkedMesh(new THREE.CylinderGeometry(45, 45, 40, 32), 0x6e5c82);
balcony.position.set(80, -15, 60);
scene.add(balcony);

// Wild plants on Balcony
for(let i=0; i<30; i++) {
  const leaf = createInkedMesh(new THREE.ConeGeometry(0.6, 12, 4), 0x1f3c30);
  leaf.position.set(65 + Math.random()*25, 8, 45 + Math.random()*25);
  leaf.rotation.x = (Math.random() - 0.5) * 1.5;
  leaf.rotation.z = (Math.random() - 0.5) * 1.5;
  scene.add(leaf);
}

// Observer 1 (Student with Backpack, Navy Hoodie, Jeans)
const observer1 = createHumanoid(0xffe0bd, 0x3b5998, 0x354259, true); // Light/White skin, Navy hoodie, Denim
observer1.position.set(44, 5, 50); // Exact height of balcony top
observer1.rotation.y = -Math.PI / 4; // Looking out at farm

// Setup walk path for observer 1
const path1 = [
  new THREE.Vector3(44, 5, 50),
  new THREE.Vector3(60, 5, 50),
  new THREE.Vector3(60, 5, 65),
  new THREE.Vector3(44, 5, 65)
];
let targetIndex1 = 1;
let speed1 = 0.03;
updatableObjects.push({
  update: (time) => {
    const target = path1[targetIndex1];
    const dx = target.x - observer1.position.x;
    const dz = target.z - observer1.position.z;
    const dist = Math.sqrt(dx*dx + dz*dz);
    
    if (dist < 0.5) {
      targetIndex1 = (targetIndex1 + 1) % path1.length;
    } else {
      observer1.position.x += (dx / dist) * speed1 * 1.5;
      observer1.position.z += (dz / dist) * speed1 * 1.5;
      observer1.rotation.y = Math.atan2(dx, dz);
      
      const walkCycle = Math.sin(time * 0.005);
      observer1.userData.legL.rotation.x = walkCycle * 0.5;
      observer1.userData.legR.rotation.x = -walkCycle * 0.5;
      observer1.userData.armL.rotation.x = -walkCycle * 0.3;
      observer1.userData.armR.rotation.x = walkCycle * 0.3;
    }
  }
});

// Student details: Backpack
const backpack1 = createInkedMesh(new THREE.BoxGeometry(0.9, 1.2, 0.6), 0x222222);
backpack1.position.set(0, 2.3, -0.6); // Back of torso
observer1.add(backpack1);

// Student details: Hair
const hair1 = createInkedMesh(new THREE.BoxGeometry(1.1, 0.4, 1.1), 0x3e2723);
hair1.position.set(0, 3.9, 0);
observer1.add(hair1);

// Student details: White sneakers
const shoe1L = createInkedMesh(new THREE.BoxGeometry(0.52, 0.3, 0.7), 0xffffff);
shoe1L.position.set(0, -1.6, 0.1);
observer1.userData.legL.add(shoe1L);
const shoe1R = createInkedMesh(new THREE.BoxGeometry(0.52, 0.3, 0.7), 0xffffff);
shoe1R.position.set(0, -1.6, 0.1);
observer1.userData.legR.add(shoe1R);

scene.add(observer1);

// Observer 2 (Student in Maroon college sweater, Khakis, Side bag)
const observer2 = createHumanoid(0xffe0bd, 0x8c2a3e, 0xc2a67a, true); // Light/White skin, Maroon, Khaki
observer2.position.set(40, 5, 56);
observer2.rotation.y = -Math.PI / 5 + 0.2;

// Setup walk path for observer 2
const path2 = [
  new THREE.Vector3(40, 5, 56),
  new THREE.Vector3(40, 5, 75),
  new THREE.Vector3(70, 5, 75),
  new THREE.Vector3(70, 5, 56)
];
let targetIndex2 = 1;
let speed2 = 0.025;
updatableObjects.push({
  update: (time) => {
    const target = path2[targetIndex2];
    const dx = target.x - observer2.position.x;
    const dz = target.z - observer2.position.z;
    const dist = Math.sqrt(dx*dx + dz*dz);

    if (dist < 0.5) {
      targetIndex2 = (targetIndex2 + 1) % path2.length;
    } else {
      observer2.position.x += (dx / dist) * speed2 * 1.5;
      observer2.position.z += (dz / dist) * speed2 * 1.5;
      observer2.rotation.y = Math.atan2(dx, dz);

      const walkCycle = Math.sin(time * 0.005);
      observer2.userData.legL.rotation.x = walkCycle * 0.5;
      observer2.userData.legR.rotation.x = -walkCycle * 0.5;
      observer2.userData.armL.rotation.x = -walkCycle * 0.3;
      observer2.userData.armR.rotation.x = walkCycle * 0.3;
    }
  }
}); 

// Student details: Messenger bag
const bag2 = createInkedMesh(new THREE.BoxGeometry(0.4, 0.8, 1.0), 0x3d2b1f);
bag2.position.set(0.8, 1.7, 0);
observer2.add(bag2);
const strap2 = createInkedMesh(new THREE.BoxGeometry(0.1, 1.7, 1.1), 0x3d2b1f);
strap2.position.set(0.4, 2.2, 0);
strap2.rotation.z = Math.PI / 6;
observer2.add(strap2);

// Student details: Hair
const hair2 = createInkedMesh(new THREE.BoxGeometry(1.1, 0.5, 1.1), 0xd4a559); // Blondish/Brown
hair2.position.set(0, 3.9, 0);
observer2.add(hair2);

// Student details: Brown casual shoes
const shoe2L = createInkedMesh(new THREE.BoxGeometry(0.52, 0.3, 0.7), 0x3d2b1f);
shoe2L.position.set(0, -1.6, 0.1);
observer2.userData.legL.add(shoe2L);
const shoe2R = createInkedMesh(new THREE.BoxGeometry(0.52, 0.3, 0.7), 0x3d2b1f);
shoe2R.position.set(0, -1.6, 0.1);
observer2.userData.legR.add(shoe2R);

scene.add(observer2);


  function createHut(x, y, z) {
    const hutGroup = new THREE.Group();
    
    // Walls
    const wallsGeo = new THREE.BoxGeometry(8, 8, 10);
    const walls = createInkedMesh(wallsGeo, 0xeeddcc); // Warm stucco/tan
    walls.position.y = 4;
    hutGroup.add(walls);

    // Roof (Pyramid style out of a 4-segment cone)
    const roofGeo = new THREE.ConeGeometry(7.5, 6, 4);
    const roof = createInkedMesh(roofGeo, 0xa55145); // Terracotta reddish brown
    roof.position.y = 11;
    roof.rotation.y = Math.PI / 4; // Align square base to walls
    hutGroup.add(roof);

    // Door
    const doorGeo = new THREE.BoxGeometry(3, 5, 0.5);
    const door = createInkedMesh(doorGeo, 0x5c4033);
    door.position.set(0, 2.5, 5);
    hutGroup.add(door);

    hutGroup.position.set(x, y, z);
    scene.add(hutGroup);
  }

  // Windmills near the farm side
  createWindmill(50, -5, 5, scene);
  createWindmill(30, -5, -15, scene);
  createWindmill(75, -5, -5, scene);

  // A small farm hut (Moved behind the farms towards the river)
  createHut(-50, -5, -35);


// ==========================================
// D. Steel Truss Track & Beautiful Train
// ==========================================
const steelBridgeGroup = new THREE.Group();
steelBridgeGroup.position.set(-50, -7, 50);
scene.add(steelBridgeGroup);

// Main Bridge Rails
const topRail = createInkedMesh(new THREE.BoxGeometry(300, 1, 4), 0x7a838a);    
topRail.position.y = 2;
steelBridgeGroup.add(topRail);

const bottomRail = createInkedMesh(new THREE.BoxGeometry(300, 1, 4), 0x606970); 
bottomRail.position.y = -2;
steelBridgeGroup.add(bottomRail);

for(let i=-140; i<140; i+=10) {
    const pillar = createInkedMesh(new THREE.BoxGeometry(1, 4, 3.8), 0x474e54); 
    pillar.position.set(i, 0, 0);
    steelBridgeGroup.add(pillar);

    // Diagonal strut
    const diagonal = createInkedMesh(new THREE.BoxGeometry(1, 10, 1), 0x545c63);
    diagonal.position.set(i + 5, 0, 1.8);
    diagonal.rotation.z = Math.PI / 4;
    steelBridgeGroup.add(diagonal);
}

// Actually Mutli-Car Train
const myTrain = new THREE.Group();
steelBridgeGroup.add(myTrain);
myTrain.position.set(-150, 4.5, 0);

function createTrainCar(isFront, isBack) {
    const carGroup = new THREE.Group();
    const bodyGeo = new THREE.BoxGeometry(18, 4, 4.2);
    const body = createInkedMesh(bodyGeo, 0xffffff);
    carGroup.add(body);

    const window = createInkedMesh(new THREE.BoxGeometry(18.2, 1.5, 4.3), 0x112233);
    window.position.y = 0.5;
    carGroup.add(window);

    if(isFront || isBack) {
        const noseGeo = new THREE.CylinderGeometry(2.1, 2.1, 4, 16);
        const nose = createInkedMesh(noseGeo, 0xffffff);
        nose.rotation.x = Math.PI / 2;
        nose.position.set(isFront ? 9 : -9, 0, 0);
        carGroup.add(nose);
        
        const noseWindow = createInkedMesh(new THREE.CylinderGeometry(2.15, 2.15, 1.5, 16), 0x112233);
        noseWindow.rotation.x = Math.PI / 2;
        noseWindow.position.set(isFront ? 9 : -9, 0.5, 0);
        carGroup.add(noseWindow);
    }
    return carGroup;
}

const car1 = createTrainCar(true, false);
car1.position.x = 20;
myTrain.add(car1);

const car2 = createTrainCar(false, false);
car2.position.x = 0;
myTrain.add(car2);

const car3 = createTrainCar(false, true);
car3.position.x = -20;
myTrain.add(car3);

updatableObjects.push({
  update: () => {
    myTrain.position.x += 0.35;
    if(myTrain.position.x > 180) myTrain.position.x = -180; 
  }
});


// -------------------------------------------------------------
// 5. INTERACTION & ANIMATION LOOP
// -------------------------------------------------------------
let mouseX = 0;
let mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX - windowHalfX);
  mouseY = (event.clientY - windowHalfY);
});

let aid; function animate() { reqId = requestAnimationFrame(animate);
  const time = performance.now();

  const targetX = mouseX * 0.04;
  const targetY = mouseY * 0.02;

  camera.position.x += (20 + targetX - camera.position.x) * 0.05;
  const constrainedTargetY = Math.max(90, 150 - targetY);
  camera.position.y += (constrainedTargetY - camera.position.y) * 0.05;
  
  camera.lookAt(-10, -5, -40); 

  updatableObjects.forEach(obj => obj.update(time));

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
    return () => {
        if(reqId) cancelAnimationFrame(reqId);
        if(renderer) renderer.dispose();
    };
}
