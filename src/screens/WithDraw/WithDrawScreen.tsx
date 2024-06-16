import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AlertModal from '../../components/AlertModal';
import Icon from 'react-native-vector-icons/AntDesign';
import {common} from '../../utils';
import {useSelector} from 'react-redux';
import {selectAvailableAmount} from '../../slices/authSlice';
import withdraw from '../../services/withdraw';
import {useAuth} from '../../context/AuthContext';

export default function WithdrawScreen() {
  const [amount, setAmout] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const vailableAmount = useSelector(selectAvailableAmount);
  const {authState, onLogout} = useAuth();

  const onWithdraw = async () => {
    setLoading(true);
    try {
      console.log('vailableAmount: ', vailableAmount);
      if (common.isExpireToken(authState?.token ?? '')) {
        onLogout!();
      } else {
        if (Number(amount) > vailableAmount / 2) {
          setErrorMessage(
            'Amount must less than or equal to ' + vailableAmount,
          );
          setVisible(true);
        } else {
          setErrorMessage('');

          const response = await withdraw(amount);
          if (response?.message === 'success') {
            setVisible(true);
          } else if (response?.error) {
            setErrorMessage(response?.error);
            setVisible(true);
          }
        }
      }

      setLoading(false);
    } catch (error) {
      onLogout!();
      console.error('Withdrawal failed:', error);
    }
  };

  const getIcon = (): React.ReactElement => {
    return errorMessage ? (
      <Icon name="closecircleo" size={150} color="red" />
    ) : (
      <Icon name="checkcircleo" size={150} color="#2AAA8A" />
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {loading ? (
          <View style={styles.loadingcontainer}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <>
            <Text style={[styles.h2, styles.spaceContent]}>
              AMOUNT FOR WITHDRAW
            </Text>
            <TextInput
              maxLength={10}
              style={styles.inputText}
              placeholder="Enter amount"
              placeholderTextColor="#003f5c"
              keyboardType="decimal-pad"
              returnKeyType="done"
              onChangeText={text => setAmout(text)}
              {...common.testID('INPUT_TXT_WITH_DRAW')}
            />

            <TouchableOpacity
              {...common.testID('BTN_WITH_DRAW')}
              disabled={amount.length === 0}
              style={[
                styles.withDrawBtn,
                amount.length === 0 && styles.disableBtn,
              ]}
              onPress={onWithdraw}>
              <Text style={styles.withDrawBtnText}>WITHDRAW </Text>
            </TouchableOpacity>

            <AlertModal
              modalVisible={visible}
              onClose={() => {
                setVisible(false);
                setAmout('');
              }}>
              {getIcon()}
              <Text style={styles.textModal}>
                {errorMessage ? errorMessage : 'Withdraw successful'}
              </Text>
            </AlertModal>
          </>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  textModal: {
    marginVertical: 20,
    fontSize: 20,
  },
  spaceContent: {
    marginVertical: 10,
  },
  h2: {fontSize: 16, fontWeight: '700', textAlign: 'left'},
  inputText: {
    textAlign: 'center',
    minHeight: 100,
    minWidth: '80%',
    fontSize: 28,
    backgroundColor: '#ffffff',
    borderRadius: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#debbb0',
    alignItems: 'center',
  },
  withdrawContainer: {
    padding: 40,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  disableBtn: {
    backgroundColor: '#E5EAEF',
    borderColor: '#6A6A6A',
    borderWidth: 1,
  },
  withDrawBtn: {
    width: '80%',
    backgroundColor: '#000000',
    color: '#ffffff',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  withDrawBtnText: {
    color: '#ffffff',
  },
  containerContent: {
    margin: 20,
  },
  loadingcontainer: {
    flex: 1,
    backgroundColor: '#debbb0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
