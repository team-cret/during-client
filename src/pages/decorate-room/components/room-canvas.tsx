import { useDecorateRoomStore, useRoomStore } from '@/src/features';
import { COLOR_BACKGROUND, convertHeight, convertWidth } from '@/src/shared';
import { Gltf } from '@react-three/drei/native';
import { Canvas, ThreeEvent } from '@react-three/fiber/native';
import { Suspense, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
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
    </Animated.View>
  );
}

function Room() {
  const {
    room: { background, objects, selectedObjectId },
    selectObject,
    deselectObject,
    moveObject,
  } = useDecorateRoomStore();

  return (
    <Suspense>
      <Gltf
        src={background.object.src}
        onPointerMove={(e: ThreeEvent<PointerEvent>) => {
          if (selectedObjectId === -1) return;
          const floorPoint = e.intersections.sort((a, b) => b.distance - a.distance)[0].point;
          moveObject(new THREE.Vector3(Math.round(floorPoint.x), 0, Math.round(floorPoint.z)));
        }}
        onPointerUp={() => {
          deselectObject();
        }}
      />
      {objects.map((object, index) => {
        return (
          <Gltf
            key={index}
            src={object.item.object.src}
            position={object.position}
            onPointerEnter={(e: ThreeEvent<PointerEvent>) => {
              if (e.intersections.length > 2) return;
              selectObject(object.item.id);
            }}
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
