import { CloseButton, convertHeight, convertWidth, NavProp, SpaceFlexBox } from '@/src/shared';
import { StyleSheet, View } from 'react-native';
import { InfoSetupStepper } from './stepper';
import { useNavigation } from 'expo-router';

function InfoSetupAppBar() {
  const navigation = useNavigation<NavProp<'setting/index'>>();
  return (
    <View style={styles.container}>
      <SpaceFlexBox flex={23} />
      <View style={styles.stepperContainer}>
        <InfoSetupStepper />
      </View>
      <SpaceFlexBox flex={223} />
      <CloseButton
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'auth/index' }], // your stack screen name
          });
        }}
      />
      <SpaceFlexBox flex={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: convertHeight(66),
    flexDirection: 'row',
    alignItems: 'center',
  },

  stepperContainer: {
    width: convertWidth(77),
    height: convertHeight(66),
    justifyContent: 'flex-end',
  },
});

export { InfoSetupAppBar };
