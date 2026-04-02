import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';

const Car3D = ({ mass, carStateRef, impactEnergy, isHit }) => {
    const groupRef = useRef();
    const wheelsRef = useRef([]);
    const bodyRef = useRef();
    const cabinRef = useRef();
    const fireMeshRef = useRef();

    const scale = 1 + (mass / 50) * 0.5;
    const isMonster = mass >= 36;
    
    // Geometry parameters based on mass type
    const wheelR = isMonster ? 0.45 : 0.2;
    const wheelW = isMonster ? 0.35 : 0.1;
    const wheelY = isMonster ? 0.45 : 0.2;
    const bodyY = isMonster ? 1.1 : 0.4;
    const cabinY = isMonster ? 1.5 : 0.8;

    useFrame((state, delta) => {
        if (groupRef.current && carStateRef && carStateRef.current) {
            const { x, y, rotZ, vel, phase } = carStateRef.current;
            groupRef.current.position.x = x;
            groupRef.current.position.y = y;
            groupRef.current.rotation.z = rotZ;

            // Rotate wheels based on speed visually
            wheelsRef.current.forEach(w => {
                 if(w) w.rotation.y -= (vel * delta) / (wheelR * scale); 
            });
            if (phase === 'resetting') {
                 wheelsRef.current.forEach(w => {
                     if(w) w.rotation.y += 2 * delta / scale; 
                 });
            }
        }

        // Apply damage visually
        if (bodyRef.current && cabinRef.current) {
            const isNormalCrash = impactEnergy > 0 && isHit && !isMonster;
            const damageTarget = isNormalCrash ? Math.min(impactEnergy / 5000, 1) : 0;
            
            bodyRef.current.scale.x = THREE.MathUtils.lerp(bodyRef.current.scale.x, 1 - damageTarget * 0.4, 5 * delta);
            bodyRef.current.position.x = THREE.MathUtils.lerp(bodyRef.current.position.x, damageTarget * 0.4, 5 * delta);
            cabinRef.current.rotation.z = THREE.MathUtils.lerp(cabinRef.current.rotation.z, -damageTarget * 0.2, 5 * delta);
        }
        
        // Flicker Fire
        if (fireMeshRef.current && impactEnergy > 4000 && isHit && !isMonster) {
             fireMeshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 20) * 0.1);
        }
    });

    return (
        <group ref={groupRef} position={[-8, 0, 0]} scale={[scale, scale, scale]}>
            {/* Car Body */}
            <mesh ref={bodyRef} position={[0, bodyY, 0]} castShadow receiveShadow>
                <boxGeometry args={[2, 0.5, 1]} />
                <meshStandardMaterial color={(impactEnergy > 2000 && isHit && !isMonster) ? "#7f1d1d" : "#ef4444"} />
            </mesh>
            {/* Car Cabin */}
            <mesh ref={cabinRef} position={[-0.2, cabinY, 0]} castShadow receiveShadow>
                <boxGeometry args={[1, 0.4, 0.9]} />
                <meshStandardMaterial color={(impactEnergy > 2000 && isHit && !isMonster) ? "#450a0a" : "#b91c1c"} />
            </mesh>

            {/* Fire and Smoke if severely damaged (e.g. energy > 4000) */}
            <group scale={(impactEnergy > 4000 && isHit && !isMonster) ? 1 : 0}>
                <group position={[0.5, bodyY + 0.6, 0]}>
                    <mesh ref={fireMeshRef} position={[0, 0.5, 0]}>
                        <sphereGeometry args={[0.5 + Math.min(impactEnergy/5000, 1) * 0.5, 8, 8]} />
                        <meshBasicMaterial color="#ea580c" transparent opacity={0.8} />
                    </mesh>
                    <mesh position={[0.2, 1.2, 0]}>
                        <sphereGeometry args={[0.8 + Math.min(impactEnergy/5000, 1) * 0.5, 8, 8]} />
                        <meshBasicMaterial color="#334155" transparent opacity={0.6} />
                    </mesh>
                </group>
            </group>

            {/* Wheels */}
            {[
                [-0.6, wheelY, 0.5 + (isMonster ? 0.1 : 0)],
                [0.6, wheelY, 0.5 + (isMonster ? 0.1 : 0)],
                [-0.6, wheelY, -0.5 - (isMonster ? 0.1 : 0)],
                [0.6, wheelY, -0.5 - (isMonster ? 0.1 : 0)]
            ].map((pos, i) => (
                <mesh key={i} position={pos} rotation={[Math.PI / 2, 0, 0]} ref={el=>wheelsRef.current[i]=el} castShadow>
                    <cylinderGeometry args={[wheelR, wheelR, wheelW, 16]} />
                    <meshStandardMaterial color="#1e293b" />
                    {/* Visual Spokes */}
                    <mesh rotation={[0, 0, 0]}>
                        <boxGeometry args={[wheelR * 1.9, 0.05, wheelW + 0.05]} />
                        <meshStandardMaterial color="#cbd5e1" />
                    </mesh>
                    <mesh rotation={[0, Math.PI / 2, 0]}>
                        <boxGeometry args={[wheelR * 1.9, 0.05, wheelW + 0.05]} />
                        <meshStandardMaterial color="#cbd5e1" />
                    </mesh>
                </mesh>
            ))}
        </group>
    );
};

