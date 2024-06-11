import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {useMutation} from 'react-query';
// import {login} from '../../services/login/login';
// import {LoginFormValues} from '../../interfaces/users';

function SigninScreen({navigation}: any) {
  const [phoneNumber, setphoneNumber] = useState<string>('');

  //   const mutation = useMutation(login, {
  //     onSuccess: data => {
  //       console.log(data);
  //       navigation.navigate('Passcode');
  //     },
  //     onError: error => {
  //       console.log(error);
  //     },
  //   });
  const onPressLogin = async () => {
    // const loginFormValues: LoginFormValues = {phoneNumber};
    try {
      console.log(phoneNumber);
      // await mutation.mutateAsync(loginFormValues);
      navigation.navigate('VerifyOtp');
      //VerifyOtp
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}> Login Screen</Text> */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Mobile Phone Number"
          placeholderTextColor="#003f5c"
          dataDetectorTypes="phoneNumber"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          returnKeyType="done"
          onChangeText={text => setphoneNumber(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={onPressLogin}>
        <Text style={styles.loginText}>LOGIN </Text>
      </TouchableOpacity>
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
    color: 'white',
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
