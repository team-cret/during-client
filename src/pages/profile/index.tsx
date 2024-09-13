import {
  COLOR_BACKGROUND,
  COLOR_BASE_2,
  COLOR_BASE_2_30,
  COLOR_BASE_3,
  colorWithOpacity,
  convertHeight,
  convertWidth,
  HorizontalDivider,
  SpaceFlexBox,
} from '@/src/shared';
import { TitleCloseAppbar } from '@/src/widgets';
import { StyleSheet, Text, View } from 'react-native';
import { InfoPanel } from './components/info-panel';
import { ProfileItemText } from './components/profile-item.text';
import { ProfileItemInvitationCode } from './components/profile-item.invitation-code';

function ProfilePage() {
  return (
    <View style={styles.container}>
      <TitleCloseAppbar title="개인프로필" />
      <InfoPanel />
      <SpaceFlexBox flex={30} />
      <Text style={styles.groupTitleText}>내 정보</Text>
      <SpaceFlexBox flex={17} />
      <ProfileItemText title="이름" text="허연주" />
      <ProfileItemText title="생일" text="2000년 2월 24일" />
      <ProfileItemInvitationCode />
      <ProfileItemText title="이메일" text="zx12cv741@naver.com" />
      <HorizontalDivider
        width={convertWidth(331)}
        height={convertHeight(59)}
        lineHeight={convertHeight(0.34)}
        upperFlex={16}
        lowerFlex={43}
        color={COLOR_BASE_3}
      />
      <Text style={styles.groupTitleText}>앱 설정</Text>
      <SpaceFlexBox flex={17} />
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
