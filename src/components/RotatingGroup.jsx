import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { logoUrls, LogoRing } from './Scene';

export function RotatingGroup() {
  const groupRef = useRef();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prevRotation) => prevRotation + Math.PI / 2);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation;
    }
  });

  const textures = useLoader(TextureLoader, logoUrls);
  return (
    <group ref={groupRef}>
      <LogoRing radius={3} textures={textures} />
    </group>
  );
}
