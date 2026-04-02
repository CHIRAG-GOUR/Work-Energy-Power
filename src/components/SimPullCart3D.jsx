import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';

const Bullock3D = ({ isPulling, positionX }) => {
    const groupRef = useRef();
    const legsRef = useRef([]);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.position.x = positionX;
            // Subtle body bob
            if (isPulling) {
                groupRef.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 10)) * 0.05;
            } else {
                groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 5 * delta);
            }
        }
        
        // Leg Animation
        if (isPulling) {
            const time = state.clock.elapsedTime * 10;
            if (legsRef.current[0]) legsRef.current[0].rotation.z = Math.sin(time) * 0.4;
            if (legsRef.current[1]) legsRef.current[1].rotation.z = -Math.sin(time) * 0.4;
            if (legsRef.current[2]) legsRef.current[2].rotation.z = -Math.sin(time) * 0.4;
            if (legsRef.current[3]) legsRef.current[3].rotation.z = Math.sin(time) * 0.4;
        } else {
            legsRef.current.forEach(leg => {
                if(leg) leg.rotation.z = THREE.MathUtils.lerp(leg.rotation.z, 0, 5 * delta);
            });
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {/* Body */}
            <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.5, 0.6, 0.6]} />
                <meshStandardMaterial color="#fcd34d" />
            </mesh>
            
            {/* Head */}
            <mesh position={[-0.8, 1.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.5, 0.5, 0.4]} />
                <meshStandardMaterial color="#fcd34d" />
            </mesh>
            {/* Snout */}
            <mesh position={[-1.0, 1.4, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshStandardMaterial color="#f59e0b" />
            </mesh>

            {/* Horns */}
            <mesh position={[-0.7, 1.8, 0.15]} rotation={[0, 0, -0.3]} castShadow receiveShadow>
                <coneGeometry args={[0.08, 0.4, 8]} />
                <meshStandardMaterial color="#fef3c7" />
            </mesh>
            <mesh position={[-0.7, 1.8, -0.15]} rotation={[0, 0, 0.3]} castShadow receiveShadow>
                <coneGeometry args={[0.08, 0.4, 8]} />
                <meshStandardMaterial color="#fef3c7" />
            </mesh>

            {/* Legs */}
            {[
                [-0.5, 0.4, 0.2], // FL
                [-0.5, 0.4, -0.2], // FR
                [0.5, 0.4, 0.2], // BL
                [0.5, 0.4, -0.2] // BR
            ].map((pos, i) => (
                <group key={i} position={[pos[0], 0.9, pos[2]]} ref={el => legsRef.current[i] = el}>
                    <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
                        <boxGeometry args={[0.15, 0.8, 0.15]} />
                        <meshStandardMaterial color="#fcd34d" />
                    </mesh>
                    <mesh position={[0, -0.85, 0]} castShadow receiveShadow>
                        <boxGeometry args={[0.16, 0.1, 0.16]} />
                        <meshStandardMaterial color="#1e293b" />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

const Cart3D = ({ isPulling, positionX }) => {
    const groupRef = useRef();
    const wheelsRef = useRef([]);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.position.x = positionX + 2.2; // Follow behind bullock
        }
        
        // Exact Physics calculation: rotation angle = distance / radius
        // The wheels move along the X axis. We rotate around the Y-axis (which is mapped to Z visually due to parent X rotation).
        // Cylinder radius is 0.4.
        const rotationAngle = positionX / 0.4;
        wheelsRef.current.forEach(wheel => {
            if (wheel) wheel.rotation.y = rotationAngle;
        });
    });

    return (
        <group ref={groupRef} position={[2, 0, 0]}>
            {/* Chassis */}
            <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.8, 0.2, 1.2]} />
                <meshStandardMaterial color="#78350f" roughness={0.9} />
            </mesh>
            {/* Sidewalls */}
            <mesh position={[0, 1.0, 0.55]} castShadow receiveShadow>
                <boxGeometry args={[1.8, 0.4, 0.1]} />
                <meshStandardMaterial color="#451a03" roughness={0.9} />
            </mesh>
            <mesh position={[0, 1.0, -0.55]} castShadow receiveShadow>
                <boxGeometry args={[1.8, 0.4, 0.1]} />
                <meshStandardMaterial color="#451a03" roughness={0.9} />
            </mesh>
            <mesh position={[0.85, 1.0, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.1, 0.4, 1.2]} />
                <meshStandardMaterial color="#451a03" roughness={0.9} />
            </mesh>
            
            {/* Harness connecting to bullock */}
            <mesh position={[-1.6, 0.9, 0]} castShadow receiveShadow>
                <boxGeometry args={[2.0, 0.05, 0.8]} />
                <meshStandardMaterial color="#451a03" roughness={0.9} />
            </mesh>

            {/* Wheels */}
            {[
                [0, 0.4, 0.65],
                [0, 0.4, -0.65]
            ].map((pos, i) => (
                <mesh key={i} position={pos} rotation={[Math.PI / 2, 0, 0]} ref={el => wheelsRef.current[i] = el} castShadow receiveShadow>
                    <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
                    <meshStandardMaterial color="#78350f" roughness={0.9} />
                    {/* Dark rim */}
                    <mesh>
                         <cylinderGeometry args={[0.42, 0.42, 0.05, 16]} />
                         <meshStandardMaterial color="#451a03" roughness={0.9} />
                    </mesh>
                    {/* Visual Spokes for visible rotation */}
                    <mesh rotation={[0, 0, 0]}>
                        <boxGeometry args={[0.78, 0.05, 0.15]} />
                        <meshStandardMaterial color="#451a03" />
                    </mesh>
                    <mesh rotation={[0, Math.PI / 2, 0]}>
                        <boxGeometry args={[0.78, 0.05, 0.15]} />
                        <meshStandardMaterial color="#451a03" />
                    </mesh>
                </mesh>
            ))}
            
            {/* Cargo Box */}
            <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.8, 0.6, 0.8]} />
                <meshStandardMaterial color="#f59e0b" />
            </mesh>
            {/* Rope to bullock center */}
            <mesh position={[-1.2, 1.0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
                <cylinderGeometry args={[0.02, 0.02, 2.4, 8]} />
                <meshStandardMaterial color="#111111" />
            </mesh>
        </group>
    );
};

