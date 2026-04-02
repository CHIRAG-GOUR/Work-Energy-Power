import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';

const LifterAndBarbell = ({ mass, liftTime, isLifting, onLiftComplete }) => {
    const groupRef = useRef();
    const torsoRef = useRef();
    const leftLegRef = useRef();
    const rightLegRef = useRef();
    const leftArmRef = useRef();
    const rightArmRef = useRef();
    const barbellRef = useRef();
    const handTargetRef = useRef();
    
    // Animation state
    const progressRef = useRef(0);
    const barbellWorldPos = useRef(new THREE.Vector3());
    
    // Rendering exact plate numbers accurately
    const numPlates = Math.max(1, Math.floor(mass / 20));

    useEffect(() => {
        if (!isLifting) {
            progressRef.current = 0;
            // Snatch starting position
            if (torsoRef.current) torsoRef.current.position.y = 0.3;
            if (leftLegRef.current) { leftLegRef.current.scale.y = 0.3; leftLegRef.current.position.z = 0; }
            if (rightLegRef.current) { rightLegRef.current.scale.y = 0.3; rightLegRef.current.position.z = 0; }
            if (leftArmRef.current) leftArmRef.current.rotation.x = Math.PI;
            if (rightArmRef.current) rightArmRef.current.rotation.x = Math.PI;
            if (barbellRef.current) {
                barbellRef.current.position.y = 0.2; // On the floor
                barbellRef.current.position.z = 0;
            }
        }
    }, [isLifting]);

    useFrame((state, delta) => {
        let p = progressRef.current;
        if (isLifting && p < 1) {
            p += delta / liftTime;
            if (p >= 1) {
                p = 1;
                onLiftComplete();
            }
            progressRef.current = p;
        }

        let torsoY = 0.3;
        let armRotX = Math.PI; // straight down
        
        let leftLegScale = 0.3;
        let rightLegScale = 0.3;
        let leftLegZ = 0;
        let rightLegZ = 0;

        if (p < 0.3) {
            // Stage 1: Pull from ground to hips
            const t = THREE.MathUtils.smoothstep(p / 0.3, 0, 1);
            torsoY = THREE.MathUtils.lerp(0.3, 1.2, t);
            leftLegScale = rightLegScale = torsoY;
            leftLegZ = rightLegZ = 0;
            armRotX = Math.PI; // Keep arms pulled down
        } else if (p < 0.6) {
            // Stage 2: "Sit on one leg" (Split Jerk Catch) under the barbell
            torsoY = 1.2;
            const t = THREE.MathUtils.smoothstep((p - 0.3) / 0.3, 0, 1);
            
            // Dip body
            torsoY = THREE.MathUtils.lerp(1.2, 0.7, t);
            
            // Split legs! 
            // Left leg steps forward and bends
            leftLegScale = THREE.MathUtils.lerp(1.2, 0.8, t);
            leftLegZ = THREE.MathUtils.lerp(0, 0.4, t);
            
            // Right leg steps far back, bends deeply
            rightLegScale = THREE.MathUtils.lerp(1.2, 0.5, t);
            rightLegZ = THREE.MathUtils.lerp(0, -0.6, t);

            // Arms whip up under the bar to catch on chest
            armRotX = THREE.MathUtils.lerp(Math.PI, 0.2, t);
        } else {
            // Stage 3: Recovery and final press overhead
            
            const t = THREE.MathUtils.smoothstep((p - 0.6) / 0.4, 0, 1);
            // Torso stands back up to 1.3
            torsoY = THREE.MathUtils.lerp(0.7, 1.3, t);
            
            // Legs return to standing together
            leftLegScale = THREE.MathUtils.lerp(0.8, 1.3, t);
            rightLegScale = THREE.MathUtils.lerp(0.5, 1.3, t);
            leftLegZ = THREE.MathUtils.lerp(0.4, 0, t);
            rightLegZ = THREE.MathUtils.lerp(-0.6, 0, t);

            // Arm swinging straight overhead
            armRotX = THREE.MathUtils.lerp(0.2, -0.2, t);
        }

        if (torsoRef.current) torsoRef.current.position.y = torsoY;
        
        if (leftLegRef.current) {
            leftLegRef.current.scale.y = leftLegScale;
            leftLegRef.current.position.z = leftLegZ;
        }
        if (rightLegRef.current) {
            rightLegRef.current.scale.y = rightLegScale;
            rightLegRef.current.position.z = rightLegZ;
        }

        if (leftArmRef.current) leftArmRef.current.rotation.x = armRotX;
        if (rightArmRef.current) rightArmRef.current.rotation.x = armRotX;

        // Perfectly sync Barbell Object to Hand World Vector Position
        if (handTargetRef.current && barbellRef.current) {
            handTargetRef.current.getWorldPosition(barbellWorldPos.current);
            // Lock the X so it stays perfectly horizontal, follow purely the Y,Z of hand arc
            barbellRef.current.position.x = 0;
            barbellRef.current.position.y = barbellWorldPos.current.y;
            barbellRef.current.position.z = barbellWorldPos.current.z;
            
            // Struggle/jitter effect for heavy loads overhead
            if (mass > 50 && p > 0.6) {
                const struggle = (mass - 50) / 100;
                barbellRef.current.position.x = Math.sin(state.clock.elapsedTime * 40) * 0.05 * struggle;
            }
        }
    });

    return (
        <group ref={groupRef}>
            {/* The Robot Lifter Hierarchy */}
            <group position={[0, 0, 0]}>
                
                {/* Legs fixed to Ground, expanding upwards. Left and Right separated for split jerk */}
                <group position={[0, 0, 0]}>
                    <mesh ref={leftLegRef} position={[-0.3, 0, 0]} castShadow receiveShadow>
                        <boxGeometry args={[0.3, 1, 0.4]} />
                        <meshStandardMaterial color="#1e293b" />
                        {/* We offset geometry up by 0.5 so scaling acts strictly upwards from y=0 */}
                        <group position={[0, 0.5, 0]} /> 
                    </mesh>
                    <mesh ref={rightLegRef} position={[0.3, 0, 0]} castShadow receiveShadow>
                        <boxGeometry args={[0.3, 1, 0.4]} />
                        <meshStandardMaterial color="#1e293b" />
                    </mesh>
                </group>
                
                {/* Torso floating seamlessly based on Leg scale */}
                <group ref={torsoRef} position={[0, 0.5, 0]}>
                    {/* Chest */}
                    <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
                        <boxGeometry args={[1, 1.2, 0.6]} />
                        <meshStandardMaterial color="#3b82f6" />
                    </mesh>
                    {/* Head */}
                    <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
                        <boxGeometry args={[0.8, 0.8, 0.8]} />
                        <meshStandardMaterial color="#cbd5e1" />
                    </mesh>
                    <group position={[0, 1.6, 0.41]}>
                        <mesh position={[-0.2, 0.1, 0]}><planeGeometry args={[0.15, 0.15]} /><meshBasicMaterial color={isLifting ? "#ef4444" : "#10b981"} /></mesh>
                        <mesh position={[0.2, 0.1, 0]}><planeGeometry args={[0.15, 0.15]} /><meshBasicMaterial color={isLifting ? "#ef4444" : "#10b981"} /></mesh>
                        <mesh position={[0, -0.2, 0]}><planeGeometry args={[0.4, 0.1]} /><meshBasicMaterial color="#1e293b" /></mesh>
                    </group>
                    
                    {/* Left Arm pivoting perfectly at the shoulder socket */}
                    <group ref={leftArmRef} position={[-0.7, 1.1, 0]}>
                        <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
                            <cylinderGeometry args={[0.15, 0.15, 1.2]} />
                            <meshStandardMaterial color="#94a3b8" />
                        </mesh>
                        {/* Invisible Hand Target Tracker */}
                        <group ref={handTargetRef} position={[0, -1.2, 0]} />
                    </group>
                    
                    {/* Right Arm */}
                    <group ref={rightArmRef} position={[0.7, 1.1, 0]}>
                        <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
                            <cylinderGeometry args={[0.15, 0.15, 1.2]} />
                            <meshStandardMaterial color="#94a3b8" />
                        </mesh>
                    </group>
                </group>
            </group>

            {/* The Barbell rendering dynamically at the root to avoid X/Z rotation clipping */}
            <group ref={barbellRef} position={[0, 0.2, 0]}>
                <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.07, 0.07, 4.5]} />
                    <meshStandardMaterial color="#e2e8f0" metalness={0.8} />
                </mesh>
                {/* Left Offset Plates */}
                {Array.from({ length: numPlates }).map((_, i) => (
                    <mesh key={`L-${i}`} position={[-1.7 + i * 0.15, 0, 0]} rotation={[Math.PI / 2, Math.PI / 2, 0]} castShadow receiveShadow>
                        <cylinderGeometry args={[0.45, 0.45, 0.1]} />
                        <meshStandardMaterial color="#1e293b" />
                    </mesh>
                ))}
                {/* Right Offset Plates */}
                {Array.from({ length: numPlates }).map((_, i) => (
                    <mesh key={`R-${i}`} position={[1.7 - i * 0.15, 0, 0]} rotation={[Math.PI / 2, Math.PI / 2, 0]} castShadow receiveShadow>
                        <cylinderGeometry args={[0.45, 0.45, 0.1]} />
                        <meshStandardMaterial color="#1e293b" />
                    </mesh>
                ))}
            </group>
        </group>
    );
};

