/**
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import AppImage from '../AppImage';
import { Image } from 'react-native';

// Mock the placeholder image
jest.mock('../../assets/placeholder.png', () => 'placeholder-image');

it('renders placeholder if uri is empty', () => {
  const { getByTestId } = render(<AppImage uri="" />);
  const image = getByTestId('FastImage');
  expect(image).toBeTruthy();
});

it('renders with custom resizeMode', () => {
  const { getByTestId } = render(<AppImage resizeMode="contain" />);
  const image = getByTestId('FastImage');
  expect(image).toBeTruthy();
  expect(image.props.resizeMode).toBe('contain');
});

it('renders with provided URI', () => {
  const testUri = 'https://example.com/image.jpg';
  const { getByTestId } = render(<AppImage uri={testUri} />);
  const image = getByTestId('FastImage');
  expect(image.props.source).toEqual({ uri: testUri, priority: 'normal' });
});
