import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BASE_3,
  convertHeight,
  convertWidth,
  SpaceFlexBox,
} from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

import LoveTermIcon from '@/src/shared/assets/icons/report/love-term.svg';
import { useReportStore } from '@/src/features';

function loveTermToString(replyTerm: {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) {
  if (replyTerm.years > 0)
    return `${replyTerm.years}년` + (replyTerm.months > 0 ? ` ${replyTerm.months}개월` : '');
  if (replyTerm.months > 0)
    return `${replyTerm.months}개월` + (replyTerm.weeks > 0 ? ` ${replyTerm.weeks}주` : '');
  if (replyTerm.weeks > 0)
    return `${replyTerm.weeks}주` + (replyTerm.days > 0 ? ` ${replyTerm.days}일` : '');
  if (replyTerm.days > 0)
    return `${replyTerm.days}일` + (replyTerm.hours > 0 ? ` ${replyTerm.hours}시간` : '');
  if (replyTerm.hours > 0)
    return `${replyTerm.hours}시간` + (replyTerm.minutes > 0 ? ` ${replyTerm.minutes}분` : '');
  if (replyTerm.minutes > 0) return `${replyTerm.minutes}분`;
  else return `${replyTerm.seconds}초`;
}

function ReportLoveTerm() {
  const { report } = useReportStore();

  return (
    <View style={styles.container}>
      <LoveTermIcon height={convertHeight(16)} />
      <SpaceFlexBox flex={7} />
      <Text style={styles.descriptionText}>
        {'우리는 '}
        <Text style={{ color: COLOR_BASE_1 }}>
          {loveTermToString(report?.frequency_of_affection!)}
        </Text>
        {'에\n한 번씩 애정 표현해요.'}
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

export { ReportLoveTerm };
