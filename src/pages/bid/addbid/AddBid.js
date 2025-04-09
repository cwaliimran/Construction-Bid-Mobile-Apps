// AddBid.js
import React, {useCallback, useEffect, useState} from 'react';
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
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {data} from '../../../data/addbid/data';
import {useFocusEffect, useNavigation} from '@react-navigation/native'; // Add this import
import {Picker} from '@react-native-picker/picker';
import styles from './styles';
import {INITIAL_ITEMS} from '../../../data/addbid/INITIAL_ITEMS';
import {useColorScheme} from 'react-native';
import BidInformation from '../../../components/addbid/BidInformation';
import BidItemStepPlumbing from '../../../components/addbid/BidItemStepPlumbing';
import BidItemStepHVAC from '../../../components/addbid/BidItemStepHVAC';
import BidItemStepElectric from '../../../components/addbid/BidItemStepElectric';
import BidItemStepGeneral from '../../../components/addbid/BidItemStepGeneral';
import BidItemStepMiscWork from '../../../components/addbid/BidItemStepMiscWork';
import {useDispatch, useSelector} from 'react-redux';
import ActivityIndicatorModal from '../../../components/modal/ActivityIndicatorModal';
import Toast from 'react-native-toast-message';
import {addBid, emptyAddItem} from '../../../store/slices/bid';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import UploadBidImages from '../../../components/addbid/UploadBidImages';
// import RenderCostSummary from '../../../components/addbid/RenderCostSummary';
// Constants

const InitialData = INITIAL_ITEMS;

const STEP_DETAILS = {
  2: {title: 'Plumbing'},
  3: {title: 'HVAC'},
  4: {title: 'Electric'},
  5: {title: 'General'},
  6: {title: 'Misc. Work'},
};

