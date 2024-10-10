import {
  COLOR_BASE_1,
  COLOR_BASE_4,
  convertHeight,
  convertWidth,
  NavProp,
  SpaceFlexBox,
} from '@/src/shared';
import { Keyboard, Pressable, StyleSheet, TextInput, View } from 'react-native';

import PlusIcon from '@/src/shared/assets/icons/chat/plus.svg';
import SmileIcon from '@/src/shared/assets/icons/chat/smile.svg';
import SendIcon from '@/src/shared/assets/icons/chat/send.svg';
import { useChatAIStore, useChatStore } from '@/src/features';
import { useCallback, useRef, useState } from 'react';
import { useFocusEffect, useNavigation } from 'expo-router';

function ChatInputBar() {
  const navigation = useNavigation<NavProp<'main/index'>>();
  const {
    input: { message, ifValid },
    setInputMessage,
    sendMessage,
    setIsChatMode,
  } = useChatStore();
  const { isAIOn } = useChatAIStore();
  const [isChatSending, setIsChatSending] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {
      Keyboard.addListener('keyboardDidHide', () => {
        textInputRef.current?.blur();
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={17} />
      <Pressable style={styles.plusContainer}>
        <PlusIcon />
      </Pressable>
      <SpaceFlexBox flex={8} />
      <TextInput
        ref={textInputRef}
        style={styles.chatInput}
        cursorColor={COLOR_BASE_1}
        value={message}
        onFocus={() => {
          setIsChatMode(true);
        }}
        onChange={(e) => {
          setInputMessage({ message: e.nativeEvent.text });
        }}
        onSubmitEditing={
          isChatSending
            ? () => {}
            : (e) => {
                setIsChatSending(true);
                sendMessage({ ifAi: isAIOn }).then((res) => {
                  setIsChatSending(false);
                  if (res) setInputMessage({ message: '' });
                  else navigation.replace('main/index');
                });
              }
        }
        blurOnSubmit={false}
      />
      <SpaceFlexBox flex={8} />
      <Pressable style={styles.ImoticonContainer}>
        <SmileIcon />
      </Pressable>
      <SpaceFlexBox flex={10} />
      <Pressable
        style={styles.sendContainer}
        onPress={
          isChatSending
            ? () => {}
            : (e) => {
                setIsChatSending(true);
                sendMessage({ ifAi: isAIOn }).then((res) => {
                  setIsChatSending(false);
                  if (res) setInputMessage({ message: '' });
                  else navigation.replace('main/index');
                });
              }
        }
      >
        <SendIcon />
      </Pressable>
      <SpaceFlexBox flex={11} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(331),
    height: convertHeight(42),
    backgroundColor: COLOR_BASE_4,

    borderRadius: convertHeight(10),

    flexDirection: 'row',
    alignItems: 'center',

    // elevation: 3,
    // shadowColor: COLOR_BASE_1,
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.08,
    // shadowRadius: 4,
  },

  plusContainer: {
    width: convertWidth(14),
    height: convertHeight(14),
    opacity: 0,
  },

  chatInput: {
    width: convertWidth(221),
    height: convertHeight(20),

    fontSize: convertWidth(14),
    fontFamily: 'Pretendard-Medium',
    color: COLOR_BASE_1,

    fontWeight: 'medium',
  },

  ImoticonContainer: {
    width: convertWidth(20),
    height: convertHeight(20),
    opacity: 0,
  },

  sendContainer: {
    width: convertWidth(20),
    height: convertHeight(20),
  },
});

export { ChatInputBar };
