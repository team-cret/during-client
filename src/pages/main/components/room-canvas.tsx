import { useRoomStore } from '@/src/features';
import {
  avatarDecorationCategoriesType,
  AvatarItem,
  AvatarObject,
  COLOR_BACKGROUND,
  convertHeight,
  convertWidth,
} from '@/src/shared';
import { Gltf, useGLTF } from '@react-three/drei/native';
import { Canvas } from '@react-three/fiber/native';
import { Suspense, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import THREE from 'three';

function RoomCanvas() {
  const { myAvatar } = useRoomStore();
  return (
    <View style={styles.container}>
      <Canvas
        camera={{
          fov: 75,
          near: 1,
          far: 100,
          position: [21, 19, 21],
        }}
        style={styles.container}
      >
        <color attach="background" args={[COLOR_BACKGROUND]} />
        <Room />
        <Avatar avatarInfo={myAvatar} />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(700),
    position: 'absolute',
  },
});

function Room() {
  const { background, objects } = useRoomStore();

  return (
    <Suspense>
      <Gltf src={background.object.src} />
      {objects.map((object, index) => {
        return (
          <Gltf
            key={index}
            src={object.item.object.src}
            position={
              new THREE.Vector3(
                object.position.x +
                  (object.rotation % 2 === 0
                    ? object.item.size.depth / 2
                    : object.item.size.width / 2),
                object.position.y,
                object.position.z +
                  (object.rotation % 2 === 1
                    ? object.item.size.depth / 2
                    : object.item.size.width / 2)
              )
            }
            rotation={[0, (object.rotation * Math.PI) / 2, 0]}
          />
        );
      })}
    </Suspense>
  );
}

function Avatar({
  avatarInfo,
}: {
  avatarInfo: {
    style: {
      [key in avatarDecorationCategoriesType]: AvatarItem | null;
    };
    position: THREE.Vector3 | null;
    rotation: number;
    animation: number;
  };
}) {
  const model = useGLTF(AvatarObject.avatar.src);

  // const animations = useAnimations(model.animations, model.scene);
  // useFocusEffect(
  //   useCallback(() => {
  //     animations.actions['Idle']?.play();
  //   }, [])
  // );

  useEffect(() => {
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.visible = false;
        if (avatarInfo.style.상의 === null && child.name === 'basic-tops') child.visible = true;
        if (avatarInfo.style.하의 === null && child.name === 'basic-bottoms') child.visible = true;
        if (child.name === 'body') child.visible = true;

        if (avatarInfo.style.상의 && child.name === avatarInfo.style.상의.name)
          child.visible = true;
        if (avatarInfo.style.하의 && child.name === avatarInfo.style.하의.name)
          child.visible = true;
        if (avatarInfo.style.신발 && child.name === avatarInfo.style.신발.name)
          child.visible = true;
        if (avatarInfo.style.헤어 && child.name === avatarInfo.style.헤어.name)
          child.visible = true;
      }
    });
  }, [avatarInfo.style]);

  useEffect(() => {
    if (avatarInfo.position) {
      model.scene.position.set(
        1 + avatarInfo.position.x,
        avatarInfo.position.y,
        1 + avatarInfo.position.z
      );
    }
  }, [avatarInfo.position]);

  useEffect(() => {
    model.scene.rotation.y = (avatarInfo.rotation * Math.PI) / 2;
  }, [avatarInfo.rotation]);

  return (
    <Suspense>
      <primitive object={model.scene} />
    </Suspense>
  );
}

export { RoomCanvas };
