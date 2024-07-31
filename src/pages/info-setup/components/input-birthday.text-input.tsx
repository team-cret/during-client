import {
  COLOR_BASE_1,
  COLOR_BASE_2,
  COLOR_BASE_2_30,
  COLOR_BASE_4,
  COLOR_SECONDARY_PINK_DARK,
  DeleteButton,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '@/src/shared';
import { useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import { StyleSheet, TextInput } from 'react-native';

function BirthdayTextInput() {
  const refYearInput = useRef<TextInput>(null);
  const refMonthInput = useRef<TextInput>(null);
  const refDayInput = useRef<TextInput>(null);

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  function inputYearOnChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    if (e.nativeEvent.text.length === 0 && year.length === 0) {
      refYearInput.current?.blur();
      return;
    }
    setYear(e.nativeEvent.text);

    if (e.nativeEvent.text.length === 4) {
      refMonthInput.current?.focus();
    }
  }
  function inputMonthOnChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    if (e.nativeEvent.text.length === 0 && month.length === 0) {
      refYearInput.current?.focus();
      return;
    }

    setMonth(e.nativeEvent.text);
    if (e.nativeEvent.text.length === 2) {
      refDayInput.current?.focus();
    }
  }
  function inputDayOnChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    if (e.nativeEvent.text.length === 0 && day.length === 0) {
      refMonthInput.current?.focus();
      return;
    }

    setDay(e.nativeEvent.text);
    if (e.nativeEvent.text.length === 2) {
      refDayInput.current?.blur();
    }
  }

  function inputYearOnKeyPress(e: NativeSyntheticEvent<TextInputKeyPressEventData>) {
    if (e.nativeEvent.key === 'Backspace' && year.length === 1) {
      refYearInput.current?.blur();
    }
  }
  function inputMonthOnKeyPress(e: NativeSyntheticEvent<TextInputKeyPressEventData>) {
    if (e.nativeEvent.key === 'Backspace' && month.length === 1) {
      refYearInput.current?.focus();
    }
  }
  function inputDayOnKeyPress(e: NativeSyntheticEvent<TextInputKeyPressEventData>) {
    if (e.nativeEvent.key === 'Backspace' && day.length === 1) {
      refMonthInput.current?.focus();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            ref={refYearInput}
            keyboardType="numeric"
            style={styles.textInputYear}
            cursorColor={COLOR_BASE_1}
            placeholder="YYYY"
            placeholderTextColor={COLOR_BASE_2_30}
            value={year}
            onChange={inputYearOnChange}
            onKeyPress={inputYearOnKeyPress}
          />
          <Text style={styles.textInputIndex}>년</Text>
          <TextInput
            ref={refMonthInput}
            keyboardType="numeric"
            style={styles.textInputMonth}
            cursorColor={COLOR_BASE_1}
            placeholder="MM"
            placeholderTextColor={COLOR_BASE_2_30}
            value={month}
            onChange={inputMonthOnChange}
            onKeyPress={inputMonthOnKeyPress}
          />
          <Text style={styles.textInputIndex}>월</Text>
          <TextInput
            ref={refDayInput}
            keyboardType="numeric"
            style={styles.textInputDay}
            cursorColor={COLOR_BASE_1}
            placeholder="DD"
            placeholderTextColor={COLOR_BASE_2_30}
            value={day}
            onChange={inputDayOnChange}
            onKeyPress={inputDayOnKeyPress}
          />
          <Text style={styles.textInputIndex}>일</Text>
        </View>
        <DeleteButton onPress={() => {}} />
      </View>
      {/* <View style={styles.errorLine} />
      <SpaceFlexBox flex={1} />
      <View style={styles.subTextBox}>
        <Text style={styles.errorText}>
          {` · 닉네임은 한글, 영어 대소문자, 숫자만 입력가능합니다.`}
        </Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * (331 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (85 / DESIGN_HEIGHT),

    alignItems: 'center',
  },

  inputContainer: {
    width: SCREEN_WIDTH * (331 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (51 / DESIGN_HEIGHT),
    borderRadius: SCREEN_HEIGHT * (10 / DESIGN_HEIGHT),

    backgroundColor: COLOR_BASE_4,

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  textInputContainer: {
    width: SCREEN_WIDTH * (245 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (25 / DESIGN_HEIGHT),

    flexDirection: 'row',
  },

  textInputYear: {
    width: SCREEN_WIDTH * (52 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (25 / DESIGN_HEIGHT),
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,
    fontWeight: 'normal',

    textAlign: 'right',
  },

  textInputMonth: {
    width: SCREEN_WIDTH * (30 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (25 / DESIGN_HEIGHT),
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,
    fontWeight: 'normal',

    textAlign: 'right',
  },

  textInputDay: {
    width: SCREEN_WIDTH * (30 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (25 / DESIGN_HEIGHT),
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_1,
    fontWeight: 'normal',

    textAlign: 'right',
  },
  textInputIndex: {
    width: SCREEN_WIDTH * (14 / DESIGN_WIDTH),
    lineHeight: SCREEN_HEIGHT * (25 / DESIGN_HEIGHT),
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: COLOR_BASE_2,

    marginRight: SCREEN_WIDTH * (4 / DESIGN_WIDTH),
  },

  errorLine: {
    width: SCREEN_WIDTH * (302 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (1 / DESIGN_HEIGHT),
    backgroundColor: COLOR_SECONDARY_PINK_DARK,
  },

  subTextBox: {
    width: SCREEN_WIDTH * (331 / DESIGN_WIDTH),
    height: SCREEN_HEIGHT * (16 / DESIGN_HEIGHT),
  },

  errorText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_SECONDARY_PINK_DARK,
  },

  hintText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_BASE_2,
  },
});

export { BirthdayTextInput };
