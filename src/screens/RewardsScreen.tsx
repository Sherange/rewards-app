import { View, StyleSheet, Text } from 'react-native';
import AppButton from '../components/AppButton';

const RewardsScreen = () => {
  const onPress = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.text}>RewardsScreen</Text>
      <AppButton title="Go to Back" onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#000000',
  },
});

export default RewardsScreen;
