import * as THREE from 'three';

/**
 * Creates a photorealistic HDR-style studio environment map for Three.js
 * Generates soft studio lighting softboxes, golden rim highlights, and deep shadows.
 */
export function createStudioEnvironment(renderer) {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Background deep judicial dark gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 512);
  bgGrad.addColorStop(0, '#02050c');
  bgGrad.addColorStop(0.5, '#070f22');
  bgGrad.addColorStop(1, '#02040a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 512);

  // Studio Overhead Softbox (Bright Warm White)
  const softbox = ctx.createRadialGradient(512, 120, 0, 512, 120, 260);
  softbox.addColorStop(0, 'rgba(255, 250, 240, 1.0)');
  softbox.addColorStop(0.3, 'rgba(255, 235, 190, 0.85)');
  softbox.addColorStop(0.7, 'rgba(212, 175, 55, 0.25)');
  softbox.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = softbox;
  ctx.beginPath();
  ctx.arc(512, 120, 260, 0, Math.PI * 2);
  ctx.fill();

  // Warm Gold Rim Light (Right Edge)
  const rimRight = ctx.createRadialGradient(880, 256, 0, 880, 256, 220);
  rimRight.addColorStop(0, 'rgba(240, 205, 95, 0.95)');
  rimRight.addColorStop(0.4, 'rgba(200, 164, 93, 0.55)');
  rimRight.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = rimRight;
  ctx.beginPath();
  ctx.arc(880, 256, 220, 0, Math.PI * 2);
  ctx.fill();

  // Cool Deep Blue Fill Light (Left Edge)
  const fillLeft = ctx.createRadialGradient(140, 256, 0, 140, 256, 200);
  fillLeft.addColorStop(0, 'rgba(70, 120, 210, 0.7)');
  fillLeft.addColorStop(0.5, 'rgba(30, 60, 130, 0.35)');
  fillLeft.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = fillLeft;
  ctx.beginPath();
  ctx.arc(140, 256, 200, 0, Math.PI * 2);
  ctx.fill();

  // Floor Specular Strip (Bottom Center)
  const floorGleam = ctx.createLinearGradient(0, 480, 1024, 480);
  floorGleam.addColorStop(0, 'rgba(0,0,0,0)');
  floorGleam.addColorStop(0.5, 'rgba(200, 164, 93, 0.4)');
  floorGleam.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = floorGleam;
  ctx.fillRect(0, 460, 1024, 40);

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;

  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  texture.dispose();
  pmremGenerator.dispose();

  return envMap;
}

/**
 * Configure Three.js WebGLRenderer with ACES Filmic Tone Mapping and soft shadows
 */
export function setupRealisticRenderer(renderer) {
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
}

/**
 * Physically realistic metallic gold material with clearcoat
 */
export function getRealisticGoldMaterial(envMap, roughness = 0.16) {
  return new THREE.MeshPhysicalMaterial({
    color: 0xE8C564,
    emissive: 0x1A1204,
    roughness: roughness,
    metalness: 0.95,
    clearcoat: 0.35,
    clearcoatRoughness: 0.12,
    reflectivity: 0.9,
    envMap: envMap,
    envMapIntensity: 1.6,
  });
}

/**
 * Physically realistic Italian white marble material
 */
export function getRealisticMarbleMaterial(envMap) {
  return new THREE.MeshStandardMaterial({
    color: 0xF5F2EB,
    roughness: 0.28,
    metalness: 0.04,
    envMap: envMap,
    envMapIntensity: 0.7,
  });
}

/**
 * Physically realistic optical glass / acrylic material with transmission
 */
export function getRealisticGlassMaterial(envMap) {
  return new THREE.MeshPhysicalMaterial({
    color: 0xFFFFFF,
    transmission: 0.92,
    opacity: 1,
    transparent: true,
    roughness: 0.05,
    ior: 1.52,
    thickness: 1.6,
    specularIntensity: 1.0,
    specularColor: 0xFFF3D6,
    envMap: envMap,
    envMapIntensity: 1.8,
  });
}
