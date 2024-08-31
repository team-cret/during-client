import { COLOR_BACKGROUND, convertHeight, convertWidth } from '@/src/shared';
import { TitleCloseAppbar } from '@/src/widgets';
import { StyleSheet, View } from 'react-native';
import { UpperButtons } from './components/upper-buttons';
import { BottomSection } from './components/bottom-section';

function DecorateAvatarPage() {
  return (
    <View style={styles.container}>
      <TitleCloseAppbar title="아바타 꾸미기" />
      <UpperButtons />
      <BottomSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: convertWidth(375),
    height: convertHeight(812),
    backgroundColor: COLOR_BACKGROUND,

    alignItems: 'center',
  },
});

export { DecorateAvatarPage };
