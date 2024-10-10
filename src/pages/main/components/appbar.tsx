import { StyleSheet, Text, View } from 'react-native';
import { SpaceFlexBox, convertWidth, convertHeight } from '@/src/shared';
import { AIToggle } from './appbar.ai-toggle';
import { Title } from './appbar.title';
import { HamburgerButton } from './appbar.hamburger-button';

function MainAppBar() {
  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={22} />
      <AIToggle />
      <Title />
      <HamburgerButton />
      <SpaceFlexBox flex={32} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(66),

    flexDirection: 'row',
  },
});

export { MainAppBar };
