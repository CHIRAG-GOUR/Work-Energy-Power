import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';

const Hammer = ({ dropHeight, isDropping, setIsDropping, setNailDepth, nailDepth }) => {
    const groupRef = useRef();
    const startY = dropHeight; // Varies from 2 to 6
    // The nail top starts at 1.5, and goes down by nailDepth.
    // The hammer head extends 0.2 units down from its center, so it must stop 0.2 units above the nail top.
    const endY = 1.7 - nailDepth;
    
    useFrame((state, delta) => {
        if (!groupRef.current) return;

        if (isDropping) {
            // Drop physics
            const speed = 25; // Faster drop
            groupRef.current.position.y -= speed * delta;
            
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
                
                // Map PE to nail displacement. Max height drop is ~5m, PE ~ 100 J
                // We want: 
                // Low force (slider=3m): nail doesn't go fully down (e.g. 0.2 depth)
                // Medium force (slider=4-5m): half nail goes down (e.g. 0.35 depth)
                // Full force (slider=6m): full nail goes down (e.g. 0.55 depth)
                // Max depth possible before hitting block is 0.55 (since nail top is 1.5, block top is 0.95)
                const targetExtraDepth = (PE / 100) * 0.55; 
                setNailDepth(prev => Math.min(prev + targetExtraDepth, 0.55));
            }
        } else if (groupRef.current.position.y < startY) {
            // After hitting, or when slider changes, gradually return to startY
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, startY, 3 * delta);
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, Math.PI / 8, 5 * delta);
        } else {
            // Idle state tracking the slider closely
            groupRef.current.position.y = startY;
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, Math.PI / 8, 5 * delta);
        }
    });

    const ironMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#64748b', metalness: 0.8, roughness: 0.3 }), []);
    const woodMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#92400e', roughness: 0.9 }), []);

    // A better hammer shape
    return (
        <group ref={groupRef} position={[-0.05, startY, 0]}>
            {/* Hammer Head (More realistic shape) */}
            <group position={[0.4, 0, 0]}>
                <mesh material={ironMat} castShadow>
                     <cylinderGeometry args={[0.2, 0.2, 0.8, 16]} rotation={[0, 0, Math.PI / 2]} />
                </mesh>
                <mesh position={[-0.35, 0, 0]} material={ironMat} castShadow rotation={[0, 0, Math.PI / 2]}>
                     <cylinderGeometry args={[0.2, 0.15, 0.3, 16]} />
                </mesh>
                <mesh position={[0.4, 0, 0]} material={ironMat} castShadow rotation={[0, 0, Math.PI / 2]}>
                     {/* Claw side roughly */}
                     <coneGeometry args={[0.05, 0.4, 16, 1, false, 0, Math.PI]} />
                </mesh>
            </group>
            {/* Hammer Handle */}
            <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={woodMat} castShadow>
                <cylinderGeometry args={[0.08, 0.12, 1.8, 16]} />
            </mesh>
        </group>
    );
};

const Nail = ({ depth }) => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        // Smooth transition to target depth
        const targetY = 1.5 - depth;
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 15 * delta);
    });

    const ironMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#94a3b8', metalness: 0.9, roughness: 0.1 }), []);

    return (
        <group ref={groupRef} position={[0, 1.5, 0]}>
            {/* Nail Head */}
            <mesh position={[0, 0, 0]} material={ironMat} castShadow>
                <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
            </mesh>
            {/* Nail Body (taller) */}
            <mesh position={[0, -0.8, 0]} material={ironMat} castShadow>
                <cylinderGeometry args={[0.06, 0.01, 1.6, 8]} />
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
    const currentHeight = Math.max(0, heightSlider - (1.5 - nailDepth)); // Relative to exact current nail surface
    const PE = Math.floor(mass * g * currentHeight);
    const maxDepth = 0.55;
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
