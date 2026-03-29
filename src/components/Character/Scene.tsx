import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import { getRenderer, disposeRenderer } from "./utils/renderer";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    let isMounted = true;
    let frameId: number;
    let debounce: number | undefined;

    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      
      const scene = new THREE.Scene();


      const renderer = getRenderer(container.width, container.height);
      if (!renderer) return;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 100);
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();
      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then((gltf) => {
        if (!isMounted || !gltf) return;

        const animations = setAnimations(gltf);
        hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
        mixer = animations.mixer;
        let character = gltf.scene;
        scene.add(character);
        headBone = character.getObjectByName("spine006") || null;
        screenLight = character.getObjectByName("screenlight") || null;
        
        progress.loaded().then(() => {
          if (!isMounted) return;
          setTimeout(() => {
            if (!isMounted) return;
            light.turnOnLights();
            animations.startIntro();
          }, 2500);
        });

        const onResize = () => {
          if (isMounted) {
            handleResize(renderer, camera, canvasDiv, character);
          }
        };

        window.addEventListener("resize", onResize);
        
        // Store onResize on renderer for cleanup access if needed, 
        // or just use a shared variable in the effect scope.
        (renderer as any)._onResize = onResize;
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      
      const animate = () => {
        if (!isMounted) return;
        frameId = requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        isMounted = false;
        cancelAnimationFrame(frameId);
        clearTimeout(debounce);

        scene.traverse((object: any) => {
          if (object.isMesh) {
            object.geometry.dispose();
            if (object.material.isMaterial) {
              cleanMaterial(object.material);
            } else if (Array.isArray(object.material)) {
              object.material.forEach(cleanMaterial);
            }
          }
        });

        function cleanMaterial(material: any) {
          material.dispose();
          for (const key of Object.keys(material)) {
            if (material[key] && material[key].isTexture) {
              material[key].dispose();
            }
          }
        }

        scene.clear();

        // THIS IS THE IMPORTANT PART
        disposeRenderer();

        if ((renderer as any)._onResize) {
          window.removeEventListener("resize", (renderer as any)._onResize);
        }
        if (canvasDiv.current && renderer.domElement) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
