import { COLOR_BASE_1, COLOR_BASE_4, convertHeight, convertWidth } from '@/src/shared';
import { Keyboard, Pressable, StyleSheet } from 'react-native';

import ChatIcon from '@/src/shared/assets/icons/chat/chat.svg';
import { useChatStore } from '@/src/features';

function ChatFloatingButton() {
  const { isChatMode, setIsChatMode } = useChatStore();
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        if (Keyboard.isVisible()) return;
        setIsChatMode(!isChatMode);
      }}
    >
      <ChatIcon width={convertWidth(convertWidth(16))} height={convertHeight(16)} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
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
