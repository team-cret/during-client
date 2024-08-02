import { COLOR_BASE_1, COLOR_BASE_2, convertHeight, convertWidth } from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

function Title() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>수빈콩과 길동콩의 아파트</Text>
      <Text style={styles.days}>D+104</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: convertHeight(13),
  },

  title: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,

    width: convertWidth(263),
    lineHeight: convertHeight(25),

    textAlign: 'center',
  },

  days: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_BASE_2,

    width: convertWidth(263),
    lineHeight: convertHeight(15),

    textAlign: 'center',
  },
});

export { Title };
