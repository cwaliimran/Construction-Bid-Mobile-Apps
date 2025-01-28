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
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Add this import
import {Picker} from '@react-native-picker/picker';

// Constants
const PROPERTY_OPTIONS = [
  {label: 'Choose your property type', value: ''},
  {label: 'Single Bedroom', value: 'single_bedroom'},
  {label: 'Commercial', value: 'commercial'},
  {label: 'Office', value: 'office'},
];

const STEP_DETAILS = {
  2: {title: 'Plumbing'},
  3: {title: 'HVAC'},
  4: {title: 'Electric'},
  5: {title: 'General'},
  6: {title: 'Misc. Work'},
};

const INITIAL_ITEMS = {
  2: [
    {
      id: 1,
      name: 'Bath Faucet',
      unitCost: '',
      quantity: '',
      total: '',
      checked: false,
    },
    {
      id: 2,
      name: 'Shower Head',
      unitCost: '',
      quantity: '',
      total: '',
      checked: false,
    },
    {
      id: 3,
      name: 'Toilet Set',
      unitCost: '',
      quantity: '',
      total: '',
      checked: false,
    },
  ],
  3: [
    {
      id: 1,
      name: 'AC Unit',
      unitCost: '',
      quantity: '',
      total: '',
      checked: false,
    },
    {
      id: 2,
      name: 'Ductwork',
      unitCost: '',
      quantity: '',
      total: '',
      checked: false,
    },
    {
      id: 3,
      name: 'Thermostat',
      unitCost: '',
      quantity: '',
      total: '',
      checked: false,
    },
  ],
  4: [
    {
      id: 1,
      name: 'Light Fixture',
      unitCost: '',
      quantity: '',
      total: '',
      checked: false,
    },
    {
      id: 2,
      name: 'Circuit Panel',
      unitCost: '',
      quantity: '',
      total: '',
      checked: false,
    },
    {
      id: 3,
      name: 'Outlets',
      unitCost: '',
      quantity: '',
      total: '',
      checked: false,
    },
  ],
  5: [
    {
      id: 1,
      name: 'Paint',
      unitCost: '',
      quantity: '',
      total: '',
      checked: false,
    },
    {
      id: 2,
      name: 'Drywall',
      unitCost: '',
      quantity: '',
      total: '',
      checked: false,
    },
    {
      id: 3,
      name: 'Flooring',
      unitCost: '',
      quantity: '',
      total: '',
      checked: false,
    },
  ],
  6: [
    {
      id: 1,
      name: 'Cleaning',
      unitCost: '',
      quantity: '',
      total: '',
      checked: false,
    },
    {
      id: 2,
      name: 'Permits',
      unitCost: '',
      quantity: '',
      total: '',
      checked: false,
    },
    {
      id: 3,
      name: 'Inspection',
      unitCost: '',
      quantity: '',
      total: '',
      checked: false,
    },
  ],
};

