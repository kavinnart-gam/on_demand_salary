import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {asyncStorage} from '../../utils';
import Passcode from '../../components/Passcode';
const pinLength = 6;

function PassCodeScreen({navigation}: any): React.JSX.Element {
  const [code, setCode] = useState<string[]>([]);
  const [incorrect, setIncorrect] = useState<string>('');
  const [headertext, setheaderText] = useState<string>('Signin PIN');
  const [localPin, setLocalPin] = useState<string>('');

  const setPassCode = async () => {
    // set up pin to local storage
    await asyncStorage.setDataToAsyncStorage({
      key: 'pincode',
      value: code.join(''),
    });
    navigation.navigate('Bottomtab');
  };

  const getPin = async () => {
    const pinCode = await asyncStorage.getDataFromAsyncStorage({
      key: 'pincode',
    });
    return pinCode ?? '';
  };

  const verifyPin = async () => {
    // check if have pin from local storage then goto signin with pin
    // no pin goto setup pin flow
    if (localPin) {
      // check sign in pin corect ?
      if (localPin === code.join('')) {
        setIncorrect('');
        navigation.navigate('Bottomtab');
      } else {
        // not correct show error message
        setIncorrect('Incorrect PIN');
      }
    } else {
      // set up pin //
      setPassCode();
    }
  };

  const setUpHeaderText = async () => {
    const pin = await getPin();
    setLocalPin(pin);
    // check if have pin from local storage then show "Signin PIN"
    // no pin show "Setup PIN"
    setheaderText(pin ? 'Signin PIN' : 'Setup PIN');
  };

  useEffect(() => {
    setUpHeaderText();
    if (code.length === pinLength) {
      verifyPin();
    }
  }, [code]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentHeader}>
        <Text style={styles.title}>{headertext}</Text>
      </View>

      <Text style={styles.pinSubText}>{incorrect}</Text>
      <Passcode
        code={code}
        onChange={pin => {
          setCode(pin);
        }}
      />
    </SafeAreaView>
  );
}
export default PassCodeScreen;

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
    color: 'red',
    marginVertical: 30,
  },
});
