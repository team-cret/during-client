import { useRoomStore } from '@/src/features';
import {
  avatarDecorationCategoriesType,
  AvatarItem,
  AvatarObject,
  COLOR_BACKGROUND,
  convertHeight,
  convertWidth,
  roomItems,
} from '@/src/shared';
import { avatarMotions } from '@/src/shared/constants/lib/avatar-motions';
import { findRoute } from '@/src/shared/func/lib/room';
import { Gltf, useAnimations, useGLTF } from '@react-three/drei/native';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber/native';
import { useFocusEffect } from 'expo-router';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import THREE, { Euler } from 'three';

function RoomCanvas() {
  const { myAvatar, otherAvatar, isObjectExists, initRoom } = useRoomStore();

  useFocusEffect(
    useCallback(() => {
      initRoom();
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
        <Room />
        <Avatar avatarInfo={myAvatar} isObjectExists={isObjectExists} />
        <AvatarOther avatarInfo={otherAvatar} isObjectExists={isObjectExists} />
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
  const { background, objects, updateMyAvatarPosition } = useRoomStore();

  return (
    <Suspense>
      <Gltf
        src={roomItems[background.itemId].object.src}
        onPointerEnter={(e: ThreeEvent<PointerEvent>) => {
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
}) {
  const model = useGLTF(AvatarObject.avatar.src);
  const modelRef = useRef<THREE.Group>(null);

  const animations = useAnimations(model.animations, model.scene);
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

  useEffect(() => {
    if (avatarInfo.position === null) return;
    if (avatarInfo.position.y < 0) return;

    if (route.length === 0) {
      if (modelRef.current)
        modelRef.current.position.set(
          avatarInfo.position.x,
          avatarInfo.position.y,
          avatarInfo.position.z
        );
      setRoute([avatarInfo.position]);
      return;
    }

    const lastPosition = routeIdx == route.length - 1 ? route[routeIdx] : route[routeIdx + 1];
    const newRoute = findRoute(lastPosition, avatarInfo.position, isObjectExists);
    if (newRoute.length === 0) return;

    setRoute(newRoute);
    setRouteIdx(0);
  }, [avatarInfo.position]);

  useEffect(() => {
    if (routeIdx == route.length - 1) {
      animations.actions['walk']?.stop();
      animations.actions['Idle']?.play();
    } else {
      animations.actions['Idle']?.stop();
      animations.actions['walk']?.play();
    }
  }, [route, routeIdx]);

  // 프레임마다 호출되는 useFrame으로 이동 처리
  // lerp 마지막 인자로 속도 조절
  useFrame(() => {
    if (!modelRef.current) return;

    // 루트의 끝에 도달
    if (routeIdx == route.length - 1) return;

    modelRef.current.position.lerp(route[routeIdx + 1], 0.08);

    // 다음 루트로 이동
    if (modelRef.current.position.distanceTo(route[routeIdx + 1]) < 0.01) setRouteIdx(routeIdx + 1);

    // 방향 바꾸기
    if (
      modelRef.current.position.distanceTo(route[routeIdx]) < 0.1 &&
      routeIdx < route.length - 1
    ) {
      const curDir = [
        route[routeIdx + 1].z - route[routeIdx].z,
        route[routeIdx + 1].x - route[routeIdx].x,
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
  });

  // 애니메이션 처리
  useEffect(() => {
    if (avatarInfo.animation === null) return;

    if (!avatarMotions[avatarInfo.animation]) return;

    // console.log(avatarMotions[avatarInfo.animation].name);
    // for (const key in animations.actions) {
    //   console.log(key);
    // }

    animations.actions['walk']?.stop();
    animations.actions['Idle']?.stop();
    setRoute([route[routeIdx]]);
    setRouteIdx(0);

    animations.actions[avatarMotions[avatarInfo.animation].name]?.play();
    setTimeout(() => {
      animations.actions[avatarMotions[avatarInfo.animation!].name]?.stop();
      animations.actions['Idle']?.play();
    }, avatarMotions[avatarInfo.animation].playTime);
  }, [avatarInfo.animation]);

  return (
    <group position={new THREE.Vector3(1, 0, 1)}>
      <group ref={modelRef}>
        <primitive object={model.scene} />
      </group>
    </group>
  );
}

function AvatarOther({
  avatarInfo,
  isObjectExists,
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
}) {
  const model = useGLTF(AvatarObject.avatarOther.src);
  const modelRef = useRef<THREE.Group>(null);

  const animations = useAnimations(model.animations, model.scene);
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

  useEffect(() => {
    if (avatarInfo.position === null) return;
    if (avatarInfo.position.y < 0) return;

    if (route.length === 0) {
      if (modelRef.current)
        modelRef.current.position.set(
          avatarInfo.position.x,
          avatarInfo.position.y,
          avatarInfo.position.z
        );
      setRoute([avatarInfo.position]);
      return;
    }

    const lastPosition = routeIdx == route.length - 1 ? route[routeIdx] : route[routeIdx + 1];
    const newRoute = findRoute(lastPosition, avatarInfo.position, isObjectExists);
    if (newRoute.length === 0) return;

    setRoute(newRoute);
    setRouteIdx(0);
  }, [avatarInfo.position]);

  useEffect(() => {
    if (routeIdx == route.length - 1) {
      animations.actions['walk']?.stop();
      animations.actions['Idle']?.play();
    } else {
      animations.actions['Idle']?.stop();
      animations.actions['walk']?.play();
    }
  }, [route, routeIdx]);

  // 프레임마다 호출되는 useFrame으로 이동 처리
  // lerp 마지막 인자로 속도 조절
  useFrame(() => {
    if (!modelRef.current) return;

    // 루트의 끝에 도달
    if (routeIdx == route.length - 1) return;

    modelRef.current.position.lerp(route[routeIdx + 1], 0.08);

    // 다음 루트로 이동
    if (modelRef.current.position.distanceTo(route[routeIdx + 1]) < 0.01) setRouteIdx(routeIdx + 1);

    // 방향 바꾸기
    if (
      modelRef.current.position.distanceTo(route[routeIdx]) < 0.1 &&
      routeIdx < route.length - 1
    ) {
      const curDir = [
        route[routeIdx + 1].z - route[routeIdx].z,
        route[routeIdx + 1].x - route[routeIdx].x,
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
  });

  // 애니메이션 처리
  useEffect(() => {
    if (avatarInfo.animation === null) return;

    if (!avatarMotions[avatarInfo.animation]) return;

    // console.log(avatarMotions[avatarInfo.animation].name);
    // for (const key in animations.actions) {
    //   console.log(key);
    // }

    animations.actions['walk']?.stop();
    animations.actions['Idle']?.stop();
    setRoute([route[routeIdx]]);
    setRouteIdx(0);

    animations.actions[avatarMotions[avatarInfo.animation].name]?.play();
    setTimeout(() => {
      animations.actions[avatarMotions[avatarInfo.animation!].name]?.stop();
      animations.actions['Idle']?.play();
    }, avatarMotions[avatarInfo.animation].playTime);
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
