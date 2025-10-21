import { Pressable, StyleSheet, Text, Dimensions, View } from 'react-native';
import AppImage from './AppImage';
import { Bounty } from '../types/bounty';

type GridCard = {
  item: Bounty;
  onPress: () => void;
  handleCollect: (item: Bounty) => void;
};

const GridCard: React.FC<GridCard> = ({ item, onPress, handleCollect }) => {
  const { width } = Dimensions.get('window');

  const cardWidth = (width - 48) / 2;

  return (
    <Pressable style={[styles.card, { width: cardWidth }]} onPress={onPress}>
      <View style={styles.imageContainer}>
        <AppImage uri={item.image} style={styles.image} />
        {item.is_redeemable && (
          <View style={styles.redeemableBadge}>
            <Text style={styles.badgeText}>Redeemable</Text>
          </View>
        )}
        {item.shipping && (
          <View style={styles.shippingBadge}>
            <Text style={styles.badgeText}>Shipping</Text>
          </View>
        )}
        {item.instant && (
          <View style={styles.instantBadge}>
            <Text style={styles.badgeText}>Instant</Text>
          </View>
        )}
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>

        <View style={styles.bountyDetails}>
          {item?.amount && (
            <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
          )}
          <Text style={styles.points}>{item.needed_points} pts</Text>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.statusInfo}>
            {item.is_active && <Text style={styles.activeStatus}>Active</Text>}
          </View>

          <Pressable
            style={[
              styles.claimButton,
              !item.is_redeemable && styles.claimButtonDisabled,
            ]}
            onPress={() => handleCollect(item)}
            disabled={!item.is_redeemable}
          >
            <Text
              style={[
                styles.claimText,
                !item.is_redeemable && styles.claimTextDisabled,
              ]}
            >
              {item.is_redeemable ? 'Claim' : 'Not Available'}
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 230,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  redeemableBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#059669',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  shippingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  instantBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#059669',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  cardContent: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    lineHeight: 20,
  },
  bountyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
  },
  points: {
    fontSize: 12,
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusInfo: {
    flexDirection: 'row',
    gap: 4,
  },
  activeStatus: {
    fontSize: 10,
    color: '#059669',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
  },
  claimButton: {
    backgroundColor: '#3276c3',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    minWidth: 80,
  },
  claimButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  claimText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  claimTextDisabled: {
    color: '#F3F4F6',
  },
});

export default GridCard;
