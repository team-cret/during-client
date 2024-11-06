import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BASE_3,
  COLOR_BASE_4,
  COLOR_PRIMARY_GREEN_LIGHT,
  COLOR_WHITE,
  convertHeight,
  convertWidth,
  SpaceFlexBox,
} from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

import BookmarkIcon from '@/src/shared/assets/icons/report/bookmark.svg';
import { useReportStore } from '@/src/features';

function ReportTopic() {
  const { report } = useReportStore();

  return (
    <View style={styles.container}>
      <BookmarkIcon height={convertHeight(16)} />
      <SpaceFlexBox flex={7} />
      <Text style={styles.descriptionText}>
        {'주로 우리는 \n'}
        <Text style={{ color: COLOR_BASE_1 }}>{report?.frequently_talked_topic[0] ?? ''}</Text>
        {'에 대해 대화해요.'}
      </Text>
      <SpaceFlexBox flex={7} />
      <View style={styles.contentBox}>
        <View style={styles.topicRow}>
          <Text style={styles.indexText}>1위</Text>
          <Text style={[styles.topicText, { backgroundColor: COLOR_PRIMARY_GREEN_LIGHT }]}>
            {report?.frequently_talked_topic[0] ?? ''}
          </Text>
        </View>
        <View style={styles.topicRow}>
          <Text style={styles.indexText}>2위</Text>
          <Text style={styles.topicText}>{report?.frequently_talked_topic[1] ?? ''}</Text>
        </View>
        <View style={styles.topicRow}>
          <Text style={styles.indexText}>3위</Text>
          <Text style={styles.topicText}>{report?.frequently_talked_topic[2] ?? ''}</Text>
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
    height: convertHeight(72),

    justifyContent: 'space-between',
  },

  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  indexText: {
    fontSize: 8,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_BASE_2,
  },

  topicText: {
    fontSize: 8,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_BASE_2,

    height: convertHeight(22),
    borderRadius: convertWidth(20),
    backgroundColor: COLOR_BASE_4,

    paddingHorizontal: convertWidth(10),

    textAlignVertical: 'center',

    marginLeft: convertWidth(6),
  },
});

export { ReportTopic };
