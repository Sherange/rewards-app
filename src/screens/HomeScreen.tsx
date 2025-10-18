import {
  Pressable,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { Reward } from '../types/reward';
const { width } = Dimensions.get('window');

const CARD_WIDTH = (width - 48) / 2; // two columns + padding

const rewards = [
  {
    id: '1',
    name: 'Coffee Voucher',
    amount: 500,
    description: 'Get a free coffee from our partner cafés.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
  },
  {
    id: '2',
    name: 'Movie Ticket',
    amount: 1200,
    description: 'Enjoy a movie night on us!',
    image: 'https://images.unsplash.com/photo-1581905764498-f1b60bae941a',
  },
  {
    id: '3',
    name: 'Gift Card',
    amount: 2500,
    description: 'Use this card for shopping at any outlet.',
    image: 'https://images.unsplash.com/photo-1619530902914-7e3ad10bc62a',
  },
  {
    id: '4',
    name: 'Dinner Coupon',
    amount: 3000,
    description: 'Enjoy a fine dining experience at top restaurants.',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const onPress = () => navigation.navigate('RewardsScreen');

  const renderItem = ({ item }: { item: Reward }) => (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.amount}>Rs. {item.amount.toFixed(2)}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.homeContainer}>
      <FlatList
        data={rewards}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.column}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  column: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: CARD_WIDTH,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  amount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007bff',
    marginVertical: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
});

export default HomeScreen;
