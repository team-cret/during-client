import { convertHeight, convertWidth, RoomObject } from '@/src/shared';
import { Gltf } from '@react-three/drei/native';
import { Canvas, ThreeEvent, Vector3 } from '@react-three/fiber/native';
import { Suspense, useState } from 'react';
import { StyleSheet, View } from 'react-native';

// import AvatarModel from '@/src/shared/assets/models/avatar.glb';

function AvatarTest() {
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

// function Avatar() {
//   const avatarRef = useRef<THREE.Group>(null);

//   // const [skin] = useLoader(THREE.TextureLoader, [
//   //   require('@/src/shared/assets/models/textures/1.png'),
//   // ]);

//   // const {
//   //   // scene: { geometry, textures },
//   //   scene,
//   //   scenes,
//   //   animations,
//   //   cameras,
//   //   asset,
//   //   parser,
//   //   userData,
//   //   nodes,
//   //   materials,
//   // } = useGLTF(AvatarModel) as any;

//   const model = useGLTF(require('@/src/shared/assets/models/avatar.glb'), true, false) as any;

//   useEffect(() => {
//     if (!model.nodes || !model.materials) {
//       console.error('GLTF data not loaded properly.');
//       return;
//     }
//     console.log('loaded');
//   }, [model]);

//   useEffect(() => {
//     // if (!avatarRef.current) return;
//     // model.scene.traverse((child) => {
//     //   if (child instanceof THREE.Mesh) {
//     //     child.castShadow = true;
//     //     child.receiveShadow = true;
//     //   }
//     // });
//   }, []);

//   const animations = useAnimations(model.animations, model.scene);
//   useEffect(() => {
//     const action = animations.actions['Idle'];
//     if (!action) return;
//     action.play();
//   }, []);
//   return (
//     <Suspense>
//       <primitive ref={avatarRef} object={model.scene} />
//     </Suspense>
//   );
// }
// useGLTF.preload('@/src/shared/assets/models/avatar.glb');

// function Box() {
//   const colorMap = useLoader(TextureLoader, require('@/src/shared/assets/temp.png'));

//   return (
//     <mesh>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial map={colorMap} />
//     </mesh>
//   );
// }

export { AvatarTest };
