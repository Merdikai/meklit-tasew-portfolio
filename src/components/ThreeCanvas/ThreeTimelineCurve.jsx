import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  createStudioEnvironment, 
  setupRealisticRenderer, 
  getRealisticGoldMaterial,
  getRealisticGlassMaterial 
} from '../../utils/threeRealisticStudio';

export default function ThreeTimelineCurve({ className = "w-full h-[520px]" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 13.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    setupRealisticRenderer(renderer);
    container.appendChild(renderer.domElement);

    // Studio Environment
    let envMap;
    try {
      envMap = createStudioEnvironment(renderer);
      scene.environment = envMap;
    } catch (e) {
      console.warn('Timeline envmap error:', e);
    }

    // Studio Lights
    const keyLight = new THREE.DirectionalLight(0xfff4e0, 2.4);
    keyLight.position.set(10, 12, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.0);
    rimLight.position.set(-10, -8, 6);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x0e172a, 0.8);
    scene.add(ambientLight);

    // Materials
    const goldMat = getRealisticGoldMaterial(envMap, 0.14);
    const glassMat = getRealisticGlassMaterial(envMap);

    // Smooth 3D S-Curve (The Adjudicative Path)
    const curvePoints = [
      new THREE.Vector3(-3.8, 3.8, 0),
      new THREE.Vector3(-1.2, 2.6, 1.0),
      new THREE.Vector3(1.4, 1.2, -0.4),
      new THREE.Vector3(-0.8, -0.8, 0.8),
      new THREE.Vector3(2.2, -2.4, -0.6),
      new THREE.Vector3(0.2, -3.8, 0.4),
    ];

    const curve = new THREE.CatmullRomCurve3(curvePoints);
    
    // Polished Metallic Gold Timeline Ribbon
    const tubeGeom = new THREE.TubeGeometry(curve, 120, 0.16, 24, false);
    const timelineTube = new THREE.Mesh(tubeGeom, goldMat);
    scene.add(timelineTube);

    // Milestone Nodes (Crystal Glass Spheres with Gold Inner Spheres)
    const nodeOuterGeom = new THREE.SphereGeometry(0.42, 24, 24);
    const nodeInnerGeom = new THREE.SphereGeometry(0.22, 24, 24);
    const nodeRingGeom = new THREE.TorusGeometry(0.65, 0.035, 16, 48);

    const nodes = [];
    const tValues = [0.05, 0.38, 0.68, 0.95];

    tValues.forEach((t) => {
      const pos = curve.getPoint(t);
      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(pos);

      // Glass outer bulb
      const outerMesh = new THREE.Mesh(nodeOuterGeom, glassMat);
      nodeGroup.add(outerMesh);

      // Gold core
      const innerMesh = new THREE.Mesh(nodeInnerGeom, goldMat);
      nodeGroup.add(innerMesh);

      // Gold orbital ring
      const ringMesh = new THREE.Mesh(nodeRingGeom, goldMat);
      ringMesh.rotation.x = Math.PI / 3;
      nodeGroup.add(ringMesh);

      scene.add(nodeGroup);
      nodes.push({ group: nodeGroup, ring: ringMesh });
    });

    // Traveling Golden Light Pulse along the Ribbon
    const pulseGeom = new THREE.SphereGeometry(0.26, 16, 16);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xfff0b3,
      transparent: true,
      opacity: 0.9,
    });
    const pulseMesh = new THREE.Mesh(pulseGeom, pulseMat);
    scene.add(pulseMesh);

    // Subtle Particle Dust
    const dustCount = 50;
    const dustGeom = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 12;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0xe8c564,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeom, dustMat);
    scene.add(dust);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    container.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Traveling pulse along the curve
      const t = (time * 0.18) % 1;
      const point = curve.getPoint(t);
      pulseMesh.position.copy(point);
      pulseMesh.scale.setScalar(1 + Math.sin(time * 6) * 0.2);

      // Rotate milestone rings
      nodes.forEach((n, i) => {
        n.ring.rotation.z = time * (0.8 + i * 0.2);
        n.ring.rotation.y = time * 0.5;
      });

      // Subtle parallax camera
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 1.2 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', onMouseMove);
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
      className={`relative w-full h-full select-none ${className}`}
      title="3D Judicial Bench Progression Path with Crystal Milestone Nodes"
    />
  );
}
