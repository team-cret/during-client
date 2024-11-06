import { convertHeight, convertWidth } from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';
import { AppBar } from './components/app-bar';
import { ChatContainer } from './components/chat-container';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { useAiChatStore } from '@/src/features/ai-chat';

function AIChatPage() {
  const { initChatList } = useAiChatStore();
  useFocusEffect(
    useCallback(() => {
      initChatList();
    }, [])
  );

  return (
    <LinearGradient
      style={styles.container}
      colors={['#F4FFE9', '#FFCED2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <AppBar />
      <ChatContainer />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: convertWidth(375),
    height: convertHeight(812),

    justifyContent: 'flex-start',
  },
});

export { AIChatPage };
