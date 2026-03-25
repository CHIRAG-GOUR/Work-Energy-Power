import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';

const Projectile = ({ isShooting, stretch, targetHit, setTargetHit }) => {
    const groupRef = useRef();
    
    // Starting position relative to slingshot center [x=-5, y=2]
    const startX = -5 - stretch; 
    
    useFrame((state, delta) => {
        if (!groupRef.current) return;

        if (isShooting) {
            // Projectile motion
            // KE = PE. 1/2 m v^2 = 1/2 k x^2 -> v = x * sqrt(k/m)
            const velocity = stretch * 15; // scalar
            // Shoot forward (right) and slightly up
            const vx = velocity * 0.9;
            const vy = velocity * 0.2;
            
            groupRef.current.position.x += vx * delta;
            groupRef.current.position.y += vy * delta;
            groupRef.current.position.y -= 9.8 * delta * delta * 5; // Gravity drop

            // Check collision with structure at x = 5
            if (groupRef.current.position.x >= 5 && groupRef.current.position.y <= 4 && groupRef.current.position.y >= 0) {
                if (!targetHit) setTargetHit(true);
            }
            // Floor bounce
            if (groupRef.current.position.y < 0) {
                groupRef.current.position.y = 0;
            }
        } else {
            // Drawn back
            groupRef.current.position.set(startX, 2, 0);
        }
    });

    const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#dc2626', roughness: 0.3 }), []);

    return (
        <mesh ref={groupRef} position={[startX, 2, 0]} material={mat} castShadow>
            <sphereGeometry args={[0.3, 16, 16]} />
        </mesh>
    );
};

const TargetStructure = ({ targetHit, stretch }) => {
    const blocksRef = useRef([]);
    const pigRef = useRef();

    useFrame((state, delta) => {
        if (targetHit) {
            // Explode outwards based on stretch energy
            const force = stretch * 10;
            
            blocksRef.current.forEach((block, idx) => {
                if(!block) return;
                const dirX = force * delta;
                const dirZ = (idx % 2 === 0 ? 1 : -1) * force * delta;
                const dirY = (Math.random() * force) * delta;
                
                block.position.x += dirX;
                block.position.z += dirZ;
                if(block.position.y > 0) block.position.y += dirY - 9.8 * delta * delta;
                if(block.position.y < 0) block.position.y = 0;

                block.rotation.x += dirY;
                block.rotation.z += dirX;
            });

            if (pigRef.current) {
                pigRef.current.position.x += force * 1.5 * delta;
                pigRef.current.position.y += force * delta - 9.8 * delta * delta;
                if(pigRef.current.position.y < 0.5) pigRef.current.position.y = 0.5;
                pigRef.current.rotation.z -= 10 * delta;
            }
        } else {
            // Reset positions if not hit
            if(blocksRef.current[0]) blocksRef.current[0].position.set(5, 0.5, -1);
            if(blocksRef.current[1]) blocksRef.current[1].position.set(5, 0.5, 1);
            if(blocksRef.current[2]) blocksRef.current[2].position.set(5, 1.5, 0);
            if(blocksRef.current[0]) {
                blocksRef.current.forEach(b => b.rotation.set(0,0,0));
            }
            if(pigRef.current) {
                pigRef.current.position.set(5, 2.5, 0);
                pigRef.current.rotation.set(0,0,0);
            }
        }
    });

    const woodMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d97706', roughness: 0.8 }), []);
    const pigMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#22c55e', roughness: 0.5 }), []);

    return (
        <group>
            {/* Blocks */}
            <mesh ref={el => blocksRef.current[0] = el} material={woodMat} castShadow receiveShadow>
                <boxGeometry args={[0.6, 2, 0.6]} />
            </mesh>
            <mesh ref={el => blocksRef.current[1] = el} material={woodMat} castShadow receiveShadow>
                <boxGeometry args={[0.6, 2, 0.6]} />
            </mesh>
            <mesh ref={el => blocksRef.current[2] = el} material={woodMat} castShadow receiveShadow>
                <boxGeometry args={[0.6, 0.5, 2.8]} />
            </mesh>

            {/* Target "Pig" */}
            <mesh ref={pigRef} material={pigMat} castShadow receiveShadow>
                <sphereGeometry args={[0.5, 16, 16]} />
                {/* Eyes */}
                <mesh position={[0.4, 0.1, 0.2]}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshBasicMaterial color="black" />
                </mesh>
                <mesh position={[0.4, 0.1, -0.2]}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshBasicMaterial color="black" />
                </mesh>
                <mesh position={[0.5, -0.1, 0]}>
                    <cylinderGeometry args={[0.15, 0.15, 0.1]} rotation={[0, 0, Math.PI/2]} />
                    <meshBasicMaterial color="#166534" />
                </mesh>
            </mesh>
        </group>
    );
};

