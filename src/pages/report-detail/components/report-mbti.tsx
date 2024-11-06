import { COLOR_BASE_1, COLOR_BASE_2, convertHeight, convertWidth } from '@/src/shared';
import { StyleSheet, Text, View } from 'react-native';

import INFPIcon from '@/src/shared/assets/icons/report/mbti/INFP.svg';
import ENFPIcon from '@/src/shared/assets/icons/report/mbti/ENFP.svg';
import INFJIcon from '@/src/shared/assets/icons/report/mbti/INFJ.svg';
import ENFJIcon from '@/src/shared/assets/icons/report/mbti/ENFJ.svg';
import INTPIcon from '@/src/shared/assets/icons/report/mbti/INTP.svg';
import ENTPIcon from '@/src/shared/assets/icons/report/mbti/ENTP.svg';
import INTJIcon from '@/src/shared/assets/icons/report/mbti/INTJ.svg';
import ENTJIcon from '@/src/shared/assets/icons/report/mbti/ENTJ.svg';
import ISFPIcon from '@/src/shared/assets/icons/report/mbti/ISFP.svg';
import ESFPIcon from '@/src/shared/assets/icons/report/mbti/ESFP.svg';
import ISTPIcon from '@/src/shared/assets/icons/report/mbti/ISTP.svg';
import ESTPIcon from '@/src/shared/assets/icons/report/mbti/ESTP.svg';
import ISFJIcon from '@/src/shared/assets/icons/report/mbti/ISFJ.svg';
import ESFJIcon from '@/src/shared/assets/icons/report/mbti/ESFJ.svg';
import ISTJIcon from '@/src/shared/assets/icons/report/mbti/ISTJ.svg';
import ESTJIcon from '@/src/shared/assets/icons/report/mbti/ESTJ.svg';

import { useReportStore, useUserStore } from '@/src/features';
import { useEffect } from 'react';

function ReportMBTI() {
  const { id } = useUserStore();
  const { report } = useReportStore();

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        {'나의 연애 MBTI는\n'}
        <Text style={styles.bold}>
          {report!.mbti.filter((mbti) => mbti.user_id === id).length === 0
            ? 'INFP'
            : report!.mbti.filter((mbti) => mbti.user_id === id)[0].mbti}
        </Text>
        {'에요.'}
      </Text>
      {
        {
          INFP: <INFPIcon height={convertHeight(115)} />,
          ENFP: <ENFPIcon height={convertHeight(115)} />,
          INFJ: <INFJIcon height={convertHeight(115)} />,
          ENFJ: <ENFJIcon height={convertHeight(115)} />,
          INTP: <INTPIcon height={convertHeight(115)} />,
          ENTP: <ENTPIcon height={convertHeight(115)} />,
          INTJ: <INTJIcon height={convertHeight(115)} />,
          ENTJ: <ENTJIcon height={convertHeight(115)} />,
          ISFP: <ISFPIcon height={convertHeight(115)} />,
          ESFP: <ESFPIcon height={convertHeight(115)} />,
          ISTP: <ISTPIcon height={convertHeight(115)} />,
          ESTP: <ESTPIcon height={convertHeight(115)} />,
          ISFJ: <ISFJIcon height={convertHeight(115)} />,
          ESFJ: <ESFJIcon height={convertHeight(115)} />,
          ISTJ: <ISTJIcon height={convertHeight(115)} />,
          ESTJ: <ESTJIcon height={convertHeight(115)} />,
        }[
          report!.mbti.filter((mbti) => mbti.user_id === id).length === 0
            ? 'INFP'
            : report!.mbti.filter((mbti) => mbti.user_id === id)[0].mbti
        ]
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: convertWidth(330),
    height: convertHeight(231),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: convertHeight(25),
  },

  infoText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: COLOR_BASE_2,

    textAlign: 'center',
  },
  bold: {
    color: COLOR_BASE_1,
  },
});

export { ReportMBTI };
