import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import {fetchAll} from '../../services/transactions';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Avatar} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {setAvailableAmount} from '../../slices/authSlice';
import {common} from '../../utils';
import {useAuth} from '../../context/AuthContext';

interface User {
  firstname: string;
  lastname: string;
}

interface Transaction {
  available: number;
  transactions: [Transactions];
}

interface Transactions {
  uid: number;
  amount: number;
  date: string;
}

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState<Transaction | null>(null);
  const [users, setUses] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {onLogout, authState} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // if token expire force logout
        if (common.isExpireToken(authState?.token ?? '')) {
          onLogout!();
        } else {
          const response = await fetchAll();
          dispatch(
            setAvailableAmount(response?.transactions?.data?.available ?? 0),
          );
          setTransactions(response?.transactions?.data);
          setUses(response?.user?.data);
          setLoading(false);
        }
      } catch (error) {
        onLogout!();
        return {error: true, msg: (error as any).response.data.msg};
      }
    };
    fetchData();
  }, [onLogout, dispatch, transactions?.available, authState?.token]);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingcontainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <>
          <View style={styles.headerContainer}>
            <View style={styles.profileContainer}>
              <View style={styles.profile}>
                <Text>{users?.firstname}</Text>
                <Text>{users?.lastname}</Text>
              </View>
              <Avatar
                size="medium"
                overlayContainerStyle={styles.profileImg}
                rounded
                icon={{name: 'user', type: 'font-awesome'}}
              />
            </View>
            <Text style={styles.h2}>AVAILABLE BALANCE</Text>
            <View style={styles.availableContainer}>
              <Text style={styles.h1}>{transactions?.available}</Text>
            </View>
            <Text style={[styles.h2, styles.spaceContent]}>
              TRANSACTION HISTORY
            </Text>
          </View>
          <FlatList
            style={styles.flatListContainer}
            data={transactions?.transactions}
            keyExtractor={item => item.uid.toString()}
            renderItem={({item}) => (
              <View style={styles.transaction}>
                <Text>Date: {item.date}</Text>
                <Text>Amount: {item.amount}</Text>
              </View>
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
  },
  flatListContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  profile: {
    flexDirection: 'column',
    marginRight: 10,
  },
  profileImg: {
    backgroundColor: 'gray',
  },
  h1: {fontSize: 40},
  h2: {fontSize: 16, fontWeight: '700'},
  spaceContent: {
    marginTop: 40,
  },
  availableContainer: {
    padding: 40,
    backgroundColor: '#ffff',
    alignItems: 'center',
    borderRadius: 25,
  },
  loadingcontainer: {
    flex: 1,
    backgroundColor: '#debbb0',
    alignItems: 'center',
    justifyContent: 'center',
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
