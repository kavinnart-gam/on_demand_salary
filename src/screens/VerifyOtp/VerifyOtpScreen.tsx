import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OtpInputs from 'react-native-otp-inputs';
import {asyncStorage} from '../../utils';
import {AuthContext} from '../../navigator/AppNavigator';

function VerifyOtpScreen({navigation}: any): React.JSX.Element {
  const {updateAuth} = useContext(AuthContext);

  const handleChange = async (otpCode: string) => {
    const pinCode = await asyncStorage.getDataFromAsyncStorage({
      key: 'pincode',
    });

    if (otpCode.length === 6) {
      setTimeout(() => {
        if (pinCode) {
          updateAuth();
          navigation.navigate('Bottomtab');
        } else {
          navigation.navigate('PassCodeSetUp');
        }
      }, 100);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentHeader}>
        <Text style={styles.title}>Verify OTP</Text>
      </View>
      <OtpInputs
        handleChange={code => {
          handleChange(code);
        }}
        numberOfInputs={6}
        autofillFromClipboard={false}
        keyboardType="phone-pad"
        returnKeyLabel="done"
        inputStyles={styles.otpInput}
      />
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
});

export default VerifyOtpScreen;
