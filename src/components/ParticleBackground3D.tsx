import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = ({ isPlaying = false, baseSpeed = 0.5 }: { isPlaying?: boolean, baseSpeed?: number }) => {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 3000;

    const [positions, phases] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const phases = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            // Spread out massively for full-screen immersive coverage
            positions[i * 3] = (Math.random() - 0.5) * 40;     // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5; // z
            phases[i] = Math.random() * Math.PI * 2;
        }
        return [positions, phases];
    }, [count]);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;
        const time = state.clock.getElapsedTime();
        // Even slower base speed for silky smooth movement
        const speedMultiplier = isPlaying ? 1.0 : (baseSpeed * 0.3);
        
        pointsRef.current.rotation.y += delta * 0.01 * speedMultiplier;
        pointsRef.current.rotation.x += delta * 0.005 * speedMultiplier;

        const posAttribute = pointsRef.current.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            const x = positions[i * 3];
            const phase = phases[i];
            
            // Ultra-smooth, barely breathing wave
            const wave = Math.sin(time * speedMultiplier * 0.2 + x * 0.2 + phase) * 0.2;
            const wave2 = Math.cos(time * speedMultiplier * 0.05 + phase) * 0.1;
            
            posAttribute.setY(i, positions[i * 3 + 1] + (wave + wave2) * (isPlaying ? 1.0 : 0.4));
        }
        posAttribute.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04} // Slightly larger than 0.02 so they don't disappear, but finer than 0.07
                color="#facc15" // Brighter gold to ensure visibility
                transparent
                opacity={0.6} // Higher opacity so the fine dust is visible
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                sizeAttenuation={true}
            />
        </points>
    );
};

interface Props {
    isPlaying?: boolean;
    baseSpeed?: number;
    opacity?: number;
    className?: string;
}

const ParticleBackground3D: React.FC<Props> = ({ isPlaying = false, baseSpeed = 0.5, opacity = 1, className = "" }) => {
    return (
        <div className={`absolute inset-0 z-0 pointer-events-none mix-blend-screen ${className}`} style={{ opacity }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <Suspense fallback={null}>
                    <Particles isPlaying={isPlaying} baseSpeed={baseSpeed} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default ParticleBackground3D;
