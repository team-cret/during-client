import { convertHeight, convertWidth, RoomObject } from '@/src/shared';
import { Gltf } from '@react-three/drei/native';
import { Canvas, ThreeEvent, Vector3 } from '@react-three/fiber/native';
import { Suspense, useState } from 'react';
import { StyleSheet, View } from 'react-native';

function RoomModifyMode() {
  return (
    <View style={styles.container}>
      <Canvas
        camera={{
          fov: 75,
          near: 1,
          far: 100,
          position: [20, 20, 20],
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <pointLight position={[0, 5, 5]} intensity={50} distance={20} />
        <ambientLight intensity={1} /> */}
        <color attach="background" args={['#fff']} />
        {/* <axesHelper args={[6]} />
        <gridHelper args={[10, 10]} /> */}

        <Room />
      </Canvas>
    </View>
  );
}

function Room() {
  const [ifDeskClicked, setIfDeskClicked] = useState(false);
  const [deskPosition, setDeskPosition] = useState<Vector3>([0, 0, 9]);

  return (
    <Suspense>
      <Gltf
        src={RoomObject.room1Background.src}
        onPointerMove={(e: ThreeEvent<PointerEvent>) => {
          if (!ifDeskClicked) return;
          const floorPoint = e.intersections.sort((a, b) => b.distance - a.distance)[0].point;
          setDeskPosition([Math.round(floorPoint.x), 0, Math.round(floorPoint.z)]);
        }}
      />
      <Gltf
        src={RoomObject.room1Desk.src}
        position={deskPosition}
        onPointerEnter={() => {
          setIfDeskClicked(true);
        }}
        onPointerLeave={() => {
          setIfDeskClicked(false);
        }}
      />
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(812),
  },
});

export { RoomModifyMode };
