import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AppImage from './AppImage';
import type { Bounty } from '../types/bounty';

const BountyCard: React.FC<{
  bounty: Bounty;
  onRemove: (id: string) => void;
}> = ({ bounty, onRemove }) => {
  return (
    <View style={styles.bountyCard} testID="BountyCard">
      <View style={styles.bountyHeader}>
        <AppImage
          uri={bounty.image}
          style={styles.bountyImage}
          resizeMode="cover"
        />
        <View style={styles.bountyInfo}>
          <Text style={styles.bountyName} numberOfLines={2}>
            {bounty.name}
          </Text>
          {bounty.description && (
            <Text style={styles.bountyDescription} numberOfLines={3}>
              {bounty.description}
            </Text>
          )}
          <View style={styles.bountyDetails}>
            {bounty.amount && (
              <Text style={styles.bountyAmount}>${bounty.amount}</Text>
            )}
            <Text style={styles.bountyPoints}>
              {bounty.needed_points} points
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bountyFooter}>
        <View style={styles.bountyStatus}>
          <Text style={styles.statusText}>
            {bounty.is_redeemable ? 'Redeemable' : 'Not Redeemable'}
          </Text>
          {bounty.shipping && (
            <Text style={styles.shippingText}>Shipping Required</Text>
          )}
          {bounty.instant && <Text style={styles.instantText}>Instant</Text>}
        </View>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove(bounty.id)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bountyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bountyHeader: {
    flexDirection: 'row',
    padding: 16,
  },
  bountyImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  bountyInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bountyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  bountyDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  bountyDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bountyAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  bountyPoints: {
    fontSize: 14,
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bountyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  bountyStatus: {
    flex: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  shippingText: {
    fontSize: 12,
    color: '#F59E0B',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  instantText: {
    fontSize: 12,
    color: '#059669',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  removeButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default BountyCard;
