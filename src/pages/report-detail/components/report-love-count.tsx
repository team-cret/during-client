import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BASE_3,
  COLOR_BASE_4,
  convertHeight,
  convertWidth,
  SpaceFlexBox,
} from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

import LoveCountIcon from '@/src/shared/assets/icons/report/love-count.svg';
import { useReportStore } from '@/src/features';

function ReportLoveCount() {
  const { report } = useReportStore();
  return (
    <View style={styles.container}>
      <LoveCountIcon height={convertHeight(16)} />
      <SpaceFlexBox flex={7} />
      <Text style={styles.descriptionText}>
        {'우리는 총 '}
        <Text style={{ color: COLOR_BASE_1 }}>{`${report?.number_of_love_words}번`}</Text>
        {'\n사랑한다고 말했어요.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(141),
    height: convertHeight(82),
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

    lineHeight: convertHeight(15),
  },
});

export { ReportLoveCount };
