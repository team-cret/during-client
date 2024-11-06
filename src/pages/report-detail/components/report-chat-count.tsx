import {
  calcDaysBetween,
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BASE_3,
  COLOR_WHITE,
  convertHeight,
  convertWidth,
  SpaceFlexBox,
} from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

import MessageIcon from '@/src/shared/assets/icons/report/message.svg';
import SpeechBubblePinkIcon from '@/src/shared/assets/icons/report/speech-bubble-pink.svg';
import SpeechBubbleGreenIcon from '@/src/shared/assets/icons/report/speech-bubble-green.svg';
import { useReportStore } from '@/src/features';

function calcAverageChatCount(response_time_zone: Array<number>, startDate: Date, endDate: Date) {
  const diff = calcDaysBetween(startDate, endDate);
  const sum = response_time_zone.reduce((acc, cur) => acc + cur, 0);
  return Math.round(sum / diff);
}

function ReportChatCount() {
  const { report } = useReportStore();

  return (
    <View style={styles.container}>
      <MessageIcon height={convertHeight(16)} />
      <SpaceFlexBox flex={7} />
      <Text style={styles.descriptionText}>
        {'우리는 하루 평균 \n'}
        <Text style={{ color: COLOR_BASE_1 }}>{`${calcAverageChatCount(
          report?.response_time_zone!,
          report?.info.startDate!,
          report?.info.endDate!
        )}개`}</Text>
        {'의 채팅을 보내요'}
      </Text>
      <SpaceFlexBox flex={19} />
      <View style={styles.contentBox}>
        <SpeechBubbleGreenIcon style={styles.speechBubbleGreen} height={convertHeight(23)} />
        <View style={styles.speechBubblePink}>
          <SpeechBubblePinkIcon width={convertWidth(58)} height={convertHeight(30)} />
          <Text style={styles.contentText}>{`${calcAverageChatCount(
            report?.response_time_zone!,
            report?.info.startDate!,
            report?.info.endDate!
          )}개`}</Text>
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
    width: convertWidth(114),
    height: convertHeight(40),
  },

  speechBubblePink: {
    position: 'absolute',
    top: convertHeight(0),
    left: convertWidth(38),

    width: convertWidth(58),
    height: convertHeight(30),

    alignItems: 'center',
  },

  contentText: {
    fontSize: 12,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_WHITE,

    position: 'absolute',
    top: convertHeight(3),
  },

  speechBubbleGreen: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
});

export { ReportChatCount };
