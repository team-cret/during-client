import { convertHeight, convertWidth } from '@/src/shared';
import { StyleSheet, View } from 'react-native';

import HamburgerIcon from '@/src/shared/assets/icons/navigation/hamburger.svg';

function HamburgerButton() {
  return (
    <View style={styles.container}>
      <HamburgerIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(22),
    height: convertHeight(16),
    marginTop: convertHeight(18),
  },
});

export { HamburgerButton };
