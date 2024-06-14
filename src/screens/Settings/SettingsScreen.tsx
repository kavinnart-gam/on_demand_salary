import React, {useContext} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../navigator/AppNavigator';

export default function SettingsScreen() {
  const {logout} = useContext(AuthContext);
  // const onResetPin = async () => {
  //   navigation.navigate('PassCodeSetUp');
  //   //
  // };

  const onLogOut = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity style={styles.containerBtn} onPress={onResetPin}>
        <Text style={styles.BtnText}>RESET PIN </Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.containerBtn} onPress={onLogOut}>
        <Text style={styles.BtnText}>LOGOUT </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#debbb0',
    alignItems: 'center',
  },

  containerBtn: {
    width: '80%',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  BtnText: {
    color: 'white',
  },
});
