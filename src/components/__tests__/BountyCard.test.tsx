/**
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import BountyCard from '../BountyCard';
import type { Bounty } from '../../types/bounty';

const onRemove = jest.fn();

const mockBounty: Bounty = {
  id: '1',
  name: 'Test Bounty',
  amount: 10.5,
  description: 'Test description',
  image: 'https://example.com/image.jpg',
  needed_points: 100,
  needed_visits: 5,
  is_active: true,
  is_redeemable: true,
  limited: false,
  availability: 10,
  redeem_description: 'Redeem description',
  redeem_success_alert_text: 'Success',
  bounty_redeem_alert_header: 'Header',
  bounty_redeem_alert_text: 'Alert text',
  show_progress_bar: true,
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
};

it('renders card', () => {
  const { getByTestId } = render(
    <BountyCard bounty={mockBounty} onRemove={onRemove} />,
  );
  const image = getByTestId('BountyCard');
  expect(image).toBeTruthy();
});

it('renders correctly with data', () => {
  const { getByText } = render(
    <BountyCard bounty={mockBounty} onRemove={onRemove} />,
  );
  expect(getByText('Test Bounty')).toBeTruthy();
  expect(getByText('$10.5')).toBeTruthy();
  expect(getByText('100 points')).toBeTruthy();
});
