import {
  COLOR_BACKGROUND,
  COLOR_BASE_2_30,
  convertHeight,
  convertWidth,
  HorizontalDivider,
  NavProp,
} from '@/src/shared';
import { TitleCloseAppbar } from '@/src/widgets';
import { Linking, StyleSheet, View } from 'react-native';
import { InfoPanel } from './components/info-panel';
import { SettingItem } from './components/setting-item';
import { useNavigation } from 'expo-router';

function SettingPage() {
  const navigation = useNavigation<NavProp<'setting/index'>>();

  return (
    <View style={styles.container}>
      <TitleCloseAppbar
        title="설정"
        onPress={() => {
          navigation.pop();
        }}
      />
      <InfoPanel />
      <HorizontalDivider
        width={convertWidth(331)}
        height={convertHeight(33)}
        lineHeight={convertHeight(0.34)}
        upperFlex={17}
        lowerFlex={16}
        color={COLOR_BASE_2_30}
      />
      <SettingItem
        title="개인프로필"
        onPress={() => {
          navigation.navigate('profile/index');
        }}
      />
      {/* <SettingItem title="알림/소리" onPress={() => {}} /> */}
      <SettingItem
        title="고객센터"
        onPress={() => {
          Linking.openURL(`https://forms.gle/fbSE7Ws222XqcWxHA`);
        }}
      />
      <SettingItem
        title="커플 연결"
        onPress={() => {
          navigation.navigate('connection/index');
        }}
      />
      <SettingItem
        title="약관"
        onPress={() => {
          Linking.openURL(
            `https://pond-receipt-8ec.notion.site/during-1690805faa6b4926b8c3da291bfbd9ed?pvs=4`
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(812),
    backgroundColor: COLOR_BACKGROUND,

    alignItems: 'center',
  },
});

export { SettingPage };
