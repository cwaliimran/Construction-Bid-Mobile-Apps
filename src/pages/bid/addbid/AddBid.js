// AddBid.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import {data} from '../../../data/addbid/data';
import {useNavigation} from '@react-navigation/native'; // Add this import
import {Picker} from '@react-native-picker/picker';
import styles from './styles';
import {INITIAL_ITEMS} from '../../../data/addbid/INITIAL_ITEMS';
// import RenderCostSummary from '../../../components/addbid/RenderCostSummary';
// Constants
const PROPERTY_OPTIONS = [
  {label: 'Choose your property type', value: ''},
  {label: 'Single Bedroom', value: 'single_bedroom'},
  {label: 'Commercial', value: 'commercial'},
  {label: 'Office', value: 'office'},
];
const InitialData = INITIAL_ITEMS;

const STEP_DETAILS = {
  2: {title: 'Plumbing'},
  3: {title: 'HVAC'},
  4: {title: 'Electric'},
  5: {title: 'General'},
  6: {title: 'Misc. Work'},
};

const AddBid = () => {
  // State Management
  const navigation = useNavigation(); // Add this line4
  const goToHomePage = () => navigation.navigate('Home');
  const [step, setStep] = useState(1);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [propertyType, setPropertyType] = useState('');
  const [markupPercentage, setMarkupPercentage] = useState('');
  const [itemsByStep, setItemsByStep] = useState(InitialData);
  const [showItemActions, setShowItemActions] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalValue, setModalValue] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleSubmit = () => {
    // You can pass the bid data to the SubmitBid screen
    const bidData = {
      propertyType,
      itemsByStep,
      totalProjectCost,
      markupPercentage,
      finalCost,
    };

    navigation.navigate('SubmitBid', {bidData});
  };
  // Calculations
  const totalProjectCost = Object.values(itemsByStep).reduce(
    (acc, stepItems) => {
      return (
        acc +
        stepItems.reduce((stepAcc, item) => {
          const itemTotal = parseFloat(item.total) || 0;
          return stepAcc + itemTotal;
        }, 0)
      );
    },
    0,
  );
  const renderDeleteConfirmationModal = () => (
    <Modal
      visible={isDeleteModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsDeleteModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={1}
          onPress={() => setIsDeleteModalVisible(false)}>
          <View style={styles.deleteModalContent}>
            <Image
              source={require('../../../../assets/icons/deletemodal.png')}
              style={styles.deleteModalIcon}
            />
            <Text style={styles.deleteModalTitle}>Confirmation</Text>
            <Text style={styles.deleteModalText}>
              Are you sure you want to delete this item?
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                const newItems = itemsByStep[step].filter(
                  i => i.id !== selectedItemId,
                );
                setItemsByStep({
                  ...itemsByStep,
                  [step]: newItems,
                });
                setIsDeleteModalVisible(false);
                setShowItemActions(null);
                setSelectedItemId(null);
              }}>
              <Text style={styles.deleteButtonText}>Delete Item</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsDeleteModalVisible(false)}
              style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Not Yet</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const calculateFinalCost = totalCost => {
    const markup = parseFloat(markupPercentage) || 0;
    return totalCost + (totalCost * markup) / 100;
  };

  const finalCost = calculateFinalCost(totalProjectCost);

  // Event Handlers
  const updateField = (stepNumber, id, field, value) => {
    const newItems = itemsByStep[stepNumber].map(item => {
      if (item.id === id) {
        const updatedItem = {...item, [field]: value};
        if (field === 'unitCost' || field === 'quantity') {
          const cost =
            parseFloat(field === 'unitCost' ? value : item.unitCost) || 0;
          const qty =
            parseFloat(field === 'quantity' ? value : item.quantity) || 0;
          updatedItem.total = (cost * qty).toFixed(2);
        }
        return updatedItem;
      }
      return item;
    });

    setItemsByStep({
      ...itemsByStep,
      [stepNumber]: newItems,
    });
  };
  const handleModalSubmit = () => {
    const newItems = itemsByStep[step].map(item => {
      if (item.id === selectedItemId) {
        return {
          ...item,
          [modalType.toLowerCase()]: modalValue,
        };
      }
      return item;
    });

    setItemsByStep({
      ...itemsByStep,
      [step]: newItems,
    });

    setIsModalVisible(false);
    setModalValue('');
    setSelectedItemId(null);
  };
  const openModal = (type, itemId) => {
    setModalType(type);
    setSelectedItemId(itemId);
    setIsModalVisible(true);
    setShowItemActions(null);
  };

  const toggleCheck = (stepNumber, id) => {
    const newItems = itemsByStep[stepNumber].map(item => {
      if (item.id === id) {
        return {...item, checked: !item.checked};
      }
      return item;
    });
    setItemsByStep({
      ...itemsByStep,
      [stepNumber]: newItems,
    });
  };

  const toggleItemActions = id => {
    if (showItemActions === id) {
      setShowItemActions(null); // This will hide the actions and remove the overlay if clicked again on the same item
    } else {
      setShowItemActions(id); // This will show the actions for the clicked item without triggering the overlay
    }
  };
  const addItem = () => {
    const currentItems = itemsByStep[step] || [];
    const newId = Math.max(...currentItems.map(item => item.id), 0) + 1;
    const newItem = {
      id: newId,
      name: `New Item ${newId}`,
      unitCost: '',
      quantity: '',
      total: '',
      checked: false,
    };

    // Correctly updating the itemsByStep object
    const updatedItemsByStep = {
      ...itemsByStep,
      [step]: [...currentItems, newItem],
    };
  };

  // UI Components
  const renderBidInformation = () => (
    <>
      <Text style={styles.sectionTitle}>Bid Information</Text>
      <Text style={styles.heading}>Address</Text>
      <View style={styles.inputContainer}>
        <Image
          source={require('../../../../assets/icons/location.png')}
          style={styles.icon}
        />
        <TextInput placeholder="Enter your address" style={styles.input} />
      </View>
      <Text style={styles.heading}>Area SQ.FT</Text>
      <View style={styles.inputContainer}>
        <Image
          source={require('../../../../assets/icons/location.png')}
          style={styles.icon}
        />
        <TextInput
          placeholder="Enter Area (sq.ft)"
          style={styles.input}
          keyboardType="numeric"
        />
      </View>
      <Text style={styles.heading}>Property Type</Text>
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={propertyType}
          onValueChange={setPropertyType}
          style={styles.picker}>
          {PROPERTY_OPTIONS.map(option => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    </>
  );

  const renderItemActions = item => {
    if (showItemActions === item.id) {
      return (
        <View style={styles.menuWrapper}>
          <View style={styles.itemActionsMenu}>
            <TouchableOpacity
              style={styles.actionMenuItem}
              onPress={() => openModal('HD SKU', item.id)}>
              <Image
                source={require('../../../../assets/icons/add-icon-popup.png')}
                style={styles.actionMenuIcon}
              />
              <Text style={styles.actionMenuText}>HD SKU</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionMenuItem}
              onPress={() => openModal('Brand', item.id)}>
              <Image
                source={require('../../../../assets/icons/add-icon-popup.png')}
                style={styles.actionMenuIcon}
              />
              <Text style={styles.actionMenuText}>Brand</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionMenuItem, styles.lastMenuItem]}
              onPress={() => {
                setSelectedItemId(item.id);
                setIsDeleteModalVisible(true);
                setShowItemActions(null);
              }}>
              <Image
                source={require('../../../../assets/icons/delete-icon-popup.png')}
                style={styles.actionMenuIcon}
              />
              <Text style={styles.actionMenuText}>Delete Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  };
  const renderModal = () => (
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
              <Text style={styles.modalButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const handleNumericInput = (step, id, field, text) => {
    // Regex to allow only numeric input
    const cleaned = text.replace(/[^0-9]/g, '');
    updateField(step, id, field, cleaned);
  };
  const renderStepItems = () => {
    const currentItems = itemsByStep[step] || [];
    return (
      <>
        <Text style={styles.sectionTitle}>{STEP_DETAILS[step]?.title}</Text>
        {currentItems.map(item => (
          <View key={item.id} style={styles.itemContainer}>
            <View style={styles.leftIndicator}></View>
            <View style={styles.itemDetails}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                {(item.hdSku || item.brand) && (
                  <Text style={styles.itemSubtext}>
                    {item.hdSku && `HD SKU: ${item.hdSku}`}{' '}
                    {item.brand && `Brand: ${item.brand}`}
                  </Text>
                )}
              </View>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => toggleCheck(step, item.id)}
                  style={styles.actionButton}>
                  <Image
                    source={
                      item.checked
                        ? require('../../../../assets/icons/check.png')
                        : require('../../../../assets/icons/uncheck.png')
                    }
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => toggleItemActions(item.id)}
                  style={styles.actionButton}>
                  <Image
                    source={require('../../../../assets/icons/more.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {renderItemActions(item)}
            <View style={styles.inputsContainer}>
              <TextInput
                placeholder="Unit Cost"
                style={styles.input}
                value={item.unitCost}
                keyboardType="numeric"
                onChangeText={text =>
                  handleNumericInput(step, item.id, 'unitCost', text)
                }
              />
              <TextInput
                placeholder="Quantity"
                style={styles.input}
                value={item.quantity}
                keyboardType="numeric"
                onChangeText={text =>
                  handleNumericInput(step, item.id, 'quantity', text)
                }
              />
              <TextInput
                placeholder="Total"
                style={styles.input}
                value={item.total}
                editable={false}
              />
            </View>
          </View>
        ))}
        <TouchableOpacity
          onPress={() => navigation.navigate('AddItem')}
          style={styles.addItemButton}>
          <View style={styles.leftIndicatorBlue}></View>
          <Image
            source={require('../../../../assets/icons/upload.png')}
            style={styles.uploadIcon}
          />
          <Text style={styles.addItemText}>Add Item</Text>
        </TouchableOpacity>
        {/* <RenderCostSummary /> */}
        {/* {() => {
          <RenderCostSummary />;
        }} */}
        {renderCostSummary()}
      </>
    );
  };

  const renderCostSummary = () => (
    <View style={styles.costContainer}>
      <View style={styles.leftIndicatorBlue}></View>
      <View style={styles.costRow}>
        <Text style={styles.costLabel}>Total Project Cost</Text>
        <Text style={styles.costValue}>$ {totalProjectCost.toFixed(2)}</Text>
      </View>
      <View style={styles.costRow}>
        <Text style={styles.costLabel}>Markup Percentage</Text>
        <TextInput
          style={styles.inputPercentage}
          value={markupPercentage}
          onChangeText={setMarkupPercentage}
          keyboardType="numeric"
          placeholder="8.1 %"
        />
      </View>
      <View style={styles.costRow}>
        <Text style={styles.finalCostLabel}>Final Cost</Text>
        <Text style={styles.finalCostValue}>$ {finalCost.toFixed(2)}</Text>
      </View>
    </View>
  );

  const renderStepContent = () => {
    if (step === 1) {
      return renderBidInformation();
    }
    return renderStepItems();
  };

  // Main Render
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goToHomePage} style={styles.backButton}>
            <Image
              source={require('../../../../assets/icons/back-icon.png')} // Make sure you have an icon for back
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Create Bid</Text>
          </View>
          <View style={styles.placeholder}></View>
        </View>

        <View style={styles.stepIndicator}>
          {[1, 2, 3, 4, 5, 6].map(item => (
            <View
              key={item}
              style={[styles.stepCircle, step >= item && styles.activeStep]}>
              <Text style={styles.stepText}>{item}</Text>
            </View>
          ))}
        </View>

        {renderStepContent()}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.prevButton,
            step === 1 && styles.disabledButton,
          ]}
          onPress={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}>
          <Text style={[styles.buttonText, styles.prevButtonText]}>
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={step === 6 ? handleSubmit : () => setStep(step + 1)}>
          <Text style={styles.buttonText}>
            {step === 6 ? 'Submit' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
      {renderModal()}
      {renderDeleteConfirmationModal()}
    </SafeAreaView>
  );
};

export default AddBid;
