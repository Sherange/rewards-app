import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import BountiesScreen from '../screens/BountiesScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="BountiesScreen" component={BountiesScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
