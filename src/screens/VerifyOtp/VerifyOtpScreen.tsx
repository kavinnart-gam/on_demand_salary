import React, {useRef, useEffect, useCallback} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OtpInputs, {OtpInputsRef} from 'react-native-otp-inputs';

function VerifyOtpScreen({navigation}: any): React.JSX.Element {
  const otpRef = useRef<OtpInputsRef>(null);

  const focusOTP = useCallback(() => {
    otpRef.current?.focus();
  }, []);

  useEffect(() => {
    focusOTP();
  }, [focusOTP]);

  const onSubmit = async () => {
    // const loginFormValues: LoginFormValues = {phoneNumber};
    try {
      // console.log(phoneNumber);
      // await mutation.mutateAsync(loginFormValues);
      navigation.navigate('PassCode');
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentHeader}>
        <Text style={styles.title}>Verify OTP</Text>
      </View>
      <OtpInputs
        ref={otpRef}
        handleChange={code => console.log(code)}
        numberOfInputs={6}
        autofillFromClipboard={false}
        keyboardType="phone-pad"
        returnKeyLabel="done"
        inputStyles={styles.otpInput}
      />
      <TouchableOpacity style={styles.otpBtn} onPress={onSubmit}>
        <Text style={styles.otpText}>Next </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#debbb0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentHeader: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputView: {
    width: '80%',
    padding: 20,
  },
  inputText: {
    backgroundColor: 'white',
    height: 40,
    width: '100%',
    marginBottom: 20,
    fontSize: 16,
  },
  otpInput: {
    height: 70,
    width: 50,
    margin: 5,
    borderWidth: 1,
    borderColor: '#000',
    color: 'black',
    borderRadius: 12,
    backgroundColor: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  otpBtn: {
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
  otpText: {
    color: 'white',
  },
});

export default VerifyOtpScreen;
