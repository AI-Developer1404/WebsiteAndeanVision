import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const PrismScene = () => {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    // Smoothly animate rotation and scale
    useFrame((_, delta) => {
        if (groupRef.current) {
            // Speed up rotation when hovered
            groupRef.current.rotation.y += delta * (hovered ? 0.8 : 0.2);
            groupRef.current.rotation.x += delta * (hovered ? 0.4 : 0.1);
            
            // Lerp scale for a smooth pop effect
            const targetScale = hovered ? 1.2 : 1;
            groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <group ref={groupRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
            {/* The Main Glass Prism (Octahedron looks like a gemstone) */}
            <mesh>
                <octahedronGeometry args={[2.5, 0]} />
                <MeshTransmissionMaterial
                    samples={8}
                    thickness={1.5}
                    chromaticAberration={hovered ? 1.5 : 0.5}
                    anisotropy={0.3}
                    distortion={hovered ? 0.8 : 0.2}
                    distortionScale={0.5}
                    temporalDistortion={hovered ? 0.6 : 0.1}
                    color="#b7791f" // andean-gold
                    transmission={0.95}
                    roughness={0.05}
                    envMapIntensity={hovered ? 5 : 2}
                    clearcoat={1}
                />
            </mesh>

            {/* Inner Glowing Core 1 (Music - Gold) */}
            <Float speed={3} rotationIntensity={2} floatIntensity={1}>
                <mesh position={[0, 0.5, 0]}>
                    <icosahedronGeometry args={[0.4, 0]} />
                    <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={hovered ? 4 : 1.5} toneMapped={false} />
                </mesh>
            </Float>

            {/* Inner Glowing Core 2 (Art - Terracotta/Red) */}
            <Float speed={2} rotationIntensity={3} floatIntensity={1.5}>
                <mesh position={[-0.4, -0.4, 0.3]}>
                    <octahedronGeometry args={[0.3, 0]} />
                    <meshStandardMaterial color="#e76f51" emissive="#e76f51" emissiveIntensity={hovered ? 4 : 1.5} toneMapped={false} />
                </mesh>
            </Float>

            {/* Inner Glowing Core 3 (Story - Blue) */}
            <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                <mesh position={[0.4, -0.3, -0.3]}>
                    <dodecahedronGeometry args={[0.35, 0]} />
                    <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={hovered ? 4 : 1.5} toneMapped={false} />
                </mesh>
            </Float>

            {/* Dynamic Hover Sparkles */}
            <Sparkles 
                count={hovered ? 150 : 30} 
                scale={7} 
                size={hovered ? 4 : 1.5} 
                speed={hovered ? 1.5 : 0.2} 
                opacity={hovered ? 0.8 : 0.3} 
                color="#facc15" 
            />
        </group>
    );
};

const PrismShowcase3D: React.FC = () => {
    return (
        <section className="relative w-full h-[80vh] md:h-screen bg-black overflow-hidden flex items-center justify-center border-t border-b border-white/5">
            {/* Background Ambient Ambient Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black pointer-events-none" />
            
            <div className="absolute inset-0 z-10 cursor-pointer">
                <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 15, 10]} angle={0.3} intensity={2} penumbra={1} />
                    
                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                        <PrismScene />
                    </Float>
                    
                    <Environment preset="studio" />
                </Canvas>
            </div>

            {/* Overlay Text */}
            <div className="relative z-20 pointer-events-none flex flex-col items-center justify-center text-center mt-80 md:mt-96 glass-panel p-6 rounded-3xl mx-4 bg-black/30 backdrop-blur-sm border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                <p className="text-andean-gold tracking-[0.3em] text-[10px] md:text-xs uppercase font-mono mb-2 md:mb-4">The Digital Artifact</p>
                <h2 className="text-2xl md:text-5xl font-serif font-bold text-white max-w-2xl drop-shadow-2xl">
                    Discover the Soul of the Andes
                </h2>
                <p className="mt-2 text-gray-400 max-w-lg text-xs md:text-sm">
                    Interact with the prism to reveal the music, art, and story within.
                </p>
            </div>
        </section>
    );
};

export default PrismShowcase3D;
