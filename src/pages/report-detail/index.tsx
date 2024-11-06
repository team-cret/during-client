import {
  COLOR_BACKGROUND,
  convertHeight,
  convertWidth,
  HorizontalSizedBox,
  VerticalSizedBox,
} from '@/src/shared';
import { MiniTitleBar, TitleCloseAppbar } from '@/src/widgets';
import { useNavigation } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { InfoSection } from './components/info-section';
import { ReportReplyTimeZone } from './components/report-reply-time-zone';
import { ReportReplyTerm } from './components/report-reply-term';
import { ReportChatCount } from './components/report-chat-count';
import { ReportTopic } from './components/report-topic';
import { ReportMood } from './components/report-mood';
import { ReportLoveTerm } from './components/report-love-term';
import { ReportLoveCount } from './components/report-love-count';
import { ReportSweetPoint } from './components/report-sweet-point';
import { ReportMBTI } from './components/report-mbti';
import { useReportStore } from '@/src/features';
import { ReportImage } from './components/report-image';

function ReportDetailPage() {
  const navigation = useNavigation();
  const { report } = useReportStore();

  return (
    <View style={styles.container}>
      <TitleCloseAppbar
        title="리포트 확인하기"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <ScrollView contentContainerStyle={{ alignItems: 'center', width: convertWidth(375) }}>
        <VerticalSizedBox height={convertHeight(10)} />
        <InfoSection />
        <VerticalSizedBox height={convertHeight(28)} />

        {report?.report_type === 'SMALL' ? (
          <View style={styles.reportInfoBox}>
            <View>
              <MiniTitleBar title="곰듀의 한 컷" />
              <VerticalSizedBox height={convertHeight(10)} />
              <View style={styles.resBox}>
                <ReportImage />
              </View>
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.reportInfoBox}>
              <MiniTitleBar title="연애 MBTI" />
              <VerticalSizedBox height={convertHeight(10)} />
              <View style={styles.resBox}>
                <ReportMBTI />
              </View>
            </View>

            <VerticalSizedBox height={convertHeight(28)} />

            <View style={styles.reportInfoBox}>
              <MiniTitleBar title="대화" />
              <VerticalSizedBox height={convertHeight(10)} />
              <View style={styles.resBox}>
                <View style={styles.row}>
                  <ReportReplyTimeZone />
                  <HorizontalSizedBox width={convertWidth(10)} />
                  <ReportReplyTerm />
                </View>
                <VerticalSizedBox height={convertHeight(10)} />
                <View style={styles.row}>
                  <ReportChatCount />
                  <HorizontalSizedBox width={convertWidth(10)} />
                  <ReportTopic />
                </View>
              </View>
            </View>

            <VerticalSizedBox height={convertHeight(28)} />

            <View>
              <MiniTitleBar title="달달 척도" />
              <VerticalSizedBox height={convertHeight(10)} />
              <View style={styles.resBox}>
                <View style={styles.row}>
                  <ReportMood />
                  <HorizontalSizedBox width={convertWidth(10)} />
                  <ReportLoveTerm />
                </View>
                <VerticalSizedBox height={convertHeight(10)} />
                <View style={styles.row}>
                  <ReportLoveCount />
                  <HorizontalSizedBox width={convertWidth(10)} />
                  <ReportSweetPoint />
                </View>
              </View>
            </View>
          </View>
        )}
        <VerticalSizedBox height={convertHeight(28)} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: convertWidth(375),
    height: convertHeight(812),

    backgroundColor: COLOR_BACKGROUND,

    alignItems: 'center',
  },

  reportInfoBox: {
    width: convertWidth(331),
  },

  resBox: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: convertWidth(17),
    paddingVertical: convertHeight(24),
    borderRadius: convertWidth(10),
  },

  row: {
    flexDirection: 'row',
  },
});

export { ReportDetailPage };
