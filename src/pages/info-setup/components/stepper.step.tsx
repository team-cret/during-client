import {
  COLOR_BASE_2,
  COLOR_BASE_2_30,
  COLOR_BASE_3,
  COLOR_BASE_4,
  convertHeight,
  convertWidth,
} from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

import CheckIconLight from '@/src/shared/assets/icons/info-input/check-light.svg';
import CheckIconDark from '@/src/shared/assets/icons/info-input/check-dark.svg';

function Step({
  ifCurStep,
  ifValid,
  stepNum,
  stepText,
}: {
  ifCurStep: boolean;
  ifValid: boolean;
  stepNum: number;
  stepText: string;
}) {
  return (
    <View style={styles.container}>
      {ifValid ? (
        ifCurStep ? (
          <CheckDark />
        ) : (
          <CheckLight />
        )
      ) : ifCurStep ? (
        <NumDark num={stepNum} />
      ) : (
        <NumLight num={stepNum} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{stepText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(26),
    height: convertHeight(40),

    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textContainer: {
    width: convertWidth(26),
    height: convertHeight(16),
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    color: COLOR_BASE_2,

    textAlign: 'center',
  },
});

//

function CheckLight() {
  return (
    <View
      style={{
        height: convertHeight(20),
        aspectRatio: 1,
        borderRadius: 100,
      }}
    >
      <CheckIconLight />
    </View>
  );
}

function CheckDark() {
  return (
    <View
      style={{
        height: convertHeight(20),
        aspectRatio: 1,
        borderRadius: 100,
      }}
    >
      <CheckIconDark />
    </View>
  );
}

function NumLight({ num }: { num: number }) {
  return (
    <View
      style={{
        height: convertHeight(20),
        aspectRatio: 1,
        borderRadius: 100,

        backgroundColor: COLOR_BASE_3,

        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 13,
          fontFamily: 'Pretendard-SemiBold',
          color: COLOR_BASE_4,
        }}
      >
        {num}
      </Text>
    </View>
  );
}

function NumDark({ num }: { num: number }) {
  return (
    <View
      style={{
        height: convertHeight(20),
        aspectRatio: 1,
        borderRadius: 100,

        backgroundColor: COLOR_BASE_2_30,

        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 13,
          fontFamily: 'Pretendard-SemiBold',
          color: COLOR_BASE_2,
        }}
      >
        {num}
      </Text>
    </View>
  );
}

export { Step };
