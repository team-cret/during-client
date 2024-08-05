import { colorWithOpacity, convertDateToString, convertHeight, convertWidth } from '@/src/shared';
import { StyleSheet, View } from 'react-native';
import { OtherChat } from './chat-container.other-chat';
import { MyChat } from './chat-container.my-chat';
import { useChatStore } from '@/src/features';

function ChatContainer() {
  const { chats } = useChatStore();

  return (
    <View style={styles.container}>
      {chats.map((chat, index) => {
        if (chat.ifMy)
          return (
            <MyChat
              key={index}
              text={chat.text}
              ifRead={chat.ifRead}
              time={convertDateToString(chat.time)}
            />
          );
        else
          return (
            <OtherChat
              key={index}
              text={chat.text}
              ifRead={chat.ifRead}
              time={convertDateToString(chat.time)}
            />
          );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(612),

    alignItems: 'center',

    // backgroundColor: colorWithOpacity('#00ffff', 0.5),
  },
});

export { ChatContainer };
