import { COLOR_BASE_1, COLOR_BASE_4, convertHeight, convertWidth } from '@/src/shared';
import { Pressable, StyleSheet } from 'react-native';

import DownIcon from '@/src/shared/assets/icons/chat/arrow-down.svg';
import { useChatStore } from '@/src/features';

function DownFloatingButton() {
  const { isScrollBottom, setIsScrollBottom } = useChatStore();

  return (
    <Pressable
      style={[styles.container, { display: isScrollBottom ? 'none' : 'flex' }]}
      onPress={() => {
        setIsScrollBottom(true);
      }}
    >
      <DownIcon width={convertWidth(14)} height={convertHeight(8)} />
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
    elevation: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { DownFloatingButton };
