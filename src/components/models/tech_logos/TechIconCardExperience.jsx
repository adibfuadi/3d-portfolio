import { Suspense } from "react";
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

/**
 * One tech icon. This renders a <View> (a plain div) instead of its own
 * <Canvas>: every icon is drawn by the single shared Canvas in TechStack,
 * so the page holds one WebGL context instead of one per icon.
 */
const TechIconCardExperience = ({ model, visible = true }) => {
  const { modelPath, scale, rotation } = model;

  return (
    <View className="size-full" visible={visible}>
      {/* Each view needs its own camera, otherwise all icons share the root
          camera and dragging one rotates every icon. Same as the old
          per-Canvas default (position z=5, fov 75). */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <spotLight
        position={[10, 15, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
      />
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

      <OrbitControls enableZoom={false} />
    </View>
  );
};

export default TechIconCardExperience;
