import { COLOR_BACKGROUND, convertHeight, convertWidth, NavProp } from '@/src/shared';
import { TitleCloseAppbar } from '@/src/widgets';
import { StyleSheet, View } from 'react-native';
import { UpperButtons } from './components/upper-buttons';
import { BottomSection } from './components/bottom-section';
import { PurchaseBottomSheet } from './components/purchase-bottom-sheet';
import { RoomCanvas } from './components/room-canvas';
import { useNavigation } from 'expo-router';

function DecorateRoomPage() {
  const navigation = useNavigation<NavProp<'decorate-room/index'>>();
  return (
    <View style={styles.container}>
      <RoomCanvas />
      <TitleCloseAppbar
        title="방 꾸미기"
        onPress={() => {
          navigation.pop();
        }}
      />
      <UpperButtons />
      <BottomSection />
      <PurchaseBottomSheet />
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

export { DecorateRoomPage };
