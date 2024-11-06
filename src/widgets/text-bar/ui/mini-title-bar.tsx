import { COLOR_BASE_1, COLOR_WHITE, convertHeight, convertWidth } from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

function MiniTitleBar({ title }: { title: string }) {
  return <Text style={styles.container}>{title}</Text>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BASE_1,
    paddingVertical: convertHeight(5),
    paddingHorizontal: convertWidth(13),

    marginRight: 'auto',

    borderRadius: convertWidth(5),
    fontSize: 11.15,
    fontFamily: 'Pretendard-Bold',
    color: COLOR_WHITE,
  },
});

export { MiniTitleBar };