const Block3D = ({ isHit, impactEnergy, mass, resetFlag }) => {
    const groupRef = useRef();
    const isMonster = mass >= 36;

    useEffect(() => {
        if (resetFlag > 0 && groupRef.current) {
            groupRef.current.position.x = 8;
            groupRef.current.position.y = 0.5;
            groupRef.current.rotation.z = 0;
            groupRef.current.scale.set(1, 1, 1);
        }
    }, [resetFlag]);

    useFrame((state, delta) => {
        if (groupRef.current && isHit) {
            const impactVel = Math.sqrt((impactEnergy * 2) / mass) || 0;
            const isHighSpeedMonster = isMonster && impactVel > 4;
            const isLowSpeedMonster = isMonster && impactVel <= 4;
            
            // Animate block being pushed and rotating based on impact energy
            const squish = isHighSpeedMonster ? Math.min(impactEnergy / 5000, 0.8) : (isLowSpeedMonster ? 0.1 : Math.min(impactEnergy / 10000, 0.4));
            
            groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, 1 - squish, 5 * delta);
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0.5 - (squish / 2), 5 * delta);
            
            if (!isHighSpeedMonster) {
                const pushAmount = isLowSpeedMonster ? impactVel / 1.5 : impactEnergy / 200;
                groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 8 + pushAmount, 5 * delta);
                groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, isLowSpeedMonster ? 0 : -impactEnergy / 800, 5 * delta);
            }
        }
    });

    return (
        <group ref={groupRef} position={[8, 0.5, 0]}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={isHit ? "#854d0e" : "#ca8a04"} roughness={0.8} />
            </mesh>
        </group>
    );
};

