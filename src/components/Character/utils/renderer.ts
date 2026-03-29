import * as THREE from "three";

let renderer: THREE.WebGLRenderer | null = null;

export const getRenderer = (containerWidth: number, containerHeight: number) => {
  if (!renderer) {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.devicePixelRatio < 2,
      powerPreference: "high-performance",
      precision: "mediump",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
  }
  
  renderer.setSize(containerWidth, containerHeight);
  return renderer;
};

export const disposeRenderer = () => {
  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
    renderer = null;
  }
};
