import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './AnimatedBackgroundCanvas.css';

const BEACH_IMAGE_URL = '/beach.png';

function BeachPlane({ texture }: { texture: THREE.Texture }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { vertexShader, fragmentShader } = useMemo(() => {
    const v = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    const f = `
      uniform sampler2D uTexture;
      uniform float uTime;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        float t = uTime;

        // Ocean band (roughly middle third vertically): gentle horizontal wave
        float oceanMask = smoothstep(0.25, 0.35, vUv.y) * smoothstep(0.75, 0.65, vUv.y);
        float wave = sin(vUv.y * 20.0 + t * 1.2) * 0.008 + sin(vUv.x * 30.0 + t * 0.8) * 0.005;
        uv.x += wave * oceanMask;

        // Flag area (approx lower third, center): cloth-like motion
        float flagMask = smoothstep(0.15, 0.35, vUv.y) * smoothstep(0.55, 0.35, vUv.y) * smoothstep(0.35, 0.5, vUv.x) * smoothstep(0.7, 0.5, vUv.x);
        float flagWave = sin(vUv.x * 15.0 + t) * 0.012 + sin(vUv.y * 10.0 + t * 1.5) * 0.008;
        uv += flagWave * flagMask;

        // Palm area (right side): slight sway
        float palmMask = smoothstep(0.5, 0.65, vUv.x) * smoothstep(0.2, 0.6, vUv.y);
        float palmSway = sin(vUv.y * 25.0 + t * 0.7) * 0.006;
        uv.x += palmSway * palmMask;

        gl_FragColor = texture2D(uTexture, uv);
      }
    `;
    return { vertexShader: v, fragmentShader: f };
  }, []);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
    }),
    [texture]
  );

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={[1, 1, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

function Scene({ texture }: { texture: THREE.Texture }) {
  return (
    <>
      <BeachPlane texture={texture} />
    </>
  );
}

function createFallbackTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  const grd = ctx.createLinearGradient(0, 0, 0, 512);
  grd.addColorStop(0, '#87ceeb');
  grd.addColorStop(0.3, '#6bb3e0');
  grd.addColorStop(0.5, '#5ba3d0');
  grd.addColorStop(0.7, '#7ec8e3');
  grd.addColorStop(0.82, '#f4e4c1');
  grd.addColorStop(1, '#e8d5a3');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 512, 512);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

export default function AnimatedBackgroundCanvas() {
  const fallback = useMemo(() => createFallbackTexture(), []);
  const [texture, setTexture] = useState<THREE.Texture>(fallback);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      BEACH_IMAGE_URL,
      (tex) => {
        tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
        setTexture(tex);
      },
      undefined,
      () => {}
    );
  }, []);

  return (
    <div className="animated-bg-canvas">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene texture={texture} />
        </Suspense>
      </Canvas>
      {/* Fallback when no image or while loading */}
      <div className="animated-bg-canvas__fallback" aria-hidden />
    </div>
  );
}
