import { useDecorateAvatarStore } from '@/src/features';
import { AvatarObject, COLOR_BACKGROUND, convertHeight, convertWidth } from '@/src/shared';
import { Gltf, useAnimations, useGLTF } from '@react-three/drei/native';
import { Canvas, ThreeEvent } from '@react-three/fiber/native';
import { useFocusEffect } from 'expo-router';
import { Suspense, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import THREE from 'three';

const bottomSheetConfig = {
  bottom: {
    'three-rows': convertHeight(200),
    'one-row': convertHeight(100),
    'handle-only': convertHeight(0),
  },
  animatinonConfig: {
    duration: 300,
    easing: Easing.bezier(0.1, 0.71, 0.37, 0.9),
  },
};

function AvatarCanvas() {
  const { bottomSheetMode } = useDecorateAvatarStore();
  const bottom = useSharedValue<number>(bottomSheetConfig.bottom[bottomSheetMode]);

  useEffect(() => {
    bottom.value = withTiming(
      bottomSheetConfig.bottom[bottomSheetMode],
      bottomSheetConfig.animatinonConfig
    );
  }, [bottomSheetMode]);

  return (
    <Animated.View style={[styles.container, { bottom }]}>
      <Canvas
        camera={{
          fov: 75,
          near: 1,
          far: 100,
          position: [0, 3, 5],
          rotation: [Math.PI * (-10 / 180), 0, 0],
        }}
        style={styles.container}
      >
        <color attach="background" args={[COLOR_BACKGROUND]} />
        <Avatar />
      </Canvas>
    </Animated.View>
  );
}

function Avatar() {
  const { avatarStyle } = useDecorateAvatarStore();

  const model = useGLTF(AvatarObject.avatar.src);

  const animations = useAnimations(model.animations, model.scene);
  useFocusEffect(
    useCallback(() => {
      model.scene.position.set(0, 0, 0);
      model.scene.rotation.set(0, 0, 0);
      animations.actions['Idle']?.stop();
      animations.actions['Idle']?.play();
    }, [])
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
    width: convertWidth(375),
    height: convertHeight(700),
    position: 'absolute',
  },
});

export { AvatarCanvas };
