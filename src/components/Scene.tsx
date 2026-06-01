import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Line, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';

const cards = [
  { title: "MCA", position: [0, 2, -2] },
  { title: "Web Development", position: [2, 3, -4] },
  { title: "AI Engineer", position: [3, 0, -1] },
  { title: "Cyber Security", position: [1, -2, 1] },
  { title: "Data Analytics", position: [0, -1, 2] },
  { title: "NIMCET", position: [-1, 0, 0] },
];

// Generates glowing connection lines between cards
const ConnectionLines = () => {
  const points = useMemo(() => {
    // Creating a path that visits all cards
    const pts = cards.map(c => new THREE.Vector3(...c.position));
    // Close the loop
    pts.push(new THREE.Vector3(...cards[0].position));
    
    // Create a smooth spline curve
    const curve = new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.5);
    return curve.getPoints(100);
  }, []);

  const lineRef = useRef<any>(null);

  useFrame((state) => {
    if (lineRef.current) {
      // Pulse effect on the material opacity
      lineRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={points}
      color="#8B5CF6"
      lineWidth={2}
      transparent
      opacity={0.5}
      dashed={false}
    />
  );
};

// Abstract central core to represent the "Student" or "Starting Point"
const CentralCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial 
          color="#050505" 
          emissive="#8B5CF6" 
          emissiveIntensity={0.5} 
          wireframe={true} 
          transparent 
          opacity={0.8}
        />
      </mesh>
      {/* Inner solid core */}
      <mesh>
        <octahedronGeometry args={[0.4]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.5} />
      </mesh>
    </Float>
  );
};

// Floating Cards positioned in 3D space
const FloatingCards = () => {
  return (
    <>
      {cards.map((card, idx) => (
        <Float key={idx} speed={1.5 + idx * 0.2} rotationIntensity={0.2} floatIntensity={0.5}>
          <group position={new THREE.Vector3(...card.position)}>
            {/* Glowing orb behind the card */}
            <mesh position={[0, 0, -0.1]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshBasicMaterial color="#8B5CF6" transparent opacity={0.15} />
            </mesh>
            <Html center transform sprite>
              <div className="bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg whitespace-nowrap text-white text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                {card.title}
              </div>
            </Html>
          </group>
        </Float>
      ))}
    </>
  );
};

const Scene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  // Calculate position based on viewport to avoid overlapping text
  const isMobile = viewport.width < 8;
  const targetPosition = isMobile ? new THREE.Vector3(0, -3, -4) : new THREE.Vector3(3.5, 0, 0);

  // Subtle mouse follow effect for the entire scene
  useFrame((state) => {
    if (groupRef.current) {
      // Smoothly move group to target position
      groupRef.current.position.lerp(targetPosition, 0.05);

      // Parallax effect based on mouse position
      const targetX = (state.pointer.x * Math.PI) / 10;
      const targetY = (state.pointer.y * Math.PI) / 10;
      
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#8B5CF6" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#F59E0B" />
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      <CentralCore />
      <FloatingCards />
      <ConnectionLines />
    </group>
  );
};

export default Scene;
