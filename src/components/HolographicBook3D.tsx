import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Environment, ContactShadows, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const EbookMockup = () => {
    // Load the transparent 3D mockup image
    const texture = useTexture('/ebook mockups/first.png');
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;

    return (
        <group rotation={[0.0, -0.2, 0.05]}>
            {/* 2.5D Image Plane rendering the mockup with alpha transparency */}
            <mesh position={[0, 0, 0]}>
                {/* Dynamically size the plane based on standard mockup aspect ratio, keeping height at ~5.5 */}
                <planeGeometry args={[5.5 * ((texture.image as any)?.width / (texture.image as any)?.height || 0.75), 5.5]} />
                <meshBasicMaterial 
                    map={texture} 
                    transparent={true} 
                    alphaTest={0.01} 
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};

const HolographicBook3D: React.FC = () => {
    return (
        <div className="w-full h-full absolute inset-0 z-10 pointer-events-auto cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} shadows>
                <ambientLight intensity={1.5} />
                
                <Suspense fallback={null}>
                    <Float speed={2.5} rotationIntensity={0.15} floatIntensity={0.6} floatingRange={[-0.2, 0.2]}>
                        <EbookMockup />
                    </Float>
                    <Environment preset="city" />
                    <ContactShadows position={[0, -2.8, 0]} opacity={0.3} scale={15} blur={3.0} far={6} color="#000000" />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default HolographicBook3D;
