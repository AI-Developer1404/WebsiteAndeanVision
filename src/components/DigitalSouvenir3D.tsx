import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const VinylRecord = ({ isPlaying }: { isPlaying: boolean }) => {
    const recordRef = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (recordRef.current) {
            // Spin fast when playing, very slow when idle
            recordRef.current.rotation.y -= isPlaying ? delta * 2.5 : delta * 0.1;
        }
    });

    return (
        <group ref={recordRef} rotation={[0.4, 0, 0]}>
            {/* The Black Vinyl Body */}
            <mesh receiveShadow castShadow>
                <cylinderGeometry args={[1.6, 1.6, 0.05, 64]} />
                <meshStandardMaterial 
                    color="#0a0a0a" 
                    roughness={0.4} 
                    metalness={0.9}
                    envMapIntensity={2.5}
                />
            </mesh>

            {/* The Grooves (multiple rings) */}
            {[0.6, 0.8, 1.0, 1.2, 1.4].map((r, i) => (
                <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.026, 0]}>
                    <ringGeometry args={[r, r + 0.02, 64]} />
                    <meshStandardMaterial color="#000000" roughness={0.8} />
                </mesh>
            ))}

            {/* The Center Label (Golden Stardust) */}
            <mesh position={[0, 0.027, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 0.01, 32]} />
                <meshStandardMaterial 
                    color="#b7791f" // andean-gold
                    roughness={0.5} 
                    metalness={0.3}
                />
            </mesh>

            {/* The Inner Hole */}
            <mesh position={[0, 0.028, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
                <meshBasicMaterial color="#000000" />
            </mesh>
        </group>
    );
};

interface Props {
    isPlaying?: boolean;
}

const DigitalSouvenir3D: React.FC<Props> = ({ isPlaying = false }) => {
    return (
        <div className="w-full h-full absolute inset-0 perspective-1000 z-10 pointer-events-auto cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 2.5, 4.5], fov: 45 }} shadows>
                <ambientLight intensity={0.5} />
                <spotLight position={[5, 10, 5]} angle={0.4} penumbra={1} intensity={3} castShadow />
                <spotLight position={[-5, 5, -5]} angle={0.4} penumbra={1} intensity={1} color="#facc15" />
                
                <Suspense fallback={null}>
                    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                        <VinylRecord isPlaying={isPlaying} />
                    </Float>
                    
                    <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000000" />
                    <Environment preset="studio" />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default DigitalSouvenir3D;
