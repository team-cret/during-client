import { colorWithOpacity, convertHeight, convertWidth } from '@/src/shared';
import { StyleSheet, View } from 'react-native';
// import { MyChat } from './chat-container.my-chat';
import { OtherChat } from './chat-container.other-chat';
import { MyChat } from './chat-container.my-chat';

const Chats: Array<{
  text: string;
  ifRead: boolean;
  time: string;
  ifMy: boolean;
}> = [
  {
    text: '오늘 밥 뭐먹었어?',
    ifRead: true,
    time: '10:00',
    ifMy: false,
  },
  {
    text: '비밀임 ㅋㅋ',
    ifRead: true,
    time: '10:01',
    ifMy: true,
  },
  {
    text: '오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?오늘 밥 뭐먹었어?',
    ifRead: true,
    time: '10:02',
    ifMy: false,
  },
  {
    text: '🤬',
    ifRead: true,
    time: '10:03',
    ifMy: true,
  },
];

function ChatContainer() {
  return (
    <View style={styles.container}>
      {Chats.map((chat, index) => {
        if (chat.ifMy)
          return <MyChat key={index} text={chat.text} ifRead={chat.ifRead} time={chat.time} />;
        else
          return <OtherChat key={index} text={chat.text} ifRead={chat.ifRead} time={chat.time} />;
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
