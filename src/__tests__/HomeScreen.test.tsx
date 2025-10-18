/**
 * @format
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';

// Mock the navigation
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, ...props }: any) => children,
}));

const NavigationContainerWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => <NavigationContainer>{children}</NavigationContainer>;

test('renders correctly with all reward cards', () => {
  const { getByText } = render(
    <NavigationContainerWrapper>
      <HomeScreen />
    </NavigationContainerWrapper>,
  );
  expect(getByText('Coffee Voucher')).toBeTruthy();
});
