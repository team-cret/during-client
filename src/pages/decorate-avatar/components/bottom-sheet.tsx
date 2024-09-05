import { COLOR_BASE_1, COLOR_WHITE, convertHeight, convertWidth, SpaceFlexBox } from '@/src/shared';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { ModeToggle } from './bottom-sheet.mode-toggle';
import { IndexRow } from './bottom-sheet.index-row';
import { Divider } from './bottom-sheet.divider';
import { useDecorateAvatarStore } from '@/src/features';
import { ScrollView } from 'react-native-gesture-handler';

function BottomSheet() {
  const { category, mode, bagItems, shopItems, selectBagItem, selectShopItem } =
    useDecorateAvatarStore();

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
        <ScrollView>
          {mode === 0
            ? shopItems
                .filter((item) => item.category == category)
                .map((item, index) => {
                  if (index % 4 !== 0) return null;
                  return (
                    <View key={index} style={styles.itemRow}>
                      {shopItems
                        .filter((item) => item.category == category)
                        .slice(index, index + 4)
                        .map((item, index) => {
                          return (
                            <Pressable onPress={() => selectShopItem(item.id)} key={item.id}>
                              <Image source={item.image} style={styles.item} resizeMode="cover" />
                            </Pressable>
                          );
                        })}
                    </View>
                  );
                })
            : bagItems
                .filter((item) => item.category == category)
                .map((item, index) => {
                  if (index % 4 !== 0) return null;
                  return (
                    <View key={index} style={styles.itemRow}>
                      {bagItems
                        .filter((item) => item.category == category)
                        .slice(index, index + 4)
                        .map((item, index) => {
                          return (
                            <Pressable onPress={() => selectBagItem(item.id)} key={item.id}>
                              <Image
                                source={item.image}
                                key={item.id}
                                style={styles.item}
                                resizeMode="cover"
                              />
                            </Pressable>
                          );
                        })}
                    </View>
                  );
                })}
        </ScrollView>
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

    alignItems: 'center',
  },

  itemRow: {
    width: convertWidth(336),
    height: convertHeight(66),

    flexDirection: 'row',
    marginTop: convertHeight(19),
  },

  item: {
    height: convertWidth(66),
    width: convertWidth(66),
    aspectRatio: 1,
    borderRadius: convertWidth(33),

    marginRight: convertWidth(24),
  },
});

export { BottomSheet };
