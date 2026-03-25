import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Staircase
const Staircase = ({ position, color }) => {
    const steps = 10;
    const stepWidth = 1.5;
    const stepHeight = 0.4;
    const stepDepth = 0.6;
    
    // Create a stair geometry by merging boxes
    const geometry = useMemo(() => {
        const geom = new THREE.BufferGeometry();
        // Since we can't easily merge BufferGeometries without importing standard lib tools,
        // we'll just return a single shape or render multiple meshes.
        // For performance and simplicity, returning multiple meshes in a group is totally fine for 10 steps.
        return null;
    }, []);

    const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: color, roughness: 0.8 }), [color]);

    return (
        <group position={position}>
            {Array.from({ length: steps }).map((_, i) => (
                <mesh 
                    key={i} 
                    position={[0, i * stepHeight + (stepHeight/2), -(i * stepDepth) - (stepDepth/2)]} 
                    material={mat}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry args={[stepWidth, stepHeight, stepDepth]} />
                </mesh>
            ))}
            {/* Supporting slope underneath */}
            <mesh position={[0, (steps*stepHeight)/2, -(steps*stepDepth)/2]} rotation={[-Math.atan(stepDepth/stepHeight), 0, 0]} receiveShadow>
                {/* Visual under-support */}
            </mesh>
        </group>
    );
};

// Simple Robot Character
const Character = ({ position, color, progress, totalTime }) => {
    const groupRef = useRef();
    
    const steps = 10;
    const stepHeight = 0.4;
    const stepDepth = 0.6;
    const totalDistY = steps * stepHeight;
    const totalDistZ = -(steps * stepDepth);

    // Bouncing animation based on progress
    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        
        // Progress goes from 0 to 1
        const p = Math.min(Math.max(progress, 0), 1);
        
        const currentY = p * totalDistY;
        const currentZ = p * totalDistZ;
        
        // Add a hopping motion
        // Frequency of hops depends on how many steps.
        // There are 10 steps. So 10 hops total.
        const hopPhase = (p * steps) * Math.PI;
        const hopHeight = p < 1 ? Math.abs(Math.sin(hopPhase)) * 0.4 : 0;
        
        groupRef.current.position.set(position[0], position[1] + currentY + hopHeight + stepHeight, position[2] + currentZ);
        
        // Slight tilt forward while climbing
        groupRef.current.rotation.x = p < 1 ? -0.2 : 0;
    });

    const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: color, roughness: 0.5 }), [color]);
    const eyeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 'white', emissive: 'white', emissiveIntensity: 0.5 }), []);

    return (
        <group ref={groupRef} position={position}>
            {/* Body */}
            <mesh position={[0, 0.4, 0]} material={bodyMat} castShadow>
                <boxGeometry args={[0.5, 0.8, 0.5]} />
            </mesh>
            {/* Head */}
            <mesh position={[0, 1.0, 0]} material={bodyMat} castShadow>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
            </mesh>
            {/* Eyes */}
            <mesh position={[-0.1, 1.05, 0.21]} material={eyeMat}>
                <boxGeometry args={[0.1, 0.05, 0.05]} />
            </mesh>
            <mesh position={[0.1, 1.05, 0.21]} material={eyeMat}>
                <boxGeometry args={[0.1, 0.05, 0.05]} />
            </mesh>
        </group>
    );
};

