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
import common from '../../utils/common';
import {AuthContext} from '../../navigator/AppNavigator';
import {setToken} from '../../slices/authSlice';
import {useDispatch} from 'react-redux';

function SigninScreen({navigation}: any) {
  const dispatch = useDispatch();
  const {login, isLoading} = useContext(AuthContext);
  const [phoneNumber, setphoneNumber] = useState<string>('');

  const onPressLogin = async () => {
    const response = await login(phoneNumber);

    if (response?.data?.token) {
      await asyncStorage.setDataToAsyncStorage({
        key: 'idToken',
        value: response?.data?.token,
      });
      dispatch(setToken(response?.data?.token));
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
              {...common.testID('INPUT_TXT_MOBILE_NUMBER')}
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
            {...common.testID('BTN_SIGN_IN')}
            disabled={phoneNumber.length === 0}
            style={[
              styles.loginBtn,
              phoneNumber.length < 10 && styles.disableBtn,
            ]}
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
    color: '#000000',
  },
  disableBtn: {
    backgroundColor: '#E5EAEF',
    borderColor: '#6A6A6A',
    borderWidth: 1,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: '#FFFFFF',
  },
});

export default SigninScreen;
