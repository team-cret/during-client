import { COLOR_BASE_2, convertHeight, convertWidth } from '@/src/shared';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function ProfileItem({ title, Content }: { title: string; Content: React.JSX.Element }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {Content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(52),

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: convertWidth(22),
    paddingRight: convertWidth(26),
  },

  title: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_BASE_2,
  },
});

export { ProfileItem };
