import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  convertHeight,
  convertWidth,
  VerticalSizedBox,
} from '@/src/shared';
import { Image, StyleSheet, Text, View } from 'react-native';

function TutorialConnection() {
  return (
    <View style={styles.container}>
      <VerticalSizedBox height={42} />
      <Text style={styles.title}>연인 연결</Text>
      <VerticalSizedBox height={47} />
      <Image
        source={require('@/src/shared/assets/images/tutorial/connection.png')}
        style={{ width: convertWidth(217), height: convertHeight(365) }}
      />
      <VerticalSizedBox height={26} />
      <Text
        style={styles.description}
      >{`연인의 초대코드를 입력하고\n연인이 수락하면 커플을 맺을 수 있어요.`}</Text>
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

export { TutorialConnection };
