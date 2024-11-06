import {
  COLOR_BACKGROUND,
  COLOR_BASE_4,
  convertHeight,
  convertWidth,
  NavProp,
  VerticalSizedBox,
} from '@/src/shared';
import { TitleCloseAppbar } from '@/src/widgets';
import { useFocusEffect, useNavigation } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { CreateReportSection } from './components/create-report-section';
import { ReportListSection } from './components/report-list-section';
import { useCallback } from 'react';
import { useReportStore } from '@/src/features';

function ReportPage() {
  const navigation = useNavigation<NavProp<'report/index'>>();

  const { initReportList } = useReportStore();

  useFocusEffect(
    useCallback(() => {
      initReportList();
    }, [])
  );

  return (
    <View style={styles.container}>
      <TitleCloseAppbar
        title="리포트"
        onPress={() => {
          navigation.pop();
        }}
      />
      <VerticalSizedBox height={convertHeight(22)} />
      <CreateReportSection />
      <VerticalSizedBox height={convertHeight(22)} />
      <ReportListSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: convertWidth(375),
    height: convertHeight(812),

    backgroundColor: COLOR_BASE_4,

    alignItems: 'center',
  },
});

export { ReportPage };
