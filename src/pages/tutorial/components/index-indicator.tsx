import { BarButtonGreen, convertHeight, convertWidth } from '@/src/shared';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Index } from '.';

function IndexIndicator({ index, onPress }: { index: number; onPress: () => void }) {
  return (
    <View style={styles.container}>
      <View style={styles.indexRow}>
        <Index selected={index === 0} />
        <Index selected={index === 1} />
        <Index selected={index === 2} />
      </View>
      <BarButtonGreen onPress={onPress} text={index === 2 ? '시작하기' : '다음'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(72),

    justifyContent: 'space-between',
    alignItems: 'center',

    position: 'absolute',
    bottom: convertHeight(46),
  },

  indexRow: {
    flexDirection: 'row',
  },
});

export { IndexIndicator };
