import { useRoomStore, useUserStore } from '@/src/features';
import {
  avatarDecorationCategoriesType,
  AvatarObject,
  COLOR_BACKGROUND,
  convertHeight,
  convertWidth,
  roomItems,
} from '@/src/shared';
import { avatarMotions } from '@/src/shared/constants/lib/avatar-motions';
import { findRoute } from '@/src/shared/func/lib/room';
import { LoadingIndicator3D } from '@/src/widgets';
import { Gltf, useAnimations, useGLTF } from '@react-three/drei/native';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber/native';
import { useFocusEffect } from 'expo-router';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as THREE from 'three';

function RoomCanvas() {
  const { myAvatar, otherAvatar, isObjectExists, initRoom } = useRoomStore();
  const { role } = useUserStore();
  // const { progress } = useProgress();
  // useEffect(() => {
  //   if (progress === 100) {
  //     setIsLoaded(true);
  //   }
  // }, [progress]);

  useFocusEffect(
    useCallback(() => {
      initRoom({ userRole: role });
    }, [])
  );

  return (
    <View style={styles.container}>
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
        <ambientLight intensity={2.5} />
        <Suspense fallback={<LoadingIndicator3D />}>
          <Room />
          <Avatar
            avatarInfo={myAvatar}
            isObjectExists={isObjectExists}
            modelSrc={AvatarObject.avatar.src}
          />
          <Avatar
            avatarInfo={otherAvatar}
            isObjectExists={isObjectExists}
            modelSrc={AvatarObject.avatarOther.src}
          />
        </Suspense>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(700),
    position: 'absolute',

    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Room() {
  const { background, objects, updateMyAvatarPosition } = useRoomStore();
  const { role } = useUserStore();

  return (
    <Suspense>
      <Gltf
        src={roomItems[background.itemId].object.src}
        onPointerDown={(e: ThreeEvent<PointerEvent>) => {
          const floorPoint = e.intersections.sort((a, b) => b.distance - a.distance)[0].point;
          updateMyAvatarPosition({ position: floorPoint, userRole: role });
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
            rotation={[0, (object.rotation * Math.PI) / 2, 0]}
          />
        );
      })}
    </Suspense>
  );
}

