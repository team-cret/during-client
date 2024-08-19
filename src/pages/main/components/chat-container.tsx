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
    <ScrollView contentContainerStyle={styles.container} scrollEnabled>
      {chatCollection.map((collection) =>
        collection.chatList.map((chat) => {
          if (chat.sendMemberInfo.id === userId) {
            switch (chat.messageType) {
              case 'TEXT':
                return (
                  <MyTextChat
                    key={chat.id}
                    text={chat.content}
                    ifRead={chat.readCount === 0}
                    time={convertDateToStringHSS(new Date(chat.date))}
                  />
                );
            }
          } else {
            switch (chat.messageType) {
              case 'TEXT':
                return (
                  <OtherTextChat
                    key={chat.id}
                    text={chat.content}
                    ifRead={chat.readCount === 0}
                    time={convertDateToStringHSS(new Date(chat.date))}
                  />
                );
            }
          }
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    // height: convertHeight(5000),
    alignItems: 'center',
    overflow: 'scroll',

    // backgroundColor: colorWithOpacity('#00ffff', 0.5),
  },
});

export { ChatContainer };
