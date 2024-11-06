import {
  avatarItems,
  COLOR_BASE_1,
  COLOR_WHITE,
  convertHeight,
  convertWidth,
  VerticalSizedBox,
} from '@/src/shared';
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
      <VerticalSizedBox height={12} />
      <View style={styles.handle} />
      <VerticalSizedBox height={17} />
      <View style={styles.topRow}>
        <IndexRow />
        <ModeToggle />
      </View>
      <VerticalSizedBox height={8} />
      <Divider />
      <VerticalSizedBox height={5} />

      <View style={styles.itemContainer}>
        <ScrollView>
          {mode === 0
            ? shopItems
                .filter((id) => avatarItems[id].category == category)
                .map((id, index) => {
                  if (index % 4 !== 0) return null;
                  return (
                    <View key={index} style={styles.itemRow}>
                      {shopItems
                        .filter((id) => avatarItems[id].category == category)
                        .slice(index, index + 4)
                        .map((id, index) => {
                          return (
                            <Pressable onPress={() => selectShopItem(id)} key={id}>
                              <Image
                                source={avatarItems[id].image}
                                style={styles.item}
                                resizeMode="cover"
                              />
                            </Pressable>
                          );
                        })}
                    </View>
                  );
                })
            : bagItems
                .filter((id) => avatarItems[id].category == category)
                .map((id, index) => {
                  if (index % 4 !== 0) return null;
                  return (
                    <View key={index} style={styles.itemRow}>
                      {bagItems
                        .filter((id) => avatarItems[id].category == category)
                        .slice(index, index + 4)
                        .map((id) => {
                          return (
                            <Pressable onPress={() => selectBagItem(id)} key={id}>
                              <Image
                                source={avatarItems[id].image}
                                key={id}
                                style={styles.item}
                                resizeMode="cover"
                              />
                            </Pressable>
                          );
                        })}
                    </View>
                  );
                })}
          <VerticalSizedBox height={100} />
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
    justifyContent: 'flex-start',
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
