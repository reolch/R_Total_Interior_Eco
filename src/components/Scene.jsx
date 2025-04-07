import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { DoubleSide } from 'three';
import { RotatingGroup } from './RotatingGroup';

export const logoUrls = [
  '/images/tie_logo.webp',
  '/images/handinhand_logo.webp',
  '/images/ambition_logo.webp',
  '/images/trigger_logo.webp'
];

export function LogoRing({ radius, textures }) {
  const logoRefs = useRef([]);
  const count = textures.length;

  useEffect(() => {
    logoRefs.current = logoRefs.current.slice(0, count);
  }, [count]);

  // フレームごとにロゴがカメラを向くように更新
  useFrame(({ camera }) => {
    logoRefs.current.forEach((logo) => {
      if (logo) {
        logo.lookAt(camera.position);
      }
    });
  });

  const logos = [];
  for (let i = 0; i < count; i++) {
    // ロゴを円周上に配置するための角度計算
    const angle = (i / count) * Math.PI * 2;
    const x = radius * Math.sin(angle);
    const z = radius * Math.cos(angle);
    logos.push(
      <mesh
        key={i}
        position={[x, 0, z]}
        ref={(el) => (logoRefs.current[i] = el)}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={textures[i]} side={DoubleSide} />
      </mesh>
    );
  }

  return <>{logos}</>;
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 25 }}>
      <ambientLight intensity={1} /> {/* 環境光 */}
      <pointLight position={[0, 0, 0]} /> {/* ポイントライト */}
      <RotatingGroup /> {/* 回転するロゴのグループ */}
    </Canvas>
  );
}

export default Scene;
