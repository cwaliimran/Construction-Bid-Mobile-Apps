import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';

const AddItem = () => {
  const navigation = useNavigation();
  const [sectionType, setSectionType] = useState('');
  const [itemName, setItemName] = useState('');
  const [sku, setSKU] = useState('');
  const [brand, setBrand] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const [completionStatus, setCompletionStatus] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const sectionOptions = [
    'Plumbing',
    'HVAC',
    'Electric',
    'General',
    'Misc. Work',
  ];

  const getTotalCost = () => {
    return (unitCost * quantity).toFixed(2);
  };

  const handleAddItem = () => {
    // Add your item saving logic here
    setShowSuccessModal(true);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    navigation.goBack();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Image
            source={require('../../../../assets/icons/back-icon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Item</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Section Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={sectionType}
                style={styles.picker}
                onValueChange={itemValue => setSectionType(itemValue)}>
                <Picker.Item label="Select section type" value="" />
                {sectionOptions.map((option, index) => (
                  <Picker.Item key={index} label={option} value={option} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Item Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={setItemName}
              value={itemName}
              placeholder="Enter description of the specific item"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>HD SKU</Text>
            <TextInput
              style={styles.input}
              onChangeText={setSKU}
              value={sku}
              placeholder="Enter SKU or brand name of the specific item"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Brand</Text>
            <TextInput
              style={styles.input}
              onChangeText={setBrand}
              value={brand}
              placeholder="Enter brand name of the specific item"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Unit Cost</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUnitCost}
              value={unitCost}
              placeholder="Enter unit cost of the specific item"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.input}
              onChangeText={setQuantity}
              value={quantity}
              placeholder="Enter the number of units needed for the project"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.statusContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setCompletionStatus(!completionStatus)}>
              {completionStatus && (
                <Image
                  source={require('../../../../assets/icons/check.png')}
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.statusText}>Completion Status</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Total Cost</Text>
            <Text style={styles.totalCost}>{`$ ${getTotalCost()}`}</Text>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image
              source={require('../../../../assets/icons/add-item-success.png')}
              style={styles.successIcon}
            />
            <Text style={styles.modalTitle}>Congratulations</Text>
            <Text style={styles.modalText}>
              Your item is now safely stored. Feel free to continue adding or
              managing your files.
            </Text>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}>
              <Text style={[styles.buttonText, styles.continueText]}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddItem;
