import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// The highly detailed 3D Hardcover Book Model
const HighEndHardcover = () => {
    const groupRef = useRef<THREE.Group>(null);
    
    // Load the 2D cover image to wrap onto the 3D model
    const coverTexture = useTexture('/foto ebook.png');
    coverTexture.colorSpace = THREE.SRGBColorSpace;
    
    // Optional slow generic rotation if the user isn't interacting
    useFrame((_, delta) => {
        if (groupRef.current) {
            // Very slow, majestic idle rotation
            groupRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <group ref={groupRef} rotation={[0.2, -0.5, 0]}>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
                <group>
                    {/* FRONT COVER */}
                    <mesh position={[0.05, 0, 0.2]}>
                        <boxGeometry args={[3.2, 4.5, 0.04]} />
                        <meshPhysicalMaterial 
                            map={coverTexture} 
                            roughness={0.2} 
                            metalness={0.1} 
                            clearcoat={1.0} 
                            clearcoatRoughness={0.1}
                            color="#ffffff"
                        />
                    </mesh>

                    {/* BACK COVER */}
                    <mesh position={[0.05, 0, -0.2]}>
                        <boxGeometry args={[3.2, 4.5, 0.04]} />
                        {/* A dark blue/black matching the dominant color of the cover */}
                        <meshPhysicalMaterial 
                            color="#0a0f1a" 
                            roughness={0.3} 
                            metalness={0.2} 
                            clearcoat={0.5} 
                            clearcoatRoughness={0.2}
                        />
                    </mesh>

                    {/* SPINE (Rug van het boek) */}
                    <mesh position={[-1.53, 0, 0]}>
                        <boxGeometry args={[0.04, 4.5, 0.44]} />
                        <meshPhysicalMaterial 
                            color="#0a0f1a" 
                            roughness={0.3} 
                            clearcoat={0.5} 
                        />
                    </mesh>

                    {/* PAGES (Het papierblok insteek tussen de covers) */}
                    <mesh position={[0.1, 0, 0]}>
                        <boxGeometry args={[3.1, 4.38, 0.36]} />
                        <meshStandardMaterial 
                            color="#fcfcf8" // Warm andean paper cream
                            roughness={1.0} // Matte paper
                            metalness={0} 
                        />
                    </mesh>

                    {/* GOLDEN BOOKMARK RIBBON (Elegant detail) */}
                    <mesh position={[0.1, -2.25, 0.15]} rotation={[0, 0, 0.1]}>
                        <boxGeometry args={[0.2, 0.8, 0.01]} />
                        <meshStandardMaterial color="#b7791f" roughness={0.3} metalness={0.6} />
                    </mesh>
                </group>
            </Float>
        </group>
    );
};

const PremiumEbookMockupPreview: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen bg-neutral-950 relative overflow-hidden font-sans">
            {/* UI Overlay */}
            <div className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center pointer-events-none">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors pointer-events-auto bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10"
                >
                    <ArrowLeft size={20} />
                    <span>Go Back</span>
                </button>
                <div className="text-right">
                    <h1 className="text-2xl font-serif text-white tracking-widest">Digital Relic Prototype</h1>
                    <p className="text-andean-gold text-sm uppercase tracking-[0.2em] mt-1">High-Fidelity 3D Render</p>
                </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm tracking-widest uppercase pointer-events-none text-center">
                <p>Drag to rotate &bull; Scroll to zoom</p>
            </div>

            {/* 3D Canvas Playground */}
            <div className="w-full h-full cursor-grab active:cursor-grabbing">
                <Canvas camera={{ position: [0, 0, 7], fov: 45 }} shadows dpr={[1, 2]}>
                    <color attach="background" args={['#050505']} />
                    
                    {/* Lighting */}
                    <ambientLight intensity={1.5} />
                    <spotLight position={[5, 10, 5]} angle={0.4} penumbra={1} intensity={6} castShadow color="#ffffff" />
                    <spotLight position={[-5, 5, -5]} angle={0.5} penumbra={1} intensity={4} color="#3b82f6" />
                    <spotLight position={[0, -5, 5]} angle={0.5} penumbra={1} intensity={2} color="#facc15" />

                    <Suspense fallback={null}>
                        <HighEndHardcover />
                        <Environment preset="studio" />
                        
                        {/* Sleek reflection shadow on the invisible floor */}
                        <ContactShadows 
                            position={[0, -2.5, 0]} 
                            opacity={0.8} 
                            scale={20} 
                            blur={2} 
                            far={10} 
                            resolution={512} 
                            color="#000000" 
                        />
                    </Suspense>

                    {/* Enable free interaction */}
                    <OrbitControls 
                        enablePan={false} 
                        enableZoom={true} 
                        minDistance={3} 
                        maxDistance={12} 
                        autoRotate={false} 
                        autoRotateSpeed={0.5}
                        maxPolarAngle={Math.PI / 1.5}
                        minPolarAngle={Math.PI / 4}
                    />
                </Canvas>
            </div>
        </div>
    );
};

export default PremiumEbookMockupPreview;