export default function SimRace3D() {
    const [isPlaying, setIsPlaying] = useState(false);
    
    // Instead of forcing the user to wait 30 seconds for Ben, we scale time.
    // Let's say the race takes 10s for Alex and 30s for Ben conceptually.
    // Visually, we will map this to 3s and 9s so it's bearable to watch.
    
    const timeScale = 0.3; // 30% of real time
    const alexRealTime = 10;
    const benRealTime = 30;
    
    const alexVisualTime = alexRealTime * timeScale;
    const benVisualTime = benRealTime * timeScale;

    // We'll manage progress tightly in a React ref to avoid React state thrashing 
    // but we will expose a 0-1 fraction to the UI if we want to build progress bars.
    const [progress, setProgress] = useState({ alex: 0, ben: 0 });
    const timerRef = useRef(0);
    const reqRef = useRef(null);

    const startRace = () => {
        setIsPlaying(true);
        timerRef.current = 0;
        setProgress({ alex: 0, ben: 0 });
        
        let lastTime = performance.now();
        
        const animate = (time) => {
            const delta = (time - lastTime) / 1000;
            lastTime = time;
            timerRef.current += delta;
            
            const pAlex = Math.min(timerRef.current / alexVisualTime, 1);
            const pBen = Math.min(timerRef.current / benVisualTime, 1);
            
            setProgress({ alex: pAlex, ben: pBen });
            
            if (pAlex < 1 || pBen < 1) {
                reqRef.current = requestAnimationFrame(animate);
            } else {
                setIsPlaying(false);
            }
        };
        
        reqRef.current = requestAnimationFrame(animate);
    };

    const resetRace = () => {
        cancelAnimationFrame(reqRef.current);
        setIsPlaying(false);
        timerRef.current = 0;
        setProgress({ alex: 0, ben: 0 });
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '1.5rem', alignItems: 'stretch' }}>
            
            {/* 3D Simulation Container */}
            <div style={{ position: 'relative', height: '450px', background: 'linear-gradient(to top, #1e293b, #0f172a)', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)', border: '4px solid #334155' }}>
                <Canvas shadows camera={{ position: [5, 6, 8], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight 
                        position={[10, 15, 10]} 
                        intensity={1.5} 
                        castShadow 
                        shadow-mapSize={[1024, 1024]} 
                    />
                    
                    <group position={[0, -2, 2]}>
                        {/* Alex's Track */}
                        <Staircase position={[-1.5, 0, 0]} color="#3b82f6" />
                        <Character position={[-1.5, 0, 0]} color="#60a5fa" progress={progress.alex} totalTime={alexVisualTime} />
                        
                        {/* Ben's Track */}
                        <Staircase position={[1.5, 0, 0]} color="#ea580c" />
                        <Character position={[1.5, 0, 0]} color="#fb923c" progress={progress.ben} totalTime={benVisualTime} />
                        
                        {/* Finish Line Platform */}
                        <mesh position={[0, 10*0.4, -(10*0.6) - 1]} receiveShadow>
                            <boxGeometry args={[6, 0.4, 2]} />
                            <meshStandardMaterial color="#22c55e" />
                        </mesh>
                    </group>

                    <OrbitControls 
                        target={[0, 1, -1]} 
                        enablePan={false}
                        maxPolarAngle={Math.PI / 2 + 0.1}
                        minDistance={5}
                        maxDistance={20}
                    />
                </Canvas>
            </div>

            {/* Dashboard UI */}
            <div style={{ background: '#f8fafc', borderRadius: '1.5rem', padding: '1.5rem', border: '2px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: '0 0 1.5rem 0', color: '#0f172a', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Power Race</h3>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* Alex Stats */}
                    <div style={{ background: 'white', padding: '1rem', borderRadius: '1rem', border: '2px solid #bfdbfe', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${progress.alex * 100}%`, background: '#eff6ff', zIndex: 0, transition: 'width 0.1s linear' }}></div>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: '#1d4ed8', fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Alex</span>
                                <span>{progress.alex >= 1 ? '10s (Done)' : `${(progress.alex * 10).toFixed(1)}s`}</span>
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.9rem', color: '#475569' }}>
                                <div><strong>Work:</strong> 3000 J</div>
                                <div><strong>Time:</strong> 10 s</div>
                                <div style={{ gridColumn: '1 / -1', background: '#dbeafe', padding: '0.5rem', borderRadius: '0.5rem', color: '#1e40af', fontWeight: 'bold', textAlign: 'center', marginTop: '0.5rem', border: '1px solid #93c5fd' }}>
                                    Power = 300 W
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ben Stats */}
                    <div style={{ background: 'white', padding: '1rem', borderRadius: '1rem', border: '2px solid #fed7aa', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${progress.ben * 100}%`, background: '#fff7ed', zIndex: 0, transition: 'width 0.1s linear' }}></div>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: '#c2410c', fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Ben</span>
                                <span>{progress.ben >= 1 ? '30s (Done)' : `${(progress.ben * 30).toFixed(1)}s`}</span>
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.9rem', color: '#475569' }}>
                                <div><strong>Work:</strong> 3000 J</div>
                                <div><strong>Time:</strong> 30 s</div>
                                <div style={{ gridColumn: '1 / -1', background: '#ffedd5', padding: '0.5rem', borderRadius: '0.5rem', color: '#9a3412', fontWeight: 'bold', textAlign: 'center', marginTop: '0.5rem', border: '1px solid #fdba74' }}>
                                    Power = 100 W
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button 
                        onClick={startRace}
                        disabled={isPlaying}
                        style={{ flex: 1, padding: '0.8rem', fontSize: '1.1rem', background: isPlaying ? '#94a3b8' : '#22c55e', color: 'white', border: 'none', borderRadius: '0.8rem', cursor: isPlaying ? 'not-allowed' : 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                    >
                        START RACE
                    </button>
                    <button 
                        onClick={resetRace}
                        style={{ padding: '0.8rem', fontSize: '1.1rem', background: 'transparent', color: '#64748b', border: '2px solid #cbd5e1', borderRadius: '0.8rem', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        RESET
                    </button>
                </div>
            </div>
        </div>
    );
}
