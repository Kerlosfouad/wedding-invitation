import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 1200;
const MOBILE_PARTICLE_COUNT = 600;

export default function GoldDustCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const windRef = useRef(0.5);
  const windBoostRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? MOBILE_PARTICLE_COUNT : PARTICLE_COUNT;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x3D000A);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: false,
      antialias: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const spread = 120;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread;
      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];
      sizes[i] = isMobile
        ? 0.15 + Math.random() * 0.5
        : 0.2 + Math.random() * 1.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      color: 0xD4AF37,
      size: 0.5,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse parallax (desktop only)
    const parallax = new THREE.Vector3();
    const targetParallax = new THREE.Vector3();

    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener('mousemove', handleMouseMove);

      // Click burst
      const handleClick = () => {
        windBoostRef.current = 2.0;
      };
      window.addEventListener('click', handleClick);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('click', handleClick);
      };
    }

    // Animation loop
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Decay wind boost
      if (windBoostRef.current > 0) {
        windBoostRef.current *= 0.92;
        if (windBoostRef.current < 0.01) windBoostRef.current = 0;
      }
      const effectiveWind = windRef.current + windBoostRef.current;

      // Update positions with drift
      const posArray = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        posArray[i3] = ox + Math.cos(time * 0.15 + oy * 0.05) * 0.1 * effectiveWind;
        posArray[i3 + 1] =
          oy + Math.sin(time * 0.2 + ox * 0.05) * 0.2 * effectiveWind;
        posArray[i3 + 2] = oz + Math.sin(time * 0.1 + i * 0.01) * 0.05;
      }
      geometry.attributes.position.needsUpdate = true;

      // Slow rotation
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      // Mouse parallax
      if (!isMobile) {
        targetParallax.set(
          mouseRef.current.x * 5,
          mouseRef.current.y * 5,
          0
        );
        parallax.lerp(targetParallax, 0.05);
        particles.position.copy(parallax);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
