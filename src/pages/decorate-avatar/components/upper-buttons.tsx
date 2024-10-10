import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BASE_3,
  COLOR_WHITE,
  convertHeight,
  convertWidth,
  HorizontalSizedBox,
  NavProp,
} from '@/src/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import CreditIcon from '@/src/shared/assets/icons/decoration/credit.svg';
import { useCoupleStore, useDecorateAvatarStore, useRoomStore, useUserStore } from '@/src/features';
import { useNavigation } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';

function UpperButtons() {
  const navigation = useNavigation<NavProp<'decorate-avatar/index'>>();
  const { cashPoint } = useCoupleStore();
  const { isPurchaseMode, setIsPurchaseMode, purchaseItems, confirmPurchase } =
    useDecorateAvatarStore();
  const { updateMyAvatarStyle } = useRoomStore();
  const { role } = useUserStore();

  function onConfirm() {
    if (purchaseItems.length === 0) {
      confirmPurchase({ userRole: role }).then((newAvatarStyle) => {
        updateMyAvatarStyle({ ...newAvatarStyle, userRole: role });
        navigation.navigate('main/index');
      });
    } else {
      setIsPurchaseMode(true);
    }
  }

  const toast = useToast();
  function creditButtonOnPress() {
    toast.show('매일 첫 번째 접속 시 포인트를 얻을 수 있습니다!');
  }

  return (
    <View style={styles.container}>
      <View style={[styles.blackButton, { opacity: 0 }]}>
        <Text style={styles.blackButtonText}>초기화</Text>
      </View>
      <Pressable onPress={creditButtonOnPress} style={styles.creditButton}>
        <CreditIcon width={convertWidth(14)} />
        <HorizontalSizedBox width={convertWidth(13)} />
        <Text style={styles.creditButtonText}>{cashPoint}</Text>
      </Pressable>
      <Pressable
        style={[styles.blackButton, { opacity: isPurchaseMode ? 0 : 1 }]}
        onPress={onConfirm}
      >
        <Text style={styles.blackButtonText}>완료</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(331),
    height: convertHeight(40),

    position: 'absolute',
    top: convertHeight(80),

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  blackButton: {
    height: convertHeight(40),
    backgroundColor: COLOR_BASE_1,
    borderRadius: convertHeight(20),

    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: convertWidth(15),
  },

  blackButtonText: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_WHITE,
  },

  creditButton: {
    height: convertHeight(40),
    backgroundColor: 'white',
    borderRadius: convertHeight(20),

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: convertWidth(19),

    borderWidth: 0.38,
    borderColor: COLOR_BASE_3,
  },
  creditButtonText: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_2,
  },
});

export { UpperButtons };
