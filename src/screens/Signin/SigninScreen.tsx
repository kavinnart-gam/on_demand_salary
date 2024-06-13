import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {asyncStorage} from '../../utils';
import {AuthContext} from '../../navigator/AppNavigator';

function SigninScreen({navigation}: any) {
  const {login, isLoading} = useContext(AuthContext);
  const [phoneNumber, setphoneNumber] = useState<string>('');

  const onPressLogin = async () => {
    const response = await login(phoneNumber);

    if (response?.data?.token) {
      await asyncStorage.setDataToAsyncStorage({
        key: 'idToken',
        value: response?.data?.token,
      });
      navigation.navigate('VerifyOtp');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Mobile Phone Number"
              placeholderTextColor="#003f5c"
              dataDetectorTypes="phoneNumber"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              returnKeyType="done"
              maxLength={10}
              onChangeText={text => setphoneNumber(text)}
            />
          </View>
          <TouchableOpacity
            disabled={phoneNumber.length === 0}
            style={styles.loginBtn}
            onPress={onPressLogin}>
            <Text style={styles.loginText}>LOGIN </Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#debbb0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#000',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});

export default SigninScreen;
