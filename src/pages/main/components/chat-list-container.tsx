import { COLOR_BASE_3, colorWithOpacity, convertHeight, convertWidth } from '@/src/shared';
import { Keyboard, NativeScrollEvent, StyleSheet, View } from 'react-native';
import { OtherTextChat } from './chat-container.other-chat';
import { MyTextChat } from './chat-container.my-chat';
import { useChatStore, useUserStore } from '@/src/features';
import { FlatList } from 'react-native-gesture-handler';
import { useEffect, useRef, useState } from 'react';
import { NativeSyntheticEvent } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';

const chatContainerConfig = {
  animatinonConfig: {
    duration: 300,
    easing: Easing.bezier(0.1, 0.71, 0.37, 0.9),
  },
  chatContainerMarginBottom: {
    chatMode: convertHeight(0),
    roomMode: convertHeight(332),
  },
};

function ChatListContainer() {
  const { id: userId } = useUserStore();
  const { chatList, getMessages, isScrollBottom, setIsScrollBottom, isChatMode } = useChatStore();

  const [isChatLoading, setIsChatLoading] = useState(false);

  const flatListRef = useRef<FlatList>(null);
  const [scrollY, setScrollY] = useState(0);

  //채팅 모드 관련
  const marginBottom = useSharedValue(
    isChatMode
      ? chatContainerConfig.chatContainerMarginBottom.chatMode
      : chatContainerConfig.chatContainerMarginBottom.roomMode
  );
  useEffect(() => {
    if (Keyboard.isVisible()) return;
    marginBottom.value = withTiming(
      isChatMode
        ? chatContainerConfig.chatContainerMarginBottom.chatMode
        : chatContainerConfig.chatContainerMarginBottom.roomMode,
      chatContainerConfig.animatinonConfig
    );

    if (isChatMode) {
      flatListRef.current?.scrollToOffset({
        offset: scrollY - convertHeight(332),
        animated: true,
      });
    } else {
      flatListRef.current?.scrollToOffset({
        offset: scrollY + convertHeight(332),
        animated: true,
      });
    }
  }, [isChatMode]);

  ////스크롤 관련

  // 키보드 노출시 스크롤
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', (e) => {
      setIsKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });
  }, []);

  useEffect(() => {
    if (isKeyboardVisible === null) return;

    if (isKeyboardVisible) {
      flatListRef.current?.scrollToEnd({ animated: true });
      //   if (isChatMode) {
      //     flatListRef.current?.scrollToOffset({
      //       offset: scrollY + keyboardHeight,
      //       animated: true,
      //     });
      //   }
      // } else {
      //   flatListRef.current?.scrollToOffset({
      //     offset: scrollY - keyboardHeight,
      //     animated: true,
      //   });
    }
  }, [isKeyboardVisible]);

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    setScrollY(e.nativeEvent.contentOffset.y);
    if (
      e.nativeEvent.contentSize.height -
        e.nativeEvent.contentOffset.y -
        e.nativeEvent.layoutMeasurement.height <
      10
    )
      setIsScrollBottom(true);
    else setIsScrollBottom(false);
  }

  useEffect(() => {
    if (isScrollBottom) flatListRef.current?.scrollToEnd({ animated: false });
  }, [isScrollBottom]);

  //채팅 페이지네이션
  function onStartReached() {
    if (chatList.length == 0) return;
    if (isChatLoading) return;
    setIsChatLoading(true);
    getMessages({ basisChatId: chatList[0].id, scrollType: 'BEFORE' }).then(() => {
      setIsChatLoading(false);
    });
  }

  const [chatListHeight, setChatListHeight] = useState(0);
  function onContentSizeChange(w: number, h: number) {
    setChatListHeight(h);
  }
  useEffect(() => {
    if (isScrollBottom) flatListRef.current?.scrollToEnd({ animated: true });
  }, [chatListHeight]);

  return (
    <Animated.FlatList
      ref={flatListRef}
      style={[styles.container, { marginBottom }]}
      contentContainerStyle={{
        alignItems: 'center',
        paddingTop: convertHeight(70),
      }}
      scrollEnabled
      data={chatList}
      onScroll={onScroll}
      onStartReached={onStartReached}
      onContentSizeChange={onContentSizeChange}
      renderItem={({ item, index }) => {
        if (item.sendMemberInfo.id === userId) {
          switch (item.messageType) {
            case 'TEXT':
              return (
                <MyTextChat
                  key={item.id}
                  text={item.content}
                  ifRead={item.readCount >= 2}
                  time={item.date}
                  infoVisible={
                    index === chatList.length - 1 ||
                    chatList[index + 1].sendMemberInfo.id !== item.sendMemberInfo.id ||
                    chatList[index + 1].date !== item.date
                  }
                />
              );
          }
        } else {
          switch (item.messageType) {
            case 'TEXT':
              return (
                <OtherTextChat
                  key={item.id}
                  text={item.content}
                  ifRead={item.readCount >= 2}
                  time={item.date}
                  infoVisible={
                    index === chatList.length - 1 ||
                    chatList[index + 1].sendMemberInfo.id !== item.sendMemberInfo.id ||
                    chatList[index + 1].date !== item.date
                  }
                />
              );
          }
        }
        return null;
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    width: convertWidth(375),
    minHeight: convertHeight(542),

    backgroundColor: colorWithOpacity(COLOR_BASE_3, 0.6),
  },
});

export { ChatListContainer };
