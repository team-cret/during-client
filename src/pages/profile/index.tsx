import {
  COLOR_BACKGROUND,
  COLOR_BASE_2_30,
  COLOR_BASE_3,
  convertDateToHumanFormat,
  convertHeight,
  convertWidth,
  defaultDate,
  HorizontalDivider,
  NavProp,
  VerticalSizedBox,
} from '@/src/shared';
import { TitleCloseAppbar } from '@/src/widgets';
import { StyleSheet, Text, View } from 'react-native';
import { InfoPanel } from './components/info-panel';
import { ProfileItemText } from './components/profile-item.text';
import { ProfileItemInvitationCode } from './components/profile-item.invitation-code';
import { useCoupleStore, useUserStore } from '@/src/features';
import { useNavigation } from 'expo-router';

function ProfilePage() {
  const navigation = useNavigation<NavProp<'profile/index'>>();
  const { name, birth, logOut, deleteAccount } = useUserStore();
  const { disconnectCouple } = useCoupleStore();
  return (
    <View style={styles.container}>
      <TitleCloseAppbar title="개인프로필" />
      <InfoPanel />
      <VerticalSizedBox height={30} />
      <Text style={styles.groupTitleText}>내 정보</Text>
      <VerticalSizedBox height={17} />
      <ProfileItemText title="이름" text={name ?? ''} />
      <ProfileItemText title="생일" text={convertDateToHumanFormat(birth ?? defaultDate)} />
      <ProfileItemInvitationCode />
      <HorizontalDivider
        width={convertWidth(331)}
        height={convertHeight(59)}
        lineHeight={convertHeight(0.34)}
        upperFlex={16}
        lowerFlex={43}
        color={COLOR_BASE_3}
      />
      <Text style={styles.groupTitleText}>연결</Text>
      <VerticalSizedBox height={17} />
      <ProfileItemText
        title="로그아웃"
        text=""
        onPress={() => {
          logOut();
          navigation.navigate('splash/index');
        }}
      />
      <ProfileItemText
        title="탈퇴하기"
        text=""
        onPress={() => {
          deleteAccount().then((res) => {
            if (res) navigation.navigate('splash/index');
          });
        }}
      />
      <ProfileItemText
        title="연인 연결 끊기"
        text=""
        onPress={() => {
          disconnectCouple().then((res) => {
            if (res) navigation.navigate('splash/index');
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(812),
    flex: 1,

    backgroundColor: COLOR_BACKGROUND,
  },

  groupTitleText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: COLOR_BASE_2_30,

    lineHeight: convertHeight(22),
    paddingLeft: convertWidth(23),
  },

  profileItem: {
    width: convertWidth(375),
    height: convertHeight(52),
    backgroundColor: 'yellow',
  },
});

export { ProfilePage };
