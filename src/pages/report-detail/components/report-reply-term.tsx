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

import ClockIcon from '@/src/shared/assets/icons/report/clock.svg';
import UpColoredIcon from '@/src/shared/assets/icons/report/up-colored.svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useReportStore } from '@/src/features';

function replyTermToString(replyTerm: {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) {
  if (replyTerm.years > 0) return `${replyTerm.years}년`;
  if (replyTerm.months > 0) return `${replyTerm.months}개월`;
  if (replyTerm.weeks > 0) return `${replyTerm.weeks}주`;
  if (replyTerm.days > 0) return `${replyTerm.days}일`;
  if (replyTerm.hours > 0) return `${replyTerm.hours}시간`;
  if (replyTerm.minutes > 0) return `${replyTerm.minutes}분`;
  else return `${replyTerm.seconds}초`;
}

function ReportReplyTerm() {
  const { report } = useReportStore();

  return (
    <View style={styles.container}>
      <ClockIcon height={convertHeight(16)} />
      <SpaceFlexBox flex={7} />
      <Text style={styles.descriptionText}>
        {'우리는 보통 \n'}
        <Text style={{ color: COLOR_BASE_1 }}>
          {replyTermToString(report?.average_reply_term!)}
        </Text>
        {'만에 답장해요.'}
      </Text>
      <SpaceFlexBox flex={6} />
      <View style={styles.contentBox}>
        <View style={styles.backBox} />
        <View style={styles.timeBox}>
          <Text style={styles.timeText}>{replyTermToString(report?.average_reply_term!)}</Text>
          <UpColoredIcon />
          <LinearGradient
            style={styles.timeBar}
            colors={['#EDF798', '#FF7989']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(141),
    height: convertHeight(158),
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
  },

  contentBox: {
    width: convertWidth(116),
    height: convertHeight(38),
  },

  backBox: {
    width: convertWidth(116),
    height: convertHeight(11),

    backgroundColor: COLOR_BASE_4,
    borderRadius: convertWidth(2),

    position: 'absolute',
    bottom: 0,
  },

  timeBox: {
    alignItems: 'center',

    justifyContent: 'space-between',

    position: 'absolute',
    left: convertWidth(16),

    height: convertHeight(38),
  },
  timeBar: {
    width: convertWidth(28),
    height: convertHeight(11),

    backgroundColor: COLOR_BASE_1,
    borderRadius: convertWidth(2),
  },
  timeText: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_BASE_1,
  },
});

export { ReportReplyTerm };
