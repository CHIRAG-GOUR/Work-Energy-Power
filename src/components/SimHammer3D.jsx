import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';

const Hammer = ({ dropHeight, isDropping, setIsDropping, setNailDepth, nailDepth }) => {
    const groupRef = useRef();
    const startY = dropHeight; // Varies from 2 to 6
    const endY = 1.0; // Surface of the nail head (approx)
    
    useFrame((state, delta) => {
        if (!groupRef.current) return;

        if (isDropping) {
            // Drop physics
            const speed = 15; // Fast drop
            groupRef.current.position.y -= speed * delta;
            
            // Rotation as it drops (optional flourish)
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 5 * delta);

            if (groupRef.current.position.y <= endY) {
                // Impact!
                groupRef.current.position.y = endY;
                setIsDropping(false);
                
                // Calculate Depth (PE = m * g * h)
                // Height = dropHeight - endY
                const mass = 2; // kg
                const g = 9.8;
                const h = dropHeight - endY;
                const PE = mass * g * h;
                
                // Map PE to nail displacement. Max PE ~ 100 J = 0.8m depth
                const depthAmount = (PE / 100) * 0.8;
                setNailDepth(prev => Math.min(prev + depthAmount, 0.9)); // Max depth 0.9
            }
        } else if (groupRef.current.position.y !== endY) {
            // Idle state tracking the slider
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, startY, 10 * delta);
            // Angle the hammer slightly when hoisted
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, Math.PI / 8, 5 * delta);
        }
    });

    const ironMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#94a3b8', metalness: 0.8, roughness: 0.2 }), []);
    const woodMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#b45309', roughness: 0.9 }), []);

    return (
        <group ref={groupRef} position={[0, startY, 0]}>
            {/* Hammer Head */}
            <mesh position={[0.4, 0, 0]} material={ironMat} castShadow>
                <boxGeometry args={[1.2, 0.6, 0.4]} />
            </mesh>
            {/* Hammer Handle */}
            <mesh position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={woodMat} castShadow>
                <cylinderGeometry args={[0.1, 0.1, 1.8, 16]} />
            </mesh>
        </group>
    );
};

const Nail = ({ depth }) => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        // Smooth transition to target depth
        const targetY = 1.0 - depth;
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 15 * delta);
    });

    const ironMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#cbd5e1', metalness: 0.9, roughness: 0.1 }), []);

    return (
        <group ref={groupRef} position={[0, 1.0, 0]}>
            {/* Nail Head */}
            <mesh position={[0, 0, 0]} material={ironMat} castShadow>
                <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
            </mesh>
            {/* Nail Body */}
            <mesh position={[0, -0.6, 0]} material={ironMat} castShadow>
                <cylinderGeometry args={[0.05, 0.01, 1.2, 8]} />
            </mesh>
        </group>
    );
};

const WoodBlock = () => {
    const woodMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d97706', roughness: 0.9 }), []);
    return (
        <mesh position={[0, 0, 0]} material={woodMat} receiveShadow castShadow>
            <boxGeometry args={[3, 1.8, 2]} />
        </mesh>
    );
};

