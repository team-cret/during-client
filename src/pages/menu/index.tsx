import {
  COLOR_BACKGROUND,
  COLOR_BASE_2_30,
  convertHeight,
  convertWidth,
  HorizontalDivider,
  NavProp,
} from '@/src/shared';
import { TitleCloseAppbar } from '@/src/widgets';
import { StyleSheet, View } from 'react-native';
import { MenuItem } from './components/menu-item';

import RoomIconLight from '@/src/shared/assets/icons/menu/room-light.svg';
import AvatarIconLight from '@/src/shared/assets/icons/menu/avatar-light.svg';
import SettingIconLight from '@/src/shared/assets/icons/menu/setting-light.svg';
import { useDecorateAvatarStore, useDecorateRoomStore, useRoomStore } from '@/src/features';
import { useNavigation } from 'expo-router';

function MenuPage() {
  const {
    background,
    objects,
    myAvatar: { style: avatarStyle },
  } = useRoomStore();
  const { init: decorateRoomInit } = useDecorateRoomStore();
  const { init: decorateAvatarInit } = useDecorateAvatarStore();
  const navigation = useNavigation<NavProp<'menu/index'>>();

  return (
    <View style={styles.container}>
      <TitleCloseAppbar title="메뉴" />
      <HorizontalDivider
        width={convertWidth(331)}
        height={convertHeight(14)}
        lineHeight={convertHeight(0.34)}
        upperFlex={2}
        lowerFlex={11}
        color={COLOR_BASE_2_30}
      />
      <MenuItem
        Icon={<RoomIconLight width={convertWidth(22)} height={convertHeight(25)} />}
        title="방 편집"
        onPress={() => {
          decorateRoomInit({ background, objects });
          navigation.navigate('decorate-room/index');
        }}
      />
      <MenuItem
        Icon={<AvatarIconLight width={convertWidth(25)} height={convertHeight(25)} />}
        title="아바타 편집"
        onPress={() => {
          decorateAvatarInit({ avatarStyle });
          navigation.navigate('decorate-avatar/index');
        }}
      />
      <HorizontalDivider
        width={convertWidth(331)}
        height={convertHeight(34)}
        lineHeight={convertHeight(0.34)}
        upperFlex={16}
        lowerFlex={18}
        color={COLOR_BASE_2_30}
      />
      <MenuItem
        Icon={<SettingIconLight width={convertWidth(23)} height={convertHeight(24)} />}
        title="설정"
        onPress={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(812),
    backgroundColor: COLOR_BACKGROUND,

    alignItems: 'center',
  },
});

export { MenuPage };
