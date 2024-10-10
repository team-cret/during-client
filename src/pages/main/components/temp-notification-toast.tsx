import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BASE_3,
  COLOR_PRIMARY_GREEN,
  COLOR_WHITE,
  convertHeight,
  convertWidth,
  NavProp,
} from '@/src/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import CancelIcon from '@/src/shared/assets/icons/menu/close.svg';
import { useFocusEffect, useNavigation } from 'expo-router';
import { useCallback } from 'react';
import { useNotificationStore } from '@/src/features';

function TempNotificationToast() {
  const navigation = useNavigation<NavProp<'main/index'>>();
  const { notificationList, getNotificationList, acceptCoupleConnection, deleteNotification } =
    useNotificationStore();

  useFocusEffect(
    useCallback(() => {
      getNotificationList();
    }, [])
  );

  if (notificationList.length === 0) return null;
  return (
    <View style={styles.container}>
      <CancelIcon style={styles.cancelButton} width={convertWidth(16)} />
      <Text style={styles.text}>{notificationList[0].sendMember.name}님이 연결을 요청합니다.</Text>
      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.button, { backgroundColor: COLOR_PRIMARY_GREEN }]}
          onPress={() => {
            acceptCoupleConnection(notificationList[0].id).then((res) => {
              if (!res) return;
              navigation.reset({
                index: 0,
                routes: [{ name: 'splash/index' }],
              });
            });
          }}
        >
          <Text style={styles.buttonText}>수락</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: COLOR_BASE_3 }]}
          onPress={() => {
            deleteNotification(notificationList[0].id);
          }}
        >
          <Text style={styles.buttonText}>거절</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
    width: convertWidth(331),
    height: convertHeight(130),
    borderRadius: convertWidth(14),

    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    bottom: convertHeight(80),

    elevation: 3,
    shadowColor: COLOR_BASE_1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  cancelButton: {
    position: 'absolute',
    right: convertWidth(16),
    top: convertHeight(16),
    aspectRatio: 1,
  },

  text: {
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
    color: COLOR_BASE_2,

    width: convertWidth(283),
  },

  buttonRow: {
    flexDirection: 'row',
    width: convertWidth(283),
    justifyContent: 'space-between',
    marginTop: convertHeight(32),
  },
  button: {
    width: convertWidth(126),
    height: convertHeight(34),
    borderRadius: convertWidth(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
    color: COLOR_BASE_2,
  },
});

export { TempNotificationToast };
