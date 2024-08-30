import { COLOR_BASE_1, COLOR_WHITE, convertHeight, convertWidth, SpaceFlexBox } from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';
import { ModeToggle } from './bottom-sheet.mode-toggle';
import { IndexRow } from './bottom-sheet.index-row';
import { Divider } from './bottom-sheet.divider';

function BottomSheet() {
  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={12} />
      <View style={styles.handle} />
      <SpaceFlexBox flex={17} />
      <View style={styles.topRow}>
        <IndexRow />
        <ModeToggle />
      </View>
      <SpaceFlexBox flex={8} />
      <Divider />
      <SpaceFlexBox flex={5} />

      <View style={styles.itemContainer}>
        <View style={styles.itemRow}>
          <View style={styles.item} />
          <View style={styles.item} />
          <View style={styles.item} />
          <View style={styles.item} />
        </View>
        <View style={styles.itemRow}>
          <View style={styles.item} />
          <View style={styles.item} />
          <View style={styles.item} />
          <View style={styles.item} />
        </View>
        <View style={styles.itemRow}>
          <View style={styles.item} />
          <View style={styles.item} />
          <View style={styles.item} />
          <View style={styles.item} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(390),
    height: convertHeight(358),
    borderRadius: convertWidth(30),
    backgroundColor: COLOR_WHITE,

    alignItems: 'center',
  },

  handle: {
    width: convertWidth(54),
    height: convertHeight(6),
    backgroundColor: COLOR_BASE_1,
    borderRadius: convertHeight(3),
  },

  topRow: {
    width: convertWidth(329),
    height: convertHeight(32),

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemContainer: {
    width: convertWidth(390),
    height: convertHeight(274),
    backgroundColor: 'green',

    alignItems: 'center',
  },

  itemRow: {
    width: convertWidth(336),
    height: convertHeight(66),
    backgroundColor: 'blue',

    flexDirection: 'row',
    marginTop: convertHeight(19),
  },

  item: {
    height: convertWidth(66),
    width: convertWidth(66),
    aspectRatio: 1,
    backgroundColor: 'red',
    borderRadius: convertWidth(33),

    marginRight: convertWidth(24),
  },
});

export { BottomSheet };
