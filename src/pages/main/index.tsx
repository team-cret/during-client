import { COLOR_BACKGROUND, convertHeight, convertWidth, NavProp } from '@/src/shared';
import { Image, StyleSheet, View } from 'react-native';
import { MainAppBar } from './components/appbar';
import { ChatInputBar } from './components/chat-input-bar';
import { ChatFloatingButton } from './components/chat-floating-button';
import { DownFloatingButton } from './components/down-floating-button';
import { ChatContainer } from './components/chat-container';
import { SideBar } from './components/sidebar';
import { useChatStore, useUserStore } from '@/src/features';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RoomCanvas } from './components/room-canvas';
import { TempNotificationToast } from './components/temp-notification-toast';

function MainPage() {
  const navigation = useNavigation<NavProp<'main/index'>>();
  const { role, lastReadChatId } = useUserStore();
  const { setMotion } = useRoomStore();

  const { startChat } = useChatStore();
  useEffect(() => {
    if (role === 'ROLE_SINGLE') {
      navigation.navigate('connection/index');
    }
    startChat({ lastChatId: lastReadChatId, setMotion });
  }, []);

  return (
    <View style={styles.container}>
      <RoomCanvas />
      <MainAppBar />
      <ChatContainer />
      <ChatFloatingButton />
      <ChatInputBar />
      <DownFloatingButton />
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
  },

  roomContainer: {
    position: 'absolute',
    width: convertWidth(375),
    height: convertHeight(812),
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { MainPage };
