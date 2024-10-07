import {
  BarButtonGreen,
  COLOR_BASE_4,
  convertHeight,
  convertWidth,
  SpaceFlexBox,
} from '@/src/shared';
import { StyleSheet, View } from 'react-native';
import { TextContainer } from './my-code.text-container';
import { CopyButton } from './my-code.copy-button';
import { useToast } from 'react-native-toast-notifications';

function MyInvitationCode() {
  const toast = useToast();
  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={28} />
      <View style={styles.invitationCodeContainer}>
        <TextContainer />
        <CopyButton />
      </View>
      <SpaceFlexBox flex={27} />
      <BarButtonGreen
        text="링크 공유하기"
        onPress={() => {
          toast.show('준비중입니다.');
        }}
      />
      <SpaceFlexBox flex={23} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_BASE_4,
    width: convertWidth(375),
    height: convertHeight(187),
    alignItems: 'center',
  },

  invitationCodeContainer: {
    width: convertWidth(329),
    height: convertHeight(67),

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export { MyInvitationCode };
