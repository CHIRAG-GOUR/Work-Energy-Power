import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Skateboard
const Skateboard = ({ position, rotation }) => {
    const boardMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.8 }), []);
    const gripMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1f2937', roughness: 0.9 }), []);
    const wheelMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#facc15', roughness: 0.4 }), []);
    const truckMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#94a3b8', metalness: 0.8, roughness: 0.2 }), []);

    return (
        <group position={position} rotation={rotation}>
            {/* Grip tape top */}
            <mesh position={[0, 0.16, 0]} material={gripMat} castShadow>
                <boxGeometry args={[1.6, 0.02, 0.5]} />
            </mesh>
            {/* Board Base */}
            <mesh position={[0, 0.14, 0]} material={boardMat} castShadow>
                <boxGeometry args={[1.6, 0.04, 0.5]} />
            </mesh>
            
            {/* Trucks */}
            <mesh position={[-0.5, 0.08, 0]} material={truckMat} castShadow>
                <boxGeometry args={[0.1, 0.1, 0.3]} />
            </mesh>
            <mesh position={[0.5, 0.08, 0]} material={truckMat} castShadow>
                <boxGeometry args={[0.1, 0.1, 0.3]} />
            </mesh>

            {/* Wheels */}
            {/* Back Left */}
            <mesh position={[-0.5, 0.05, -0.2]} rotation={[Math.PI/2, 0, 0]} material={wheelMat} castShadow>
                <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
            </mesh>
            {/* Back Right */}
            <mesh position={[-0.5, 0.05, 0.2]} rotation={[Math.PI/2, 0, 0]} material={wheelMat} castShadow>
                <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
            </mesh>
            {/* Front Left */}
            <mesh position={[0.5, 0.05, -0.2]} rotation={[Math.PI/2, 0, 0]} material={wheelMat} castShadow>
                <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
            </mesh>
            {/* Front Right */}
            <mesh position={[0.5, 0.05, 0.2]} rotation={[Math.PI/2, 0, 0]} material={wheelMat} castShadow>
                <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
            </mesh>
        </group>
    );
};

// Procedural Halfpipe built using a Shape and ExtrudeGeometry
const Halfpipe = () => {
    const geom = useMemo(() => {
        const shape = new THREE.Shape();
        const a = 0.2; // Parabola coefficient: y = a * x^2
        const width = 5;
        const depth = 4;
        const thickness = 0.5;

        // Draw outer parabola (bottom)
        shape.moveTo(-width, a * Math.pow(-width, 2) - thickness);
        for (let x = -width; x <= width; x += 0.5) {
            shape.lineTo(x, a * Math.pow(x, 2) - thickness);
        }
        shape.lineTo(width, a * Math.pow(width, 2) - thickness);

        // Draw inner parabola (riding surface)
        shape.lineTo(width, a * Math.pow(width, 2));
        for (let x = width; x >= -width; x -= 0.5) {
            shape.lineTo(x, a * Math.pow(x, 2));
        }
        shape.lineTo(-width, a * Math.pow(-width, 2));

        const extrudeSettings = {
            depth: depth,
            bevelEnabled: false,
        };

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        // Center the extrusion on Z axis
        geometry.translate(0, 0, -depth / 2);
        return geometry;
    }, []);

    const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#cbd5e1', roughness: 0.6 }), []);

    return (
        <mesh geometry={geom} material={mat} receiveShadow castShadow />
    );
};

const PhysicsEngine = ({ isPlaying, onUpdateEnergy }) => {
    const skaterRef = useRef();
    const timeRef = useRef(0);
    
    // Parabola parameters
    const a = 0.2; // y = a * x^2
    const maxAmplitude = 4; // max X reach
    const maxH = a * Math.pow(maxAmplitude, 2);

    // We can simulate this simply using a cosine function for X position
    // x(t) = A * cos(w * t)
    // This isn't perfect non-linear pendulum physics, but visually excellent.
    const w = 2.5; // speed

    useFrame((state, delta) => {
        if (!isPlaying) return;
        timeRef.current += delta;

        const x = maxAmplitude * Math.cos(w * timeRef.current);
        const y = a * Math.pow(x, 2);
        
        // Tangent slope of parabola is dy/dx = 2ax
        const dy_dx = 2 * a * x;
        const angle = Math.atan(dy_dx);

        if (skaterRef.current) {
            skaterRef.current.position.set(x, y, 0);
            skaterRef.current.rotation.set(0, 0, angle);
        }

        // Calculate Energy
        // PE is proportional to height y. PE_max = maxH
        const PE_pct = (y / maxH) * 100;
        const KE_pct = 100 - PE_pct;
        
        // Throttle updates to React state slightly to avoid thrashing,
        // but passing 60fps might be fine for simple numbers.
        // We'll call onUpdateEnergy every frame.
        onUpdateEnergy({ PE: PE_pct, KE: KE_pct });
    });

    // Provide initial state ref to update without play
    useEffect(() => {
        if(!isPlaying) {
             const x = maxAmplitude * Math.cos(w * timeRef.current);
             const y = a * Math.pow(x, 2);
             const PE_pct = (y / maxH) * 100;
             const KE_pct = 100 - PE_pct;
             onUpdateEnergy({ PE: PE_pct, KE: KE_pct });
        }
    }, [isPlaying]);

    return (
        <group ref={skaterRef} position={[maxAmplitude, maxH, 0]} rotation={[0,0, Math.atan(2 * a * maxAmplitude)]}>
            <Skateboard position={[0,0,0]} rotation={[0,0,0]} />
        </group>
    );
};

