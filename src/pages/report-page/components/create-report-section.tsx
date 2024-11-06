import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_WHITE,
  convertHeight,
  convertWidth,
  NavProp,
  SpaceFlexBox,
} from '@/src/shared';
import { MiniTitleBar } from '@/src/widgets';
import { useNavigation } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function CreateReportSection() {
  const navigation = useNavigation<NavProp<'report/index'>>();
  return (
    <View style={styles.container}>
      <MiniTitleBar title="리포트 생성하기" />
      <Pressable
        style={styles.createReportContainer}
        onPress={() => {
          navigation.navigate('report/create');
        }}
      >
        <Text style={styles.mainText}>리포트 생성하기</Text>
        <Text style={styles.subText}>우리들 연애 스타일은?</Text>
        <SpaceFlexBox flex={1} />
        <Text style={styles.buttonText}>{'생성하러 가기 >'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(331),
    height: convertHeight(213),

    justifyContent: 'space-between',
  },

  createReportContainer: {
    width: convertWidth(331),
    height: convertHeight(177),

    backgroundColor: COLOR_WHITE,

    borderRadius: convertWidth(10),

    paddingTop: convertHeight(24),
    paddingBottom: convertHeight(16),
    paddingHorizontal: convertWidth(24),
  },

  mainText: {
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,
  },

  subText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: '#606060',
  },

  buttonText: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_BASE_2,
  },
});

export { CreateReportSection };
