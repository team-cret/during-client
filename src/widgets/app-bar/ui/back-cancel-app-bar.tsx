import { View } from 'react-native';

import { BackIconTextButton, CloseButton, convertHeight, SpaceFlexBox } from '@/src/shared';

function BackCancelAppBar({
  backDisabled = true,
  cancelDisabled = true,
}: {
  backDisabled?: boolean;
  cancelDisabled?: boolean;
}) {
  return (
    <View
      style={{
        width: '100%',
        height: convertHeight(66),

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <SpaceFlexBox flex={24} />
      <View style={{ display: backDisabled ? 'flex' : 'none' }}>
        <BackIconTextButton
          onPress={() => {
            //enable 안됐을 때 처리하기
          }}
        />
      </View>
      <SpaceFlexBox flex={245} />
      <View style={{ display: cancelDisabled ? 'flex' : 'none' }}>
        <CloseButton
          onPress={() => {
            //enable 안됐을 때 처리하기
          }}
        />
      </View>
      <SpaceFlexBox flex={24} />
    </View>
  );
}

export { BackCancelAppBar };
