import { useUserStore } from '@/src/features';
import { convertHeight, textStyles } from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

function TextContainer() {
  const { invitationCode } = useUserStore();
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>나의 초대코드</Text>
      <Text style={styles.contentText}>{invitationCode}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: convertHeight(67),
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  titleText: {
    ...textStyles.miniTitle,
    lineHeight: convertHeight(22),
  },

  contentText: {
    ...textStyles.title,
    lineHeight: convertHeight(42),
  },
});

export { TextContainer };
