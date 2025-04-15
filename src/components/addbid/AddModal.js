import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {Overlay} from '@rneui/themed';
import styles from '../../pages/bid/addbid/styles';

const AddModal = ({
  isModalVisible,
  Set_Modal_Visibilty,
  modalType,
  handleModalSubmit,
  modalValue,
  setModalValue,
}) => {
  return (
    <View style={styles.centeredView}>
      <Overlay
        overlayStyle={{
          padding: 0,
          marginBottom: 0,
          borderRadius: 20,
        }}
        animationType="fade"
        transparent={true}
        isVisible={isModalVisible}
        onBackdropPress={() => Set_Modal_Visibilty(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          // style={{flex: 1}}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{modalType}</Text>
              <TextInput
                style={styles.modalInput}
                placeholder={`Enter ${modalType}`}
                value={modalValue}
                onChangeText={setModalValue}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleModalSubmit}>
                <Text style={styles.modalButtonText}>
                  {modalValue ? 'Update' : 'Add'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Overlay>
    </View>
  );
};

export default AddModal;

// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import styles from '../../pages/bid/addbid/styles';

// const AddModal = ({
//   isModalVisible,
//   setIsModalVisible,
//   modalType,
//   handleModalSubmit,
//   modalValue,
//   setModalValue,
// }) => {
//   return (
//     <Modal
//       visible={isModalVisible}
//       transparent={true}
//       animationType="fade"
//       onRequestClose={() => setIsModalVisible(false)}>
//       <View style={styles.modalOverlay}>
//         <TouchableOpacity
//           style={{
//             width: '100%',
//             height: '100%',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//           activeOpacity={1}
//           onPress={() => setIsModalVisible(false)}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>{modalType}</Text>
//             <TextInput
//               style={styles.modalInput}
//               placeholder={`Enter ${modalType}`}
//               value={modalValue}
//               onChangeText={setModalValue}
//             />
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={handleModalSubmit}>
//               <Text style={styles.modalButtonText}>
//                 {modalValue ? 'Update' : 'Add'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </Modal>
//   );
// };

// export default AddModal;
