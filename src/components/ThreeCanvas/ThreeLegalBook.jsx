import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  createStudioEnvironment, 
  setupRealisticRenderer, 
  getRealisticGoldMaterial, 
  getRealisticGlassMaterial, 
  getRealisticMarbleMaterial 
} from '../../utils/threeRealisticStudio';

export default function ThreeLegalBook({ className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 460;
    const height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 11);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    setupRealisticRenderer(renderer);
    container.appendChild(renderer.domElement);

    // Studio Environment Map
    let envMap;
    try {
      envMap = createStudioEnvironment(renderer);
      scene.environment = envMap;
    } catch (e) {
      console.warn('EnvMap creation error:', e);
    }

    // Studio Lights
    const keyLight = new THREE.DirectionalLight(0xfff6e8, 2.6);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.0);
    rimLight.position.set(-8, 6, -6);
    scene.add(rimLight);

    const softFill = new THREE.AmbientLight(0x18243b, 0.9);
    scene.add(softFill);

    // Materials
    const goldMat = getRealisticGoldMaterial(envMap, 0.14);
    const glassMat = getRealisticGlassMaterial(envMap);
    const marbleMat = getRealisticMarbleMaterial(envMap);

    // Realistic Parchment Material with subtle procedural text lines & gold seal
    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = 512;
    pageCanvas.height = 512;
    const pCtx = pageCanvas.getContext('2d');

    // Parchment ivory base with fine noise
    pCtx.fillStyle = '#f8f4ea';
    pCtx.fillRect(0, 0, 512, 512);

    // Subtle marginal borders
    pCtx.strokeStyle = 'rgba(200, 164, 93, 0.4)';
    pCtx.lineWidth = 3;
    pCtx.strokeRect(30, 30, 452, 452);

    // Golden Scales of Justice emblem on right page
    pCtx.fillStyle = 'rgba(180, 140, 60, 0.85)';
    pCtx.beginPath();
    pCtx.arc(256, 160, 48, 0, Math.PI * 2);
    pCtx.fill();
    pCtx.fillStyle = '#f8f4ea';
    pCtx.font = 'bold 24px serif';
    pCtx.textAlign = 'center';
    pCtx.textBaseline = 'middle';
    pCtx.fillText('⚖', 256, 160);

    // Latin / Legal statute lines simulation
    pCtx.fillStyle = 'rgba(40, 35, 30, 0.65)';
    for (let y = 240; y < 440; y += 18) {
      const lineLen = 340 + Math.sin(y * 12) * 40;
      pCtx.fillRect(80, y, lineLen, 3);
    }

    const parchmentTex = new THREE.CanvasTexture(pageCanvas);
    const parchmentMat = new THREE.MeshStandardMaterial({
      map: parchmentTex,
      roughness: 0.6,
      metalness: 0.05,
    });

    // Dark Leather Hardbound Cover Material
    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.45,
      metalness: 0.15,
      envMap: envMap,
      envMapIntensity: 0.5,
    });

    // Assembly Group
    const bookAssembly = new THREE.Group();
    scene.add(bookAssembly);

    // 1. Curved Open Legal Book
    const openBookGroup = new THREE.Group();
    openBookGroup.position.set(-1.2, 0, 0);
    bookAssembly.add(openBookGroup);

    // Left Page Wing (Curved block)
    const leftPageGeom = new THREE.BoxGeometry(2.8, 0.35, 3.8);
    const leftPage = new THREE.Mesh(leftPageGeom, parchmentMat);
    leftPage.position.set(-1.35, 0, 0);
    leftPage.rotation.z = 0.14;
    openBookGroup.add(leftPage);

    // Right Page Wing
    const rightPageGeom = new THREE.BoxGeometry(2.8, 0.35, 3.8);
    const rightPage = new THREE.Mesh(rightPageGeom, parchmentMat);
    rightPage.position.set(1.35, 0, 0);
    rightPage.rotation.z = -0.14;
    openBookGroup.add(rightPage);

    // Book Cover (Bottom dark hardbound leather)
    const coverGeom = new THREE.BoxGeometry(6.0, 0.14, 4.0);
    const cover = new THREE.Mesh(coverGeom, leatherMat);
    cover.position.set(0, -0.22, 0);
    openBookGroup.add(cover);

    // Gilded Page Edges (Gold Trim on outer sides)
    const goldEdgeGeom1 = new THREE.BoxGeometry(0.06, 0.34, 3.75);
    const goldEdge1 = new THREE.Mesh(goldEdgeGeom1, goldMat);
    goldEdge1.position.set(-2.75, 0.18, 0);
    openBookGroup.add(goldEdge1);

    const goldEdge2 = new THREE.Mesh(goldEdgeGeom1, goldMat);
    goldEdge2.position.set(2.75, 0.18, 0);
    openBookGroup.add(goldEdge2);

    // Gilded Corner Filigree Caps
    const cornerGeom = new THREE.BoxGeometry(0.4, 0.18, 0.4);
    [
      [-2.8, -0.2, -1.9],
      [-2.8, -0.2, 1.9],
      [2.8, -0.2, -1.9],
      [2.8, -0.2, 1.9],
    ].forEach(([cx, cy, cz]) => {
      const corner = new THREE.Mesh(cornerGeom, goldMat);
      corner.position.set(cx, cy, cz);
      openBookGroup.add(corner);
    });

    // Burgundy / Gold Ribbon Bookmark
    const ribbonGeom = new THREE.CylinderGeometry(0.08, 0.08, 2.8, 16);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0x8b1e28,
      roughness: 0.3,
      metalness: 0.2,
    });
    const ribbon = new THREE.Mesh(ribbonGeom, ribbonMat);
    ribbon.position.set(0, 0.2, 1.2);
    ribbon.rotation.x = Math.PI / 3;
    openBookGroup.add(ribbon);

    // 2. Crystal Trophy Plinth with Gleaming Gold Justice Medallion (as in v2_frame_04)
    const trophyGroup = new THREE.Group();
    trophyGroup.position.set(3.2, 0.4, -0.5);
    bookAssembly.add(trophyGroup);

    // Clear Crystal / Glass Pedestal
    const glassPlinthGeom = new THREE.BoxGeometry(1.6, 2.2, 0.5);
    const glassPlinth = new THREE.Mesh(glassPlinthGeom, glassMat);
    glassPlinth.position.y = 0.6;
    trophyGroup.add(glassPlinth);

    // Stepped Gold Base for Plinth
    const plinthBaseGeom = new THREE.BoxGeometry(2.0, 0.2, 1.0);
    const plinthBase = new THREE.Mesh(plinthBaseGeom, goldMat);
    trophyGroup.add(plinthBase);

    // Embossed Gold Justice Medallion mounted in glass
    const medallionGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.1, 32);
    const medallion = new THREE.Mesh(medallionGeom, goldMat);
    medallion.position.set(0, 0.7, 0.05);
    medallion.rotation.x = Math.PI / 2;
    trophyGroup.add(medallion);

    // 3. Subtle floating ambient sparks
    const dustCount = 40;
    const dustGeom = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 12;
      dustPos[i * 3 + 1] = Math.random() * 5 - 1;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustPointsMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0xf5d376,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const dustPoints = new THREE.Points(dustGeom, dustPointsMat);
    scene.add(dustPoints);

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

      // Gentle floating levitation
      bookAssembly.position.y = Math.sin(time * 1.4) * 0.12;

      // Subtle mouse tilt with inertia
      bookAssembly.rotation.y += (mouseX * 0.35 + 0.15 - bookAssembly.rotation.y) * 0.05;
      bookAssembly.rotation.x += (-mouseY * 0.25 + 0.35 - bookAssembly.rotation.x) * 0.05;

      // Floating medallion subtle rotation
      medallion.rotation.z = Math.sin(time * 0.8) * 0.15;

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
      className={`relative w-full h-full cursor-pointer select-none ${className}`}
      title="3D Legal Codex with Gilded Binding and Optical Crystal Justice Plinth"
    />
  );
}
