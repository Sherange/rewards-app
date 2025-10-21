import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BountyScreen = () => {
  const navigation = useNavigation();
  const onPress = () => navigation.goBack();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bounty Screen</Text>
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

export default BountyScreen;
