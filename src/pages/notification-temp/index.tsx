import { useNotificationStore } from '@/src/features';
import { convertHeight, convertWidth, NavProp } from '@/src/shared';
import { useFocusEffect, useNavigation } from 'expo-router';
import { useCallback } from 'react';
import { Pressable } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

function NotificationPage() {
  const navigation = useNavigation<NavProp<'notification/index'>>();
  const { notificationList, getNotificationList, deleteNotification, acceptCoupleConnection } =
    useNotificationStore();
  useFocusEffect(
    useCallback(() => {
      getNotificationList();
    }, [])
  );

  return (
    <View style={styles.container}>
      {notificationList.map((notification) => {
        return (
          <View key={notification.id}>
            <Text>{notification.sendMember.name}</Text>
            <Pressable
              onPress={() => {
                deleteNotification(notification.id);
              }}
            >
              <Text>삭제</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                acceptCoupleConnection(notification.id).then((res) => {
                  if (!res) return;
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'splash/index' }],
                  });
                });
              }}
            >
              <Text>수락</Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(375),
    height: convertHeight(812),
  },
});

export { NotificationPage };
