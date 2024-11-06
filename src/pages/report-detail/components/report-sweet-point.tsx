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

import SweetPointIcon from '@/src/shared/assets/icons/report/sweet-point.svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useReportStore } from '@/src/features';

function ReportSweetPoint() {
  const { report } = useReportStore();

  return (
    <View style={styles.container}>
      <SweetPointIcon height={convertHeight(16)} />
      <SpaceFlexBox flex={7} />
      <Text style={styles.descriptionText}>
        {'달달함 지수'}
        <Text style={{ color: COLOR_BASE_1 }}>{`${report?.sweetness_score}%`}</Text>
      </Text>
      <SpaceFlexBox flex={7} />
      <View style={styles.contentBox}>
        <LinearGradient
          style={[
            styles.progressBar,
            {
              width: convertWidth(116) * (report?.sweetness_score! / 100),
            },
          ]}
          colors={['#EDF798', '#FF7989']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </View>
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

  contentBox: {
    width: convertWidth(116),
    height: convertHeight(11),

    backgroundColor: COLOR_BASE_4,
    borderRadius: convertWidth(5),
  },

  progressBar: {
    height: convertHeight(11),

    borderRadius: convertWidth(5),
  },
});

export { ReportSweetPoint };
