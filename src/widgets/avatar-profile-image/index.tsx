import { avatarDecorationCategoriesType, AvatarObject, COLOR_BACKGROUND } from '@/src/shared';
import { useGLTF } from '@react-three/drei/native';
import { Canvas } from '@react-three/fiber/native';
import { Suspense, useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import * as THREE from 'three';

function AvatarProfileImage({
  avatarStyle,
  modelSrc,
  width,
}: {
  avatarStyle: {
    [key in avatarDecorationCategoriesType]: string | null;
  };
  modelSrc: string;
  width: number;
}) {
  return (
    <Animated.View style={[styles.container, { width }]}>
      <Canvas
        camera={{
          fov: 75,
          near: 1,
          far: 100,
          position: [0, 3, 3],
          rotation: [Math.PI * (-10 / 180), 0, 0],
        }}
        style={styles.container}
      >
        <color attach="background" args={[COLOR_BACKGROUND]} />
        <Avatar avatarStyle={avatarStyle} modelSrc={modelSrc} />
      </Canvas>
    </Animated.View>
  );
}

function Avatar({
  avatarStyle,
  modelSrc,
}: {
  avatarStyle: {
    [key in avatarDecorationCategoriesType]: string | null;
  };
  modelSrc: string;
}) {
  const model = useGLTF(
    Platform.OS === 'ios'
      ? modelSrc === AvatarObject.avatar.src
        ? AvatarObject.avatarCopy.src
        : AvatarObject.avatarOtherCopy.src
      : modelSrc
  );

  useEffect(() => {
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.visible = false;
        if (child.name === 'body') child.visible = true;
        if (avatarStyle.상의 === null && child.name === 'basic-tops') child.visible = true;
        if (avatarStyle.하의 === null && child.name === 'basic-bottoms') child.visible = true;

        if (avatarStyle.상의 && child.name === avatarStyle.상의) child.visible = true;
        if (avatarStyle.하의 && child.name === avatarStyle.하의) child.visible = true;
        if (avatarStyle.신발 && child.name === avatarStyle.신발) child.visible = true;
        if (avatarStyle.헤어 && child.name === avatarStyle.헤어) child.visible = true;
      }
    });
  }, [avatarStyle]);

  return (
    <Suspense>
      <primitive object={model.scene} />
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
  },
});

export { AvatarProfileImage };
