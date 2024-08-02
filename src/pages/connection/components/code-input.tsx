import { COLOR_BASE_4, convertHeight, convertWidth, SpaceFlexBox, textStyles } from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';
import { InputContainer } from './code-input.input-container';

function InvitationCodeInput() {
  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={26} />
      <Text style={styles.titleText}>연인 초대코드 입력</Text>
      <SpaceFlexBox flex={15} />
      <InputContainer />
      <SpaceFlexBox flex={26} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BASE_4,
    width: convertWidth(375),
    height: convertHeight(140),
    alignItems: 'center',
  },

  titleText: {
    ...textStyles.miniTitle,
    width: convertWidth(331),
  },

  inputContainer: {
    width: convertWidth(331),
    height: convertHeight(51),
    backgroundColor: 'tomato',
  },
});

export { InvitationCodeInput };
