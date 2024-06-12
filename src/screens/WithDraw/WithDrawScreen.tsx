// function SigninScreen({navigation}: any) {}

import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation} from 'react-query';
import {withDraw} from '../../services/withDraw/withDraw';
import {withDrawValues} from '../../interfaces/users';
import AlertModal from '../../components/AlertModal/AlertModal';

function WithDrawScreen() {
  const [amount, setAmout] = useState<string>('');

  const onWithDraw = async () => {
    try {
      const withDrawVal: withDrawValues = {amount};
      console.log(withDrawVal);

      await mutation.mutateAsync(withDrawVal);
    } catch (error) {
      console.error('WithDraw failed', error);
    }
  };

  const mutation = useMutation(withDraw, {
    onSuccess: data => {
      console.log(data);
      //   navigation.navigate('Passcode');
    },
    onError: error => {
      console.log(error);
    },
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TextInput
          maxLength={10}
          style={styles.inputText}
          placeholder="Enter amount"
          placeholderTextColor="#003f5c"
          keyboardType="decimal-pad"
          returnKeyType="done"
          onChangeText={text => setAmout(text)}
        />

        <TouchableOpacity style={styles.withDrawBtn} onPress={onWithDraw}>
          <Text style={styles.withDrawBtnText}>WITHDRAW </Text>
        </TouchableOpacity>
        <AlertModal
          content={{
            showIcon: false,
            showBackgroundIcon: false,
            title: 'Success',
            actions: [
              {
                title: 'Close',
                type: 'cancel',
                onPress: () => {
                  //setVisibleModal(false);
                },
              },
              {
                title: 'ok',

                onPress: () => {
                  // setVisibleModal(false);
                  // navigator.openMobileLogin();
                },
              },
            ],
          }}
          modalVisible={false}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  anicontainer: {
    backgroundColor: 'green',
    flex: 1,
  },
  inputText: {
    textAlign: 'center',
    minHeight: 100,
    minWidth: '80%',
    fontSize: 28,
    backgroundColor: '#ffff',
    borderRadius: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#debbb0',
    alignItems: 'center',
  },
  withdrawContainer: {
    padding: 40,
    backgroundColor: '#ffff',
    alignItems: 'center',
  },
  withDrawBtn: {
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
  withDrawBtnText: {
    color: 'white',
  },
});

export default WithDrawScreen;