export default function SimHammer3D() {
    const [heightSlider, setHeightSlider] = useState(4); // 2 to 6 meters
    const [isDropping, setIsDropping] = useState(false);
    const [nailDepth, setNailDepth] = useState(0);

    const mass = 2; // kg
    const g = 9.8; // m/s2
    const currentHeight = heightSlider - 1; // Relative to nail surface
    const PE = Math.floor(mass * g * currentHeight);
    const maxDepth = 0.9;
    const isNailFlush = nailDepth >= maxDepth - 0.05;

    const handleDrop = () => {
        if (!isNailFlush) {
            setIsDropping(true);
        }
    };

    const handleReset = () => {
        setIsDropping(false);
        setNailDepth(0);
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '450px', background: 'linear-gradient(to top, #fecdd3, #fff1f2)', borderRadius: '0 0 24px 24px', overflow: 'hidden' }}>
            
            <Canvas shadows camera={{ position: [5, 4, 6], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight 
                    position={[5, 10, 5]} 
                    intensity={1.2} 
                    castShadow 
                    shadow-mapSize={[1024, 1024]} 
                />
                
                <group position={[0, -0.5, 0]}>
                    <WoodBlock />
                    <Nail depth={nailDepth} />
                    <Hammer 
                        dropHeight={heightSlider} 
                        isDropping={isDropping} 
                        setIsDropping={setIsDropping}
                        setNailDepth={setNailDepth}
                        nailDepth={nailDepth}
                    />
                    
                    {/* Height Marker */}
                    {!isDropping && (
                        <group position={[1.5, heightSlider, 0]}>
                            <mesh rotation={[0, 0, Math.PI / 2]}>
                                <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
                                <meshBasicMaterial color="#e11d48" />
                            </mesh>
                            <Text position={[0.7, 0, 0]} fontSize={0.4} color="#e11d48" anchorX="left" anchorY="middle">
                                {currentHeight.toFixed(1)}m
                            </Text>
                        </group>
                    )}
                </group>

                {/* Ground */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]} receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="#fca5a5" roughness={1} />
                </mesh>
                
                <ContactShadows position={[0, -1.39, 0]} opacity={0.4} scale={20} blur={2} far={4} color="#000" />
                
                <OrbitControls 
                    target={[0, 1, 0]} 
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2 - 0.05}
                />
            </Canvas>

            {/* UI Overlay */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ background: 'rgba(255,255,255,0.95)', padding: '1rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', minWidth: '220px', border: '2px solid #fecdd3' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#be123c' }}>Hoist Hammer:</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '1.2rem' }}>⬇️</span>
                        <input 
                            type="range" 
                            min="1.5" 
                            max="6" 
                            step="0.5"
                            value={heightSlider} 
                            onChange={(e) => {
                                if(!isDropping) setHeightSlider(Number(e.target.value));
                            }} 
                            disabled={isDropping}
                            style={{ flex: 1, accentColor: '#be123c' }}
                        />
                        <span style={{ fontSize: '1.2rem' }}>⬆️</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 'bold', color: '#64748b' }}>Release Height:</span>
                        <span style={{ fontWeight: '900', color: '#e11d48' }}>{currentHeight.toFixed(1)} m</span>
                    </div>
                    <hr style={{ border: 'none', borderTop: '2px dashed #fecdd3', margin: '0.5rem 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold', color: '#0f172a' }}>Stored PE:</span>
                        <span style={{ fontWeight: '900', color: '#10b981', fontSize: '1.2rem' }}>{PE} J</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={handleDrop}
                        disabled={isDropping || isNailFlush}
                        style={{ padding: '0.8rem 1.5rem', background: isNailFlush ? '#94a3b8' : '#be123c', color: 'white', border: 'none', borderRadius: '0.8rem', fontSize: '1.2rem', fontWeight: 'bold', cursor: isNailFlush || isDropping ? 'not-allowed' : 'pointer', boxShadow: isNailFlush ? 'none' : '0 4px 0 #881337', transition: 'all 0.1s' }}
                    >
                        {isNailFlush ? 'Nail is flush!' : '🔨 Drop Hammer'}
                    </button>
                    
                    <button 
                        onClick={handleReset}
                        style={{ padding: '0.8rem 1.5rem', background: '#e2e8f0', color: '#475569', border: 'none', borderRadius: '0.8rem', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 0 #cbd5e1' }}
                    >
                        🔄 Reset
                    </button>
                </div>
            </div>

            {/* Instruction snippet */}
            {nailDepth === 0 && !isDropping && (
                <div style={{ position: 'absolute', top: '10%', right: '20px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '1rem 1.5rem', borderRadius: '1rem', pointerEvents: 'none', animation: 'fade-in 1s' }}>
                    More Height = More Potential Energy!
                </div>
            )}
            
            {/* Impact Text */}
            {nailDepth > 0 && !isDropping && !isNailFlush && (
                <div style={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)', background: 'rgba(16, 185, 129, 0.9)', color: 'white', padding: '1rem 1.5rem', borderRadius: '1rem', pointerEvents: 'none', animation: 'slide-in 0.3s' }}>
                    <h3 style={{ margin: 0, fontWeight: 900 }}>PE Converted to Work!</h3>
                    <p style={{ margin: '5px 0 0 0' }}>The nail was driven deeper into the wood.</p>
                </div>
            )}
            
            <style>{`
            @keyframes slide-in {
                0% { transform: translate(50px, -50%); opacity: 0; }
                100% { transform: translate(0, -50%); opacity: 1; }
            }
            `}</style>
        </div>
    );
}
