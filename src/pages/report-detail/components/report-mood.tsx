import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BASE_3,
  COLOR_BASE_4,
  convertHeight,
  convertWidth,
  SpaceFlexBox,
} from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

import MoodIcon from '@/src/shared/assets/icons/report/mood.svg';
import { useReportStore } from '@/src/features';

function convertMoodToString(mood: string): string {
  return (
    {
      '1000': '행복해요!',
      '1001': '화가 나요!',
      '1002': '사랑해요!',
      '1003': '부끄러워해요!',
      '1004': '응원해요!',
      '1005': '안아달라고해요!',
      '1006': '인사해요!',
      '1007': '피곤해요!',
    }[mood] ?? '평범해요!'
  );
}

function ReportMood() {
  const { report } = useReportStore();
  return (
    <View style={styles.container}>
      <MoodIcon height={convertHeight(16)} />
      <SpaceFlexBox flex={7} />
      <Text style={styles.descriptionText}>
        {'나의 기분은 \n'}
        {'주로 '}
        <Text style={{ color: COLOR_BASE_1 }}>
          {convertMoodToString(report?.frequently_used_emotion[0]!)}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(141),
    height: convertHeight(82),
    paddingVertical: convertHeight(15),
    paddingLeft: convertWidth(16),

    borderRadius: convertWidth(5),
    borderWidth: convertWidth(1),
    borderColor: COLOR_BASE_3,
  },

  descriptionText: {
    fontSize: 12,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_2,

    lineHeight: convertHeight(15),
  },
});

export { ReportMood };
