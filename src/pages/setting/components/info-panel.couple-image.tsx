import {
  AvatarObject,
  COLOR_BASE_3,
  COLOR_SECONDARY_PINK_LIGHT,
  convertHeight,
  convertWidth,
} from '@/src/shared';
import { StyleSheet, View } from 'react-native';

import HeartIcon from '@/src/shared/assets/icons/setting/heart.svg';
import { useRoomStore } from '@/src/features';
import { AvatarProfileImage } from '@/src/widgets';

function CoupleImage() {
  const { myAvatar, otherAvatar } = useRoomStore();
  return (
    <View style={styles.container}>
      <AvatarProfileImage
        avatarStyle={myAvatar.style}
        modelSrc={AvatarObject.avatar.src}
        width={convertHeight(106)}
      />
      <AvatarProfileImage
        avatarStyle={otherAvatar.style}
        modelSrc={AvatarObject.avatarOther.src}
        width={convertHeight(106)}
      />
      <View style={styles.heartContainer}>
        <HeartIcon />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(226),
    height: convertHeight(106),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  imageContainer: {
    height: convertHeight(106),
    aspectRatio: 1,
    backgroundColor: COLOR_BASE_3,
    borderRadius: convertHeight(7),
  },

  heartContainer: {
    width: convertWidth(25),
    height: convertHeight(22),

    shadowColor: COLOR_SECONDARY_PINK_LIGHT,
    shadowOffset: {
      width: 0,
      height: convertHeight(3),
    },
    shadowRadius: convertHeight(8),
    shadowOpacity: 1,

    position: 'absolute',
    left: convertWidth(113),
    top: convertHeight(45),
    transform: [
      {
        translateX: convertWidth(-12.5),
      },
    ],
  },
});

export { CoupleImage };
