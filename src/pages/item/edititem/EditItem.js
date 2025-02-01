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

const ViewItem = () => {
  const navigation = useNavigation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Initial data
  const initialData = {
    sectionType: 'Plumbing',
    itemName: 'Copper Pipe Fitting',
    sku: 'HD-12345',
    brand: 'Mueller',
    unitCost: '24.99',
    quantity: '5',
    completionStatus: true,
    totalCost: '124.95',
  };

  // State for editable fields
  const [sectionType, setSectionType] = useState(initialData.sectionType);
  const [itemName, setItemName] = useState(initialData.itemName);
  const [sku, setSKU] = useState(initialData.sku);
  const [brand, setBrand] = useState(initialData.brand);
  const [unitCost, setUnitCost] = useState(initialData.unitCost);
  const [quantity, setQuantity] = useState(initialData.quantity);
  const [completionStatus, setCompletionStatus] = useState(
    initialData.completionStatus,
  );

  const sectionOptions = [
    'Plumbing',
    'HVAC',
    'Electric',
    'General',
    'Misc. Work',
  ];

  const getTotalCost = () => {
    return (parseFloat(unitCost) * parseFloat(quantity)).toFixed(2);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEdit = () => {
    if (isEditing) {
      setShowSuccessModal(true);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const Field = ({
    label,
    value,
    onChangeText,
    editable,
    keyboardType = 'default',
  }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      {isEditing && !['Section Type'].includes(label) ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          keyboardType={keyboardType}
        />
      ) : label === 'Section Type' && isEditing ? (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={value}
            style={styles.picker}
            onValueChange={onChangeText}>
            {sectionOptions.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        </View>
      ) : (
        <View style={styles.readOnlyInput}>
          <Text style={styles.readOnlyText}>{value}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Image
            source={require('../../../../assets/icons/back-icon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {isEditing ? 'Edit Item' : 'View Item'}
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Image
            source={require('../../../../assets/icons/delete-item.png')}
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Field
            label="Section Type"
            value={sectionType}
            onChangeText={setSectionType}
            editable={isEditing}
          />
          <Field
            label="Item Name"
            value={itemName}
            onChangeText={setItemName}
            editable={isEditing}
          />
          <Field
            label="HD SKU"
            value={sku}
            onChangeText={setSKU}
            editable={isEditing}
          />
          <Field
            label="Brand"
            value={brand}
            onChangeText={setBrand}
            editable={isEditing}
          />
          <Field
            label="Unit Cost"
            value={unitCost}
            onChangeText={setUnitCost}
            editable={isEditing}
            keyboardType="numeric"
          />
          <Field
            label="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            editable={isEditing}
            keyboardType="numeric"
          />

          <View style={styles.statusContainer}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                completionStatus && styles.checkedBox,
                !isEditing && styles.readOnlyCheckbox,
              ]}
              onPress={() =>
                isEditing && setCompletionStatus(!completionStatus)
              }>
              {completionStatus && (
                <Image
                  source={require('../../../../assets/icons/check.png')}
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.statusText}>Completion Status</Text>
          </View>

          <Field
            label="Total Cost"
            value={`$${getTotalCost()}`}
            editable={false}
          />

          <TouchableOpacity
            style={[styles.editButton, isEditing && styles.saveButton]}
            onPress={handleEdit}>
            <Text style={styles.buttonText}>
              {isEditing ? 'Update' : 'Edit Item'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require('../../../../assets/icons/deletemodal.png')}
              style={styles.modalImage}
            />
            <Text style={styles.deleteModalTitle}>Confirmation</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this item?
            </Text>
            <TouchableOpacity
              style={[styles.modalButton, styles.deleteModalButton]}
              onPress={handleBack}>
              <Text style={styles.modalButtonText}>Delete Item</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cancelButton]}
              onPress={() => setShowDeleteModal(false)}>
              <Text style={[styles.modalButtonText, styles.cancelButtonText]}>
                Not Yet
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, styles.successModalView]}>
            <View style={styles.successIconContainer}>
              <Image
                source={require('../../../../assets/icons/add-item-success.png')}
                style={styles.successModalImage}
              />
            </View>
            <Text style={styles.successModalTitle}>Congratulations</Text>
            <Text style={styles.successModalText}>
              Your Item has been updated. All changes are saved securely.
            </Text>
            <TouchableOpacity
              style={[styles.modalButton, styles.successModalButton]}
              onPress={() => setShowSuccessModal(false)}>
              <Text style={styles.successButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ViewItem;
