import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const RiderModel = ({ pedalAngle }) => {
    // Load Xbot from three.js examples
    const { scene, nodes } = useGLTF('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Xbot.glb');

    useEffect(() => {
        if (!scene || !nodes) return;
        
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                // Add color to the rider - giving them a bright cycling suit
                if (child.material) {
                    const newMat = child.material.clone();
                    
                    // Xbot typically has 'Alpha_Surface' and 'Alpha_Joints'
                    if (child.name.includes('Joints')) {
                        newMat.color = new THREE.Color("#1e293b"); // Dark joints like athletic wear
                        newMat.roughness = 0.8;
                        newMat.metalness = 0.1;
                    } else {
                        // The main body surface - color it like a cycling jersey/pants
                        newMat.color = new THREE.Color("#f59e0b"); // Bright Yellow/Amber cycling suit
                        newMat.roughness = 0.7;
                        newMat.metalness = 0.1;
                    }
                    
                    // Reset emissive for normal look
                    newMat.emissive = new THREE.Color("#000000"); 
                    child.material = newMat;
                }
            }
        });

        // Correct the root positioning and set static upper body posture (bending forward to handlebars)
        if (nodes.mixamorigRightLeg) {
            scene.rotation.y = Math.PI / 2; // Face forward
            
            // Bend spine forward
            if (nodes.mixamorigSpine) nodes.mixamorigSpine.rotation.x = Math.PI / 6;
            if (nodes.mixamorigSpine1) nodes.mixamorigSpine1.rotation.x = Math.PI / 8;
            if (nodes.mixamorigSpine2) nodes.mixamorigSpine2.rotation.x = Math.PI / 16;
            if (nodes.mixamorigNeck) nodes.mixamorigNeck.rotation.x = -Math.PI / 4; // Look up
            
            // Shoulders slightly forward
            if (nodes.mixamorigLeftShoulder) nodes.mixamorigLeftShoulder.rotation.set(0.4, 0, -0.4);
            if (nodes.mixamorigRightShoulder) nodes.mixamorigRightShoulder.rotation.set(0.4, 0, 0.4);

            // Grab Handlebars - Left Arm (Less downward bend to reach higher handlebars, slightly wider)
            if (nodes.mixamorigLeftArm) {
                nodes.mixamorigLeftArm.rotation.set(1.4, -0.4, 0.5);
            }
            if (nodes.mixamorigLeftForeArm) {
                nodes.mixamorigLeftForeArm.rotation.set(-0.3, 0, 0.4);
            }
            if (nodes.mixamorigLeftHand) nodes.mixamorigLeftHand.rotation.set(-0.2, -0.2, 0);

            // Grab Handlebars - Right Arm (Symmetric mapping, slightly wider)
            if (nodes.mixamorigRightArm) {
                nodes.mixamorigRightArm.rotation.set(1.4, 0.4, -0.5);
            }
            if (nodes.mixamorigRightForeArm) {
                nodes.mixamorigRightForeArm.rotation.set(-0.3, 0, -0.4);
            }
            if (nodes.mixamorigRightHand) nodes.mixamorigRightHand.rotation.set(-0.2, 0.2, 0);
        }
    }, [scene, nodes]);

    useFrame(() => {
        if (!nodes || !nodes.mixamorigLeftUpLeg) return;
        
        // Procedurally animate legs based on the pedal crank angle
        const crankR = 0.25; 
        
        // Left Leg IK approx
        // Reverse pedalAngle to fix backward pedaling appearance
        const leftAng = -pedalAngle.current - Math.PI / 4;
        const lX = Math.cos(leftAng);
        const lY = Math.sin(leftAng);
        
        if (nodes.mixamorigLeftUpLeg) nodes.mixamorigLeftUpLeg.rotation.x = -Math.PI / 4 + lY * 0.4;
        if (nodes.mixamorigLeftLeg) nodes.mixamorigLeftLeg.rotation.x = Math.PI / 3 - lX * 0.3 + lY * 0.2;
        if (nodes.mixamorigLeftFoot) nodes.mixamorigLeftFoot.rotation.x = -0.1;

        // Right Leg IK approx (180 degrees offset)
        const rightAng = -pedalAngle.current - Math.PI / 4 + Math.PI;
        const rX = Math.cos(rightAng);
        const rY = Math.sin(rightAng);
        
        if (nodes.mixamorigRightUpLeg) nodes.mixamorigRightUpLeg.rotation.x = -Math.PI / 4 + rY * 0.4;
        if (nodes.mixamorigRightLeg) nodes.mixamorigRightLeg.rotation.x = Math.PI / 3 - rX * 0.3 + rY * 0.2;
        if (nodes.mixamorigRightFoot) nodes.mixamorigRightFoot.rotation.x = -0.1;
    });

    // Position rider over seat and scale bigger relative to the adjusted 0.7x cycle scale
    return <primitive object={scene} position={[-0.3, 0.08, 0]} scale={1.25} />;
};

