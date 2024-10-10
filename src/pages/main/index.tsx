import { COLOR_BACKGROUND, convertHeight, convertWidth, NavProp } from '@/src/shared';
import { StyleSheet, View } from 'react-native';
import { MainAppBar } from './components/appbar';
import { ChatControllerContainer } from './components/chat-controller-container';
import { SideBar } from './components/sidebar';
import { useChatStore, useCoupleStore, useRoomStore, useUserStore } from '@/src/features';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RoomCanvas } from './components/room-canvas';
import { TempNotificationToast } from './components/temp-notification-toast';
import { ChatListContainer } from './components/chat-list-container';
import { useToast } from 'react-native-toast-notifications';

function MainPage() {
  const navigation = useNavigation<NavProp<'main/index'>>();
  const { role, lastReadChatId } = useUserStore();
  const { initRoom, setMotion, moveAvatar } = useRoomStore();
  const { getCoupleInfo, takeAttendance } = useCoupleStore();

  const { startChat } = useChatStore();
  const toast = useToast();

  useEffect(() => {
    takeAttendance().then((res) => {
      if (!res) return;
      toast.show('출석체크하여 포인트가 적립되었습니다!');
    });

    if (role === 'ROLE_SINGLE') {
      navigation.navigate('connection/index');
    }
    startChat({ lastChatId: lastReadChatId, setMotion, moveAvatar, initRoom, getCoupleInfo });
  }, []);

  return (
    <View style={styles.container}>
      <RoomCanvas />
      <ChatListContainer />
      <ChatControllerContainer />
      <View style={styles.appbarContainer}>
        <MainAppBar />
      </View>
      <SideBar />
      <TempNotificationToast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  roomContainer: {
    position: 'absolute',
    width: convertWidth(375),
    height: convertHeight(812),
    alignItems: 'center',
    justifyContent: 'center',
  },
  appbarContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: COLOR_BACKGROUND,
  },
});

export { MainPage };
