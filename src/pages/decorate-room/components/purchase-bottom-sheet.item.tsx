import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BASE_4,
  convertHeight,
  convertWidth,
  RoomItem,
  roomItems,
  SpaceFlexBox,
} from '@/src/shared';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import CheckIcon from '@/src/shared/assets/icons/decoration/check.svg';
import CheckDisabledIcon from '@/src/shared/assets/icons/decoration/check-disabled.svg';
import CreditIcon from '@/src/shared/assets/icons/decoration/credit.svg';

function Item({ purchaseItem }: { purchaseItem: { itemId: string } }) {
  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={26} />
      <View style={styles.itemRow}>
        <CheckIcon width={convertWidth(20)} height={convertHeight(20)} />
        <Image
          source={roomItems[purchaseItem.itemId].image}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{roomItems[purchaseItem.itemId].name}</Text>

          <View style={styles.priceContainer}>
            <CreditIcon width={convertWidth(14)} height={convertHeight(14)} />
            <Text style={styles.priceText}>{roomItems[purchaseItem.itemId].price}</Text>
          </View>
        </View>
      </View>
      <SpaceFlexBox flex={20} />
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(338),
    height: convertHeight(112),

    alignItems: 'center',
  },

  itemRow: {
    width: convertWidth(326),
    height: convertHeight(65),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  image: {
    width: convertWidth(89),
    height: convertHeight(65),
    backgroundColor: COLOR_BASE_4,
    borderRadius: convertWidth(10),
  },

  infoContainer: {
    width: convertWidth(186),
    height: convertHeight(65),

    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  nameText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: COLOR_BASE_1,
  },

  priceContainer: {
    backgroundColor: COLOR_BASE_4,
    borderRadius: convertHeight(15),

    paddingHorizontal: convertWidth(14),

    flexDirection: 'row',
    alignItems: 'center',
  },

  priceText: {
    lineHeight: convertHeight(29),

    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_2,

    marginLeft: convertWidth(8),
  },

  divider: {
    width: convertWidth(338),
    height: convertHeight(1),
    backgroundColor: COLOR_BASE_4,
  },
});

export { Item };
