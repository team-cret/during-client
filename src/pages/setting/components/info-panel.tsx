import { COLOR_BASE_1, convertHeight, convertWidth, SpaceFlexBox } from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';
import { CoupleImage } from './info-panel.couple-image';
import { DDay } from './d-day';
import { Credit } from './credeit';

function InfoPanel() {
  return (
    <View style={styles.container}>
      <CoupleImage />
      <SpaceFlexBox flex={16} />
      <Text style={styles.coupleCode}>DL3UBODAAD</Text>
      <SpaceFlexBox flex={9} />
      <DDay />
      <SpaceFlexBox flex={4} />
      <Credit />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(230),

    paddingVertical: convertHeight(8),
    alignItems: 'center',
  },

  coupleCode: {
    lineHeight: convertHeight(35),
    textAlign: 'center',

    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,
  },
});

export { InfoPanel };