export default function SimWeightlifter3DContainer() {
    const [mass, setMass] = useState(50); // kg
    const [liftTime, setLiftTime] = useState(2); // seconds
    const [isLifting, setIsLifting] = useState(false);
    const [powerLog, setPowerLog] = useState(0);

    const height = 2; // meters
    const gravity = 10; // m/s^2 (simplified)
    const work = mass * gravity * height; // Joules
    const power = work / liftTime; // Watts

    const handleLift = () => {
        setIsLifting(true);
        setPowerLog(0);
    };

    const handleComplete = () => {
        setPowerLog(power);
        setTimeout(() => setIsLifting(false), 2000); // auto reset after 2s
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '2rem', background: '#0f172a', padding: '2rem', borderRadius: '1.5rem', color: 'white', border: '4px solid #f59e0b' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ margin: 0, color: '#fcd34d', fontSize: '1.8rem' }}>1. The Power Lifter</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>Control the robot's lifting specs. High mass in a short time generates massive power!</p>
                
                <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '1rem' }}>
                    <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        <span>Mass (kg)</span>
                        <span style={{ color: '#fbbf24' }}>{mass} kg</span>
                    </label>
                    <input type="range" min="10" max="150" step="10" value={mass} onChange={e => setMass(Number(e.target.value))} disabled={isLifting} style={{ width: '100%', accentColor: '#fbbf24' }} />
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>Work Required: {work} J</div>
                </div>

                <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '1rem' }}>
                    <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        <span>Lift Time (s)</span>
                        <span style={{ color: '#34d399' }}>{liftTime} s</span>
                    </label>
                    <input type="range" min="0.5" max="5" step="0.5" value={liftTime} onChange={e => setLiftTime(Number(e.target.value))} disabled={isLifting} style={{ width: '100%', accentColor: '#34d399' }} />
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>Target Power: {power.toFixed(0)} W</div>
                </div>

                <button 
                    onClick={handleLift} 
                    disabled={isLifting}
                    style={{ padding: '1rem', fontSize: '1.2rem', fontWeight: 'bold', background: isLifting ? '#475569' : '#eab308', color: '#1e293b', border: 'none', borderRadius: '1rem', cursor: isLifting ? 'not-allowed' : 'pointer', boxShadow: isLifting ? 'none' : '0 4px 0 #a16207' }}
                >
                    {isLifting ? 'LIFTING...' : '⚙️ INITIATE LIFT'}
                </button>
                
                {powerLog > 0 && (
                    <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '2px solid #10b981', padding: '1rem', borderRadius: '1rem', textAlign: 'center', animation: 'pulse 1s' }}>
                        <div style={{ color: '#34d399', fontSize: '0.9rem', fontWeight: 'bold' }}>MAX OUTPUT GENERATED</div>
                        <div style={{ color: 'white', fontSize: '2.5rem', fontWeight: '900' }}>{powerLog.toFixed(0)} W</div>
                    </div>
                )}
            </div>

            <div style={{ position: 'relative', height: '400px', background: 'radial-gradient(circle at center, #334155, #0f172a)', borderRadius: '1rem', overflow: 'hidden', border: '2px solid #334155' }}>
                <Canvas shadows camera={{ position: [5, 3, 6], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
                    
                    <LifterAndBarbell mass={mass} liftTime={liftTime} isLifting={isLifting} onLiftComplete={handleComplete} />
                    
                    {/* Platform */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                        <planeGeometry args={[10, 10]} />
                        <meshStandardMaterial color="#334155" roughness={0.9} />
                    </mesh>
                    <gridHelper args={[10, 10, 0x475569, 0x1e293b]} position={[0, 0.01, 0]} />

                    <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2 - 0.1} minDistance={3} maxDistance={15} />
                </Canvas>
            </div>
        </div>
    );
}