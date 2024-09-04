import { useRoomStore } from '@/src/features';
import { COLOR_BACKGROUND, convertHeight, convertWidth } from '@/src/shared';
import { Gltf } from '@react-three/drei/native';
import { Canvas } from '@react-three/fiber/native';
import { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';
import THREE from 'three';

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

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(700),
    position: 'absolute',
  },
});

export { RoomCanvas };
