import { COLOR_BASE_1, convertHeight, convertWidth } from '@/src/shared';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function MenuItem({
  Icon,
  title,
  onPress,
}: {
  Icon: React.JSX.Element;
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>{Icon}</View>
      <Text style={styles.itemText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(59),

    paddingLeft: convertWidth(8),

    flexDirection: 'row',
    alignItems: 'center',
  },

  itemText: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,
  },

  iconContainer: {
    width: convertWidth(60),
    height: convertHeight(59),

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { MenuItem };
