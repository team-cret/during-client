import {
  COLOR_BASE_1,
  COLOR_WHITE,
  convertDateToHumanFormat,
  convertDateToStringMD,
  convertHeight,
  convertWidth,
} from '@/src/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import NavigateIcon from '@/src/shared/assets/icons/report/navigate.svg';
import ShortReportIcon from '@/src/shared/assets/icons/report/short-report.svg';
import LongReportIcon from '@/src/shared/assets/icons/report/long-report.svg';

function Report({
  startDate,
  endDate,
  reportType,
  onPress,
}: {
  startDate: Date;
  endDate: Date;
  reportType: 'short' | 'long';
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.infoContainer}>
        <Text style={styles.termText}>{`${convertDateToStringMD(
          startDate
        )} - ${convertDateToStringMD(endDate)}`}</Text>
        <View style={styles.reportTypeContainer}>
          {reportType === 'long' ? <LongReportIcon /> : <ShortReportIcon />}
          <Text style={styles.reportTypeText}>
            {reportType === 'long' ? '장기간 리포트' : '단기간 리포트'}
          </Text>
        </View>
      </View>
      <NavigateIcon />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(335),
    height: convertHeight(72),

    borderRadius: convertWidth(10),
    backgroundColor: COLOR_WHITE,

    paddingHorizontal: convertWidth(30),
    paddingVertical: convertHeight(17),
    marginBottom: convertHeight(10),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  infoContainer: {
    justifyContent: 'space-between',
  },

  termText: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,

    lineHeight: convertHeight(25),
  },

  reportTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  reportTypeText: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_BASE_1,

    marginLeft: convertWidth(5),
  },
});

export { Report };
