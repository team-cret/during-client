import { COLOR_BACKGROUND, convertHeight, convertWidth } from '@/src/shared';
import { Image, StyleSheet, View } from 'react-native';
import { MainAppBar } from './components/appbar';
import { ChatInputBar } from './components/chat-input-bar';
import { ChatFloatingButton } from './components/chat-floating-button';
import { DownFloatingButton } from './components/down-floating-button';
import { ChatContainer } from './components/chat-container';
import { SideBar } from './components/sidebar';

function MainPage() {
  return (
    <View style={styles.container}>
      <View style={styles.roomContainer}>
        <Image
          source={require('@/src/shared/assets/temp.png')}
          style={{ width: convertWidth(375), height: convertHeight(812) }}
        />
      </View>
      <MainAppBar />
      <ChatContainer />
      <ChatFloatingButton />
      <ChatInputBar />
      <DownFloatingButton />
      <SideBar />
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
