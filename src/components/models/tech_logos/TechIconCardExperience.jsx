import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  View,
} from "@react-three/drei";

const GltfModel = ({ path }) => {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
};

// Lights, environment and the floating model, shared by both render modes.
const IconScene = ({ modelPath, scale, rotation }) => (
  <>
    <ambientLight intensity={0.3} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} />
    <Environment preset="city" />

    {/* Float gives the icon a gentle bob/rotation; the group applies
        the per-icon scale and rotation from constants. */}
    <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
      <group scale={scale} rotation={rotation}>
        <Suspense fallback={null}>
          <GltfModel path={modelPath} />
        </Suspense>
      </group>
    </Float>
  </>
);

/**
 * One tech icon, rendered one of two ways:
 *
 * - default: a <View> (a plain div) drawn by the single shared fixed Canvas
 *   in TechStack, so desktop holds one WebGL context instead of one per icon.
 * - standalone: its own <Canvas> inside the card. Used on touch devices,
 *   where the page scrolls on the compositor thread ahead of JS: a View
 *   re-measured every frame lags a frame behind its card and visibly
 *   jitters, while a canvas inside the card scrolls with it natively.
 *   No OrbitControls there, so a swipe over the icon still scrolls the page.
 */
const TechIconCardExperience = ({ model, visible = true, standalone = false }) => {
  if (standalone) {
    return (
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <IconScene {...model} />
      </Canvas>
    );
  }

  return (
    <View className="size-full" visible={visible}>
      {/* Each view needs its own camera, otherwise all icons share the root
          camera and dragging one rotates every icon. */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      <IconScene {...model} />
      <OrbitControls enableZoom={false} />
    </View>
  );
};

export default TechIconCardExperience;
