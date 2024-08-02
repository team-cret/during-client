import { COLOR_BASE_2, convertHeight, convertWidth } from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

function Step() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}></View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>닉네임</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(26),
    height: convertHeight(40),

    justifyContent: 'space-between',
    alignItems: 'center',
  },

  iconContainer: {
    height: convertHeight(20),
    aspectRatio: 1,
    borderRadius: 100,

    backgroundColor: 'blue',
  },

  textContainer: {
    width: convertWidth(26),
    height: convertHeight(16),
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_BASE_2,

    textAlign: 'center',
  },
});

export { Step };
