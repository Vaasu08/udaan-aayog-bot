import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import womanKnittingImage from '@/assets/woman-knitting.jpg';

// Woman Knitting Background Component
function WomanKnitting() {
  const texture = useTexture(womanKnittingImage);
  
  return (
    <mesh position={[-2, 0, -3]} scale={[4, 2.5, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent opacity={0.7} />
    </mesh>
  );
}

// Knitting Sweater Mesh Component
function KnittingSweater() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 600; // Height of hero section
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth easing (ease-in-out-quad)
      const easeProgress = scrollProgress < 0.5
        ? 2 * scrollProgress * scrollProgress
        : 1 - Math.pow(-2 * scrollProgress + 2, 2) / 2;
      
      // Scale the sweater from 0.5 to 3.5 as user scrolls
      const targetScale = 0.5 + easeProgress * 3;
      meshRef.current.scale.y = THREE.MathUtils.lerp(
        meshRef.current.scale.y,
        targetScale,
        0.1
      );

      // Subtle wave deformation for cloth-like effect
      const time = state.clock.getElapsedTime();
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
      const positions = geometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const wave = Math.sin(x * 3 + time * 0.5) * 0.02 * easeProgress;
        const wave2 = Math.cos(y * 2 + time * 0.3) * 0.015 * easeProgress;
        positions.setZ(i, wave + wave2);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} position={[1, -0.5, 0]} rotation={[-0.15, 0, 0]}>
      <planeGeometry args={[2.5, 3, 32, 32]} />
      <meshStandardMaterial
        color="#d4a574"
        roughness={0.85}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Floating Text Component
function FloatingText() {
  const textRef = useRef<THREE.Group>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 600;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show text between 40% and 70% scroll with smooth fade
  let opacity = 0;
  if (scrollProgress > 0.4 && scrollProgress <= 0.5) {
    // Fade in from 40% to 50%
    opacity = (scrollProgress - 0.4) / 0.1;
  } else if (scrollProgress > 0.5 && scrollProgress <= 0.7) {
    // Stay visible
    opacity = 1;
  } else if (scrollProgress > 0.7 && scrollProgress <= 0.8) {
    // Fade out from 70% to 80%
    opacity = 1 - (scrollProgress - 0.7) / 0.1;
  }

  const yPosition = scrollProgress > 0.4 ? 0.5 - (scrollProgress - 0.4) * 0.5 : 0.5;

  return (
    <group ref={textRef} position={[1, yPosition, 1.5]}>
      <Text
        fontSize={0.35}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fillOpacity={opacity}
        outlineWidth={0.015}
        outlineColor="#1a0f0a"
        font="/fonts/Inter-Bold.woff"
        letterSpacing={0.02}
      >
        Tell Us About Yourself
      </Text>
    </group>
  );
}

// Scene Setup Component
function Scene() {
  const { camera } = useThree();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 600;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    const easeProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
    
    // Subtle camera movement
    const targetZ = 5 - easeProgress * 1.5;
    const targetY = 0 + easeProgress * 0.5;
    
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        color="#ff9d66"
      />
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.4}
        color="#d4a574"
      />
      <pointLight
        position={[2, 1, 2]}
        intensity={0.5}
        color="#ffb380"
      />
      <WomanKnitting />
      <KnittingSweater />
      <FloatingText />
    </>
  );
}

// Main Component
export default function KnittingAnimation() {
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebGLSupported(!!gl);
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  if (!webGLSupported) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-primary-foreground">
          <h2 className="text-4xl font-bold mb-4">Tell Us About Yourself</h2>
          <p className="text-xl">Start your entrepreneurial journey today</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
