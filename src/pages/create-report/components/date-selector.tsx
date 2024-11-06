import {
  COLOR_BASE_2,
  COLOR_BASE_2_30,
  COLOR_WHITE,
  convertHeight,
  convertWidth,
} from '@/src/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DeleteIcon from '@/src/shared/assets/icons/interaction/delete.svg';
import { useState } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';

function DateSelector({
  date,
  setDate,
}: {
  date: Date | null;
  setDate: (date: Date | null) => void;
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setDatePickerVisibility(true);
      }}
    >
      {date === null ? (
        <Text style={styles.text}>
          <Text style={styles.semiText}>YYYY</Text>년 <Text style={styles.semiText}>MM</Text>월{' '}
          <Text style={styles.semiText}>DD</Text>일
        </Text>
      ) : (
        <Text style={styles.text}>
          {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일
        </Text>
      )}
      <Pressable
        style={styles.deleteIcon}
        onPress={() => {
          setDate(null);
        }}
      >
        <DeleteIcon />
      </Pressable>
      {isDatePickerVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(e) => {
            setDatePickerVisibility(false);
            setDate(new Date(e.nativeEvent.timestamp));
          }}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(331),
    height: convertHeight(51),
    backgroundColor: COLOR_WHITE,
    borderRadius: convertWidth(10),

    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
    paddingLeft: convertWidth(23),
    paddingRight: convertWidth(19),
  },

  text: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_2,
  },

  semiText: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_2_30,
  },

  deleteIcon: {
    width: convertWidth(25),
    height: convertHeight(25),

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { DateSelector };
