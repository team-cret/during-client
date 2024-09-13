import {
  COLOR_BASE_1,
  COLOR_BASE_2_30,
  COLOR_WHITE,
  convertHeight,
  convertWidth,
  HorizontalDivider,
  NavProp,
  SpaceFlexBox,
} from '@/src/shared';
import { Pressable, StyleSheet, View } from 'react-native';

import CloseIcon from '@/src/shared/assets/icons/menu/close.svg';
import RoomIcon from '@/src/shared/assets/icons/menu/room.svg';
import AvatarIcon from '@/src/shared/assets/icons/menu/avatar.svg';
import SettingIcon from '@/src/shared/assets/icons/menu/setting.svg';
import {
  useDecorateAvatarStore,
  useDecorateRoomStore,
  useRoomStore,
  useSideBarStore,
} from '@/src/features';
import Animated, { Easing, runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { MenuPage } from '../../menu';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useNavigation } from 'expo-router';

const sideBarConfig = {
  animatinonConfig: {
    duration: 300,
    easing: Easing.bezier(0.1, 0.71, 0.37, 0.9),
    // easing: Easing.inOut(Easing.ease),
  },
  sideBarLeft: {
    open: convertWidth(300),
    close: convertWidth(375),
    expand: convertWidth(-75),
  },
  velocityBoundary: 100,
};

function SideBar() {
  const { closeSideBar, ifSideBarOpen } = useSideBarStore();
  const left = useSharedValue(sideBarConfig.sideBarLeft.close);
  const leftStartOffset = useSharedValue(0);

  const {
    background,
    objects,
    myAvatar: { style: avatarStyle },
  } = useRoomStore();
  const { init: decorateRoomInit } = useDecorateRoomStore();
  const { init: decorateAvatarInit } = useDecorateAvatarStore();
  const navigation = useNavigation<NavProp<'main/index'>>();

  useEffect(() => {
    if (ifSideBarOpen) {
      left.value = withTiming(sideBarConfig.sideBarLeft.open, sideBarConfig.animatinonConfig);
    } else {
      left.value = withTiming(sideBarConfig.sideBarLeft.close, sideBarConfig.animatinonConfig);
    }
  }, [ifSideBarOpen]);

  const gesturePan = Gesture.Pan()
    .onBegin((event) => {
      leftStartOffset.value = event.x;
    })
    .onEnd((event) => {
      if (Math.abs(event.velocityX) > sideBarConfig.velocityBoundary) {
        if (event.velocityX > 0) {
          runOnJS(closeSideBar)();
        } else {
          left.value = withTiming(sideBarConfig.sideBarLeft.expand, sideBarConfig.animatinonConfig);
        }
      } else {
        if (event.absoluteX < sideBarConfig.sideBarLeft.close / 2)
          left.value = withTiming(sideBarConfig.sideBarLeft.expand, sideBarConfig.animatinonConfig);
        else if (event.absoluteX < sideBarConfig.sideBarLeft.open)
          left.value = withTiming(sideBarConfig.sideBarLeft.open, sideBarConfig.animatinonConfig);
        else runOnJS(closeSideBar)();
      }
    })
    .onChange((event) => {
      if (event.absoluteX - leftStartOffset.value < sideBarConfig.sideBarLeft.expand) return;
      if (event.absoluteX - leftStartOffset.value > sideBarConfig.sideBarLeft.open) return;
      left.value = event.absoluteX - leftStartOffset.value;
    });

  return (
    <GestureDetector gesture={gesturePan}>
      <Animated.View style={{ ...styles.container, left }}>
        <View style={styles.sideBarContainer}>
          <SpaceFlexBox flex={10} />
          <Pressable style={styles.iconContainer} onPress={closeSideBar}>
            <CloseIcon width={convertWidth(20)} height={convertHeight(20)} />
          </Pressable>
          <HorizontalDivider
            width={convertWidth(46)}
            height={convertHeight(32)}
            lineHeight={convertHeight(0.34)}
            upperFlex={16}
            lowerFlex={16}
            color={COLOR_BASE_2_30}
          />
          <Pressable
            style={styles.iconContainer}
            onPress={() => {
              decorateRoomInit({ background, objects });
              closeSideBar();
              navigation.navigate('decorate-room/index');
            }}
          >
            <RoomIcon width={convertWidth(22)} height={convertHeight(25)} />
          </Pressable>
          <SpaceFlexBox flex={10} />
          <Pressable
            style={styles.iconContainer}
            onPress={() => {
              decorateAvatarInit({ avatarStyle });
              closeSideBar();
              navigation.navigate('decorate-avatar/index');
            }}
          >
            <AvatarIcon width={convertWidth(25)} height={convertHeight(25)} />
          </Pressable>
          <HorizontalDivider
            width={convertWidth(46)}
            height={convertHeight(51)}
            lineHeight={convertHeight(0.34)}
            upperFlex={25}
            lowerFlex={25}
            color={COLOR_BASE_2_30}
          />
          <Pressable
            style={styles.iconContainer}
            onPress={() => {
              closeSideBar();
              navigation.navigate('setting/index');
            }}
          >
            <SettingIcon width={convertWidth(23)} height={convertHeight(24)} />
          </Pressable>
          <SpaceFlexBox flex={20} />
        </View>
        <MenuPage />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
  },

  sideBarContainer: {
    width: convertWidth(75),
    height: convertHeight(309),

    backgroundColor: COLOR_WHITE,

    borderTopLeftRadius: convertWidth(20),
    borderBottomLeftRadius: convertWidth(20),

    shadowColor: COLOR_BASE_1,
    shadowOffset: {
      width: 0,
      height: convertHeight(4),
    },
    shadowOpacity: 0.08,

    alignItems: 'flex-start',
    paddingLeft: convertWidth(15),
  },

  iconContainer: {
    width: convertWidth(46),
    aspectRatio: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { SideBar };
