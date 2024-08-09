import { convertDateToStringHSS, convertHeight, convertWidth } from '@/src/shared';
import { StyleSheet, View } from 'react-native';
import { OtherTextChat } from './chat-container.other-chat';
import { MyTextChat } from './chat-container.my-chat';
import { useChatStore, useUserStore } from '@/src/features';

function ChatContainer() {
  const { id: userId } = useUserStore();
  const { chatCollection } = useChatStore();

  return (
    <View style={styles.container}>
      {chatCollection.map((collection) =>
        collection.chatList.map((chat) => {
          if (chat.sendMemberInfo.id === userId) {
            switch (chat.type) {
              case 'TEXT':
                return (
                  <MyTextChat
                    key={chat.id}
                    text={chat.content}
                    ifRead={chat.readCount === 0}
                    time={convertDateToStringHSS(chat.date)}
                  />
                );
            }
          } else {
            switch (chat.type) {
              case 'TEXT':
                return (
                  <OtherTextChat
                    key={chat.id}
                    text={chat.content}
                    ifRead={chat.readCount === 0}
                    time={convertDateToStringHSS(chat.date)}
                  />
                );
            }
          }
        })
      )}
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
