import { COLOR_BACKGROUND, convertHeight, convertWidth } from '@/src/shared';
import { StyleSheet, View } from 'react-native';
import { IndexIndicator } from './components/index-indicator';
import { TutorialConnection } from './components/tutorial-connection';
import { TutorialPoint } from './components/tutorial-point';
import { TutorialDecoration } from './components/tutorial-decoration';
import { useState } from 'react';
import { useNavigation } from 'expo-router';

function TutorialPage() {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  return (
    <View style={styles.container}>
      {index === 0 ? (
        <TutorialConnection />
      ) : index === 1 ? (
        <TutorialPoint />
      ) : index === 2 ? (
        <TutorialDecoration />
      ) : null}
      <IndexIndicator
        index={index}
        onPress={() => {
          if (index === 2) navigation.goBack();
          else setIndex(index + 1);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: convertWidth(375),
    height: convertHeight(812),

    backgroundColor: COLOR_BACKGROUND,
  },
});

export { TutorialPage };
