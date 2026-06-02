import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 1. Clean & Subtle Steam Vapor
function SteamEffect() {
  const count = 12; 
  const meshRef = useRef();
  const dummy = new THREE.Object3D();
  
  const particles = React.useMemo(() => {
    const p = [];
    for (let i = 0; i < count; i++) {
      p.push({
        x: (Math.random() - 0.5) * 0.2,
        y: Math.random() * 0.8,
        z: (Math.random() - 0.5) * 0.2,
        speed: 0.005 + Math.random() * 0.005,
        scale: 0.03 + Math.random() * 0.05,
        seed: Math.random() * 100
      });
    }
    return p;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    particles.forEach((p, i) => {
      p.y += p.speed;
      p.x += Math.sin(t * 2 + p.seed) * 0.001;

      if (p.y > 0.8) {
        p.y = 0;
        p.x = (Math.random() - 0.5) * 0.2;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.scale * (1 - p.y / 1.0));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} position={[0, 0.15, 0]}>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshStandardMaterial 
        color="#ffffff" 
        transparent 
        opacity={0.06} 
        blending={THREE.AdditiveBlending} 
        depthWrite={false}
      />
    </instancedMesh>
  );
}

// 2. The Perfectly Tuned Teacup & Plate Component
function PerfectTeacup() {
  const groupRef = useRef();
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  const rotationProgress = useRef(0);
  const targetRotation = useRef(0);

  const handleCupClick = (e) => {
    e.stopPropagation();
    setClicked(!clicked);
    targetRotation.current += Math.PI * 2; // EXACTLY 1 full round (360 degrees)
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Smooth floating physics when hovered/clicked
    const targetY = clicked ? 0.5 : (hovered ? 0.1 : 0);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + Math.sin(t * 2.5) * 0.015, 0.1);

    // Controlled 1-round rotation execution
    rotationProgress.current = THREE.MathUtils.lerp(rotationProgress.current, targetRotation.current, 0.07);
    groupRef.current.rotation.y = rotationProgress.current;

    // Dynamic Pop Scale factor
    const targetScale = clicked ? 1.05 : (hovered ? 1.02 : 1.0);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1));
  });

  // MY COLOR CHOICE: Rich Liquid Titanium / Polished Champagne Gold Metallic
  const cupMaterial = (
    <meshStandardMaterial 
      color="#d4af37"       // Gorgeous Golden-Titanium Shimmer 
      roughness={0.03}      // Clean mirror shine reflection
      metalness={0.95}      // High metallic properties
      side={THREE.DoubleSide} 
    />
  );

  // Exact coordinates for a clean, structural dipping saucer plate
  const platePoints = React.useMemo(() => {
    return [
      new THREE.Vector2(0, -0.08),     
      new THREE.Vector2(0.5, -0.08),   
      new THREE.Vector2(0.6, -0.02),   // Hidden structural well depth under the cup
      new THREE.Vector2(1.5, 0.06),     
      new THREE.Vector2(1.65, 0.14),    
      new THREE.Vector2(1.63, 0.10),    
      new THREE.Vector2(0.0, -0.06),   
    ];
  }, []);

  return (
    <group>
      {/* --- MOVABLE / INTERACTIVE CUP SECTION --- */}
      <group 
        ref={groupRef}
        onClick={handleCupClick}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { setHovered(false); document.body.style.cursor = 'default'; }}
      >
        <Center>
          {/* Main Cup geometries with optimized depth values */}
          <mesh castShadow receiveShadow><cylinderGeometry args={[0.95, 0.6, 0.8, 64, 1, true]} />{cupMaterial}</mesh>
          <mesh position={[0, 0.01, 0]}><cylinderGeometry args={[0.92, 0.58, 0.78, 64, 1, true]} />{cupMaterial}</mesh>
          <mesh position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.935, 0.015, 16, 64]} />{cupMaterial}</mesh>
          <mesh position={[0, -0.4, 0]}><cylinderGeometry args={[0.6, 0.6, 0.02, 64]} />{cupMaterial}</mesh>
          <mesh position={[-0.8, 0, 0]} rotation={[0, 0, Math.PI / 4]} castShadow><torusGeometry args={[0.26, 0.05, 16, 64, Math.PI * 1.5]} />{cupMaterial}</mesh>
          
          {/* Perfectly recessed tea liquid position */}
          <mesh position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 0.01, 64]} />
            <meshStandardMaterial color="#2d1301" roughness={0.05} metalness={0.1} transparent opacity={0.98} />
          </mesh>
          
          <SteamEffect />

          {/* HTML Portfolio Message Reveal */}
          {clicked && (
            <Html position={[0, 1.1, 0]} center distanceFactor={5.0}>
              <div style={{
                background: '#111111', 
                color: '#ffffff',
                padding: '10px 20px',
                borderRadius: '25px',
                boxShadow: '0 8px 25px rgba(212, 175, 55, 0.25)',
                border: '1px solid #d4af37',
                whiteSpace: 'nowrap',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '0.3px',
                pointerEvents: 'none',
                animation: 'popupReveal 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
              }}>
                Come for the UI, stay for the biscuit dipping.
                <style>{`
                  @keyframes popupReveal {
                    from { opacity: 0; transform: translateY(12px) scale(0.45); }
                    to { opacity: 1; transform: translateY(0) scale(0.5); }
                  }
                `}</style>
              </div>
            </Html>
          )}
        </Center>
      </group>

      {/* --- STATIONARY MATTE OBSIDIAN BLACK PLATE --- */}
      <mesh position={[0, -0.38, 0]} castShadow receiveShadow>
        <latheGeometry args={[platePoints, 64]} />
        <meshStandardMaterial 
          color="#121212"       // Sleek Matte Black
          roughness={0.4}       // Smooth surface without intense glaring reflections
          metalness={0.1} 
        />
      </mesh>
    </group>
  );
}

// 3. Complete Tiny Scene Canvas View
export default function PortfolioTeaScene() {
  return (
    <div style={{ width: '100%', height: '350px', background: 'transparent' }}>
      <Canvas camera={{ position: [0, 1.8, 3.4], fov: 38 }} shadows>
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 8, 3]} intensity={2.0} castShadow />
        <pointLight position={[-5, 4, -3]} intensity={1.0} color="#ffffff" />

        {/* COMPACT COMPONENT SCALE LAYER FOR PERFECT WEBSITE UI BLOCK PLACEMENT */}
        <group scale={[0.5, 0.5, 0.5]} position={[0, -0.15, 0]}>
          <PerfectTeacup />
        </group>

        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={1.5}
          maxDistance={4.5}
          maxPolarAngle={Math.PI / 2.05} 
        />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}