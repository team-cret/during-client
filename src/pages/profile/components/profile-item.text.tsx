import { COLOR_BASE_1 } from '@/src/shared';
import { Pressable, StyleSheet, Text } from 'react-native';
import { ProfileItem } from './profile-item';

function ProfileItemText({
  title,
  text,
  onPress,
}: {
  title: string;
  text: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <ProfileItem title={title} Content={<Text style={styles.text}>{text}</Text>} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,
  },
});

export { ProfileItemText };
