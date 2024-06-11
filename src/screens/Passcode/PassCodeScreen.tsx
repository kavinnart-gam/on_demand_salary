import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

const dialPadContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'x'];

const dialPadSize = width * 0.2;
const dialPadTextSize = dialPadSize * 0.4;
const pinLength = 6;
const pinContainerSize = width / 2;
const pinSize = pinContainerSize / pinLength;

function PassCodeScreen({navigation}: any): React.JSX.Element {
  const [code, setCode] = useState<string[]>([]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pinSubText}>Enter your secure four-digit code</Text>
      <View style={styles.dialPadPinContainer}>
        {Array(pinLength)
          .fill(null)
          .map((_, index) => {
            const item = dialPadContent[index];
            const isSelected =
              typeof item === 'number' && code[index] !== undefined;
            return isSelected ? (
              <View key={index} style={styles.pinSelected} />
            ) : (
              <View key={index} style={styles.pinNotSelected} />
            );
          })}
      </View>
      <FlatList
        data={dialPadContent}
        numColumns={3} // set number of columns
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              disabled={item === ''} // make the empty space on the dialpad content unclickable
              onPress={() => {
                if (item === 'x') {
                  setCode(prev => prev.slice(0, -1));
                } else {
                  if (code.length === pinLength - 1) {
                    navigation.navigate('Bottomtab');
                  }
                  setCode(prev => [...prev, item.toString()]);
                }
              }}>
              <View
                style={[
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    backgroundColor: item === '' ? 'transparent' : '#fff',
                    width: dialPadSize,
                    height: dialPadSize,
                  },
                  styles.dialPadContainer,
                ]}>
                <Text style={[{fontSize: dialPadTextSize}, styles.dialPadText]}>
                  {item}
                </Text>
                {/* {item === 'X' ? (
                  // <Feather name="delete" size={24} color="#3F1D38" />
                  <Text
                    style={[{fontSize: dialPadTextSize}, styles.dialPadText]}>
                    {item}
                  </Text>
                ) : (
                  <Text
                    style={[{fontSize: dialPadTextSize}, styles.dialPadText]}>
                    {item}
                  </Text>
                )} */}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
export default PassCodeScreen;

const styles = StyleSheet.create({
  dialPadPinContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'flex-end',
  },
  pinNotSelected: {
    margin: 5,
    width: pinSize * 0.5,
    height: pinSize * 0.5,
    borderRadius: pinSize * 0.35,
    borderColor: '#000',
    borderWidth: 1,
  },
  pinSelected: {
    backgroundColor: '#000',
    margin: 5,
    width: pinSize * 0.5,
    height: pinSize * 0.5,
    borderRadius: pinSize * 0.35,
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
  dialPadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 50,
    borderColor: 'transparent',
  },
  dialPadText: {
    color: '#000',
  },
});
