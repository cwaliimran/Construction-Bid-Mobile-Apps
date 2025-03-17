import React from 'react';
import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from '../../pages/bid/addbid/styles';

const AddModal = ({isModalVisible, setIsModalVisible, modalType, handleModalSubmit, modalValue, setModalValue}) => {
  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={1}
          onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalType}</Text>
            <TextInput
              style={styles.modalInput}
              placeholder={`Enter ${modalType}`}
              value={modalValue}
              onChangeText={setModalValue}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalSubmit}>
              <Text style={styles.modalButtonText}>
                {modalValue ? 'Update' : 'Add'}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddModal;