const AddBid = ({route}) => {
  const dispatch = useDispatch();
  // State Management
  const {isUploadLoading} = useSelector(state => state.file);
  const {isLoading, isAddBidLoading} = useSelector(state => state.bid);
  const navigation = useNavigation(); // Add this line4
  const [step, setStep] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');

  const [selectedImageFiles, setSelectedImageFiles] = useState([]);

  const [addBidData, setAddBidData] = useState(null);
  const [currentSectionId, setCurrentSectionId] = useState('');
  const [currentSection, setCurrentSection] = useState('');

  const [totalProjectCost, setTotalProjectCost] = useState(0);
  const [markupPercentage, setMarkupPercentage] = useState(0);
  const [finalCost, setFinalCost] = useState(0);

  useEffect(() => {
    if (!addBidData) return; // Ensure addBidData is not null or undefined

    let totalCost = 0;

    Object.values(addBidData).forEach(items => {
      if (Array.isArray(items)) {
        totalCost += items.reduce(
          (sum, item) => sum + (item.totalCost || 0),
          0,
        );
      }
    });

    setTotalProjectCost(totalCost);
  }, [addBidData]);

  useEffect(() => {
    setFinalCost(
      totalProjectCost + (totalProjectCost * markupPercentage) / 100,
    );
  }, [markupPercentage, totalProjectCost]);

  const handleData = newData => {
    setAddBidData(prevData => ({
      ...prevData,
      ...newData,
    }));
  };

  const handleSubmit = () => {
    // navigation.navigate('SubmitBid', {bidData});

    const data = {
      sections: addBidData,
      markupPercentage: markupPercentage,
    };

    dispatch(addBid(data))
      .then(response => {
        navigation.navigate('SubmitBid', {
          bidId: response?.data?.bid_id,
        });
        dispatch(emptyAddItem());
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response?.data?.message || 'Bid added successfully',
        });
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error?.response?.data?.error || 'Something went wrong',
        });
      });
  };

  // Main Render
  return (
    <SafeAreaView style={styles.container}>
      {(isAddBidLoading || isUploadLoading) && <ActivityIndicatorModal />}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setAddBidData(null);
            navigation.navigate('Home');
          }}
          style={styles.backButton}>
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
        {[1, 2, 3, 4, 5, 6, 7].map(item => (
          <View
            key={item}
            style={[styles.stepCircle, step >= item && styles.activeStep]}>
            <Text style={styles.stepText}>{item}</Text>
          </View>
        ))}
      </View>
      {/* <ScrollView contentContainerStyle={styles.content}> */}
      {/* <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        onKeyboardWillShow={() => setKeyboardVisible(true)}
        onKeyboardWillHide={() => setKeyboardVisible(false)}
        // showsVerticalScrollIndicator={false}
      > */}
      <View style={styles.content}>
        {/* {renderStepContent()} */}
        {step === 1 ? (
          <UploadBidImages
            handleData={handleData}
            selectedImageFiles={selectedImageFiles}
            setSelectedImageFiles={setSelectedImageFiles}
          />
        ) : step === 2 ? (
          <BidInformation
            selectedProperty={selectedProperty}
            setSelectedProperty={setSelectedProperty}
            address={address}
            setAddress={setAddress}
            area={area}
            setArea={setArea}
            handleData={handleData}
          />
        ) : step === 3 ? (
          <BidItemStepPlumbing
            handleData={handleData}
            setCurrentSectionId={setCurrentSectionId}
            setCurrentSection={setCurrentSection}
          />
        ) : step === 4 ? (
          <BidItemStepHVAC
            handleData={handleData}
            setCurrentSectionId={setCurrentSectionId}
            setCurrentSection={setCurrentSection}
          />
        ) : step === 5 ? (
          <BidItemStepElectric
            handleData={handleData}
            setCurrentSectionId={setCurrentSectionId}
            setCurrentSection={setCurrentSection}
          />
        ) : step === 6 ? (
          <BidItemStepGeneral
            handleData={handleData}
            setCurrentSectionId={setCurrentSectionId}
            setCurrentSection={setCurrentSection}
          />
        ) : (
          step === 7 && (
            <BidItemStepMiscWork
              handleData={handleData}
              setCurrentSectionId={setCurrentSectionId}
              setCurrentSection={setCurrentSection}
            />
          )
        )}
      </View>
      {/* </KeyboardAwareScrollView> */}
      {/* </ScrollView> */}

      {step !== 1 && step !== 2 && (
        <View style={{marginHorizontal: 10}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddItem', {
                sectionId: currentSectionId,
                currentSection: currentSection,
              })
            }
            style={styles.addItemButton}
            disabled={isLoading}>
            <View style={styles.leftIndicatorBlue}></View>
            <Image
              source={require('../../../../assets/icons/upload.png')}
              style={styles.uploadIcon}
            />
            <Text style={styles.addItemText}>Add Item</Text>
          </TouchableOpacity>
          <View style={styles.costContainer}>
            <View style={styles.leftIndicatorBlue}></View>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Total Project Cost</Text>
              <Text style={styles.costValue}>
                $ {totalProjectCost?.toFixed(2)}
              </Text>
            </View>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Markup Percentage</Text>
              <TextInput
                style={styles.inputPercentage}
                value={markupPercentage}
                onChangeText={text => setMarkupPercentage(Number(text))}
                keyboardType="numeric"
                placeholderTextColor="#CCCCCC"
                placeholder="8.1 %"
              />
            </View>
            <View style={styles.costRow}>
              <Text style={styles.finalCostLabel}>Final Cost</Text>
              <Text style={styles.finalCostValue}>
                $ {finalCost.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      )}
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
          style={[isLoading ? styles.disabledButton : styles?.button]}
          onPress={
            step === 7
              ? handleSubmit
              : () =>
                  step === 1 && selectedImageFiles.length < 1
                    ? Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Please select atleast one image',
                      })
                    : step === 2 && (!area || !address || !selectedProperty)
                    ? Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Please fill all field first',
                      })
                    : setStep(step + 1)
          }
          disabled={isLoading}>
          <Text style={styles.buttonText}>
            {step === 7 ? 'Submit' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* {renderModal()} */}
      {/* {renderDeleteConfirmationModal()} */}
    </SafeAreaView>
  );
};

export default AddBid;
