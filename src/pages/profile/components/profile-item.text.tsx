import { COLOR_BASE_1, convertHeight, convertWidth } from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';
import { ProfileItem } from './profile-item';

function ProfileItemText({ title, text }: { title: string; text: string }) {
  return <ProfileItem title={title} Content={<Text style={styles.text}>{text}</Text>} />;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,
  },
});

export { ProfileItemText };
