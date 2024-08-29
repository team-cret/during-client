import { convertHeight, convertWidth, AvatarObject } from '@/src/shared';
import { Gltf, useAnimations, useGLTF } from '@react-three/drei/native';
import { Canvas, ThreeEvent, Vector3 } from '@react-three/fiber/native';
import { Suspense, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import THREE from 'three';

function AvatarTest() {
  const [ifVisible, setIfVisible] = useState<{ [key: string]: boolean }>({
    basic_pants: false,
    basic_T: false,
    character_body: false,
  });

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
        <pointLight position={[0, 5, 5]} intensity={50} distance={20} />
        <ambientLight intensity={1} />
        <color attach="background" args={['#fff']} />
        <axesHelper args={[6]} />
        <gridHelper args={[24, 24]} />

        {/* <Avatar ifVisible={ifVisible} /> */}
        <Avatar ifVisible={ifVisible} />
      </Canvas>

      <TestPanel ifVisible={ifVisible} setIfVisible={setIfVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(812),
  },
});

function Avatar({ ifVisible }: { ifVisible: { [key: string]: boolean } }) {
  const model = useGLTF(AvatarObject.avatar.src);

  const animations = useAnimations(model.animations, model.scene);
  useEffect(() => {
    animations.actions['angry']?.play();

    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.visible = ifVisible[child.name];
      }
    });
  }, [ifVisible]);
  return (
    <Suspense>
      <primitive object={model.scene} />
    </Suspense>
  );
}

export { AvatarTest };

function TestPanel({
  ifVisible,
  setIfVisible,
}: {
  ifVisible: { [key: string]: boolean };
  setIfVisible: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
}) {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 10,
        width: '100%',

        flexDirection: 'row',
      }}
    >
      {Object.keys(ifVisible).map((key) => (
        <Text
          key={key}
          style={{
            padding: 10,
            backgroundColor: ifVisible[key] ? 'yellow' : 'white',
            color: 'black',
            margin: 5,
          }}
          onPress={() => {
            setIfVisible((prev) => ({
              ...prev,
              [key]: !prev[key],
            }));
          }}
        >
          {key}
        </Text>
      ))}
    </View>
  );
}
