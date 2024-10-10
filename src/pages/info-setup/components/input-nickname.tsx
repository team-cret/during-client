import { convertHeight, convertWidth, HeadLineText, SpaceFlexBox } from '@/src/shared';
import { StyleSheet, View } from 'react-native';
import { NicknameTextInput } from './input-nickname.text-input';

function InputNickname() {
  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={34} />
      <HeadLineText
        title={`사용할 닉네임을\n입력해주세요`}
        subTitle={`닉네임은 추후 변경 가능합니다.`}
      />
      <SpaceFlexBox flex={42} />
      <NicknameTextInput />
      <SpaceFlexBox flex={310} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(613),

    alignItems: 'center',
  },
});

export { InputNickname };
