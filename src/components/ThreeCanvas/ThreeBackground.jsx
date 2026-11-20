import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  createStudioEnvironment, 
  setupRealisticRenderer, 
  getRealisticGoldMaterial 
} from '../../utils/threeRealisticStudio';

export default function ThreeBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false, // Antialiasing is unnecessary for soft bokeh points and saves massive fillrate 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.shadowMap.enabled = false; // Background dust particles do not cast shadows
    container.appendChild(renderer.domElement);

    // Studio Environment for realistic metallic reflections
    let envMap;
    try {
      envMap = createStudioEnvironment(renderer);
      scene.environment = envMap;
    } catch (e) {
      console.warn('Background envmap creation error:', e);
    }

    // Cinematic Soft Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xfff3db, 1.8);
    keyLight.position.set(15, 20, 15);
    scene.add(keyLight);

    const goldRim = new THREE.DirectionalLight(0xd4af37, 1.5);
    goldRim.position.set(-15, -10, 10);
    scene.add(goldRim);

    const blueAmbient = new THREE.AmbientLight(0x0a1428, 0.9);
    scene.add(blueAmbient);

    // Soft Golden Bokeh Dust (Elegant judicial stardust without intrusive floating geometric blocks)
    const particleCount = 140;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 65;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 65;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 35;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom soft bokeh disc texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 235, 170, 0.9)');
    grad.addColorStop(0.3, 'rgba(212, 175, 55, 0.45)');
    grad.addColorStop(0.8, 'rgba(180, 140, 50, 0.1)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

    const particleTexture = new THREE.CanvasTexture(canvas);
    const particleMaterial = new THREE.PointsMaterial({
      size: 1.4,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.65,
    });

    const particles = new THREE.Points(particleGeom, particleMaterial);
    scene.add(particles);

    // Mouse & Scroll Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetScrollY = 0;
    let currentScrollY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (document.hidden) return;
      const elapsedTime = clock.getElapsedTime();

      // Smooth scroll interpolation
      currentScrollY += (targetScrollY - currentScrollY) * 0.06;
      const scrollOffset = currentScrollY * 0.006;

      // Parallax camera movement
      camera.position.x += (mouseX * 2.5 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 2.0 - scrollOffset - camera.position.y) * 0.04;
      camera.lookAt(0, -scrollOffset, 0);

      // Slowly rotate particle field
      particles.rotation.y = elapsedTime * 0.015;
      particles.rotation.x = Math.sin(elapsedTime * 0.008) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-75"
    />
  );
}
