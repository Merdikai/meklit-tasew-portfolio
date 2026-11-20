import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  createStudioEnvironment, 
  setupRealisticRenderer, 
  getRealisticGoldMaterial 
} from '../../utils/threeRealisticStudio';

export default function ThreeGoldenScale({ className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 580;

    // Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 17.5);

    // Realistic WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    setupRealisticRenderer(renderer);
    container.appendChild(renderer.domElement);

    // Studio Environment Map for Photorealistic PBR Reflections
    let envMap;
    try {
      envMap = createStudioEnvironment(renderer);
      scene.environment = envMap;
    } catch (e) {
      console.warn('Studio envmap error:', e);
    }

    // Studio Directional Lights (Key, Gold Rim, Blue Fill)
    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.8);
    keyLight.position.set(12, 16, 14);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const goldRimLight = new THREE.DirectionalLight(0xfcd34d, 2.5);
    goldRimLight.position.set(-14, 10, -10);
    scene.add(goldRimLight);

    const blueFillLight = new THREE.DirectionalLight(0x1e3a8a, 1.4);
    blueFillLight.position.set(0, -10, 8);
    scene.add(blueFillLight);

    const ambientLight = new THREE.AmbientLight(0x151c2c, 0.9);
    scene.add(ambientLight);

    // Realistic Classical Gold Materials
    const goldMat = getRealisticGoldMaterial(envMap, 0.14);
    
    // Richer burnished bronze-gold for turned pedestal moldings
    const burnishedGoldMat = getRealisticGoldMaterial(envMap, 0.22);
    burnishedGoldMat.color = new THREE.Color(0xd4af37);

    // Glowing Golden Light Ribbon Material (as in v2_frame_01)
    const glowingAuraMat = new THREE.MeshBasicMaterial({
      color: 0xffe699,
      transparent: true,
      opacity: 0.85,
    });

    const haloWireMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    // Root Scale Assembly
    const mainAssembly = new THREE.Group();
    scene.add(mainAssembly);

    // 1. Classical Heavy Turned Brass/Gold Pedestal Base (as seen in v2_frame_01)
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.y = -3.8;
    mainAssembly.add(pedestalGroup);

    // Base Tier 1: Wide Flanged Circular Plinth
    const base1Geom = new THREE.CylinderGeometry(2.3, 2.65, 0.42, 64);
    const base1 = new THREE.Mesh(base1Geom, burnishedGoldMat);
    pedestalGroup.add(base1);

    // Base Tier 2: Stepped Ring with Torus Molding
    const baseTorusGeom = new THREE.TorusGeometry(2.1, 0.16, 24, 64);
    const baseTorus = new THREE.Mesh(baseTorusGeom, goldMat);
    baseTorus.rotation.x = Math.PI / 2;
    baseTorus.position.y = 0.22;
    pedestalGroup.add(baseTorus);

    // Base Tier 3: Concave Cove Collar
    const base2Geom = new THREE.CylinderGeometry(1.5, 1.95, 0.45, 64);
    const base2 = new THREE.Mesh(base2Geom, burnishedGoldMat);
    base2.position.y = 0.45;
    pedestalGroup.add(base2);

    // Base Tier 4: Column Socket Collar
    const base3Geom = new THREE.CylinderGeometry(0.85, 1.35, 0.55, 48);
    const base3 = new THREE.Mesh(base3Geom, goldMat);
    base3.position.y = 0.85;
    pedestalGroup.add(base3);

    // 2. Classical Turned Vertical Pillar (Tapered with Ornamental Rings)
    const columnGroup = new THREE.Group();
    columnGroup.position.y = -2.3;
    mainAssembly.add(columnGroup);

    // Lower Column Urn Bulb
    const urnGeom = new THREE.SphereGeometry(0.65, 32, 24);
    const urn = new THREE.Mesh(urnGeom, goldMat);
    urn.scale.set(1.0, 1.3, 1.0);
    urn.position.y = 0.2;
    columnGroup.add(urn);

    // Central Pillar Shaft (Turned, fluted brass)
    const shaftGeom = new THREE.CylinderGeometry(0.24, 0.38, 5.2, 32);
    const shaft = new THREE.Mesh(shaftGeom, goldMat);
    shaft.position.y = 3.0;
    columnGroup.add(shaft);

    // Decorative Molded Rings on Pillar
    [-0.5, 1.4, 3.2, 4.8].forEach((py) => {
      const ringGeom = new THREE.TorusGeometry(0.36, 0.08, 16, 32);
      const ring = new THREE.Mesh(ringGeom, burnishedGoldMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = py;
      columnGroup.add(ring);
    });

    // Fulcrum Junction Hub (Where the horizontal beam pivots)
    const fulcrumHubGeom = new THREE.SphereGeometry(0.48, 32, 32);
    const fulcrumHub = new THREE.Mesh(fulcrumHubGeom, goldMat);
    fulcrumHub.position.y = 5.6;
    columnGroup.add(fulcrumHub);

    // Classical Pointed Spear/Acorn Finial Crown (reaching upward)
    const finialGroup = new THREE.Group();
    finialGroup.position.y = 6.2;
    columnGroup.add(finialGroup);

    const spearBaseGeom = new THREE.CylinderGeometry(0.32, 0.42, 0.3, 32);
    const spearBase = new THREE.Mesh(spearBaseGeom, burnishedGoldMat);
    finialGroup.add(spearBase);

    const spearConeGeom = new THREE.ConeGeometry(0.32, 1.1, 32);
    const spearCone = new THREE.Mesh(spearConeGeom, goldMat);
    spearCone.position.y = 0.65;
    finialGroup.add(spearCone);

    const spearTipGeom = new THREE.SphereGeometry(0.12, 16, 16);
    const spearTip = new THREE.Mesh(spearTipGeom, goldMat);
    spearTip.position.y = 1.25;
    finialGroup.add(spearTip);

    // 3. Arched Horizontal Balance Beam (Swivels gracefully with physical inertia)
    const beamAssembly = new THREE.Group();
    beamAssembly.position.y = 3.3; // matches fulcrumHub height in world space
    mainAssembly.add(beamAssembly);

    // Main Arched Crossbar (Turned brass with gentle curve)
    const beamGeom = new THREE.CylinderGeometry(0.09, 0.09, 7.6, 32);
    const balanceBeam = new THREE.Mesh(beamGeom, goldMat);
    balanceBeam.rotation.z = Math.PI / 2;
    beamAssembly.add(balanceBeam);

    // Center pivot rosette ring
    const pivotRingGeom = new THREE.TorusGeometry(0.42, 0.09, 16, 32);
    const pivotRing = new THREE.Mesh(pivotRingGeom, burnishedGoldMat);
    pivotRing.rotation.x = Math.PI / 2;
    beamAssembly.add(pivotRing);

    // Left and Right End Knobs (Turned brass acorns at beam ends)
    const endKnobGeom = new THREE.SphereGeometry(0.24, 20, 20);
    const leftKnob = new THREE.Mesh(endKnobGeom, goldMat);
    leftKnob.position.set(-3.8, 0, 0);
    beamAssembly.add(leftKnob);

    const rightKnob = new THREE.Mesh(endKnobGeom, goldMat);
    rightKnob.position.set(3.8, 0, 0);
    beamAssembly.add(rightKnob);

    // 4. Left and Right Suspension Chains & Deep Concave Gold Scale Pans
    const panGeom = new THREE.SphereGeometry(1.2, 36, 18, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    const chainGeom = new THREE.CylinderGeometry(0.018, 0.018, 2.6, 8);

    // Left Arm Scale Assembly
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-3.7, 0, 0);
    beamAssembly.add(leftArmGroup);

    for (let c = 0; c < 3; c++) {
      const cAngle = (c / 3) * Math.PI * 2;
      const chain = new THREE.Mesh(chainGeom, goldMat);
      chain.position.set(Math.cos(cAngle) * 0.58, -1.3, Math.sin(cAngle) * 0.58);
      leftArmGroup.add(chain);
    }
    const leftPan = new THREE.Mesh(panGeom, goldMat);
    leftPan.position.y = -2.6;
    leftPan.rotation.x = Math.PI;
    leftArmGroup.add(leftPan);

    // Right Arm Scale Assembly
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(3.7, 0, 0);
    beamAssembly.add(rightArmGroup);

    for (let c = 0; c < 3; c++) {
      const cAngle = (c / 3) * Math.PI * 2;
      const chain = new THREE.Mesh(chainGeom, goldMat);
      chain.position.set(Math.cos(cAngle) * 0.58, -1.3, Math.sin(cAngle) * 0.58);
      rightArmGroup.add(chain);
    }
    const rightPan = new THREE.Mesh(panGeom, goldMat);
    rightPan.position.y = -2.6;
    rightPan.rotation.x = Math.PI;
    rightArmGroup.add(rightPan);

    // 5. The Signature Glowing Golden Spiral Orbital Rings (as in v2_frame_01)
    const auraGroup = new THREE.Group();
    mainAssembly.add(auraGroup);

    // Spiral Elliptical Ring 1 (Swirling around the pillar and right pan)
    const curvePoints1 = [];
    const turns1 = 3;
    const count1 = 120;
    for (let i = 0; i <= count1; i++) {
      const p = i / count1;
      const angle = p * Math.PI * 2 * turns1;
      const radius = 3.6 + Math.sin(p * Math.PI) * 1.5;
      const y = -2.5 + p * 6.5;
      curvePoints1.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * (radius * 0.7)
      ));
    }
    const spline1 = new THREE.CatmullRomCurve3(curvePoints1);
    const tubeGeom1 = new THREE.TubeGeometry(spline1, 100, 0.05, 12, false);
    const auraMesh1 = new THREE.Mesh(tubeGeom1, glowingAuraMat);
    auraGroup.add(auraMesh1);

    // Outer Orbital Ring 2 (Inclined Golden Halo encircling the balance crossbar)
    const ringHaloGeom = new THREE.TorusGeometry(4.6, 0.065, 16, 100);
    const ringHalo = new THREE.Mesh(ringHaloGeom, glowingAuraMat);
    ringHalo.rotation.x = Math.PI / 3;
    ringHalo.rotation.y = Math.PI / 5;
    ringHalo.position.y = 1.0;
    auraGroup.add(ringHalo);

    // Outer Orbital Ring 3 (Cross orbital plane)
    const ringHaloGeom2 = new THREE.TorusGeometry(4.3, 0.05, 16, 100);
    const ringHalo2 = new THREE.Mesh(ringHaloGeom2, haloWireMat);
    ringHalo2.rotation.x = -Math.PI / 4;
    ringHalo2.rotation.z = Math.PI / 6;
    ringHalo2.position.y = 0.5;
    auraGroup.add(ringHalo2);

    // 6. Glowing Ember Particles dancing along the orbital aura
    const particleCount = 70;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const p = i / particleCount;
      const pt = spline1.getPoint(p);
      positions[i * 3] = pt.x + (Math.random() - 0.5) * 0.6;
      positions[i * 3 + 1] = pt.y + (Math.random() - 0.5) * 0.6;
      positions[i * 3 + 2] = pt.z + (Math.random() - 0.5) * 0.6;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    pGrad.addColorStop(0, 'rgba(255, 240, 180, 1.0)');
    pGrad.addColorStop(0.3, 'rgba(245, 190, 60, 0.7)');
    pGrad.addColorStop(1, 'rgba(245, 190, 60, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.beginPath();
    pCtx.arc(32, 32, 32, 0, Math.PI * 2);
    pCtx.fill();

    const pTex = new THREE.CanvasTexture(pCanvas);
    const pMat = new THREE.PointsMaterial({
      size: 0.45,
      map: pTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
    });
    const glowingDust = new THREE.Points(particleGeom, pMat);
    auraGroup.add(glowingDust);

    // Interactive Drag & Parallax Handling
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let autoRotY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e) => {
      if (!isDragging) {
        // Subtle hover parallax
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        camera.position.x += (nx * 1.8 - camera.position.x) * 0.05;
        camera.position.y += (-ny * 1.2 + 1.2 - camera.position.y) * 0.05;
        camera.lookAt(0, 0.4, 0);
        return;
      }

      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.005;
      targetRotX = Math.max(-0.4, Math.min(0.4, targetRotX));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Gentle auto-rotation
      if (!isDragging) {
        autoRotY += 0.005;
      }

      // Smooth inertia rotation
      mainAssembly.rotation.y += (autoRotY + targetRotY - mainAssembly.rotation.y) * 0.06;
      mainAssembly.rotation.x += (targetRotX - mainAssembly.rotation.x) * 0.06;

      // Realistic Gentle Balance Beam Rocking
      const balanceAngle = Math.sin(time * 1.1) * 0.07;
      beamAssembly.rotation.z = balanceAngle;
      // Counter-rotate arms to maintain downward gravitational hanging
      leftArmGroup.rotation.z = -balanceAngle;
      rightArmGroup.rotation.z = -balanceAngle;

      // Counter-rotate the glowing aura and halo rings for celestial effect
      auraMesh1.rotation.y = time * 0.2;
      ringHalo.rotation.z = -time * 0.15;
      ringHalo2.rotation.y = time * 0.12;
      glowingDust.rotation.y = time * 0.25;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
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
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
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
      className={`relative cursor-grab active:cursor-grabbing w-full h-full select-none ${className}`}
      title="Click and drag to rotate the Radiant Golden Scales of Justice on Turned Pedestal"
    />
  );
}
