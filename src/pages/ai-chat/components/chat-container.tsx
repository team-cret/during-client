import { convertHeight, convertWidth } from '@/src/shared';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { ChatInputBar } from './chat-container.chat-input-bar';
import { ChatListContainer } from './chat-container.chat-list-container';

function ChatContainer() {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ChatListContainer />
      <ChatInputBar />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: convertWidth(375),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export { ChatContainer };
