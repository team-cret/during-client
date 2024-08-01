import { COLOR_BASE_1, convertHeight, convertWidth } from '@/src/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function SettingItem({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.itemText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(59),

    paddingLeft: convertWidth(23),
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemText: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,
  },
});

export { SettingItem };
