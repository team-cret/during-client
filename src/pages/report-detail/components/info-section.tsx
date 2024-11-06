import { useReportStore, useUserStore } from '@/src/features';
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

function InfoSection() {
  const { report } = useReportStore();

  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoRow}>
        <Text style={styles.infoIndex}>종류</Text>
        <Text style={styles.categoryText}>
          {report?.report_type === 'SMALL' ? '단기간 리포트' : '장기간 리포트'}
        </Text>
      </View>
      <VerticalSizedBox height={convertHeight(12)} />
      <View style={styles.infoRow}>
        <Text style={styles.infoIndex}>기간</Text>
        <Text style={styles.dateText}>
          <Text style={styles.dateTextBold}>{`${calcDaysBetween(
            report?.info.startDate!,
            report?.info.endDate!
          )}  |  `}</Text>
          {`${convertDateToHumanFormat(report?.info.startDate!)} - ${convertDateToHumanFormat(
            report?.info.endDate!
          )}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

export { InfoSection };
