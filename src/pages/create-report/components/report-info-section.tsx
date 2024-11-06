import { useReportStore } from '@/src/features';
import {
  calcDaysBetween,
  COLOR_BASE_2,
  COLOR_BASE_3,
  COLOR_WHITE,
  convertDateToHumanFormat,
  convertHeight,
  convertWidth,
  VerticalSizedBox,
} from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

function ReportInfoSection() {
  const {
    reportCreate: { startDate, endDate },
  } = useReportStore();

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoIndex}>종류</Text>
          <Text style={styles.categoryText}>
            {startDate == null || endDate == null
              ? ''
              : calcDaysBetween(startDate, endDate) >= 7
              ? '장기간 리포트'
              : '단기간 리포트'}
          </Text>
        </View>
        <VerticalSizedBox height={convertHeight(12)} />
        <View style={styles.infoRow}>
          <Text style={styles.infoIndex}>기간</Text>
          <Text style={styles.dateText}>
            <Text style={styles.dateTextBold}>
              {startDate == null || endDate == null
                ? ''
                : `${calcDaysBetween(startDate, endDate)}일  |  `}
            </Text>
            {startDate == null || endDate == null
              ? ''
              : `${convertDateToHumanFormat(startDate!)} - ${convertDateToHumanFormat(endDate!)}`}
          </Text>
        </View>
      </View>
      <Text style={styles.description}>
        {' • 일주일 이상의 기간은 장기간 리포트, 이하는 단기간 리포트가 생성됩니다.\n'}
        <Text style={styles.descriptionBold}>{' • 장기간 리포트 |  '}</Text>
        {'MBTI, 응답 시간, 주제, 애정표현 등\n'}
        <Text style={styles.descriptionBold}>{' • 단기간 리포트 |  '}</Text>
        {'이미지'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(331),
    height: convertHeight(159),

    justifyContent: 'space-between',
  },

  infoContainer: {
    width: convertWidth(331),
    height: convertHeight(97),

    backgroundColor: COLOR_WHITE,
    borderRadius: convertWidth(10),

    paddingLeft: convertWidth(24),
    justifyContent: 'center',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoIndex: {
    fontSize: 11,
    fontFamily: 'Pretendard-Bold',
    color: COLOR_BASE_2,

    paddingHorizontal: convertWidth(10),
    paddingVertical: convertHeight(2),

    backgroundColor: COLOR_BASE_3,
    borderRadius: convertWidth(5),

    marginRight: convertWidth(11),
  },

  categoryText: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_2,
  },

  dateText: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_BASE_2,
  },
  dateTextBold: {
    fontFamily: 'Pretendard-SemiBold',
  },

  description: {
    fontSize: 11,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_BASE_2,

    lineHeight: convertHeight(16),
  },
  descriptionBold: {
    fontFamily: 'Pretendard-Bold',
  },
});

export { ReportInfoSection };
