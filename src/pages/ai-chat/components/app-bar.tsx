import { COLOR_BASE_1, convertHeight, convertWidth, NavProp, SpaceFlexBox } from '@/src/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import BackIcon from '@/src/shared/assets/icons/ai-chat/back.svg';
import RefreshIcon from '@/src/shared/assets/icons/ai-chat/refresh.svg';
import { useNavigation } from '@react-navigation/native';
import { useAiChatStore } from '@/src/features/ai-chat';

function AppBar() {
  const navigation = useNavigation<NavProp<'ai-chat/index'>>();
  const { refreshChatList } = useAiChatStore();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.pop();
        }}
      >
        <BackIcon width={convertWidth(17)} height={convertHeight(17)} />
      </Pressable>
      <Text style={styles.title}>곰듀</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          refreshChatList();
        }}
      >
        <RefreshIcon width={convertWidth(23)} height={convertHeight(21)} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(66),

    paddingHorizontal: convertWidth(24),

    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  button: {
    width: convertWidth(26),
    height: convertHeight(26),
    aspectRatio: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,
  },
});

export { AppBar };
