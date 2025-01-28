import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const DeleteBidModal = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {bidId} = route.params; // Get the bidId passed from the Home screen

  const handleDelete = () => {
    // Perform deletion logic, e.g., remove the bid from state or database
    console.log(`Deleting bid with ID: ${bidId}`);
    // After deletion, navigate back to Home screen
    navigation.goBack();
  };

  const cancelDelete = () => {
    // Close the modal
    navigation.goBack();
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      onRequestClose={cancelDelete}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Image
            source={require('../../../assets/icons/deletemodal.png')} // Replace with the actual path to your image
            style={styles.modalImage}
          />
          <Text style={styles.modalTitle}>Confirmation</Text>
          <Text style={styles.modalMessage}>
            Are you sure you want to delete this bid?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleDelete}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={cancelDelete}>
              <Text style={styles.buttonText}>Not Yet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalImage: {
    width: 100, // Adjust width and height as needed
    height: 100,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#FF4D4D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeleteBidModal;