const Scene3D = ({ mass, velocity, isCrashing, onCrashEnd, setImpactEnergy, impactEnergy, resetFlag }) => {
    const startX = -8;
    const carStateRef = useRef({ x: startX, y: 0, rotZ: 0, vel: 0, phase: 'idle' });
    const [isHit, setIsHit] = useState(false);
    const hasEndedRef = useRef(false);

    useEffect(() => {
        if (isCrashing) {
            hasEndedRef.current = false;
            setIsHit(false);
            carStateRef.current = { x: startX, y: 0, rotZ: 0, vel: velocity, phase: 'crashing' };
            setImpactEnergy(0);
        }
    }, [isCrashing, velocity, setImpactEnergy, startX]);

    useEffect(() => {
        if (resetFlag > 0) {
            hasEndedRef.current = false;
            setIsHit(false);
            carStateRef.current = { x: startX, y: 0, rotZ: 0, vel: 0, phase: 'resetting' };
            setImpactEnergy(0);
        }
    }, [resetFlag, setImpactEnergy]);

    useFrame((state, delta) => {
        const dt = Math.min(delta, 0.05);

        if (isCrashing && carStateRef.current.phase === 'crashing' && !hasEndedRef.current) {
            let { x, y, rotZ, vel } = carStateRef.current;
            const isMonster = mass >= 36;
            let ended = false;
            
            // Apply friction
            const deceleration = 1.0;
            if (vel > 0) {
                vel -= deceleration * dt;
                if (vel < 0) vel = 0;
            }

            x += vel * dt;

            // Block is at x=8. Car half-width depends on scale
            const scale = 1 + (mass / 50) * 0.5;
            const carHalfWidth = 1 * scale;
            const blockEdge = 8 - 0.5 - carHalfWidth;

            if (x >= blockEdge) {
                if (!isHit) {
                    setIsHit(true);
                    const impactVel = vel;
                    const energy = 0.5 * mass * (impactVel * impactVel);
                    setImpactEnergy(energy);
                }

                if (isMonster) {
                    const currentImpactVel = Math.sqrt((impactEnergy || (0.5 * mass * vel * vel)) * 2 / mass);
                    
                    if (currentImpactVel > 4) {
                        // High speed - crush and drive over (No jump/backflip as requested)
                        const overShoot = x - blockEdge;
                        if (overShoot < 2) {
                            y = 0.3; // Ride on squished box
                            rotZ = 0.05;
                        } else {
                            y = 0;
                            rotZ = 0;
                            if (vel <= 0) ended = true;
                        }
                    } else {
                        // Normal speed - push the block forward
                        y = 0;
                        rotZ = 0;
                        vel -= 3 * dt; // Heavy deceleration for pushing block
                        if (vel <= 0) { 
                            vel = 0; 
                            ended = true; 
                        }
                        // Allow the monster truck to advance slightly along with the pushed block
                        const pushAmount = currentImpactVel / 1.5;
                        if (x > blockEdge + pushAmount) {
                            x = blockEdge + pushAmount;
                        }
                    }
                } else {
                    // Normal car stops AT the block
                    x = blockEdge;
                    vel = 0;
                    ended = true;
                }
            } else if (vel <= 0) {
                // Stopped early
                vel = 0;
                ended = true;
            }

            carStateRef.current = { x, y, rotZ, vel, phase: ended ? 'idle' : 'crashing' };

            if (ended) {
                hasEndedRef.current = true;
                setTimeout(() => onCrashEnd(), 1000);
            }
        } else if (carStateRef.current.phase === 'resetting') {
            carStateRef.current.x = THREE.MathUtils.lerp(carStateRef.current.x, startX, 5 * dt);
            carStateRef.current.y = THREE.MathUtils.lerp(carStateRef.current.y, 0, 5 * dt);
            carStateRef.current.rotZ = THREE.MathUtils.lerp(carStateRef.current.rotZ, 0, 5 * dt);
        }
    });

    return (
        <group>
            {/* Replace old Car3D with corrected props passing */}
            <Car3D mass={mass} carStateRef={carStateRef} impactEnergy={impactEnergy} isHit={isHit} resetFlag={resetFlag} />
            <Block3D isHit={isHit} impactEnergy={impactEnergy} mass={mass} resetFlag={resetFlag} />
            
            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[40, 10]} />
                <meshStandardMaterial color="#94a3b8" />
            </mesh>
            
            <ContactShadows position={[0, 0.01, 0]} opacity={0.5} scale={20} blur={2} far={4} />

            {/* Distance Markers */}
            {Array.from({ length: 9 }).map((_, i) => {
                const dist = startX + i * 2;
                return (
                    <group key={i} position={[dist, 0.01, 1.5]}>
                        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                            <planeGeometry args={[0.05, 1]} />
                            <meshStandardMaterial color="#cbd5e1" />
                        </mesh>
                        <Text position={[0, 0.05, 1]} rotation={[-Math.PI/2, 0, 0]} fontSize={0.4} color="#475569" anchorX="center" anchorY="middle">
                            {i * 2}m
                        </Text>
                    </group>
                )
            })}
        </group>
    );
};

export default function SimCrash3DContainer({ mass, velocity, isCrashing, onCrashEnd }) {
    const [impactEnergy, setImpactEnergy] = useState(0);
    const [resetFlag, setResetFlag] = useState(0);

    const handleReset = () => {
        setResetFlag(prev => prev + 1);
        if (onCrashEnd) onCrashEnd();
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '350px', background: '#e0f2fe', borderRadius: '1rem', overflow: 'hidden', border: '4px solid #bfdbfe' }}>
            {/* Action Bar */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}>
                <button 
                    onClick={handleReset}
                    style={{ padding: '0.8rem 1.5rem', background: '#e2e8f0', color: '#475569', border: 'none', borderRadius: '0.8rem', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 0 #cbd5e1' }}
                >
                    🔄 Reset Position
                </button>
            </div>

            <Canvas shadows camera={{ position: [0, 4, 12], fov: 45 }}>
                <ambientLight intensity={0.7} />
                <directionalLight 
                    position={[5, 10, 5]} 
                    intensity={1.5} 
                    castShadow 
                    shadow-mapSize-width={1024} 
                    shadow-mapSize-height={1024} 
                />
                
                <Scene3D 
                    mass={mass} 
                    velocity={velocity} 
                    isCrashing={isCrashing} 
                    onCrashEnd={onCrashEnd}
                    impactEnergy={impactEnergy}
                    setImpactEnergy={setImpactEnergy}
                    resetFlag={resetFlag}
                />

                <OrbitControls 
                    enablePan={false} 
                    minDistance={5}
                    maxDistance={20}
                    maxPolarAngle={Math.PI / 2 - 0.1} 
                />
            </Canvas>

            {impactEnergy > 0 && (
                <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.9)', padding: '1rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '2px solid #f87171' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#dc2626' }}>Impact Energy!</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#b91c1c' }}>{impactEnergy.toFixed(1)} J</div>
                </div>
            )}
            
            {isCrashing && impactEnergy === 0 && (
                <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '2rem' }}>
                    Testing...
                </div>
            )}
        </div>
    );
}