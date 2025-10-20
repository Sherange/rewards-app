import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import BountiesScreen from '../screens/BountiesScreen';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="house"
              color={focused ? '#3276c3' : '#808080'}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BountiesScreen"
        component={BountiesScreen}
        options={{
          title: 'Bounties',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="line-weight"
              color={focused ? '#3276c3' : '#808080'}
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
