import { View, StyleSheet, Text } from 'react-native';
import AppButton from '../components/AppButton';
import { useNavigation } from '@react-navigation/native';

const BountiesScreen = () => {
  const navigation = useNavigation();
  const onPress = () => navigation.goBack();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>BountiesScreen</Text>
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

export default BountiesScreen;
