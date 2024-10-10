import { convertHeight, convertWidth } from '@/src/shared';
import { Pressable, StyleSheet, View } from 'react-native';

import HamburgerIcon from '@/src/shared/assets/icons/navigation/hamburger.svg';
import { useSideBarStore } from '@/src/features';

function HamburgerButton() {
  const { openSideBar } = useSideBarStore();
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        openSideBar();
      }}
    >
      <HamburgerIcon />
    </Pressable>
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
