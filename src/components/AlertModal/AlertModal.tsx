import React from 'react';
import {View, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface AlertModalProps {
  modalVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export default function AlertModal({
  modalVisible,
  children,
  onClose,
}: AlertModalProps) {
  return (
    <Modal animationType="fade" transparent visible={modalVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.closeContainer}>
              <TouchableOpacity onPress={onClose}>
                <Icon name="close" size={30} color="#000" />
              </TouchableOpacity>
            </View>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#ffff',
    padding: 20,
    borderRadius: 20,
    elevation: 20,
  },
  contentContainer: {alignItems: 'center'},
  closeContainer: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
