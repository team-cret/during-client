import { convertHeight, convertWidth } from '@/src/shared';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { ChatFloatingButton } from './chat-floating-button';
import { ChatInputBar } from './chat-input-bar';
import { DownFloatingButton } from './down-floating-button';

function ChatControllerContainer() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={convertHeight(175)}
    >
      <View style={styles.chatControllContainer}>
        <View style={styles.floatingButtonContainer}>
          <ChatFloatingButton />
          <DownFloatingButton />
        </View>
        <ChatInputBar />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(112),

    justifyContent: 'space-between',
    marginBottom: convertHeight(26),
  },

  chatControllContainer: {
    width: convertWidth(375),
    height: convertHeight(112),

    justifyContent: 'space-between',
    alignItems: 'center',
  },

  floatingButtonContainer: {
    width: convertWidth(331),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export { ChatControllerContainer };
