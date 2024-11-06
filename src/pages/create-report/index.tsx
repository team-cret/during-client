import {
  BarButtonGreen,
  COLOR_BASE_1,
  convertHeight,
  convertWidth,
  VerticalSizedBox,
} from '@/src/shared';
import { TitleCloseAppbar } from '@/src/widgets';
import { StyleSheet, Text, View } from 'react-native';
import { DateSelectionSection } from './components/date-selection-section';
import { ReportInfoSection } from './components/report-info-section';
import { useReportStore } from '@/src/features';
import { useNavigation } from 'expo-router';

function CreateReportPage() {
  const {
    createReport,
    reportCreate: { isReportCreatable },
  } = useReportStore();

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TitleCloseAppbar title="리포트 생성하기" onPress={() => navigation.goBack()} />
      <Text style={styles.title}>{'리포트 생성 기간을\n선택해주세요'}</Text>
      <DateSelectionSection />
      <VerticalSizedBox height={convertHeight(51)} />
      <ReportInfoSection />
      <VerticalSizedBox height={convertHeight(68)} />
      <BarButtonGreen
        text="생성하기"
        onPress={() => {
          createReport();
          navigation.goBack();
        }}
        bottom={convertHeight(34)}
        ifDisabled={!isReportCreatable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: convertWidth(375),
    height: convertHeight(812),

    alignItems: 'center',
  },

  appBar: {
    width: convertWidth(375),
    height: convertHeight(66),
  },

  title: {
    width: convertWidth(331),
    height: convertHeight(148),

    fontSize: 30,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,
    lineHeight: convertHeight(37),

    textAlignVertical: 'center',
  },
});

export { CreateReportPage };
