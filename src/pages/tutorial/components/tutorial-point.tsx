import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  convertHeight,
  convertWidth,
  VerticalSizedBox,
} from '@/src/shared';
import { Image, StyleSheet, Text, View } from 'react-native';

function TutorialPoint() {
  return (
    <View style={styles.container}>
      <VerticalSizedBox height={42} />
      <Text style={styles.title}>포인트</Text>
      <VerticalSizedBox height={154} />
      <Image
        source={require('@/src/shared/assets/images/tutorial/point.png')}
        style={{ width: convertWidth(295), height: convertHeight(118) }}
      />
      <VerticalSizedBox height={166} />
      <Text style={styles.description}>{`매일 출석체크를 통해\n포인트를 획득할 수 있어요.`}</Text>
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

export { TutorialPoint };
