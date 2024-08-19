import { useNotificationStore } from '@/src/features';
import { convertHeight, convertWidth } from '@/src/shared';
import { useEffect } from 'react';
import { Pressable } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

function NotificationPage() {
  const { notificationList, getNotificationList, deleteNotification, acceptCoupleConnection } =
    useNotificationStore();
  useEffect(() => {
    getNotificationList();
  }, []);

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
                acceptCoupleConnection(notification.id);
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
