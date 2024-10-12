import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BASE_3,
  COLOR_PRIMARY_GREEN_LIGHT,
  convertHeight,
  convertWidth,
} from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

function MyTextChat({
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

export { MyTextChat };
