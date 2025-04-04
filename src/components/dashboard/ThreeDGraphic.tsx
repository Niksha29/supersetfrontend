
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box, Torus, Sphere } from "@react-three/drei";
import { Mesh } from "three";

interface AnimatedMeshProps {
  position: [number, number, number];
  color: string;
  rotationSpeed?: number;
  hoverColor?: string;
}

const AnimatedMesh = ({ position, color, rotationSpeed = 0.01, hoverColor }: AnimatedMeshProps) => {
  const mesh = useRef<Mesh>(null!);
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += rotationSpeed;
      mesh.current.rotation.y += rotationSpeed * 1.5;
    }
  });

  return (
    <mesh
      position={position}
      ref={mesh}
      onPointerOver={() => {
        if (hoverColor) document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      {position[0] % 3 === 0 ? (
        <boxGeometry args={[1, 1, 1]} />
      ) : position[0] % 3 === 1 ? (
        <torusGeometry args={[0.7, 0.3, 16, 32]} />
      ) : (
        <sphereGeometry args={[0.7, 32, 32]} />
      )}
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

interface ThreeDGraphicProps {
  height?: string;
  className?: string;
}

export const ThreeDGraphic = ({ height = "250px", className }: ThreeDGraphicProps) => {
  return (
    <div className={`w-full relative ${className}`} style={{ height }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <AnimatedMesh position={[-2, 0, 0]} color="#6366f1" hoverColor="#4f46e5" />
        <AnimatedMesh position={[0, 0, 0]} color="#8b5cf6" hoverColor="#7c3aed" />
        <AnimatedMesh position={[2, 0, 0]} color="#ec4899" hoverColor="#db2777" />
        
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};