const Scene3D = ({ isPulling, displacement }) => {
    return (
        <group>
            {/* Let's have the cart move from right to left */}
            <group position={[4, 0, 0]}> {/* Offset start position to right */}
                <Bullock3D isPulling={isPulling} positionX={-displacement} />
                <Cart3D isPulling={isPulling} positionX={-displacement} />
                
                {/* Distance Markers along ground */}
                {Array.from({ length: 21 }).map((_, i) => (
                    <group key={i} position={[-i, 0.01, 2.0]}>
                        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                            <planeGeometry args={[0.05, 1.0]} />
                            <meshStandardMaterial color="#3b82f6" />
                        </mesh>
                        <Text position={[0, 0.05, 1.0]} rotation={[-Math.PI/2, 0, 0]} fontSize={0.6} color="#1e293b" anchorX="center" anchorY="middle">
                            {i}m
                        </Text>
                    </group>
                ))}

                {/* Ground floor line to show path */}
                <mesh position={[-10, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <planeGeometry args={[24, 1.5]} />
                    <meshStandardMaterial color="#94a3b8" />
                </mesh>
            </group>
        </group>
    );
};

export default function SimPullCartContainer() {
    const [isPulling, setIsPulling] = useState(false);
    const [displacement, setDisplacement] = useState(0);
    const force = 300; // Newtons
    const maxDisplacement = 20;
    
    // Manage animation frame outside canvas via RAF, or just use simple useEffect interval/timeout for React state
    // Since we need smooth React state updates for the UI overlay:
    const frameRef = useRef();
    const lastTimeRef = useRef();

    // Audio SFX
    const cartAudioRef = useRef(null);
    const mooAudioRef = useRef(null);

    React.useEffect(() => {
        cartAudioRef.current = new Audio('https://actions.google.com/sounds/v1/foley/wooden_cart_wheels_creaking.ogg');
        cartAudioRef.current.loop = true;
        cartAudioRef.current.volume = 0.5;

        mooAudioRef.current = new Audio('https://actions.google.com/sounds/v1/animals/cow_moo.ogg');
        mooAudioRef.current.volume = 0.3;
        
        return () => {
            if (cartAudioRef.current) {
                cartAudioRef.current.pause();
                cartAudioRef.current.currentTime = 0;
            }
            if (mooAudioRef.current) {
                mooAudioRef.current.pause();
                mooAudioRef.current.currentTime = 0;
            }
        };
    }, []);

    const updateSimulation = (time) => {
        if (!lastTimeRef.current) lastTimeRef.current = time;
        const delta = (time - lastTimeRef.current) / 1000;
        lastTimeRef.current = time;

        if (isPulling) {
            setDisplacement((prev) => {
                if (prev >= maxDisplacement) {
                    setIsPulling(false); // Auto stop at max distance
                    return maxDisplacement;
                }
                return prev + 2 * delta; // 2 m/s
            });
        }
        
        frameRef.current = requestAnimationFrame(updateSimulation);
    };

    React.useEffect(() => {
        if (isPulling) {
            lastTimeRef.current = performance.now();
            frameRef.current = requestAnimationFrame(updateSimulation);
            // Play sounds
            if (cartAudioRef.current) {
                cartAudioRef.current.play().catch(e => console.warn('Audio play blocked:', e));
            }
            if (displacement === 0 && mooAudioRef.current) {
                mooAudioRef.current.currentTime = 0;
                mooAudioRef.current.play().catch(e => console.warn('Audio play blocked:', e));
            }
        } else {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
            lastTimeRef.current = null;
            // Stop sound
            if (cartAudioRef.current) {
                cartAudioRef.current.pause();
            }
        }
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [isPulling]);

    const handleToggle = () => {
        if (displacement < maxDisplacement) {
            setIsPulling(prev => !prev);
        }
    };

    const reset = () => {
        setIsPulling(false);
        setDisplacement(0);
        if (cartAudioRef.current) {
            cartAudioRef.current.pause();
            cartAudioRef.current.currentTime = 0;
        }
    };

    const workDone = Math.floor(force * displacement);

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px', background: 'linear-gradient(to top, #e0e7ff, #f8fafc)', borderRadius: '0 0 24px 24px', overflow: 'hidden' }}>
            
            {/* 3D Viewport */}
            <Canvas shadows camera={{ position: [0, 5, 8], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight 
                    position={[10, 10, 5]} 
                    intensity={1.5} 
                    castShadow 
                    shadow-mapSize-width={1024} 
                    shadow-mapSize-height={1024} 
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />
                
                <Scene3D isPulling={isPulling} displacement={displacement} />

                {/* Sky and Ground Env */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="#cbd5e1" roughness={1} />
                </mesh>
                
                <ContactShadows position={[0, 0.0, 0]} opacity={0.6} scale={15} blur={1.5} far={2} color="#000" />
                
                <OrbitControls 
                    enablePan={false} 
                    minDistance={4}
                    maxDistance={15}
                    maxPolarAngle={Math.PI / 2 - 0.05} // Prevent clip under ground
                />
            </Canvas>

            {/* UI Overlay */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ background: 'rgba(255,255,255,0.9)', padding: '1rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', minWidth: '200px', border: '2px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 'bold', color: '#64748b' }}>Force:</span>
                        <span style={{ fontWeight: '900', color: '#ef4444' }}>{force} N</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 'bold', color: '#64748b' }}>Distance:</span>
                        <span style={{ fontWeight: '900', color: '#3b82f6' }}>{displacement.toFixed(1)} m</span>
                    </div>
                    <hr style={{ border: 'none', borderTop: '2px dashed #cbd5e1', margin: '0.5rem 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold', color: '#0f172a' }}>Work Done:</span>
                        <span style={{ fontWeight: '900', color: '#10b981', fontSize: '1.2rem' }}>{workDone} J</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={handleToggle}
                        disabled={displacement >= maxDisplacement}
                        style={{ padding: '0.8rem 1.5rem', background: displacement >= maxDisplacement ? '#94a3b8' : (isPulling ? '#f59e0b' : '#3b82f6'), color: 'white', border: 'none', borderRadius: '0.8rem', fontSize: '1.2rem', fontWeight: 'bold', cursor: displacement >= maxDisplacement ? 'not-allowed' : 'pointer', userSelect: 'none', boxShadow: displacement >= maxDisplacement ? 'none' : `0 4px 0 ${isPulling ? '#b45309' : '#1e40af'}`, transform: 'none' }}
                    >
                        {displacement >= maxDisplacement ? 'Finished!' : (isPulling ? '⏸ Pause' : '▶ Start Pulling')}
                    </button>
                    
                    <button 
                        onClick={reset}
                        style={{ padding: '0.8rem', background: '#e2e8f0', color: '#475569', border: 'none', borderRadius: '0.8rem', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 0 #cbd5e1' }}
                    >
                        🔄 Reset
                    </button>
                </div>
            </div>

            {/* Instruction snippet */}
            {displacement === 0 && !isPulling && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '1rem 2rem', borderRadius: '2rem', pointerEvents: 'none', animation: 'fade-in 1s' }}>
                    Click "Start Pulling" to activate the Bullock!
                </div>
            )}
        </div>
    );
}
