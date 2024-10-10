import { COLOR_SECONDARY_PINK_DARK } from '@/src/shared';
import { useProgress } from '@react-three/drei/core';

function LoadingIndicator3D() {
  useProgress();
  return (
    <mesh rotation={[0, 0, 0]}>
      <boxGeometry args={[5, 5, 5]} />
      <meshStandardMaterial color={COLOR_SECONDARY_PINK_DARK} />
    </mesh>
  );
}

export { LoadingIndicator3D };
