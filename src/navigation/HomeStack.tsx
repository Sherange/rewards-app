import HomeScreen from '../screens/HomeScreen';
import BountyScreen from '../screens/BountyScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Back',
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="BountyScreen" component={BountyScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
