import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BASE_3,
  convertHeight,
  convertWidth,
  SpaceFlexBox,
} from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

import ClockIcon from '@/src/shared/assets/icons/report/clock.svg';
import ClockColoredIcon from '@/src/shared/assets/icons/report/clock-colored.svg';
import { useReportStore } from '@/src/features';

function calcAverageReplyTimeZone(responseTimeZone: Array<number>) {
  const maxTime = Math.max(...responseTimeZone);
  return responseTimeZone.indexOf(maxTime);
}

function averageReplyTimeZoneToString(averageReplyTimeZone: number) {
  return `${averageReplyTimeZone}시~${averageReplyTimeZone + 1}시`;
}

function averageReplyTimeZoneToKeyword(averageReplyTimeZone: number) {
  if (averageReplyTimeZone >= 0 && averageReplyTimeZone < 6) {
    return '새벽';
  } else if (averageReplyTimeZone >= 6 && averageReplyTimeZone < 12) {
    return '아침';
  } else if (averageReplyTimeZone >= 12 && averageReplyTimeZone < 18) {
    return '오후';
  } else {
    return '저녁';
  }
}

function ReportReplyTimeZone() {
  const { report } = useReportStore();

  return (
    <View style={styles.container}>
      <ClockIcon height={convertHeight(16)} />
      <SpaceFlexBox flex={7} />
      <Text style={styles.descriptionText}>
        {'우리는 주로 \n'}
        <Text style={{ color: COLOR_BASE_1 }}>
          {averageReplyTimeZoneToKeyword(calcAverageReplyTimeZone(report?.response_time_zone!))}
        </Text>
        {'에 함께해요'}
      </Text>
      <SpaceFlexBox flex={16} />
      <View style={styles.timeRow}>
        <ClockColoredIcon height={convertHeight(35)} />
        <View style={{ marginLeft: convertWidth(8) }}>
          <Text style={styles.timeText}>
            <Text style={styles.timeDescriptionText}>{'평균 응답 시간대\n'}</Text>
            {averageReplyTimeZoneToString(calcAverageReplyTimeZone(report?.response_time_zone!))}
          </Text>
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

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  timeDescriptionText: {
    fontSize: 8,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_BASE_2,
  },

  timeText: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_BASE_1,
  },
});

export { ReportReplyTimeZone };
