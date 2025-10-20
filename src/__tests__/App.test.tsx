/**
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) =>
    children,
}));

// Mock the navigation stack
jest.mock('../navigation/HomeStack', () => {
  const React = require('react');
  return function MockHomeStack() {
    return React.createElement('View', { testID: 'home-stack' }, 'HomeStack');
  };
});

// Mock react-redux
jest.mock('react-redux', () => ({
  Provider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock the store
jest.mock('../store', () => ({
  store: {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  },
}));

describe('App', () => {
  test('renders without crashing', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('home-stack')).toBeTruthy();
  });

  test('renders the main navigation structure', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('home-stack')).toBeTruthy();
  });
});
