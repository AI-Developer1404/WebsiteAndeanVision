import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, useTexture, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const EbookObject = ({ position, rotation }: any) => {
    const texture = useTexture('/foto ebook.png');
    texture.colorSpace = THREE.SRGBColorSpace;
    return (
        <group position={position} rotation={rotation}>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2.0, 2.8, 0.1]} />
                <meshStandardMaterial map={texture} roughness={0.4} metalness={0.2} />
            </mesh>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2.2, 3.0, 0.3]} />
                <MeshTransmissionMaterial backside samples={4} thickness={0.5} chromaticAberration={0.05} ior={1.3} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2.3, 3.1, 0.05]} />
                <meshStandardMaterial color="#b7791f" roughness={0.3} metalness={0.8} />
            </mesh>
        </group>
    );
};

const VinylObject = ({ position, rotation }: any) => {
    return (
        <group position={position} rotation={rotation}>
            <mesh receiveShadow castShadow>
                <cylinderGeometry args={[1.3, 1.3, 0.05, 64]} />
                <meshStandardMaterial color="#0a0a0a" roughness={0.4} metalness={0.9} />
            </mesh>
            {[0.5, 0.7, 0.9, 1.1].map((r, i) => (
                <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.026, 0]}>
                    <ringGeometry args={[r, r + 0.02, 64]} />
                    <meshStandardMaterial color="#000000" roughness={0.8} />
                </mesh>
            ))}
            <mesh position={[0, 0.027, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 0.01, 32]} />
                <meshStandardMaterial color="#b7791f" roughness={0.5} metalness={0.3} />
            </mesh>
        </group>
    );
};

const ArtObject = ({ position, rotation }: any) => {
    // Abstract gold and black geometric texture for the art piece
    return (
        <group position={position} rotation={rotation}>
            {/* The Frame */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2.0, 2.5, 0.15]} />
                <meshStandardMaterial color="#0a0a0a" roughness={0.8} metalness={0.1} />
            </mesh>
            {/* The Matting */}
            <mesh position={[0, 0, 0.08]}>
                <boxGeometry args={[1.8, 2.3, 0.02]} />
                <meshStandardMaterial color="#dedede" roughness={0.9} />
            </mesh>
            {/* The Artwork - Abstract Gold Circle representing the Inca Sun */}
            <mesh position={[0, 0, 0.1]}>
                <planeGeometry args={[1.3, 1.8]} />
                <meshStandardMaterial color="#111111" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0, 0.11]}>
                <circleGeometry args={[0.4, 32]} />
                <meshStandardMaterial color="#b7791f" roughness={0.2} metalness={0.8} />
            </mesh>
            {/* The Glass */}
            <mesh position={[0, 0, 0.12]}>
                <planeGeometry args={[1.8, 2.3]} />
                <meshPhysicalMaterial transparent opacity={0.3} roughness={0.0} metalness={0.1} clearcoat={1} ior={1.5} />
            </mesh>
        </group>
    );
};

const TrinityScene = () => {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((_, delta) => {
        if (!groupRef.current) return;
        
        // Dynamic continuous slow rotation
        groupRef.current.rotation.y += delta * 0.1;
        
        // Slerp towards "explode view" upon hover
        const targetScale = hovered ? 1.0 : 0.8;
        const targetSpread = hovered ? 2.8 : 1.5;

        const children = groupRef.current.children;
        // children[0] = Ebook (Center)
        // children[1] = Vinyl (Left)
        // children[2] = Art (Right)
        
        children[1].position.x = THREE.MathUtils.lerp(children[1].position.x, -targetSpread, 0.05);
        children[2].position.x = THREE.MathUtils.lerp(children[2].position.x, targetSpread, 0.05);
        
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.05));
    });

    return (
        <group 
            ref={groupRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <EbookObject position={[0, 0.5, 0.8]} rotation={[0, 0, 0]} />
            <VinylObject position={[-1.5, 0, -1]} rotation={[1, 0, -0.2]} />
            <ArtObject position={[1.5, 0.2, -1]} rotation={[0, -0.4, 0.1]} />
        </group>
    );
};

const ProductTrinity3D: React.FC = () => {
    return (
        <div className="w-full h-full min-h-[400px] md:min-h-[500px] relative pointer-events-auto cursor-pointer group">
            <Canvas camera={{ position: [0, 2, 7], fov: 45 }} shadows>
                <ambientLight intensity={1} />
                <spotLight position={[5, 10, 5]} angle={0.4} penumbra={1} intensity={3} castShadow color="#facc15" />
                <spotLight position={[-5, 5, -5]} angle={0.4} penumbra={1} intensity={2} color="#ffffff" />
                
                <Suspense fallback={null}>
                    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                        <TrinityScene />
                    </Float>
                    <Environment preset="studio" />
                    <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000000" />
                </Suspense>
            </Canvas>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <p className="text-xs uppercase tracking-widest text-[#b7791f] font-mono">Hover to Inspect</p>
            </div>
        </div>
    );
};

export default ProductTrinity3D;
