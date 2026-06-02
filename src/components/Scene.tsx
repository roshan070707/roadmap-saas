import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Generates a vast, interconnected 3D Neural Network
const NeuralNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const { pointGeometry, lineGeometry } = useMemo(() => {
    const NODE_COUNT = 150;
    const MAX_CONNECTION_DISTANCE = 2.2;
    
    const pts: THREE.Vector3[] = [];
    const positions = new Float32Array(NODE_COUNT * 3);
    
    // Generate nodes in a scattered sphere volume for depth
    for(let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2 + Math.random() * 6; // Hollow center, expanding outward
      
      const p = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      
      // Flatten it slightly on the Z axis for a more cinematic widescreen depth
      p.z *= 0.6;
      
      pts.push(p);
      positions[i*3] = p.x;
      positions[i*3+1] = p.y;
      positions[i*3+2] = p.z;
    }
    
    // Connect adjacent nodes
    const lns: THREE.Vector3[][] = [];
    for(let i = 0; i < pts.length; i++) {
      for(let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < MAX_CONNECTION_DISTANCE) {
          lns.push([pts[i], pts[j]]);
        }
      }
    }
    
    const lineGeo = new THREE.BufferGeometry();
    const linePos = new Float32Array(lns.length * 6);
    let idx = 0;
    lns.forEach(([p1, p2]) => {
      linePos[idx++] = p1.x; linePos[idx++] = p1.y; linePos[idx++] = p1.z;
      linePos[idx++] = p2.x; linePos[idx++] = p2.y; linePos[idx++] = p2.z;
    });
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    return { pointGeometry: ptGeo, lineGeometry: lineGeo };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Extremely slow, elegant rotation (like a planet or deep system)
      groupRef.current.rotation.y += delta * 0.03;
      groupRef.current.rotation.x += delta * 0.01;
    }
    if (linesRef.current) {
      // Pulse the network energy
      const material = linesRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Network Nodes */}
      <points geometry={pointGeometry}>
        <pointsMaterial 
          color="#c4b5fd" 
          size={0.06} 
          sizeAttenuation 
          transparent 
          opacity={0.8}
        />
      </points>
      
      {/* Network Connections */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial 
          color="#8B5CF6" 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};

const AmbientCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (coreRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={coreRef}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshBasicMaterial 
        color="#8B5CF6" 
        transparent 
        opacity={0.02} 
        wireframe={true} 
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

const Scene = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // High-end dampened parallax interaction
  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetX = (state.pointer.x * Math.PI) / 16;
      const targetY = (state.pointer.y * Math.PI) / 16;
      
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetX, 1.5, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, -targetY, 1.5, delta);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
      <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#38bdf8" />
      
      <Environment preset="city" />
      
      {/* Deep volume sparkles for extreme depth */}
      <Sparkles count={400} scale={15} size={1} speed={0.2} opacity={0.3} color="#c4b5fd" />
      <Sparkles count={150} scale={10} size={2} speed={0.4} opacity={0.5} color="#38bdf8" />
      
      <AmbientCore />
      <NeuralNetwork />
    </group>
  );
};

export default Scene;