function Avatar({
  avatarInfo,
  isObjectExists,
  modelSrc,
}: {
  avatarInfo: {
    style: {
      [key in avatarDecorationCategoriesType]: string | null;
    };
    position: THREE.Vector3;
    rotation: number;
    animation: string | null;
  };
  isObjectExists: Array<Array<boolean>>;
  modelSrc: string;
}) {
  const model = useGLTF(modelSrc);

  const modelRef = useRef<THREE.Group>(null);

  const [currentAnimation, setCurrentAnimation] = useState<string>('');
  const animations = useAnimations(model.animations, model.scene);

  function playAnimation(animation: string, playTime: number) {
    if (animation === currentAnimation) return;

    animations.actions[currentAnimation]?.stop();
    animations.actions[animation]?.play();
    setCurrentAnimation(animation);

    if (playTime > 0) {
      setTimeout(() => {
        animations.actions[animation]?.stop();
        animations.actions['Idle']?.play();
        setCurrentAnimation('Idle');
      }, playTime);
    }
  }
  useFocusEffect(
    useCallback(() => {
      if (!modelRef.current) return;
      modelRef.current.position.set(
        avatarInfo.position.x,
        avatarInfo.position.y,
        avatarInfo.position.z
      );
      modelRef.current.rotation.set(0, (avatarInfo.rotation * Math.PI) / 2, 0);
    }, [])
  );

  // 아바타 스타일 처리
  useEffect(() => {
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.visible = false;
        if (avatarInfo.style.상의 === null && child.name === 'basic-tops') child.visible = true;
        if (avatarInfo.style.하의 === null && child.name === 'basic-bottoms') child.visible = true;
        if (child.name === 'body') child.visible = true;

        if (avatarInfo.style.상의 && child.name === avatarInfo.style.상의) child.visible = true;
        if (avatarInfo.style.하의 && child.name === avatarInfo.style.하의) child.visible = true;
        if (avatarInfo.style.신발 && child.name === avatarInfo.style.신발) child.visible = true;
        if (avatarInfo.style.헤어 && child.name === avatarInfo.style.헤어) child.visible = true;
      }
    });
  }, [avatarInfo.style]);

  // 아바타 이동 처리
  const [route, setRoute] = useState<Array<THREE.Vector3>>([]);
  const [routeIdx, setRouteIdx] = useState(0);
  const [timeStamp, setTimeStamp] = useState(0);
  const millisecondsPerMeter = 1000;

  useEffect(() => {
    if (avatarInfo.position === null) return;
    if (avatarInfo.position.y < 0) return;

    if (route.length === 0) {
      if (modelRef.current) {
        modelRef.current.position.set(
          avatarInfo.position.x,
          avatarInfo.position.y,
          avatarInfo.position.z
        );
      }
      setRoute([avatarInfo.position]);
      return;
    }

    const lastPosition = routeIdx == route.length - 1 ? route[routeIdx] : route[routeIdx + 1];
    const newRoute = findRoute(lastPosition, avatarInfo.position, isObjectExists);
    if (newRoute.length === 0) return;

    setTimeStamp(Date.now());
    setRoute(newRoute);
    setRouteIdx(0);
  }, [avatarInfo.position]);

  useEffect(() => {
    if (route.length === 0) {
      playAnimation('Idle', 0);
      return;
    }

    if (routeIdx == route.length - 1) {
      playAnimation('Idle', 0);
    } else {
      playAnimation('walk', 0);
    }
  }, [route, routeIdx]);

  // 프레임마다 호출되는 useFrame으로 이동 처리
  // lerp 마지막 인자로 속도 조절
  useFrame(() => {
    if (!modelRef.current) return;

    if (routeIdx >= route.length - 1) return;

    modelRef.current.position.set(
      route[routeIdx].x +
        (route[routeIdx + 1].x - route[routeIdx].x) *
          (Date.now() - timeStamp) *
          (1 / millisecondsPerMeter),
      route[routeIdx].y +
        (route[routeIdx + 1].y - route[routeIdx].y) *
          (Date.now() - timeStamp) *
          (1 / millisecondsPerMeter),
      route[routeIdx].z +
        (route[routeIdx + 1].z - route[routeIdx].z) *
          (Date.now() - timeStamp) *
          (1 / millisecondsPerMeter)
    );

    //// 다음 포인트로 이동
    if (routeIdx == 0 || Date.now() - timeStamp > millisecondsPerMeter) {
      if (routeIdx < route.length - 2) {
        //회전
        const curDir = [
          route[routeIdx + 2].z - route[routeIdx + 1].z,
          route[routeIdx + 2].x - route[routeIdx + 1].x,
        ];
        if (curDir[0] === 0) {
          if (curDir[1] === 1) {
            modelRef.current.rotation.set(0, Math.PI / 2, 0);
          } else {
            modelRef.current.rotation.set(0, (3 * Math.PI) / 2, 0);
          }
        } else {
          if (curDir[0] === 1) {
            modelRef.current.rotation.set(0, 0, 0);
          } else {
            modelRef.current.rotation.set(0, Math.PI, 0);
          }
        }
      }

      setRouteIdx(routeIdx + 1);
      setTimeStamp(Date.now());
    }
  });

  // 애니메이션 처리
  useEffect(() => {
    if (avatarInfo.animation === null) return;

    if (!avatarMotions[avatarInfo.animation]) {
      playAnimation('Idle', 0);
      return;
    }

    // setRoute([route[routeIdx]]);
    // setRouteIdx(0);

    playAnimation(
      avatarMotions[avatarInfo.animation].name,
      avatarMotions[avatarInfo.animation].playTime
    );
  }, [avatarInfo.animation]);

  return (
    <group position={new THREE.Vector3(1, 0, 1)}>
      <group ref={modelRef}>
        <primitive object={model.scene} />
      </group>
    </group>
  );
}

export { RoomCanvas };
