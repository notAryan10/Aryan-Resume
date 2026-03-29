import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

const CharacterModel = () => {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 4], fov: 50 }}
      dpr={[1, 1.5]}
      shadows={false}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
        alpha: true
      }}
      performance={{ min: 0.5 }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
};

export default CharacterModel;