const Slingshot = ({ stretch }) => {
    const woodMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#78350f', roughness: 0.9 }), []);
    
    // Slingshot base is at x=-5
    const leftFork = [-5, 3, -0.8];
    const rightFork = [-5, 3, 0.8];
    const pouch = [-5 - stretch, 2, 0];

    return (
        <group>
            {/* Base */}
            <mesh position={[-5, 1, 0]} material={woodMat} castShadow>
                <cylinderGeometry args={[0.2, 0.3, 2, 8]} />
            </mesh>
            {/* Forks */}
            <mesh position={[-5, 2.5, -0.4]} rotation={[Math.PI / 6, 0, 0]} material={woodMat} castShadow>
                <cylinderGeometry args={[0.15, 0.2, 1.5, 8]} />
            </mesh>
            <mesh position={[-5, 2.5, 0.4]} rotation={[-Math.PI / 6, 0, 0]} material={woodMat} castShadow>
                <cylinderGeometry args={[0.15, 0.2, 1.5, 8]} />
            </mesh>

            {/* Bands */}
            <line>
                <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...leftFork), new THREE.Vector3(...pouch)])} />
                <lineBasicMaterial attach="material" color="#ef4444" linewidth={3} />
            </line>
            <line>
                <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...rightFork), new THREE.Vector3(...pouch)])} />
                <lineBasicMaterial attach="material" color="#ef4444" linewidth={3} />
            </line>
        </group>
    );
};

export default function SimSlingshot3D() {
    const [stretch, setStretch] = useState(0); // 0 to 2 meters
    const [isShooting, setIsShooting] = useState(false);
    const [targetHit, setTargetHit] = useState(false);

    const k = 500; // N/m
    const PEe = Math.floor(0.5 * k * Math.pow(stretch, 2));

    const handleShoot = () => {
        if (stretch === 0) return;
        setIsShooting(true);
        setTimeout(() => {
            setIsShooting(false);
            setTargetHit(false);
            setStretch(0);
        }, 3000); // Reset after 3 seconds
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px', background: 'linear-gradient(to top, #e0e7ff, #f3f4f6)', borderRadius: '0 0 24px 24px', overflow: 'hidden' }}>
            
            <Canvas shadows camera={{ position: [0, 2, 12], fov: 60 }}>
                <ambientLight intensity={0.6} />
                <directionalLight 
                    position={[0, 15, 10]} 
                    intensity={1.2} 
                    castShadow 
                    shadow-mapSize={[1024, 1024]} 
                />
                
                <group position={[0, -1, 0]}>
                    <Slingshot stretch={isShooting ? 0 : stretch} />
                    <TargetStructure targetHit={targetHit} stretch={stretch} />
                    <Projectile isShooting={isShooting} stretch={stretch} targetHit={targetHit} setTargetHit={setTargetHit} />
                </group>

                {/* Ground */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="#84cc16" />
                </mesh>
                
                <ContactShadows position={[0, -0.99, 0]} opacity={0.4} scale={30} blur={2} far={10} color="#000" />
                
                <OrbitControls 
                    target={[0, 1, 0]} 
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2 - 0.05}
                />
            </Canvas>

            {/* UI Overlay */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ background: 'rgba(255,255,255,0.95)', padding: '1rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', minWidth: '220px', border: '2px solid #e0e7ff' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#4338ca' }}>Stretch Band:</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '1.2rem' }}>🏹</span>
                        <input 
                            type="range" 
                            min="0" 
                            max="2" 
                            step="0.1"
                            value={stretch} 
                            onChange={(e) => {
                                if(!isShooting) setStretch(Number(e.target.value));
                            }} 
                            disabled={isShooting}
                            style={{ flex: 1, accentColor: '#4338ca' }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 'bold', color: '#64748b' }}>Distance (x):</span>
                        <span style={{ fontWeight: '900', color: '#4f46e5' }}>{stretch.toFixed(1)} m</span>
                    </div>
                    <hr style={{ border: 'none', borderTop: '2px dashed #e0e7ff', margin: '0.5rem 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold', color: '#0f172a' }}>Stored PEe:</span>
                        <span style={{ fontWeight: '900', color: '#10b981', fontSize: '1.2rem' }}>{PEe} J</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={handleShoot}
                        disabled={isShooting || stretch === 0}
                        style={{ padding: '0.8rem 1.5rem', background: (stretch === 0 || isShooting) ? '#94a3b8' : '#ef4444', color: 'white', border: 'none', borderRadius: '0.8rem', fontSize: '1.2rem', fontWeight: 'bold', cursor: (stretch === 0 || isShooting) ? 'not-allowed' : 'pointer', boxShadow: (stretch === 0 || isShooting) ? 'none' : '0 4px 0 #b91c1c', transition: 'all 0.1s' }}
                    >
                        🎯 {isShooting ? 'Shooting...' : 'SHOOT!'}
                    </button>
                </div>
            </div>

            {targetHit && (
                <div style={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)', background: 'rgba(239, 68, 68, 0.9)', color: 'white', padding: '1rem 1.5rem', borderRadius: '1rem', pointerEvents: 'none', animation: 'scale-in 0.3s' }}>
                    <h3 style={{ margin: 0, fontWeight: 900 }}>BAM! KE Transferred!</h3>
                    <p style={{ margin: '5px 0 0 0' }}>The elastic PE converted to Kinetic Energy.</p>
                </div>
            )}
            
            <style>{`
            @keyframes scale-in {
                0% { transform: translateY(-50%) scale(0.5); opacity: 0; }
                100% { transform: translateY(-50%) scale(1); opacity: 1; }
            }
            `}</style>
        </div>
    );
}
