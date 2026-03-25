import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Low-Poly Person
const Person3D = ({ isPushing, targetType, pebblePosition }) => {
  const groupRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const torsoRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();

  useFrame((state, delta) => {
    // Determine base position and rotation based on target and pushing state
    const targetZ = targetType === 'wall' ? 2 : (2 - pebblePosition * 0.05);
    const targetLean = isPushing ? 0.4 : 0.1;
    const targetArmRot = isPushing ? -Math.PI / 2 + 0.2 : -Math.PI / 4;
    
    // Smoothly interpolate
    if (groupRef.current) {
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 10 * delta);
        torsoRef.current.rotation.x = THREE.MathUtils.lerp(torsoRef.current.rotation.x, targetLean, 10 * delta);
    }
    
    // Animate arms pushing
    if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, targetArmRot, 15 * delta);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, targetArmRot, 15 * delta);
        
        // Slight shake if pushing wall (exhaustion effect)
        if (isPushing && targetType === 'wall') {
            leftArmRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 20) * 0.05;
            rightArmRef.current.rotation.z = -Math.sin(state.clock.elapsedTime * 20) * 0.05;
        } else {
            leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0, 5 * delta);
            rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0, 5 * delta);
        }
    }

    // Animate legs (walking effect if moving)
    if (leftLegRef.current && rightLegRef.current && targetType === 'pebble' && isPushing) {
        leftLegRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 15) * 0.3;
        rightLegRef.current.rotation.x = -Math.sin(state.clock.elapsedTime * 15) * 0.3;
    } else {
        leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, isPushing ? -0.2 : 0, 5 * delta);
        rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, isPushing ? 0.2 : 0, 5 * delta);
    }
  });

  // Materials
  const skinMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#fcd34d', roughness: 0.6 }), []);
  const shirtMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#3b82f6', roughness: 0.8 }), []);
  const pantsMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.9 }), []);
  const shoeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.8 }), []);

  return (
    <group ref={groupRef} position={[0, 0, 2]} rotation={[0, Math.PI, 0]}> {/* Facing negative Z */}
      {/* Torso container for leaning */}
      <group ref={torsoRef} position={[0, 1.2, 0]}>
        {/* Body */}
        <mesh material={shirtMat} position={[0, 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 1.2, 0.4]} />
        </mesh>
        
        {/* Head */}
        <mesh material={skinMat} position={[0, 1.1, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
        </mesh>

        {/* Left Arm Pivot */}
        <group ref={leftArmRef} position={[0.45, 0.8, 0]}>
            <mesh material={skinMat} position={[0, -0.4, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.2, 0.9, 0.2]} />
            </mesh>
        </group>

        {/* Right Arm Pivot */}
        <group ref={rightArmRef} position={[-0.45, 0.8, 0]}>
            <mesh material={skinMat} position={[0, -0.4, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.2, 0.9, 0.2]} />
            </mesh>
        </group>
      </group>

      {/* Legs (Not part of torso lean) */}
      <group ref={leftLegRef} position={[0.2, 1.2, 0]}>
          <mesh material={pantsMat} position={[0, -0.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.25, 1.0, 0.3]} />
          </mesh>
          <mesh material={shoeMat} position={[0, -1.1, 0.1]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.2, 0.4]} />
          </mesh>
      </group>

      <group ref={rightLegRef} position={[-0.2, 1.2, 0]}>
          <mesh material={pantsMat} position={[0, -0.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.25, 1.0, 0.3]} />
          </mesh>
          <mesh material={shoeMat} position={[0, -1.1, 0.1]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.2, 0.4]} />
          </mesh>
      </group>
    </group>
  );
};

const Wall3D = () => {
  // A simplistic brick wall composed of instanced or just one large textured box
  const brickMat = useMemo(() => new THREE.MeshStandardMaterial({ 
      color: '#b91c1c', 
      roughness: 0.9, 
      bumpScale: 0.02 
  }), []);

  return (
    <group position={[0, 1.5, -0.5]}>
      <mesh material={brickMat} castShadow receiveShadow>
        <boxGeometry args={[4, 3, 0.5]} />
      </mesh>
      {/* Decorative lines to imply bricks */}
      <gridHelper args={[4, 8, '#7f1d1d', '#7f1d1d']} position={[0, 0, 0.26]} rotation={[Math.PI/2, 0, 0]} />
    </group>
  );
};

const Pebble3D = ({ pebblePosition }) => {
    const rockRef = useRef();

    useFrame((state, delta) => {
        const targetZ = -0.5 - (pebblePosition * 0.05); // Move forward along Z
        if (rockRef.current) {
            rockRef.current.position.z = THREE.MathUtils.lerp(rockRef.current.position.z, targetZ, 10 * delta);
            // Roll the rock
            rockRef.current.rotation.x = -rockRef.current.position.z * 2;
        }
    });

    return (
        <mesh ref={rockRef} position={[0, 0.5, -0.5]} castShadow receiveShadow>
            <dodecahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial color="#64748b" roughness={0.8} />
        </mesh>
    );
};


export default function SimPushWall3D({ targetType, isPushing, pebblePosition, wallStamina }) {
  return (
    <div style={{ width: '100%', height: '350px', background: 'linear-gradient(to top, #e2e8f0, #f8fafc)', borderRadius: '1rem', overflow: 'hidden', border: 'inset 4px #cbd5e1' }}>
      <Canvas shadows camera={{ position: [4, 3, 5], fov: 45 }}>
        
        <ambientLight intensity={0.5} />
        <directionalLight 
            position={[5, 10, 5]} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize-width={1024} 
            shadow-mapSize-height={1024} 
        />
        <pointLight position={[-3, 5, 3]} intensity={0.5} color="#3b82f6" />
        
        <group position={[0, -0.5, 0]}>
            {/* The character */}
            <Person3D isPushing={isPushing} targetType={targetType} pebblePosition={pebblePosition} />
            
            {/* The Target */}
            {targetType === 'wall' ? <Wall3D /> : <Pebble3D pebblePosition={pebblePosition} />}
            
            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#cbd5e1" roughness={1} />
            </mesh>
        </group>

        {/* Soft shadow under elements */}
        <ContactShadows position={[0, -0.49, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        
        <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            minDistance={3}
            maxDistance={10}
            maxPolarAngle={Math.PI / 2 + 0.1} // Prevent going below ground significantly
        />
      </Canvas>
    </div>
  );
}
