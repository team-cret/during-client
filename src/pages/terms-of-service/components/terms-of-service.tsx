import { StyleSheet, View } from 'react-native';
import {
  convertHeight,
  convertWidth,
  HorizontalDivider,
  termsOptional,
  termsRequired,
} from '@/src/shared';
import { useState } from 'react';
import { useTermsOfServiceInputStore } from '@/src/features';
import { TermTotalBar } from './term-bar-total';
import { TermBarRequired } from './term-bar-required';
import { TermBarOptional } from './term-bar-optional';

function TermsOfService() {
  const {
    ifAllAgreed,
    ifRequiredAgreed,
    ifOptionalAgreed,

    toggleIfAllAgreed,
    toggleIfRequiredAgreed,
    toggleIfOptionalAgreed,
  } = useTermsOfServiceInputStore();

  return (
    <View style={styles.container}>
      <TermTotalBar isSelected={ifAllAgreed} radioOnPress={toggleIfAllAgreed} />
      <HorizontalDivider
        width={convertWidth(375)}
        height={convertHeight(15)}
        lineHeight={1}
        upperFlex={3}
        lowerFlex={11}
      />
      {termsRequired.map((term, index) => (
        <TermBarRequired
          key={index}
          isSelected={ifRequiredAgreed[index]}
          term={term}
          radioOnPress={() => {
            toggleIfRequiredAgreed(index);
          }}
        />
      ))}
      {termsOptional.map((term, index) => (
        <TermBarOptional
          key={index}
          isSelected={ifOptionalAgreed[index]}
          term={term}
          radioOnPress={() => {
            toggleIfOptionalAgreed(index);
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: convertHeight(320),

    alignItems: 'center',
  },
});

export { TermsOfService };
