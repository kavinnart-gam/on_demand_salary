import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {useQuery} from 'react-query';
import {fetchTransactions} from '../../services/transactions/transactions';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function HomeScreen() {
  // const {data, isLoading, isError} = useQuery('posts', fetchTransactions);
  const {data, isLoading, isError} = useQuery(
    ['fetchTransactions'],
    fetchTransactions,
  );
  // useQuery(['hot-spot', payload], () => getHotSpotNotification(queryString));

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: </Text>;
  }

  const transactions = data?.data?.transactions;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerContent}>
        <Text style={styles.h2}>AVAILABLE BALANCE</Text>
        <View style={[styles.availableContainer, styles.space]}>
          <Text style={styles.h1}>{data?.data?.available}</Text>
        </View>
        <Text style={[styles.h2, styles.spaceContent]}>
          TRANSACTION HISTORY
        </Text>
        <FlatList
          style={styles.space}
          data={transactions}
          keyExtractor={item => item.uid.toString()}
          renderItem={({item}) => (
            <View style={styles.transaction}>
              <Text>Date: {item.date}</Text>
              <Text>Amount: {item.amount}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  h1: {fontSize: 40},
  h2: {fontSize: 16, fontWeight: '700'},
  space: {
    marginTop: 5,
  },
  spaceContent: {
    marginTop: 40,
  },
  availableContainer: {
    padding: 40,
    backgroundColor: '#ffff',
    alignItems: 'center',
    borderRadius: 25,
  },
  containerContent: {
    margin: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#debbb0',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  transaction: {
    backgroundColor: '#ffff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
