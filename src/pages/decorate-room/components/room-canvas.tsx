import { useDecorateRoomStore } from '@/src/features';
import { COLOR_BACKGROUND, convertHeight, convertWidth, roomItems } from '@/src/shared';
import { Gltf } from '@react-three/drei/native';
import { Canvas, ThreeEvent } from '@react-three/fiber/native';
import { Suspense } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Easing, useSharedValue } from 'react-native-reanimated';
import THREE from 'three';

const animatinonConfig = {
  duration: 300,
  easing: Easing.bezier(0.1, 0.71, 0.37, 0.9),
};

function RoomCanvas() {
  const bottom = useSharedValue<number>(0);

  return (
    <Animated.View style={[styles.container, { bottom }]}>
      <Canvas
        orthographic
        camera={{
          fov: 75,
          near: 1,
          far: 100,
          zoom: 20,
          position: [21, 21, 21],
        }}
        style={styles.container}
      >
        <color attach="background" args={[COLOR_BACKGROUND]} />
        <Room />
      </Canvas>
    </Animated.View>
  );
}

function Room() {
  const {
    roomInfo: { background, objects, selectedObjectIdx },
    selectObject,
    deselectObject,
    moveObject,
  } = useDecorateRoomStore();

  return (
    <Suspense>
      <Gltf
        src={roomItems[background.itemId].object.src}
        onPointerMove={(e: ThreeEvent<PointerEvent>) => {
          if (selectedObjectIdx === null) return;
          const floorPoint = e.intersections.sort((a, b) => b.distance - a.distance)[0].point;
          moveObject(floorPoint);
        }}
        onPointerEnter={(e: ThreeEvent<PointerEvent>) => {
          if (e.intersections.length >= 2) return;
          deselectObject();
        }}
      />
      {objects.map((object, index) => {
        return (
          <Gltf
            key={index}
            src={roomItems[object.itemId].object.src}
            position={
              new THREE.Vector3(
                object.position.x +
                  (object.rotation % 2 === 0
                    ? roomItems[object.itemId].size.depth / 2
                    : roomItems[object.itemId].size.width / 2),
                object.position.y,
                object.position.z +
                  (object.rotation % 2 === 1
                    ? roomItems[object.itemId].size.depth / 2
                    : roomItems[object.itemId].size.width / 2)
              )
            }
            onPointerEnter={(e: ThreeEvent<PointerEvent>) => {
              const floorPoint = e.intersections.sort((a, b) => b.distance - a.distance)[0].point;
              selectObject(index, floorPoint);
            }}
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
    height: convertHeight(812),
    position: 'absolute',
  },
});

export { RoomCanvas };
