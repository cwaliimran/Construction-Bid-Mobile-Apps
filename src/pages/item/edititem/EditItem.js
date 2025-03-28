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
  Keyboard,
} from 'react-native';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';

import {Formik} from 'formik';
import * as Yup from 'yup';
import {deleteItem, updateItem} from '../../../store/slices/bid';
import ActivityIndicatorModal from '../../../components/modal/ActivityIndicatorModal';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

// **🔹 Validation Schema with Yup**
const validationSchema = Yup.object().shape({
  itemName: Yup.string().required('Item Name is required'),
  sku: Yup.string().required('SKU is required'),
  brand: Yup.string().required('Brand is required'),
  unitCost: Yup.number()
    .typeError('Unit Cost must be a number')
    .positive('Unit Cost must be positive')
    .required('Unit Cost is required'),
  quantity: Yup.number()
    .typeError('Quantity must be a number')
    .positive('Quantity must be positive')
    .integer('Quantity must be an integer')
    .required('Quantity is required'),
  // completionStatus: Yup.boolean().oneOf(
  //   [true],
  //   'Completion Status must be checked',
  // ),
});

const ViewItem = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {item, sectionId, sectionName} = route.params;

  console.log('item?.completionStatus ------>', item?.completionStatus);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {isLoading} = useSelector(state => state.bid);

  const handleBack = () => {
    navigation.goBack();
  };

  console.log('isEditing -------->', isEditing);

  const handleEdit = (values, {resetForm}) => {
    Keyboard.dismiss();

    const data = {
      itemId: item?.itemId,
      sectionId: sectionId,
      itemName: values.itemName,
      hdSku: values.sku,
      brand: values.brand,
      unitCost: Number(values.unitCost),
      quantity: Number(values.quantity),
      completionStatus: values.completionStatus,
    };

    console.log('1 ------->');

    dispatch(updateItem(data))
      .then(response => {
        console.log('2');
        setShowSuccessModal(true);
        setIsEditing(!isEditing);
        resetForm();
      })
      .catch(error => {
        console.log('err ------->', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error?.response?.data?.error || 'Something went wrong',
        });
      });
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteItem(item.itemId));
    setShowDeleteModal(false);
    navigation.goBack();
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    navigation.goBack();
  };

  return (
    <View style={styles.mainContainer}>
      {isLoading && <ActivityIndicatorModal />}
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

      <Text
        style={[
          styles.label,
          {textAlign: 'center', marginTop: 10, color: '#007AFF'},
        ]}>
        {isEditing ? 'Update' : 'View'} {sectionName}
      </Text>
      <Formik
        initialValues={{
          itemName: item?.itemName || '',
          sku: item?.hdSku || '',
          brand: item?.brand || '',
          unitCost: item?.unitCost || '',
          quantity: item?.quantity || '',
          completionStatus: item?.completionStatus || false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleEdit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={{flex: 1}}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}>
              <View style={styles.form}>
                {/* Item Name */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Item Name</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: isEditing ? '#FFF' : 'lightgrey',
                      },
                    ]}
                    onChangeText={handleChange('itemName')}
                    onBlur={handleBlur('itemName')}
                    value={values.itemName}
                    placeholder="Enter description of the specific item"
                    editable={isEditing}
                  />
                  {touched.itemName && errors.itemName && (
                    <Text style={styles.errorText}>{errors.itemName}</Text>
                  )}
                </View>

                {/* SKU */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>HD SKU</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: isEditing ? '#FFF' : 'lightgrey',
                      },
                    ]}
                    onChangeText={handleChange('sku')}
                    onBlur={handleBlur('sku')}
                    value={values.sku}
                    placeholder="Enter SKU or brand name"
                    editable={isEditing}
                  />
                  {touched.sku && errors.sku && (
                    <Text style={styles.errorText}>{errors.sku}</Text>
                  )}
                </View>

                {/* Brand */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Brand</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: isEditing ? '#FFF' : 'lightgrey',
                      },
                    ]}
                    onChangeText={handleChange('brand')}
                    onBlur={handleBlur('brand')}
                    value={values.brand}
                    placeholder="Enter brand name"
                    editable={isEditing}
                  />
                  {touched.brand && errors.brand && (
                    <Text style={styles.errorText}>{errors.brand}</Text>
                  )}
                </View>

                {/* Unit Cost */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Unit Cost</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: isEditing ? '#FFF' : 'lightgrey',
                      },
                    ]}
                    onChangeText={handleChange('unitCost')}
                    onBlur={handleBlur('unitCost')}
                    value={values.unitCost.toString()}
                    placeholder="Enter unit cost"
                    keyboardType="numeric"
                    editable={isEditing}
                  />
                  {touched.unitCost && errors.unitCost && (
                    <Text style={styles.errorText}>{errors.unitCost}</Text>
                  )}
                </View>

                {/* Quantity */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Quantity</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: isEditing ? '#FFF' : 'lightgrey',
                      },
                    ]}
                    onChangeText={handleChange('quantity')}
                    onBlur={handleBlur('quantity')}
                    value={values.quantity.toString()}
                    placeholder="Enter quantity"
                    keyboardType="numeric"
                    editable={isEditing}
                  />
                  {touched.quantity && errors.quantity && (
                    <Text style={styles.errorText}>{errors.quantity}</Text>
                  )}
                </View>

                {/* Completion Status */}
                <View style={styles.statusContainer}>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() =>
                      setFieldValue(
                        'completionStatus',
                        !values.completionStatus,
                      )
                    }
                    disabled={!isEditing}>
                    {values.completionStatus && (
                      <Image
                        source={require('../../../../assets/icons/check.png')}
                        style={styles.checkIcon}
                      />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.statusText}>Completion Status</Text>
                </View>
                {/* {touched.completionStatus && errors.completionStatus && (
                <Text style={styles.errorText}>{errors.completionStatus}</Text>
              )} */}

                {/* Total Cost */}
                <View style={[styles.inputGroup, {marginTop: 10}]}>
                  <Text style={styles.label}>Total Cost</Text>
                  <Text style={styles.totalCost}>{`$ ${(
                    (parseFloat(values.unitCost) || 0) *
                    (parseInt(values.quantity) || 0)
                  ).toFixed(2)}`}</Text>
                </View>
              </View>
            </ScrollView>
            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.editButton, isEditing && styles.saveButton]}
              onPress={isEditing ? handleSubmit : () => setIsEditing(true)}>
              <Text style={styles.buttonText}>
                {isEditing ? 'Update' : 'Edit Item'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      {/* <View style={styles.form}>
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
            value={unitCost.toString()}
            onChangeText={setUnitCost}
            editable={isEditing}
            keyboardType="numeric"
          />
          <Field
            label="Quantity"
            value={quantity.toString()}
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
              }
              disabled={!isEditing}>
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
        </View> */}

      {/* <TouchableOpacity
        style={[styles.editButton, isEditing && styles.saveButton]}
        onPress={handleEdit}>
        <Text style={styles.buttonText}>
          {isEditing ? 'Update' : 'Edit Item'}
        </Text>
      </TouchableOpacity> */}

      <Modal
        animationType="fade"
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
              onPress={handleDeleteConfirm}>
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
        animationType="fade"
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
              onPress={handleContinue}>
              <Text style={styles.successButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ViewItem;
