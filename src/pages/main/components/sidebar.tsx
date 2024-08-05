import {
  COLOR_BASE_1,
  COLOR_BASE_2_30,
  COLOR_WHITE,
  convertHeight,
  convertWidth,
  HorizontalDivider,
  SpaceFlexBox,
} from '@/src/shared';
import { Pressable, StyleSheet, View } from 'react-native';

import CloseIcon from '@/src/shared/assets/icons/menu/close.svg';
import RoomIcon from '@/src/shared/assets/icons/menu/room.svg';
import AvatarIcon from '@/src/shared/assets/icons/menu/avatar.svg';
import SettingIcon from '@/src/shared/assets/icons/menu/setting.svg';
import { useSideBarStore } from '@/src/features';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

const animatinonConfig = {
  duration: 200,
  easing: Easing.bezier(0.57, -0.42, 0.46, 1.56),
};
function SideBar() {
  const { closeSideBar, ifSideBarOpen } = useSideBarStore();
  const right = useSharedValue(0);

  useEffect(() => {
    if (ifSideBarOpen) {
      right.value = withTiming(convertWidth(-75), animatinonConfig);
    } else {
      right.value = withTiming(convertWidth(-150), animatinonConfig);
    }
  }, [ifSideBarOpen]);

  return (
    <Animated.View style={{ ...styles.container, right }}>
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
      <View style={styles.iconContainer}>
        <RoomIcon width={convertWidth(22)} height={convertHeight(25)} />
      </View>
      <SpaceFlexBox flex={10} />
      <View style={styles.iconContainer}>
        <AvatarIcon width={convertWidth(25)} height={convertHeight(25)} />
      </View>
      <HorizontalDivider
        width={convertWidth(46)}
        height={convertHeight(51)}
        lineHeight={convertHeight(0.34)}
        upperFlex={25}
        lowerFlex={25}
        color={COLOR_BASE_2_30}
      />

      <View style={styles.iconContainer}>
        <SettingIcon width={convertWidth(23)} height={convertHeight(24)} />
      </View>
      <SpaceFlexBox flex={20} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(150),
    height: convertHeight(309),

    backgroundColor: COLOR_WHITE,

    position: 'absolute',
    top: 0,

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
