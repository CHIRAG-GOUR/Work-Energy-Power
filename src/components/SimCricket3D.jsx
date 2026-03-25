import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';

const Bowler = ({ position }) => {
    const skinMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#fca5a5' }), []);
    const shirtMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#38bdf8' }), []);
    const pantsMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1e293b' }), []);
    
    return (
        <group position={position}>
            {/* Legs */}
            <mesh position={[-0.2, 0.4, 0]} material={pantsMat} castShadow>
                <boxGeometry args={[0.2, 0.8, 0.2]} />
            </mesh>
            <mesh position={[0.2, 0.4, 0]} material={pantsMat} castShadow>
                <boxGeometry args={[0.2, 0.8, 0.2]} />
            </mesh>
            {/* Torso */}
            <mesh position={[0, 1.2, 0]} material={shirtMat} castShadow>
                <boxGeometry args={[0.6, 0.8, 0.3]} />
            </mesh>
            {/* Head */}
            <mesh position={[0, 1.8, 0]} material={skinMat} castShadow>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
            </mesh>
            {/* Arms - Bowler pose */}
            <mesh position={[-0.4, 1.4, 0]} rotation={[0, 0, 0.5]} material={skinMat} castShadow>
                <boxGeometry args={[0.2, 0.6, 0.2]} />
            </mesh>
            <mesh position={[0.4, 1.4, 0]} rotation={[Math.PI * 0.8, 0, 0]} material={skinMat} castShadow>
                <boxGeometry args={[0.2, 0.6, 0.2]} />
            </mesh>
        </group>
    );
};

const Wickets = ({ isShattered, energy }) => {
    const groupRef = useRef();
    const stumpsRef = useRef([]);
    const bailsRef = useRef([]);

    // We will animate the shatter manually on frame if isShattered changes
    useFrame((state, delta) => {
        if (isShattered) {
            // Animate flying away
            const intensity = Math.max(1, energy / 20);
            
            if (stumpsRef.current[0]) {
                stumpsRef.current[0].position.z += 8 * delta * intensity;
                stumpsRef.current[0].position.y += 2 * delta * intensity;
                stumpsRef.current[0].rotation.x -= 2 * delta;
            }
            if (stumpsRef.current[1]) {
                stumpsRef.current[1].position.z += 10 * delta * intensity;
                stumpsRef.current[1].position.x -= 3 * delta * intensity;
                stumpsRef.current[1].rotation.z += 2 * delta;
            }
            if (stumpsRef.current[2]) {
                stumpsRef.current[2].position.z += 9 * delta * intensity;
                stumpsRef.current[2].position.x += 3 * delta * intensity;
                stumpsRef.current[2].rotation.x -= 3 * delta;
            }
            bailsRef.current.forEach(bail => {
                if (bail) {
                    bail.position.y += 8 * delta * intensity;
                    bail.position.z += 5 * delta;
                    bail.rotation.y += 5 * delta;
                }
            });
        } else {
            // Reset positions
            stumpsRef.current.forEach((stump, i) => {
                if(stump) {
                    stump.position.set((i - 1) * 0.2, 0.5, 0);
                    stump.rotation.set(0, 0, 0);
                }
            });
            bailsRef.current.forEach((bail, i) => {
                if(bail) {
                    bail.position.set(i === 0 ? -0.1 : 0.1, 1.05, 0);
                    bail.rotation.set(0, 0, Math.PI / 2);
                }
            });
        }
    });

    const woodMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#fcd34d' }), []);
    const bailMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d97706' }), []);

    return (
        <group ref={groupRef} position={[0, 0, 8]}>
            {/* 3 Stumps */}
            {[0, 1, 2].map(i => (
                <mesh key={i} ref={el => stumpsRef.current[i] = el} castShadow>
                    <cylinderGeometry args={[0.04, 0.04, 1, 8]} />
                    <primitive object={woodMat} attach="material" />
                </mesh>
            ))}
            {/* 2 Bails */}
            {[0, 1].map(i => (
                <mesh key={i} ref={el => bailsRef.current[i] = el} castShadow>
                    <cylinderGeometry args={[0.02, 0.02, 0.18, 8]} />
                    <primitive object={bailMat} attach="material" />
                </mesh>
            ))}
        </group>
    );
};

const Ball = ({ isBowling, energy, setIsShattered, hasShattered }) => {
    const ballRef = useRef();
    const startPos = new THREE.Vector3(0.5, 1.8, -4);
    const endPos = new THREE.Vector3(0, 0.5, 8); // At the wickets

    useFrame((state, delta) => {
        if (!ballRef.current) return;
        
        if (isBowling) {
            // Move ball forward
            const speed = energy * 0.3; // Map 0-100 to speed
            ballRef.current.position.z += speed * delta;
            ballRef.current.position.y = THREE.MathUtils.lerp(1.8, 0.1, (ballRef.current.position.z + 4) / 12); // Bounce effect approx
            
            // Spin ball
            ballRef.current.rotation.x += speed * delta;

            // Collision check
            if (ballRef.current.position.z >= endPos.z && !hasShattered) {
                // Impact!
                setIsShattered(true);
            }
            if (ballRef.current.position.z > 20) {
                // Keep rolling away but don't reset until user clicks
            }
        } else {
            // Reset ball
            ballRef.current.position.copy(startPos);
            ballRef.current.rotation.set(0, 0, 0);
        }
    });

    return (
        <mesh ref={ballRef} castShadow>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#ef4444" roughness={0.4} />
        </mesh>
    );
};

