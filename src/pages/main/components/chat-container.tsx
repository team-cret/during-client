import { convertDateToStringHSS, convertHeight, convertWidth } from '@/src/shared';
import { StyleSheet, View } from 'react-native';
import { OtherTextChat } from './chat-container.other-chat';
import { MyTextChat } from './chat-container.my-chat';
import { useChatStore, useUserStore } from '@/src/features';
import { ScrollView } from 'react-native-gesture-handler';

function ChatContainer() {
  const { id: userId } = useUserStore();
  const { chatCollection } = useChatStore();

  return (
    <Animated.FlatList
      ref={flatListRef}
      style={[styles.container, { height }]}
      contentContainerStyle={{ alignItems: 'center' }}
      scrollEnabled
      data={chatList}
      onScroll={onScroll}
      onContentSizeChange={onContentSizeChange}
      onStartReached={onStartReached}
      renderItem={({ item, index }) => {
        if (item.sendMemberInfo.id === userId) {
          switch (item.messageType) {
              case 'TEXT':
                return (
                  <MyTextChat
                  key={item.id}
                  text={item.content}
                  ifRead={item.readCount >= 2}
                  time={item.date}
                  infoVisible={
                    index === chatList.length - 1 ||
                    chatList[index + 1].sendMemberInfo.id !== item.sendMemberInfo.id ||
                    chatList[index + 1].date !== item.date
                  }
                  />
                );
            }
          } else {
          switch (item.messageType) {
              case 'TEXT':
                return (
                  <OtherTextChat
                  key={item.id}
                  text={item.content}
                  ifRead={item.readCount >= 2}
                  time={item.date}
                  infoVisible={
                    index === chatList.length - 1 ||
                    chatList[index + 1].sendMemberInfo.id !== item.sendMemberInfo.id ||
                    chatList[index + 1].date !== item.date
                  }
                  />
                );
            }
          }
        return null;
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    width: convertWidth(375),
    height: convertHeight(600),
    // backgroundColor: colorWithOpacity('#00ffff', 0.5),
  },
});

export { ChatContainer };
