import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../navigator/AppNavigator';
import {asyncStorage} from '../../utils';
import Passcode from '../../components/Passcode';

function PassCodeSetUpScreen({navigation}: any): React.JSX.Element {
  const [code, setCode] = useState<string[]>([]);
  const {updateAuth} = useContext(AuthContext);

  const setPassCode = async () => {
    await asyncStorage.setDataToAsyncStorage({
      key: 'pincode',
      value: code.join(''),
    });
    await updateAuth();

    navigation.navigate('Bottomtab');
  };

  const VerifyPin = async () => {};

  useEffect(() => {
    if (code.length === 6) {
      setPassCode();
    }
    VerifyPin();
  }, [code]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentHeader}>
        <Text style={styles.title}>Setup PIN</Text>
      </View>
      <Text style={styles.pinSubText}>Enter your secure six-digit code</Text>
      <Passcode
        code={code}
        onChange={pin => {
          setCode(pin);
        }}
      />
    </SafeAreaView>
  );
}
export default PassCodeSetUpScreen;

const styles = StyleSheet.create({
  contentHeader: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#debbb0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinSubText: {
    fontSize: 18,
    fontWeight: 'medium',
    color: '#000',
    marginVertical: 30,
  },
});