const AddBid = () => {
  // State Management
  const navigation = useNavigation(); // Add this line
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState('');
  const [markupPercentage, setMarkupPercentage] = useState('');
  const [itemsByStep, setItemsByStep] = useState(INITIAL_ITEMS);
  const [showItemActions, setShowItemActions] = useState(null);
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
    setShowItemActions(showItemActions === id ? null : id);
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

    setItemsByStep({
      ...itemsByStep,
      [step]: [...currentItems, newItem],
    });
  };

  // UI Components
  const renderBidInformation = () => (
    <>
      <Text style={styles.sectionTitle}>Bid Information</Text>
      <View style={styles.inputContainer}>
        <Image
          source={require('../../../assets/icons/location.png')}
          style={styles.icon}
        />
        <TextInput placeholder="Enter your address" style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={require('../../../assets/icons/location.png')}
          style={styles.icon}
        />
        <TextInput
          placeholder="Enter Area (sq.ft)"
          style={styles.input}
          keyboardType="numeric"
        />
      </View>
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

  const renderItemActions = item =>
    showItemActions === item.id && (
      <View style={styles.itemActionsMenu}>
        <TouchableOpacity style={styles.actionItem}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    );

  const renderStepItems = () => {
    const currentItems = itemsByStep[step] || [];
    return (
      <>
        <Text style={styles.sectionTitle}>{STEP_DETAILS[step]?.title}</Text>
        {currentItems.map(item => (
          <View key={item.id} style={styles.itemContainer}>
            <View style={styles.leftIndicator}></View>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => toggleCheck(step, item.id)}
                  style={styles.actionButton}>
                  <Image
                    source={
                      item.checked
                        ? require('../../../assets/icons/check.png')
                        : require('../../../assets/icons/uncheck.png')
                    }
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => toggleItemActions(item.id)}
                  style={styles.actionButton}>
                  <Image
                    source={require('../../../assets/icons/more.png')}
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
                  updateField(step, item.id, 'unitCost', text)
                }
              />
              <TextInput
                placeholder="Quantity"
                style={styles.input}
                value={item.quantity}
                keyboardType="numeric"
                onChangeText={text =>
                  updateField(step, item.id, 'quantity', text)
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
        <TouchableOpacity onPress={addItem} style={styles.addItemButton}>
          {' '}
          <View style={styles.leftIndicatorBlue}></View>{' '}
          <Image
            source={require('../../../assets/icons/upload.png')}
            style={styles.uploadIcon}
          />{' '}
          <Text style={styles.addItemText}>Add Item</Text>{' '}
        </TouchableOpacity>
        {renderCostSummary()}
      </>
    );
  };

  const renderCostSummary = () => (
    <View style={styles.costContainer}>
      <View style={styles.leftIndicatorBlue}></View>
      <View style={styles.costRow}>
        <Text style={styles.costLabel}>Total Project Cost</Text>
        <Text style={styles.costValue}>${totalProjectCost.toFixed(2)}</Text>
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
        <Text style={styles.costLabel}>Final Cost</Text>
        <Text style={styles.costValue}>${finalCost.toFixed(2)}</Text>
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
          <TouchableOpacity
            onPress={() => setStep(Math.max(1, step - 1))}
            style={styles.backButton}>
            <Image
              source={require('../../../assets/icons/back-icon.png')}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: 'column',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  leftIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: '#00FF00',
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  itemName: {
    flex: 1,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
  },
  costContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  costLabel: {
    fontSize: 16,
  },
  costValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputPercentage: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: 100,
    textAlign: 'right',
  },
  actionButton: {
    marginLeft: 10,
  },
  inputsContainer: {
    borderColor: '#C0C0C0', // Changed to a lighter grey color
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#C0C0C0', // Changed to a lighter grey color
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  checkButton: {
    padding: 10,
  },
  checkIcon: {
    width: 24,
    height: 24,
  },
  moreButton: {
    padding: 10,
  },
  moreIcon: {
    width: 24,
    height: 24,
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    height: 66,
    marginTop: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  leftIndicatorBlue: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: '#007AFF',
  },
  costContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
    position: 'relative', // This ensures the positioning context is set correctly
    overflow: 'hidden', // Ensures nothing spills out, particularly the blue line
    backgroundColor: '#FFF', // Ensures the background matches
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  costLabel: {
    fontSize: 16,
  },
  costValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputPercentage: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: 100,
    textAlign: 'right',
  },
  addItemText: {
    color: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures spacing on both ends
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 32, // Ensure the button has a width even if back icon is not visible
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 32,
    height: 32,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 32, // Placeholder to balance the back button for centering the title
  },

  uploadIcon: {
    width: 24,
    height: 24,
    marginRight: 10, // Space between the icon and text
  },
  addItemText: {
    color: '#007AFF', // Text color
    fontSize: 16,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  stepCircle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  activeStep: {
    backgroundColor: '#007AFF',
  },
  stepText: {
    color: '#FFF',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    marginBottom: 15,
    padding: 5,
    height: 50,
    alignSelf: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#000',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    width: '100%',
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    flex: 1,
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  prevButton: {
    backgroundColor: '#FF3B30',
  },
  disabledButton: {
    backgroundColor: '#C7C7CC',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddBid;
