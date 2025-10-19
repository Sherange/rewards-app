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

// Mock the useBounties hook
jest.mock('../hooks/useBounties', () => ({
  useBounties: () => ({
    data: [
      {
        id: '1',
        name: 'Test Reward 1',
        amount: 10.5,
        description: 'Test description',
        image: 'https://example.com/image1.jpg',
        needed_points: 100,
        needed_visits: 5,
        is_active: true,
        is_redeemable: true,
        limited: false,
        availability: 10,
        redeem_description: 'Redeem description',
        redeem_success_alert_text: 'Success!',
        bounty_redeem_alert_header: 'Alert header',
        bounty_redeem_alert_text: 'Alert text',
        show_progress_bar: false,
        shipping: false,
        instant: true,
        manual_claim: false,
        is_expired: false,
        order: 1,
        reward_type: 1,
        type: 1,
        app_form: null,
        promo_redeem_types: [],
        show_confirmation_dialog: null,
        valid_from: null,
        valid_until: null,
        pictures: [],
        variations: null,
        prizes: null,
        terms: null,
        category: null,
        shop: null,
        condition_id: null,
        point_pool: null,
        adjust_event_tokens: null,
        is_free_reward_usage_enabled: false,
        contest: false,
        highscore_contest: false,
        point_contest: false,
        show_ranking: false,
        contest_type: null,
        ranks: 0,
        cr_rank: 0,
        cr_points: null,
        throttle: null,
        time_range_redeem_count: null,
        redeem_count: null,
        single_use: false,
        require_shop_when_redeemed: false,
        consume_points: true,
        can_participate: null,
        is_participating: null,
        required_status: null,
        is_activateable: null,
        is_deactivatable: null,
        is_activated: null,
        activation_description: '',
        bounty_activate_alert_header: '',
        bounty_activate_alert_text: '',
      },
      {
        id: '2',
        name: 'Test Reward 2',
        amount: 25.0,
        description: 'Test description 2',
        image: 'https://example.com/image2.jpg',
        needed_points: 200,
        needed_visits: 10,
        is_active: true,
        is_redeemable: true,
        limited: true,
        availability: 5,
        redeem_description: 'Redeem description 2',
        redeem_success_alert_text: 'Success 2!',
        bounty_redeem_alert_header: 'Alert header 2',
        bounty_redeem_alert_text: 'Alert text 2',
        show_progress_bar: true,
        shipping: true,
        instant: false,
        manual_claim: true,
        is_expired: false,
        order: 2,
        reward_type: 2,
        type: 2,
        app_form: null,
        promo_redeem_types: [],
        show_confirmation_dialog: null,
        valid_from: null,
        valid_until: null,
        pictures: [],
        variations: null,
        prizes: null,
        terms: null,
        category: null,
        shop: null,
        condition_id: null,
        point_pool: null,
        adjust_event_tokens: null,
        is_free_reward_usage_enabled: false,
        contest: false,
        highscore_contest: false,
        point_contest: false,
        show_ranking: false,
        contest_type: null,
        ranks: 0,
        cr_rank: 0,
        cr_points: null,
        throttle: null,
        time_range_redeem_count: null,
        redeem_count: null,
        single_use: true,
        require_shop_when_redeemed: true,
        consume_points: false,
        can_participate: null,
        is_participating: null,
        required_status: null,
        is_activateable: null,
        is_deactivatable: null,
        is_activated: null,
        activation_description: '',
        bounty_activate_alert_header: '',
        bounty_activate_alert_text: '',
      },
    ],
    loading: false,
    error: null,
    hasNextPage: false,
    hasPreviousPage: false,
    totalCount: 2,
    currentPage: 1,
    fetchBounties: jest.fn(),
    fetchNextPage: jest.fn(),
    fetchPreviousPage: jest.fn(),
    refetch: jest.fn(),
  }),
}));

const NavigationContainerWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => <NavigationContainer>{children}</NavigationContainer>;

test('renders correctly with all reward cards', () => {
  const { getByText, getAllByText } = render(
    <NavigationContainerWrapper>
      <HomeScreen />
    </NavigationContainerWrapper>,
  );

  // Check that the title is rendered
  expect(getAllByText('Rewards')).toBeTruthy();

  // Check that reward cards are rendered
  expect(getByText('Test Reward 1')).toBeTruthy();
  expect(getByText('Test Reward 2')).toBeTruthy();

  // Check that amounts are displayed
  expect(getByText('$ 10.50')).toBeTruthy();
  expect(getByText('$ 25.00')).toBeTruthy();

  // Check that Claim buttons are present (should be 2 - one for each reward)
  expect(getAllByText('Claim')).toHaveLength(2);
});