export default function SimCricket3D() {
    const [speedSlider, setSpeedSlider] = useState(50);
    const [isBowling, setIsBowling] = useState(false);
    const [isShattered, setIsShattered] = useState(false);

    // Calculate Kinetic Energy
    // Mass of a cricket ball is approx 0.16 kg. 
    // Let's assume speed mapping: 0-100 slider = 0 to 40 m/s (approx 144 km/h)
    const velocity = (speedSlider / 100) * 40;
    const mass = 0.16;
    const kineticEnergy = 0.5 * mass * (velocity * velocity);

    const handleBowl = () => {
        setIsBowling(true);
        setIsShattered(false);
    };

    const handleReset = () => {
        setIsBowling(false);
        setIsShattered(false);
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px', background: 'linear-gradient(to top, #bae6fd, #e0f2fe)', borderRadius: '0 0 24px 24px', overflow: 'hidden' }}>
            
            <Canvas shadows camera={{ position: [12, 6, 2], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight 
                    position={[-10, 15, 10]} 
                    intensity={1.2} 
                    castShadow 
                    shadow-mapSize={[1024, 1024]} 
                />
                
                <group position={[0, -1, -2]}>
                    {/* Pitch */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                        <planeGeometry args={[4, 25]} />
                        <meshStandardMaterial color="#d4d4d8" roughness={0.8} />
                    </mesh>
                    
                    {/* Field */}
                    <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                        <planeGeometry args={[100, 100]} />
                        <meshStandardMaterial color="#22c55e" roughness={1} />
                    </mesh>

                    <Bowler position={[0, 0, -4]} />
                    
                    <Wickets isShattered={isShattered} energy={speedSlider} />
                    
                    <Ball 
                        isBowling={isBowling} 
                        energy={speedSlider} 
                        setIsShattered={setIsShattered} 
                        hasShattered={isShattered}
                    />

                    {/* Labels */}
                    <Text position={[0, 0.1, -6]} rotation={[-Math.PI/2, 0, -Math.PI/2]} fontSize={1} color="#0f172a" anchorX="center" anchorY="middle">
                        Bowler
                    </Text>
                    <Text position={[0, 0.1, 10]} rotation={[-Math.PI/2, 0, -Math.PI/2]} fontSize={1} color="#0f172a" anchorX="center" anchorY="middle">
                        Wickets
                    </Text>
                </group>

                {/* Looking from the side to see both the bowler and the wickets easily */}
                <OrbitControls 
                    target={[0, 0, 2]} 
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2 - 0.05}
                />
            </Canvas>

            {/* UI Overlay */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ background: 'rgba(255,255,255,0.95)', padding: '1rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', minWidth: '220px', border: '2px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#ea580c' }}>Adjust Energy:</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '1.2rem' }}>🐢</span>
                        <input 
                            type="range" 
                            min="10" 
                            max="100" 
                            value={speedSlider} 
                            onChange={(e) => {
                                setSpeedSlider(Number(e.target.value));
                                if(isBowling) handleReset();
                            }} 
                            style={{ flex: 1, accentColor: '#ea580c' }}
                        />
                        <span style={{ fontSize: '1.2rem' }}>🚀</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 'bold', color: '#64748b' }}>Velocity:</span>
                        <span style={{ fontWeight: '900', color: '#3b82f6' }}>{velocity.toFixed(1)} m/s</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold', color: '#0f172a' }}>Kinetic Energy (<span style={{color: '#ea580c'}}>KE</span>):</span>
                        <span style={{ fontWeight: '900', color: '#10b981', fontSize: '1.2rem' }}>{Math.floor(kineticEnergy)} J</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    {!isBowling ? (
                        <button 
                            onClick={handleBowl}
                            style={{ padding: '0.8rem 1.5rem', background: '#ea580c', color: 'white', border: 'none', borderRadius: '0.8rem', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 0 #9a3412', transition: 'all 0.1s' }}
                        >
                            🏏 Bowl!
                        </button>
                    ) : (
                        <button 
                            onClick={handleReset}
                            style={{ padding: '0.8rem 1.5rem', background: '#94a3b8', color: 'white', border: 'none', borderRadius: '0.8rem', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 0 #64748b' }}
                        >
                            🔄 Reset
                        </button>
                    )}
                </div>
            </div>
            
            {/* Impact Text */}
            {isShattered && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none', animation: 'scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '900', color: '#ef4444', textShadow: '2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 0 4px 10px rgba(0,0,0,0.5)', WebkitTextStroke: '2px white' }}>
                        BAM!
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.8)', color: 'white', padding: '0.5rem 1rem', borderRadius: '1rem', marginTop: '10px', fontWeight: 'bold' }}>
                        {Math.floor(kineticEnergy)} J Transferred to Wickets!
                    </div>
                </div>
            )}
            
            <style>{`
            @keyframes scale-in {
                0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
            `}</style>
        </div>
    );
}
