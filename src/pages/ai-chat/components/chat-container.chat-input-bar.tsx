import { COLOR_BASE_1, COLOR_WHITE, convertHeight, convertWidth } from '@/src/shared';
import { useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import SendIcon from '@/src/shared/assets/icons/chat/send.svg';
import { useAiChatStore } from '@/src/features/ai-chat';

function ChatInputBar() {
  const textInputRef = useRef<TextInput>(null);

  const {
    input: { val, ifValid },
    updateInput,
    sendChat,
  } = useAiChatStore();

  return (
    <View style={styles.container}>
      <TextInput
        ref={textInputRef}
        value={val}
        onChange={(e) => updateInput(e.nativeEvent.text)}
        style={styles.textInput}
        cursorColor={COLOR_BASE_1}
        onSubmitEditing={sendChat}
      />
      <Pressable onPress={sendChat}>
        <SendIcon width={convertWidth(25)} height={convertHeight(25)} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(331),
    height: convertHeight(42),
    borderRadius: convertHeight(10),

    backgroundColor: COLOR_WHITE,

    marginTop: convertHeight(16),
    marginBottom: convertHeight(26),

    flexDirection: 'row',
    paddingHorizontal: convertWidth(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textInput: {
    width: convertWidth(280),
    height: convertHeight(25),
  },
});

export { ChatInputBar };
