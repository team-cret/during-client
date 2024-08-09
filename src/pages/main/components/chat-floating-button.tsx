import { COLOR_BASE_1, COLOR_BASE_4, convertHeight, convertWidth, NavProp } from '@/src/shared';
import { Pressable, StyleSheet } from 'react-native';

import ChatIcon from '@/src/shared/assets/icons/chat/chat.svg';
import { useNavigation } from '@react-navigation/native';

function ChatFloatingButton() {
  const navigation = useNavigation<NavProp<'main/index'>>();
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('notification/index');
      }}
    >
      <ChatIcon width={convertWidth(convertWidth(16))} height={convertHeight(16)} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: convertWidth(24),
    bottom: convertHeight(80),

    width: convertWidth(45),
    height: convertHeight(42),
    backgroundColor: COLOR_BASE_4,

    borderRadius: 100,

    shadowColor: COLOR_BASE_1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { ChatFloatingButton };
