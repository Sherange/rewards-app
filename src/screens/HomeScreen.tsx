import { View, StyleSheet, Text } from 'react-native';
import AppButton from '../components/AppButton';

const HomeScreen = () => {
  const onPress = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeScreen</Text>
      <AppButton title="Go to RewardsScreen" onPress={onPress} />
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

export default HomeScreen;
