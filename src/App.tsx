import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './navigation/TabNavigation';

import { store } from './store';
import { Provider } from 'react-redux';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider store={store}>
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