export default function SimSkatepark3D() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [energy, setEnergy] = useState({ PE: 100, KE: 0 });

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '1.5rem', alignItems: 'stretch' }}>
            
            {/* 3D Simulation Container */}
            <div style={{ position: 'relative', height: '450px', background: 'linear-gradient(to top, #bae6fd, #e0f2fe)', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)' }}>
                <Canvas shadows camera={{ position: [0, 4, 12], fov: 45 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight 
                        position={[5, 10, 5]} 
                        intensity={1.2} 
                        castShadow 
                        shadow-mapSize={[1024, 1024]} 
                    />
                    
                    <group position={[0, -2, 0]}>
                        <Halfpipe />
                        <PhysicsEngine isPlaying={isPlaying} onUpdateEnergy={setEnergy} />
                    </group>

                    {/* Ground */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
                        <planeGeometry args={[100, 100]} />
                        <meshStandardMaterial color="#84cc16" />
                    </mesh>
                    
                    <OrbitControls 
                        target={[0, 0, 0]} 
                        enablePan={false}
                        maxPolarAngle={Math.PI / 2 - 0.05}
                    />
                </Canvas>

                {/* Play/Pause UI */}
                <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        style={{ padding: '0.8rem 2rem', fontSize: '1.2rem', background: isPlaying ? '#ef4444' : '#10b981', color: 'white', border: 'none', borderRadius: '2rem', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.1s' }}
                        onMouseDown={e => e.currentTarget.style.transform = 'translateX(-50%) translateY(2px)'}
                        onMouseUp={e => e.currentTarget.style.transform = 'translateX(-50%) translateY(0)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateX(-50%) translateY(0)'}
                    >
                        {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
                    </button>
                </div>
            </div>

            {/* Energy UI Panel */}
            <div style={{ background: 'white', borderRadius: '1.5rem', padding: '1.5rem', border: '2px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#0f172a', textAlign: 'center', fontSize: '1.2rem' }}>Energy Monitor</h3>
                
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '1.5rem', alignItems: 'flex-end', paddingBottom: '1rem', borderBottom: '2px dashed #e2e8f0' }}>
                    {/* PE Bar */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '60px' }}>
                        <div style={{ width: '40px', flexGrow: 1, background: '#f8fafc', borderRadius: '8px', position: 'relative', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                            <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${energy.PE}%`, background: '#3b82f6', transition: 'height 0.1s linear' }}></div>
                        </div>
                        <span style={{ fontWeight: 'bold', color: '#3b82f6', marginTop: '0.5rem' }}>PE</span>
                        <span style={{ fontSize: '0.9rem', color: '#64748b' }}>{Math.round(energy.PE)} J</span>
                    </div>
                    
                    {/* KE Bar */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '60px' }}>
                        <div style={{ width: '40px', flexGrow: 1, background: '#f8fafc', borderRadius: '8px', position: 'relative', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                            <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${energy.KE}%`, background: '#10b981', transition: 'height 0.1s linear' }}></div>
                        </div>
                        <span style={{ fontWeight: 'bold', color: '#10b981', marginTop: '0.5rem' }}>KE</span>
                        <span style={{ fontSize: '0.9rem', color: '#64748b' }}>{Math.round(energy.KE)} J</span>
                    </div>

                    {/* Total Energy Bar */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '60px' }}>
                        <div style={{ width: '40px', flexGrow: 1, background: '#f1f5f9', borderRadius: '8px', position: 'relative', overflow: 'hidden', border: '2px dashed #94a3b8' }}>
                            <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%', background: '#cbd5e1' }}></div>
                        </div>
                        <span style={{ fontWeight: 'bold', color: '#64748b', marginTop: '0.5rem' }}>Total</span>
                        <span style={{ fontSize: '0.9rem', color: '#64748b' }}>100 J</span>
                    </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#475569', fontWeight: 'bold' }}>Potential:</span>
                        <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>{Math.round(energy.PE)}%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#475569', fontWeight: 'bold' }}>Kinetic:</span>
                        <span style={{ color: '#10b981', fontWeight: 'bold' }}>{Math.round(energy.KE)}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
