import {
  COLOR_BACKGROUND,
  COLOR_BASE_2_30,
  convertHeight,
  convertWidth,
  HorizontalDivider,
} from '@/src/shared';
import { TitleCloseAppbar } from '@/src/widgets';
import { StyleSheet, View } from 'react-native';
import { InfoPanel } from './components/info-panel';
import { SettingItem } from './components/setting-item';

function SettingPage() {
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
      <SettingItem title="개인프로필" onPress={() => {}} />
      <SettingItem title="알림/소리" onPress={() => {}} />
      <SettingItem title="고객센터" onPress={() => {}} />
      <SettingItem title="커플 연결" onPress={() => {}} />
      <SettingItem title="약관" onPress={() => {}} />
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
