import {
  BarButtonGreen,
  COLOR_BASE_4,
  convertHeight,
  convertWidth,
  SpaceFlexBox,
} from '@/src/shared';
import { Platform, StyleSheet, View } from 'react-native';
import { TextContainer } from './my-code.text-container';
import { CopyButton } from './my-code.copy-button';
import { useUserStore } from '@/src/features';

import * as Clipboard from 'expo-clipboard';
import { useToast } from 'react-native-toast-notifications';

function MyInvitationCode() {
  const toast = useToast();
  const { invitationCode } = useUserStore();
  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={28} />
      <View style={styles.invitationCodeContainer}>
        <TextContainer />
        <CopyButton />
      </View>
      <SpaceFlexBox flex={27} />
      <BarButtonGreen
        text="코드 복사하기"
        onPress={() => {
          if (invitationCode == null) return;
          Clipboard.setStringAsync(invitationCode).then((res) => {
            if (!res) return;
            if (Platform.OS === 'ios') {
              toast.show('코드가 복사되었습니다.');
            }
          });
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
