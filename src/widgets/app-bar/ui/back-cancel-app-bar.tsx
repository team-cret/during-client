import { View } from 'react-native';

import { BackIconTextButton, CloseButton, convertHeight, SpaceFlexBox } from '@/src/shared';

function BackCancelAppBar({
  backDisabled = false,
  cancelDisabled = false,
  onBackPressed = () => {},
  onCancelPressed = () => {},
}: {
  backDisabled?: boolean;
  cancelDisabled?: boolean;
  onBackPressed?: () => void;
  onCancelPressed?: () => void;
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
      <View style={{ display: backDisabled ? 'none' : 'flex' }}>
        <BackIconTextButton
          onPress={() => {
            onBackPressed();
          }}
        />
      </View>
      <SpaceFlexBox flex={245} />
      <View style={{ display: cancelDisabled ? 'none' : 'flex' }}>
        <CloseButton
          onPress={() => {
            onCancelPressed();
          }}
        />
      </View>
      <SpaceFlexBox flex={24} />
    </View>
  );
}

export { BackCancelAppBar };
