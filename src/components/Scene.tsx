import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Line, Html, Environment, Sparkles } from '@react-three/drei';
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
    const pts = cards.map(c => new THREE.Vector3(...c.position));
    pts.push(new THREE.Vector3(...cards[0].position));
    const curve = new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.5);
    return curve.getPoints(100);
  }, []);

  const lineRef = useRef<any>(null);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={points}
      color="#c4b5fd"
      lineWidth={1.5}
      transparent
      opacity={0.3}
      dashed={false}
    />
  );
};

// Abstract central core with premium glass material and multiple layers
const CentralCore = () => {
  const innerRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (innerRef.current) {
      innerRef.current.rotation.x += delta * 0.15;
      innerRef.current.rotation.y += delta * 0.2;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x -= delta * 0.1;
      wireframeRef.current.rotation.y -= delta * 0.15;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.05;
      outerRef.current.rotation.y += delta * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.2;
      ringRef.current.rotation.x = Math.PI / 2.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group position={[0, Math.sin(0) * 0.15, 0]}>
        
        {/* Inner solid glowing core */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.6, 2]} />
          <meshStandardMaterial 
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Middle wireframe layer for tech feel */}
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshBasicMaterial color="#c4b5fd" wireframe transparent opacity={0.3} />
        </mesh>

        {/* Outer refractive glass shell */}
        <mesh ref={outerRef}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshPhysicalMaterial 
            color="#ffffff"
            emissive="#8B5CF6"
            emissiveIntensity={0.05}
            roughness={0.05}
            metalness={0.1}
            transmission={1}
            thickness={2}
            ior={1.4}
            clearcoat={1}
            clearcoatRoughness={0}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Orbiting Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[1.8, 0.02, 16, 100]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={1} />
        </mesh>
        
        {/* Inner light source */}
        <pointLight color="#8B5CF6" intensity={4} distance={5} />
      </group>
    </Float>
  );
};

// Floating Cards positioned in 3D space with glassmorphism
const FloatingCards = () => {
  return (
    <>
      {cards.map((card, idx) => (
        <Float key={idx} speed={1.5 + idx * 0.2} rotationIntensity={0.2} floatIntensity={0.6}>
          <group position={new THREE.Vector3(...card.position)}>
            {/* Subtle glow orb behind the card */}
            <mesh position={[0, 0, -0.1]}>
              <sphereGeometry args={[0.6, 16, 16]} />
              <meshBasicMaterial color="#8B5CF6" transparent opacity={0.15} />
            </mesh>
            <Html center transform sprite distanceFactor={10}>
              <div className="group bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl whitespace-nowrap text-white/90 text-sm font-semibold tracking-wide shadow-[0_8px_32px_rgba(139,92,246,0.15)] hover:bg-white/10 hover:border-luxury-purple/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-500 cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-luxury-purple group-hover:bg-luxury-gold transition-colors shadow-[0_0_10px_currentColor]"></span>
                  {card.title}
                </div>
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
  
  // Calculate position based on viewport
  const isMobile = viewport.width < 8;
  const targetPosition = isMobile ? new THREE.Vector3(0, -3, -4) : new THREE.Vector3(3.5, 0, 0);

  // Buttery smooth mouse follow effect
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.lerp(targetPosition, delta * 2);

      const targetX = (state.pointer.x * Math.PI) / 8;
      const targetY = (state.pointer.y * Math.PI) / 8;
      
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetX, 3, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, -targetY, 3, delta);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#8B5CF6" />
      <directionalLight position={[-5, 5, -5]} intensity={1} color="#38bdf8" />
      <pointLight position={[-5, -5, -5]} intensity={1.5} color="#F59E0B" distance={15} />
      
      {/* Cinematic reflections */}
      <Environment preset="city" />
      
      {/* Subtle magical particles */}
      <Sparkles count={300} scale={20} size={1.2} speed={0.2} opacity={0.4} color="#c4b5fd" />
      <Sparkles count={100} scale={10} size={2} speed={0.5} opacity={0.6} color="#F59E0B" />
      
      <CentralCore />
      <FloatingCards />
      <ConnectionLines />
    </group>
  );
};

export default Scene;
