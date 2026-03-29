import * as THREE from "three";

let renderer: THREE.WebGLRenderer | null = null;

export const getRenderer = (containerWidth: number, containerHeight: number) => {
  if (typeof window !== "undefined" && !window.WebGLRenderingContext) {
    console.error("WebGL not supported");
    return null;
  }

  if (!renderer) {
    renderer = new THREE.WebGLRenderer({
      antialias: false,                // IMPORTANT (antialias = heavy)
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true,
      failIfMajorPerformanceCaveat: false,
      preserveDrawingBuffer: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    // Disable heavy stuff
    renderer.shadowMap.enabled = false;   // <- BIG one
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
