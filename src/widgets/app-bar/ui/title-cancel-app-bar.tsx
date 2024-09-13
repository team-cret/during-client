import { COLOR_BASE_1, convertHeight, convertWidth } from '@/src/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import CloseIcon from '@/src/shared/assets/icons/menu/close.svg';

function TitleCloseAppbar({ title, onPress }: { title: string; onPress?: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Pressable style={styles.closeButton} onPress={onPress}>
        <CloseIcon width={convertWidth(20)} height={convertHeight(20)} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(66),

    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,
  },

  closeButton: {
    height: convertHeight(31),
    aspectRatio: 1,

    position: 'absolute',
    right: convertWidth(22),

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { TitleCloseAppbar };
