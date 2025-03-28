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
import {Formik} from 'formik';
import * as Yup from 'yup';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addItem} from '../../../store/slices/bid';
import ActivityIndicatorModal from '../../../components/modal/ActivityIndicatorModal';
import Toast from 'react-native-toast-message';

const AddItem = ({route}) => {
  const {sectionId, currentSection} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  const {isLoading} = useSelector(state => state.bid);

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

  const handleAddItem = (values, {resetForm}) => {
    const data = {
      sectionId: sectionId,
      itemName: values.itemName,
      hdSku: values.sku,
      brand: values.brand,
      unitCost: Number(values.unitCost),
      quantity: Number(values.quantity),
      completionStatus: values.completionStatus,
    };

    dispatch(addItem(data))
      .then(response => {
        setShowSuccessModal(true);
        resetForm();
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error?.response?.data?.error || 'Something went wrong',
        });
      });
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
      {isLoading && <ActivityIndicatorModal />}
      {/* Header */}
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

      <Text
        style={[
          styles.label,
          {textAlign: 'center', marginTop: 10, color: '#007AFF'},
        ]}>
        Add new item to {currentSection}
      </Text>

      {/* Formik Form */}
      <Formik
        initialValues={{
          itemName: '',
          sku: '',
          brand: '',
          unitCost: '',
          quantity: '',
          completionStatus: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleAddItem}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            <View style={styles.form}>
              {/* Item Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Item Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('itemName')}
                  onBlur={handleBlur('itemName')}
                  value={values.itemName}
                  placeholder="Enter description of the specific item"
                />
                {touched.itemName && errors.itemName && (
                  <Text style={styles.errorText}>{errors.itemName}</Text>
                )}
              </View>

              {/* SKU */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>HD SKU</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('sku')}
                  onBlur={handleBlur('sku')}
                  value={values.sku}
                  placeholder="Enter SKU or brand name"
                />
                {touched.sku && errors.sku && (
                  <Text style={styles.errorText}>{errors.sku}</Text>
                )}
              </View>

              {/* Brand */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Brand</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('brand')}
                  onBlur={handleBlur('brand')}
                  value={values.brand}
                  placeholder="Enter brand name"
                />
                {touched.brand && errors.brand && (
                  <Text style={styles.errorText}>{errors.brand}</Text>
                )}
              </View>

              {/* Unit Cost */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Unit Cost</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('unitCost')}
                  onBlur={handleBlur('unitCost')}
                  value={values.unitCost}
                  placeholder="Enter unit cost"
                  keyboardType="numeric"
                />
                {touched.unitCost && errors.unitCost && (
                  <Text style={styles.errorText}>{errors.unitCost}</Text>
                )}
              </View>

              {/* Quantity */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Quantity</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('quantity')}
                  onBlur={handleBlur('quantity')}
                  value={values.quantity}
                  placeholder="Enter quantity"
                  keyboardType="numeric"
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
                    setFieldValue('completionStatus', !values.completionStatus)
                  }>
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

              {/* Submit Button */}
              <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Add Item</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Formik>

      {/* Success Modal */}
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
