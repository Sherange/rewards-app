import {
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import type { Bounty } from '../types/Bounty';
import { useBounties } from '../hooks/useBounties';
import {
  addCollectedBounty,
  removeCollectedBounty,
} from '../store/bountiesSlice';
import GridCard from '../components/GridCard';

import { AppDispatch } from '../store';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, error, fetchNextPage } = useBounties();
  const onPress = () => navigation.navigate('BountyScreen');

  const handleCollect = (bounty: any) => {
    dispatch(addCollectedBounty(bounty));
  };

  const handleEndReached = () => fetchNextPage();

  const renderItem = ({ item }: { item: Bounty }) => (
    <GridCard item={item} onPress={onPress} handleCollect={handleCollect} />
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
    backgroundColor: '#F8F9FB',
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
});

export default HomeScreen;
