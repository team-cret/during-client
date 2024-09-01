import { useRoomStore } from '@/src/features';
import { COLOR_BACKGROUND, convertHeight, convertWidth } from '@/src/shared';
import { Gltf } from '@react-three/drei/native';
import { Canvas, ThreeEvent, Vector3 } from '@react-three/fiber/native';
import { Suspense, useState } from 'react';
import { StyleSheet, View } from 'react-native';

function RoomCanvas() {
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
      </Canvas>
    </View>
  );
}

function Room() {
  const { background, objects } = useRoomStore();

  return (
    <Suspense>
      <Gltf src={background.object.src} />
      {objects.map((object, index) => {
        return <Gltf key={index} src={object.item.object.src} position={object.position} />;
      })}
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

export { RoomCanvas };
