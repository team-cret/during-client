import { convertWidth } from '@/src/shared';
import { Keyboard, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { MyTextChat } from './chat-container.my-chat';
import { OtherTextChat } from './chat-container.other-chat';
import { useAiChatStore } from '@/src/features/ai-chat';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from 'expo-router';

function ChatListContainer() {
  const { chatList } = useAiChatStore();
  const flatListRef = useRef<FlatList>(null);

  return (
    <FlatList
      ref={flatListRef}
      style={styles.container}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      scrollEnabled
      data={chatList}
      onContentSizeChange={() => {
        flatListRef.current?.scrollToEnd({ animated: false });
      }}
      onLayout={() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }}
      renderItem={({ item, index }) => {
        if (item.isUser) {
          return <MyTextChat key={index} text={item.text} time={item.date} infoVisible={true} />;
        } else {
          return <OtherTextChat key={index} text={item.text} time={item.date} infoVisible={true} />;
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: convertWidth(375),
  },
});

export { ChatListContainer };
