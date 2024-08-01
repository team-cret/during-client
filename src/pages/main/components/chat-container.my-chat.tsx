import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BASE_3,
  COLOR_PRIMARY_GREEN_LIGHT,
  convertHeight,
  convertWidth,
} from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

import ReadIcon from '@/src/shared/assets/icons/chat/read.svg';
import UnReadIcon from '@/src/shared/assets/icons/chat/unread.svg';

function MyChat({ text, ifRead, time }: { text: string; ifRead: boolean; time: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.chatContainer}>
          <Text style={styles.chatText}>{text}</Text>
        </View>
        <View style={styles.readContainer}>
          {ifRead ? (
            <ReadIcon width={convertWidth(9)} height={convertHeight(7)} />
          ) : (
            <UnReadIcon width={convertWidth(9)} height={convertHeight(7)} />
          )}
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(331),
    marginTop: convertHeight(19),

    flexDirection: 'row',

    justifyContent: 'flex-end',
  },

  innerContainer: {
    alignItems: 'flex-end',
  },

  chatContainer: {
    paddingVertical: convertHeight(10),
    paddingHorizontal: convertWidth(17),
    backgroundColor: COLOR_PRIMARY_GREEN_LIGHT,

    borderRadius: convertHeight(10),
    borderBottomRightRadius: convertHeight(1),

    //shadow
    shadowColor: COLOR_BASE_3,
    shadowOffset: {
      width: 0,
      height: convertHeight(4),
    },
    shadowOpacity: 0.3,
  },

  chatText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: COLOR_BASE_1,
  },

  readContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: convertHeight(8),
  },

  timeText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    color: COLOR_BASE_2,

    marginLeft: convertWidth(7),
  },
});

export { MyChat };
