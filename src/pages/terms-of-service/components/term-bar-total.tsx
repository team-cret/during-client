import { COLOR_BASE_1, RadioButton, convertWidth, convertHeight } from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

function TermTotalBar({
  isSelected,
  radioOnPress,
}: {
  isSelected: boolean;
  radioOnPress: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>약관 전체동의</Text>
      <RadioButton onPress={radioOnPress} isSelected={isSelected} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(327),
    height: convertHeight(44),

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,
  },
});

export { TermTotalBar };
