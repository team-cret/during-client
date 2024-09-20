import { convertHeight, convertWidth } from '@/src/shared';
import { NativeScrollEvent, StyleSheet, View } from 'react-native';
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
  chatContainerHeight: {
    chatMode: convertHeight(600),
    roomMode: convertHeight(200),
  },
};

function ChatContainer() {
  const { id: userId } = useUserStore();
  const { chatList, getMessages, isScrollBottom, setIsScrollBottom, isChatMode } = useChatStore();

  const [isChatLoading, setIsChatLoading] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  //채팅 모드 관련
  const height = useSharedValue(
    isChatMode
      ? chatContainerConfig.chatContainerHeight.chatMode
      : chatContainerConfig.chatContainerHeight.roomMode
  );
  useEffect(() => {
    height.value = withTiming(
      isChatMode
        ? chatContainerConfig.chatContainerHeight.chatMode
        : chatContainerConfig.chatContainerHeight.roomMode,
      chatContainerConfig.animatinonConfig
    );
  }, [isChatMode]);

  //스크롤 관련
  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    if (
      e.nativeEvent.contentSize.height -
        e.nativeEvent.contentOffset.y -
        e.nativeEvent.layoutMeasurement.height <
      10
    )
      setIsScrollBottom(true);
    else setIsScrollBottom(false);
  }

  function onContentSizeChange() {
    if (isScrollBottom) flatListRef.current?.scrollToEnd({ animated: false });
  }

  useEffect(() => {
    if (isScrollBottom) flatListRef.current?.scrollToEnd({ animated: false });
  }, [isScrollBottom]);

  //채팅 페이지네이션
  function onStartReached() {
    if (isChatLoading) return;
    setIsChatLoading(true);
    getMessages({ basisChatId: chatList[0].id, scrollType: 'BEFORE' }).then(() => {
      setIsChatLoading(false);
    });
  }

  return (
    <Animated.FlatList
      ref={flatListRef}
      style={[styles.container, { height }]}
      contentContainerStyle={{ alignItems: 'center' }}
      scrollEnabled
      data={chatList}
      onScroll={onScroll}
      onContentSizeChange={onContentSizeChange}
      onStartReached={onStartReached}
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
    height: convertHeight(600),
    // backgroundColor: colorWithOpacity('#00ffff', 0.5),
  },
});

export { ChatContainer };