// Preload to ensure Xbot is cached
useGLTF.preload('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Xbot.glb');

const BikeGenerator = ({ force, velocity, isGenerating }) => {
    const rearWheelRef = useRef();
    const frontWheelRef = useRef();
    const pedalGroupRef = useRef();
    const lightMaterialRef = useRef();
    const pointLightRef = useRef();
    
    // Human limbs references removed to use RiderModel
    
    const maxPower = 200 * 15; // 3000W
    const currentPower = isGenerating ? force * velocity : 0;
    
    const visualSpeed = useRef(0);
    const visualIntensity = useRef(0);
    const pedalAngle = useRef(0);

    useFrame((state, delta) => {
        const targetSpeed = isGenerating ? velocity : 0;
        const targetIntensity = (currentPower / maxPower) * 15;

        visualSpeed.current = THREE.MathUtils.lerp(visualSpeed.current, targetSpeed, delta * 2);
        visualIntensity.current = THREE.MathUtils.lerp(visualIntensity.current, targetIntensity, delta * 3);

        const rotDelta = visualSpeed.current * delta * 1.5;
        pedalAngle.current -= rotDelta;

        if (rearWheelRef.current) rearWheelRef.current.rotation.z -= rotDelta * 1.5; 
        if (frontWheelRef.current) frontWheelRef.current.rotation.z -= rotDelta * 1.5; 
        
        if (pedalGroupRef.current) {
            pedalGroupRef.current.rotation.z = pedalAngle.current; 
        }

        // Rider Model handles legs now in its own useFrame

        if (lightMaterialRef.current) {
            lightMaterialRef.current.emissiveIntensity = visualIntensity.current;
            lightMaterialRef.current.emissive = new THREE.Color(
                visualIntensity.current > 5 ? 0xffffff : 0xffaa00
            );
        }
        if (pointLightRef.current) {
            pointLightRef.current.intensity = visualIntensity.current * 4; // Make significantly brighter for the road
            pointLightRef.current.color = new THREE.Color(
                visualIntensity.current > 5 ? 0xffffff : 0xffaa00
            );
        }
    });

    return (
        // Lowered group to match the road surface exactly (-0.89 road height)
        <group position={[0, -0.6, 0]}>
            {/* The Bicycle */}
            <group position={[-0.5, 0, 0]} scale={0.7}>
                
                {/* Wheels */}
                {[
                    { ref: rearWheelRef, pos: [-1, 0.1, 0] },
                    { ref: frontWheelRef, pos: [1, 0.1, 0] }
                ].map((wheel, index) => (
                    <group ref={wheel.ref} position={wheel.pos} key={index}>
                        <mesh castShadow receiveShadow>
                            <torusGeometry args={[0.5, 0.05, 16, 64]} />
                            <meshBasicMaterial color="#000000" />
                        </mesh>
                        <mesh castShadow receiveShadow>
                            <torusGeometry args={[0.45, 0.02, 16, 64]} />
                            <meshBasicMaterial color="#000000" />
                        </mesh>
                        {/* Spokes */}
                        {[0, 1, 2, 3].map(i => (
                            <mesh key={i} rotation={[0, 0, (Math.PI / 4) * i]} receiveShadow>
                                <boxGeometry args={[0.9, 0.02, 0.01]} />
                                <meshBasicMaterial color="#000000" />
                            </mesh>
                        ))}
                    </group>
                ))}

                {/* Bike Frame */}
                {/* Silhouette Frame */}
                <Line points={[[-1, 0.1, 0], [0, 0.1, 0], [-0.3, 0.9, 0], [0.7, 0.9, 0], [0, 0.1, 0]]} color="#000000" lineWidth={10} visible={true} />
                <Line points={[[-1, 0.1, 0], [-0.3, 0.9, 0]]} color="#000000" lineWidth={10} visible={true} />
                {/* Front fork */}
                <Line points={[[0.7, 0.9, 0], [1, 0.1, 0]]} color="#000000" lineWidth={8} visible={true} />
                <Line points={[[0.65, 1.65, 0], [0.7, 0.9, 0]]} color="#000000" lineWidth={8} visible={true} /> {/* Stem raised taller and moved forward */}
                <Line points={[[-0.3, 0.9, 0], [-0.35, 1.1, 0]]} color="#000000" lineWidth={10} visible={true} /> {/* Seat post */}

                {/* Seat */}
                <mesh position={[-0.35, 1.1, 0]} castShadow receiveShadow>
                    <boxGeometry args={[0.3, 0.1, 0.15]} />
                    <meshBasicMaterial color="#000000" />
                </mesh>

                {/* Handlebars (Moved Up to reach hands, made wider) */}
                <mesh position={[0.65, 1.65, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.03, 0.03, 0.9]} />
                    <meshBasicMaterial color="#000000" />
                </mesh>

                {/* Proper Headlight Mounted on Handlebars - Visible from all sides */}
                <group position={[0.75, 1.65, 0]}>
                    <mesh rotation={[0, 0, -Math.PI / 2]} castShadow receiveShadow>
                        <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
                        <meshBasicMaterial color="#000000" />
                    </mesh>
                    {/* Glowing Bulb - Sphere so it is visible from the sides */}
                    <mesh position={[0.05, 0, 0]} castShadow>
                        <sphereGeometry args={[0.09, 16, 16]} />
                        <meshStandardMaterial ref={lightMaterialRef} color="#ffffff" emissive="#000000" />
                    </mesh>
                    {/* Generates bright light outward to illumninate the road and area */}
                    <pointLight ref={pointLightRef} position={[0.5, -0.5, 0]} intensity={0} decay={1.2} distance={30} castShadow />
                </group>

                {/* Pedals & Crank Axis */}
                <group position={[0, 0.1, 0]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
                        <cylinderGeometry args={[0.08, 0.08, 0.35]} />
                        <meshBasicMaterial color="#000000" />
                    </mesh>
                    <group ref={pedalGroupRef}>
                        <mesh position={[0, 0, 0.2]} rotation={[0, 0, Math.PI / 4]} castShadow receiveShadow>
                            <boxGeometry args={[0.5, 0.04, 0.02]} />
                            <meshBasicMaterial color="#000000" />
                        </mesh>
                        <mesh position={[0, 0, -0.2]} rotation={[0, 0, Math.PI / 4]} castShadow receiveShadow>
                            <boxGeometry args={[0.5, 0.04, 0.02]} />
                            <meshBasicMaterial color="#000000" />
                        </mesh>
                        {/* Left Pedal */}
                        <group position={[-0.18, 0.18, 0.25]}>
                            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
                                <boxGeometry args={[0.12, 0.08, 0.02]} />
                                <meshBasicMaterial color="#000000" />
                            </mesh>
                        </group>
                        {/* Right Pedal */}
                        <group position={[0.18, -0.18, -0.25]}>
                            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
                                <boxGeometry args={[0.12, 0.08, 0.02]} />
                                <meshBasicMaterial color="#000000" />
                            </mesh>
                        </group>
                    </group>
                </group>

                {/* The Human Rider Model (Replaces Old Silhouette) */}
                <RiderModel pedalAngle={pedalAngle} />
            </group>
        </group>
    );
};

// Moving environment to simulate riding
const MovingEnvironment = ({ velocity, isGenerating }) => {
    const roadRef = useRef();
    const treesRef = useRef();
    const lampsRef = useRef();

    useFrame((state, delta) => {
        const speed = isGenerating ? velocity * delta * 2 : 0;
        
        // Move road texture (dashed lines)
        if (roadRef.current) {
            roadRef.current.position.x -= speed;
            if (roadRef.current.position.x < -10) {
                roadRef.current.position.x += 10;
            }
        }

        // Scroll Trees
        if (treesRef.current) {
            treesRef.current.position.x -= speed;
            if (treesRef.current.position.x < -15) {
                treesRef.current.position.x += 15;
            }
        }

        // Scroll lamps
        if (lampsRef.current) {
            lampsRef.current.position.x -= speed;
            if (lampsRef.current.position.x < -20) {
                lampsRef.current.position.x += 20;
            }
        }
    });

    return (
        <group>
            {/* Road Surface */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.89, 0]} receiveShadow>
                <planeGeometry args={[50, 4]} />
                <meshStandardMaterial color="#0f172a" roughness={0.9} />
            </mesh>
            
            {/* Dashed Road Lines */}
            <group ref={roadRef} position={[0, -0.88, 0]}>
                {Array.from({ length: 20 }).map((_, i) => (
                    <mesh key={`line-${i}`} position={[-15 + i * 2, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[1, 0.1]} />
                        <meshBasicMaterial color="#cbd5e1" opacity={0.4} transparent />
                    </mesh>
                ))}
            </group>

            {/* Grass/Terrain edges */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, -8]} receiveShadow>
                <planeGeometry args={[50, 16]} />
                <meshStandardMaterial color="#064e3b" roughness={0.8} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 8]} receiveShadow>
                <planeGeometry args={[50, 16]} />
                <meshStandardMaterial color="#064e3b" roughness={0.8} />
            </mesh>

            {/* Ambient and Additional lighting for visibility */}
            <ambientLight intensity={1.5} color="#e0e7ff" />
            <directionalLight position={[10, 20, 15]} intensity={2.5} color="#ffffff" castShadow shadow-bias={-0.0001} />
            <directionalLight position={[-10, 10, -10]} intensity={1} color="#60a5fa" />

            {/* Moving Trees Background - Now visible as trees */}
            <group ref={treesRef}>
                {Array.from({ length: 30 }).map((_, i) => {
                    const zSpace = i % 2 === 0 ? -4 - Math.random() * 4 : 4 + Math.random() * 4;
                    return (
                        <group key={`tree-${i}`} position={[-20 + i * 3, -0.9, zSpace]}>
                            {/* Trunk */}
                            <mesh position={[0, 0.5, 0]}>
                                <cylinderGeometry args={[0.2, 0.2, 1]} />
                                <meshStandardMaterial color="#78350f" roughness={0.9} />
                            </mesh>
                            {/* Leaves */}
                            <mesh position={[0, 2, 0]}>
                                <coneGeometry args={[1.5, 3.5, 8]} />
                                <meshStandardMaterial color="#065f46" roughness={0.8} />
                            </mesh>
                        </group>
                    );
                })}
            </group>
            
            {/* Dim Streetlights passing by */}
            <group ref={lampsRef}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <group key={`lamp-${i}`} position={[-25 + i * 15, -0.9, -3.5]}>
                        {/* Pole */}
                        <mesh position={[0, 3, 0]}>
                            <cylinderGeometry args={[0.05, 0.1, 6]} />
                            <meshStandardMaterial color="#334155" />
                        </mesh>
                        {/* Arm */}
                        <mesh position={[0.5, 5.9, 0]} rotation={[0, 0, Math.PI / 2]}>
                            <cylinderGeometry args={[0.04, 0.04, 1.5]} />
                            <meshStandardMaterial color="#334155" />
                        </mesh>
                        {/* Dim Bulb */}
                        <mesh position={[1.2, 5.8, 0]}>
                            <sphereGeometry args={[0.1]} />
                            <meshStandardMaterial color="#e0f2fe" emissive="#e0f2fe" emissiveIntensity={0.4} />
                        </mesh>
                        {/* Very weak glow downwards */}
                        <pointLight position={[1.2, 5.6, 0]} intensity={0.5} distance={12} color="#e0f2fe" decay={2} />
                    </group>
                ))}
            </group>

            {/* Distant Mountains (Static Silhouette -> Visible) */}
            <group position={[0, -0.9, -15]}>
                <mesh position={[-15, 6, -5]}>
                    <coneGeometry args={[10, 16, 8]} />
                    <meshStandardMaterial color="#0f172a" roughness={1} />
                </mesh>
                <mesh position={[5, 8, -8]}>
                    <coneGeometry args={[14, 20, 8]} />
                    <meshStandardMaterial color="#1e293b" roughness={1} />
                </mesh>
                <mesh position={[20, 4, -4]}>
                    <coneGeometry args={[8, 10, 8]} />
                    <meshStandardMaterial color="#0f172a" roughness={1} />
                </mesh>
            </group>        </group>
    );
};

