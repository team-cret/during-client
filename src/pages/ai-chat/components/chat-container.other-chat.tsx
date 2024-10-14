import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BASE_3,
  convertHeight,
  convertWidth,
} from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

import ReadIcon from '@/src/shared/assets/icons/chat/read.svg';
import UnReadIcon from '@/src/shared/assets/icons/chat/unread.svg';

function OtherTextChat({
  text,
  time,
  infoVisible,
}: {
  text: string;
  time: string;
  infoVisible: boolean;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.chatContainer}>
          <Text style={styles.chatText}>{text}</Text>
        </View>
        <View style={[styles.infoContainer, { display: infoVisible ? 'flex' : 'none' }]}>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(331),
    marginTop: convertHeight(3),

    flexDirection: 'row',

    justifyContent: 'flex-start',
  },

  innerContainer: {
    alignItems: 'flex-start',
  },

  chatContainer: {
    paddingVertical: convertHeight(10),
    paddingHorizontal: convertWidth(17),
    backgroundColor: COLOR_BASE_3,

    borderRadius: convertHeight(10),
    borderBottomLeftRadius: convertHeight(1),

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

  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: convertHeight(8),
    marginBottom: convertHeight(12),
  },

  timeText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    color: COLOR_BASE_2,

    marginLeft: convertWidth(7),
  },
});

export { OtherTextChat };
