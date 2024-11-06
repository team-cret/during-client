import { convertHeight, convertWidth, VerticalSizedBox } from '@/src/shared';
import { MiniTitleBar } from '@/src/widgets';
import { StyleSheet, View } from 'react-native';
import { DateSelector } from './date-selector';
import { useReportStore } from '@/src/features';

function DateSelectionSection() {
  const {
    reportCreate: { startDate, endDate },
    setStartDate,
    setEndDate,
  } = useReportStore();

  return (
    <View style={styles.container}>
      <View>
        <MiniTitleBar title="시작 날짜" />
        <VerticalSizedBox height={convertHeight(8)} />
        <DateSelector date={startDate} setDate={setStartDate} />
      </View>
      <View>
        <MiniTitleBar title="마지막 날짜" />
        <VerticalSizedBox height={convertHeight(8)} />
        <DateSelector date={endDate} setDate={setEndDate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(331),
    height: convertHeight(198),

    justifyContent: 'space-between',
  },
});

export { DateSelectionSection };
