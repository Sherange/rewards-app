import {
  Pressable,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  Image,
  ActivityIndicator,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import type { Bounty } from '../types/Bounty';
import { useBounties } from '../hooks/useBounties';
import AppImage from '../components/AppImage';
const { width } = Dimensions.get('window');

const CARD_WIDTH = (width - 48) / 2; // two columns + padding

const HomeScreen = () => {
  const navigation = useNavigation();

  const { data, loading, error, fetchNextPage } = useBounties();

  const onPress = () => navigation.navigate('BountyScreen');

  const handleEndReached = () => fetchNextPage();

  const renderItem = ({ item }: { item: Bounty }) => (
    <Pressable style={styles.card} onPress={onPress}>
      <AppImage uri={item.image} style={styles.image} />

      <Text style={styles.name} numberOfLines={1} ellipsizeMode="clip">
        {item.name}
      </Text>
      {item?.amount && (
        <Text style={styles.amount}>$ {item.amount.toFixed(2)}</Text>
      )}
      <Pressable style={styles.claimButton}>
        <Text style={styles.claimText}>Claim</Text>
      </Pressable>
    </Pressable>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#007bff" />
      </View>
    );
  };

  const renderError = () => {
    if (!error) return null;
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  };

  if (!data && loading) {
    return (
      <SafeAreaView style={styles.homeContainer}>
        <View style={styles.initialLoader}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Loading rewards...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.homeContainer}>
      {renderError()}
      <Text testID="homeTitle" style={styles.title}>
        Rewards
      </Text>
      <FlatList
        data={data || []}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.column}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3276c3',
    textAlign: 'left',
    marginVertical: 16,
    paddingHorizontal: 16,
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
    width: CARD_WIDTH,
    height: 200,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 8,
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007bff',
    marginBottom: 4,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  initialLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    textAlign: 'center',
  },
  claimButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: '100%',
    backgroundColor: '#3276c3',
    borderRadius: 8,
  },
  claimText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
