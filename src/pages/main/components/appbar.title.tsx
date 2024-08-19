import { useCoupleStore, useUserStore } from '@/src/features';
import { calcDDay, COLOR_BASE_1, COLOR_BASE_2, convertHeight, convertWidth } from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

function Title() {
  const { role } = useUserStore();
  const { memberInfoList, startDate } = useCoupleStore();

  switch (role) {
    case 'ROLE_SINGLE':
      return (
        <View style={styles.container}>
          <Text style={styles.title}>듀링 아파트</Text>
          <Text style={styles.days}></Text>
        </View>
      );
    case 'ROLE_COUPLE':
      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            {memberInfoList.length === 2
              ? `${memberInfoList[0].name} X ${memberInfoList[1].name}의 아파트`
              : '듀링 아파트'}
          </Text>
          <Text style={styles.days}>D+{calcDDay(startDate)}</Text>
        </View>
      );
    default:
      return (
        <View style={styles.container}>
          <Text style={styles.title}>듀링 아파트</Text>
          <Text style={styles.days}></Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: convertHeight(13),
  },

  title: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,

    width: convertWidth(263),
    lineHeight: convertHeight(25),

    textAlign: 'center',
  },

  days: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_BASE_2,

    width: convertWidth(263),
    lineHeight: convertHeight(15),

    textAlign: 'center',
  },
});

export { Title };
