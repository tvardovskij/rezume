import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';
import * as THREE from 'three';

extend({ UnrealBloomPass });

const ParticleSwarm = () => {
  const meshRef = useRef();
  const count = 20000;
  const speedMult = 1;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const color = pColor; // Alias for user code compatibility
  
  const positions = useMemo(() => {
     const pos = [];
     for(let i=0; i<count; i++) pos.push(new THREE.Vector3((Math.random()-0.5)*100, (Math.random()-0.5)*100, (Math.random()-0.5)*100));
     return pos;
  }, []);

  // Material & Geom
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), []);

  const PARAMS = useMemo(() => ({"pulse":1.5,"traces":2,"chaos":5,"breathe":1}), []);
  const addControl = (id, l, min, max, val) => {
      return PARAMS[id] !== undefined ? PARAMS[id] : val;
  };
  const setInfo = () => {};
  const annotate = () => {};

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speedMult;
    const THREE_LIB = THREE;

    if(material.uniforms && material.uniforms.uTime) {
         material.uniforms.uTime.value = time;
    }

    for (let i = 0; i < count; i++) {
        // USER CODE START
        const pulseIntensity = addControl("pulse", "Core Pulse", 0.5, 3.0, 1.5);
        const traceSpeed = addControl("traces", "Circuit Speed", 0.5, 4.0, 2.0);
        const chaosLevel = addControl("chaos", "Chaos Factor", 0, 30, 5);
        const breathe = addControl("breathe", "Breathing", 0.5, 2.0, 1.0);
        
        const CYCLE = 6.0;
        const phase = (time % CYCLE) / CYCLE;
        const reform = phase < 0.15 ? phase / 0.15 : phase < 0.85 ? 1.0 : 1.0 - (phase - 0.85) / 0.15;
        const chaos = (1.0 - reform) * chaosLevel;
        
        const norm = i / count;
        const segment = Math.floor(norm * 2);
        const localT = (norm * 2) % 1;
        
        const angle = localT * Math.PI * 2 + segment * Math.PI;
        const figureEight = 40 + Math.sin(time * breathe) * 5;
        
        const baseX = figureEight * Math.sin(angle);
        const baseY = figureEight * Math.sin(angle) * Math.cos(angle);
        const baseZ = 15 * Math.cos(angle * 2 + time * 0.5);
        
        const isTrace = (i % 80) < 8;
        const traceExtend = isTrace ? Math.sin(time * traceSpeed + norm * 50) * 20 * reform : 0;
        const traceAngle = norm * Math.PI * 8 + time;
        
        const chaosX = Math.sin(norm * 137.5 + time * 2) * chaos;
        const chaosY = Math.cos(norm * 89.3 + time * 1.7) * chaos;
        const chaosZ = Math.sin(norm * 61.7 + time * 2.3) * chaos;
        
        const px = baseX + traceExtend * Math.cos(traceAngle) + chaosX;
        const py = baseY + traceExtend * Math.sin(traceAngle) + chaosY;
        const pz = baseZ + chaosZ;
        
        target.set(px, py, pz);
        
        const distFromCore = Math.sqrt(baseX * baseX + baseY * baseY) / figureEight;
        const coreGlow = Math.max(0, 1 - distFromCore * 1.5);
        const energyPulse = Math.sin(time * pulseIntensity * 3 + norm * 20) * 0.5 + 0.5;
        
        const hue = 0.45 + coreGlow * 0.15 + Math.sin(norm * Math.PI + time) * 0.05;
        const sat = 0.7 + energyPulse * 0.3;
        const lit = 0.3 + coreGlow * 0.5 + energyPulse * 0.2 * reform;
        
        color.setHSL(hue, sat, Math.min(0.95, Math.max(0.15, lit)));
        
        if (i === 0) {
          setInfo("NEXUS Infinity Core", "Authentication infrastructure. The VIN for Collectibles. Particles form the infinite loop of provenance.");
          annotate("nexus", new THREE.Vector3(0, 0, 0), "⚡ NEXUS");
        }
        // USER CODE END

        positions[i].lerp(target, 0.1);
        dummy.position.copy(positions[i]);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        meshRef.current.setColorAt(i, pColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} />
  );
};

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas camera={{ position: [0, 0, 100], fov: 60 }}>
        <fog attach="fog" args={['#000000', 0.01]} />
        <ParticleSwarm />
        <OrbitControls autoRotate={true} />
        <Effects disableGamma>
            <unrealBloomPass threshold={0} strength={1.8} radius={0.4} />
        </Effects>
      </Canvas>
    </div>
  );
}