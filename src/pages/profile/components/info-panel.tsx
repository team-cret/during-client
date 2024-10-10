import { useRoomStore, useUserStore } from '@/src/features';
import {
  AvatarObject,
  COLOR_BASE_1,
  COLOR_BASE_4,
  convertHeight,
  convertWidth,
} from '@/src/shared';
import { AvatarProfileImage } from '@/src/widgets';
import { StyleSheet, Text, View } from 'react-native';

function InfoPanel() {
  const { name } = useUserStore();
  const { myAvatar } = useRoomStore();
  return (
    <View style={styles.container}>
      <AvatarProfileImage
        avatarStyle={myAvatar.style}
        modelSrc={AvatarObject.avatar.src}
        width={convertHeight(114)}
      />
      <Text style={styles.nameText}>{name ?? ''}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(185),

    paddingVertical: convertHeight(8),
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  imageContainer: {
    width: convertWidth(114),
    height: convertHeight(114),
    backgroundColor: COLOR_BASE_4,

    borderRadius: convertWidth(7),
  },

  nameText: {
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,

    lineHeight: convertHeight(38),
    textAlign: 'center',
  },
});

export { InfoPanel };
