import { COLOR_BASE_1, convertHeight, convertWidth } from '@/src/shared';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function MenuItem({ Icon, title }: { Icon: React.JSX.Element; title: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{Icon}</View>
      <Text style={styles.itemText}>{title}</Text>
    </View>
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
