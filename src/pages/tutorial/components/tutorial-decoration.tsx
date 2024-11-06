import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  convertHeight,
  convertWidth,
  VerticalSizedBox,
} from '@/src/shared';
import { Image, StyleSheet, Text, View } from 'react-native';

function TutorialDecoration() {
  return (
    <View style={styles.container}>
      <VerticalSizedBox height={42} />
      <Text style={styles.title}>포인트</Text>
      <VerticalSizedBox height={43} />
      <Image
        source={require('@/src/shared/assets/images/tutorial/decoration.png')}
        style={{ width: convertWidth(294), height: convertHeight(283) }}
      />
      <VerticalSizedBox height={112} />
      <Text style={styles.description}>{`포인트를 이용해\n아바타와 방을 꾸밀 수 있어요.`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: COLOR_BASE_2,
    textAlign: 'center',
  },
});

export { TutorialDecoration };
