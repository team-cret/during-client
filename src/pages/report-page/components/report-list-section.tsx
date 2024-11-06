import { calcDaysBetween, convertHeight, convertWidth, NavProp } from '@/src/shared';
import { StyleSheet, View } from 'react-native';
import { Report } from './report';
import { ScrollView } from 'react-native';
import { MiniTitleBar } from '@/src/widgets';
import { useReportStore } from '@/src/features';
import { useNavigation } from 'expo-router';

function ReportListSection() {
  const { reportList, getReportDetail } = useReportStore();
  const navigation = useNavigation<NavProp<'report/index'>>();
  return (
    <View style={styles.container}>
      <MiniTitleBar title="생성된 리포트" />
      <ScrollView style={styles.reportListContainer}>
        {reportList.map((report) => (
          <Report
            key={report.id}
            startDate={report.startDate}
            endDate={report.endDate}
            reportType={calcDaysBetween(report.startDate, report.endDate) > 7 ? 'long' : 'short'}
            onPress={() => {
              getReportDetail(report.id).then((res) => {
                if (!res) return;
                navigation.navigate('report/detail');
              });
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(331),
    height: convertHeight(352),

    justifyContent: 'space-between',
  },

  reportListContainer: {
    width: convertWidth(331),
    height: convertHeight(317),

    marginTop: convertHeight(9),
  },
});

export { ReportListSection };
