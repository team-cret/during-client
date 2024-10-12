import { convertHeight, convertWidth } from '@/src/shared';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { MyTextChat } from './chat-container.my-chat';
import { OtherTextChat } from './chat-container.other-chat';
import { SafeAreaView } from 'react-native';
import { useAiChatStore } from '@/src/features/ai-chat';

function ChatListContainer() {
  const { chatList } = useAiChatStore();
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      scrollEnabled
      data={chatList}
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