export default function SimCyclist3DContainer() {
    const [force, setForce] = useState(50); // N
    const [velocity, setVelocity] = useState(5); // m/s
    const [isGenerating, setIsGenerating] = useState(false);

    const targetPower = force * velocity; // Watts

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '2rem', background: '#020617', padding: '2rem', borderRadius: '1.5rem', color: 'white', border: '4px solid #0284c7', marginTop: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ margin: 0, color: '#bae6fd', fontSize: '1.8rem' }}>2. The Mechanical Generator</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>Generate power continuously! P = Force &times; Velocity. Start the pedals in the dark night to light up the path!</p>
                
                <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #1e293b' }}>
                    <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        <span>Pedal Force (N)</span>
                        <span style={{ color: '#f87171' }}>{force} N</span>
                    </label>
                    <input type="range" min="10" max="200" step="5" value={force} onChange={e => setForce(Number(e.target.value))} disabled={isGenerating} style={{ width: '100%', accentColor: '#f87171' }} />
                </div>

                <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #1e293b' }}>
                    <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        <span>Cycling Velocity (m/s)</span>
                        <span style={{ color: '#38bdf8' }}>{velocity} m/s</span>
                    </label>
                    <input type="range" min="1" max="15" step="1" value={velocity} onChange={e => setVelocity(Number(e.target.value))} disabled={isGenerating} style={{ width: '100%', accentColor: '#38bdf8' }} />
                </div>

                <button 
                    onClick={() => setIsGenerating(!isGenerating)} 
                    style={{ padding: '1rem', fontSize: '1.2rem', fontWeight: 'bold', background: isGenerating ? '#ef4444' : '#0ea5e9', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer', boxShadow: isGenerating ? 'none' : '0 4px 0 #0369a1' }}
                >
                    {isGenerating ? '🛑 STOP PEDALING' : '🚴‍♂️ START PEDALING'}
                </button>
                
                <div style={{ background: isGenerating ? 'rgba(14, 165, 233, 0.2)' : 'rgba(255,255,255,0.02)', border: `2px solid ${isGenerating ? '#38bdf8' : '#1e293b'}`, padding: '1rem', borderRadius: '1rem', textAlign: 'center', transition: 'all 0.3s ease' }}>
                    <div style={{ color: '#bae6fd', fontSize: '0.9rem', fontWeight: 'bold' }}>CURRENT LOAD</div>
                    <div style={{ color: isGenerating ? '#fcd34d' : '#475569', fontSize: '2.5rem', fontWeight: '900', textShadow: isGenerating ? '0 0 10px rgba(252,211,77,0.5)' : 'none' }}>
                        {isGenerating ? targetPower.toFixed(0) : '0'} W
                    </div>
                </div>
            </div>

            {/* MOONLIGHT NIGHT ENVIRONMENT */}
            <div style={{ position: 'relative', height: '450px', background: '#0a3d91', borderRadius: '1rem', overflow: 'hidden', border: '2px solid #3b82f6' }}>
                <Canvas shadows camera={{ position: [3, 1, 6], fov: 45 }}>
                    {/* Brighter blue sky, like the reference */}
                    <color attach="background" args={['#1e3a8a']} />
                    
                    {/* Stronger Ambient Light */}
                    <ambientLight intensity={0.6} color="#93c5fd" />
                    
                    {/* Massive Moon matching reference positioned perfectly behind */}
                    <mesh position={[-4, 8, -25]}>
                        {/* Make it huge with basic material so it ignores shadows and just glows white */}
                        <circleGeometry args={[12, 64]} />
                        <meshBasicMaterial color="#ffffff" />
                    </mesh>

                    {/* Glow coming from the Moon */}
                    <directionalLight position={[-4, 8, -20]} intensity={1.5} color="#bfdbfe" castShadow />

                    <BikeGenerator force={force} velocity={velocity} isGenerating={isGenerating} />
                    <MovingEnvironment velocity={isGenerating ? velocity : 0} isGenerating={isGenerating} />

                    <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2 - 0.05} minDistance={3} maxDistance={15} />
                </Canvas>
            </div>
        </div>
    );
}