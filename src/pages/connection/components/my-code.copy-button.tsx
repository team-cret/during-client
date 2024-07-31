import { COLOR_BASE_2, COLOR_WHITE, convertHeight, convertWidth, SpaceFlexBox } from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';
import CopyIcon from '@/src/shared/assets/icons/interaction/copy.svg';

function CopyButton() {
  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={13} />
      <CopyIcon height={convertHeight(11)} />
      <SpaceFlexBox flex={4} />
      <Text style={styles.text}>코드 복사하기</Text>
      <SpaceFlexBox flex={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_WHITE,
    width: convertWidth(91),
    height: convertHeight(26),

    borderRadius: convertHeight(13),

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 9.5,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_2,

    lineHeight: convertHeight(11),
  },
});

export { CopyButton };
