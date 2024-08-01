import { COLOR_BASE_1, convertHeight, convertWidth } from '@/src/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ProfileItem } from './profile-item';

import RefreshButtonIcon from '@/src/shared/assets/icons/setting/refresh-button.svg';

function ProfileItemInvitationCode() {
  return (
    <ProfileItem
      title="초대코드"
      Content={
        <View style={styles.container}>
          <Text style={styles.text}>DDDDDDDDF</Text>
          <Pressable>
            <RefreshButtonIcon width={convertWidth(85)} height={convertHeight(23)} />
          </Pressable>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,

    marginRight: convertWidth(7),
  },
});

export { ProfileItemInvitationCode };
