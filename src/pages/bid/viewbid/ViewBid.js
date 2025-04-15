import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {INITIAL_ITEMS} from '../../../data/addbid/INITIAL_ITEMS';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  emptyAddItem,
  getBid,
  getBidPropertyType,
  getSections,
  setUpdateBidImages,
  setUpdateBidPropertySection,
  updateBid,
} from '../../../store/slices/bid';
import ActivityIndicator from '../../../components/modal/ActivityIndicator';
import {colors, fonts} from '../../../utls/styles';

import ChevronIcon from 'react-native-vector-icons/Feather';
import {Dropdown} from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
import ActivityIndicatorModal from '../../../components/modal/ActivityIndicatorModal';
import UpdateBidImages from '../../../components/updateBid/UpdateBidImages';

const InitialData = INITIAL_ITEMS;

const ViewBid = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {bidId} = route.params;

  const {isUploadLoading} = useSelector(state => state.file);
  const {isLoading, isAddBidLoading, bid} = useSelector(state => state.bid);

  const [stepDetails, setStepDetails] = useState(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [showItemActions, setShowItemActions] = useState(null);

  // Get items directly from bid or use InitialData as fallback

  // remove this 678b5d9f713248c7aca857be from bid?.sections

  const [items, setItems] = useState(null);
  const [propertySection, setPropertySections] = useState(null);

  const [propertyOptions, setPropertyOptions] = useState([]);

  const [selectedProperty, setSelectedProperty] = useState({});

  const [finalCost, setFinalCost] = useState(0);

  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');

  const [selectedImageFiles, setSelectedImageFiles] = useState([]);

  const renderItem = () => (
    <ChevronIcon
      name="chevron-down"
      size={24}
      color={colors.black}
      style={{marginRight: 10}}
    />
  );

  useEffect(() => {
    if (bid) {
      setItems(
        Object?.fromEntries(
          Object?.entries(bid?.sections)?.filter(
            ([key]) => key !== '678b5d9f713248c7aca857be',
          ),
        ),
      );

      setPropertySections(
        Object?.fromEntries(
          Object?.entries(bid?.sections)?.filter(
            ([key]) => key === '678b5d9f713248c7aca857be',
          ),
        ),
      );

      setSelectedProperty({
        _id: bid?.sections?.['678b5d9f713248c7aca857be']?.propertyId,
        name: bid?.sections?.['678b5d9f713248c7aca857be']?.propertyName,
      });

      setFinalCost(
        bid?.totalProjectCost +
          (bid?.totalProjectCost * bid?.markupPercentage) / 100,
      );

      setSelectedImageFiles(
        Object?.fromEntries(
          Object?.entries(bid?.sections)?.filter(([key]) => key === 'images'),
        ),
      );
    }
  }, [bid]);

  useEffect(() => {
    if (propertySection) {
      setAddress(
        (propertySection &&
          propertySection[Object.keys(propertySection)[0]]?.address) ||
          '',
      );

      setArea(
        (propertySection &&
          propertySection[Object.keys(propertySection)[0]]?.areaSqft) ||
          '',
      );
    }
  }, [propertySection]);

  useEffect(async () => {
    await dispatch(getBid(bidId))
      .then(response => {})
      .catch(error => {});

    await dispatch(getSections())
      .then(response => {
        const transformed = response?.data?.sections
          ?.slice(1)
          ?.reduce((acc, item, index) => {
            acc[item?._id] = {
              title:
                item.name === 'Miscellaneous Work' ? 'Misc. Work' : item.name,
            };
            return acc;
          }, {});

        setStepDetails(transformed);
      })
      .catch(error => {});
    await dispatch(getBidPropertyType())
      .then(response => {
        setPropertyOptions(response?.data?.properties);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error?.response?.data?.error || 'Something went wrong',
        });
      });
  }, []);

  const goToHomePage = () => navigation.navigate('Home');

  const handleUpdate = () => {
    // navigation.navigate('UpdateBid', {bid});

    dispatch(updateBid(bid))
      .then(response => {
        navigation.navigate('SubmitBid', {
          bidId: response?.data?.bidId,
        });
        dispatch(emptyAddItem());
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response?.data?.message || 'Bid update successfully',
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

  const handleEditItem = (item, currentItems) => {
    navigation.navigate('EditItem', {
      item,
      sectionId: currentItems?.sectionId,
      sectionName: currentItems?.sectionName,
    });
  };

  const toggleItemActions = id => {
    setShowItemActions(showItemActions === id ? null : id);
  };

  const renderBidInformation = () => (
    <>
      <View style={styles.inputContainer}>
        <Image
          source={require('../../../../assets/icons/location.png')}
          style={styles.icon}
        />
        <TextInput
          placeholder="Enter your address"
          style={styles.input}
          placeholderTextColor="#CCCCCC"
          value={address}
          onChangeText={text => setAddress(text)}
        />
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
          placeholderTextColor="#CCCCCC"
          keyboardType="numeric"
          value={area?.toString()}
          onChangeText={text => setArea(text)}
        />
      </View>

      {/* <View style={styles.inputContainer}>
        <Image
          source={require('../../../../assets/icons/location.png')}
          style={styles.icon}
        />
        <Text style={styles.viewText}>
          {(propertySection &&
            propertySection[Object.keys(propertySection)[0]]?.address) ||
            'No address provided'}
        </Text>
      </View>
      <Text style={styles.heading}>Area SQ.FT</Text>
      <View style={styles.inputContainer}>
        <Image
          source={require('../../../../assets/icons/location.png')}
          style={styles.icon}
        />
        <Text style={styles.viewText}>
          {propertySection &&
          propertySection[Object.keys(propertySection)[0]]?.areaSqft
            ? `${
                propertySection[Object.keys(propertySection)[0]]?.areaSqft
              } sq.ft`
            : 'No area specified'}
        </Text>
      </View> */}
      <Text style={styles.heading}>Property Type</Text>
      {/* <View style={styles.inputContainer}>
        <Text style={styles.viewText}>
          {(propertySection &&
            propertySection[Object.keys(propertySection)[0]]?.propertyType) ||
            'No property type specified'}
        </Text>
      </View> */}
      <View style={styles.dropdownContainer}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          placeholder="Select Property"
          selectedTextStyle={styles.dropDownInput}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          renderRightIcon={renderItem}
          data={propertyOptions}
          // search
          // searchPlaceholder={t('search')}
          fontFamily={fonts.Regular}
          maxHeight={300}
          labelField="name"
          valueField="name"
          value={selectedProperty?.name}
          onChange={item => {
            setSelectedProperty(item);
          }}
        />
      </View>
    </>
  );

  const renderCurrentStepItems = () =>
    items?.[Object.keys(items)?.[currentStep - 2]] || [];

  const currentItems = renderCurrentStepItems();

  const renderStepItems = () => {
    return (
      <>
        {currentItems?.items?.length === 0 ? (
          <Text style={styles.noItemsText}>No items found for this step</Text>
        ) : (
          currentItems?.items?.map(item => (
            <View key={item.id} style={styles.itemContainer}>
              <View style={styles.leftIndicator} />
              <View style={styles.itemDetails}>
                <View>
                  <Text style={styles.itemName}>{item.itemName}</Text>
                  {(item.hdSku || item.brand) && (
                    <Text style={styles.itemSubtext}>
                      {item.hdSku && `HD SKU: ${item.hdSku}`}{' '}
                      {item.brand && `Brand: ${item.brand}`}
                    </Text>
                  )}
                </View>
                <View style={styles.actions}>
                  <Image
                    source={
                      item.completionStatus
                        ? require('../../../../assets/icons/check.png')
                        : require('../../../../assets/icons/uncheck.png')
                    }
                    style={styles.icon}
                  />
                  <TouchableOpacity
                    onPress={() => handleEditItem(item, currentItems)}
                    style={styles.actionButton}>
                    <Image
                      source={require('../../../../assets/icons/edit.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {showItemActions === item.id && (
                <View style={styles.itemActionsContainer}>
                  <View style={styles.itemActionsOverlay} />
                  <View style={styles.itemActionsMenu}>
                    <View style={styles.actionMenuItem}>
                      <Text style={styles.actionMenuText}>
                        HD SKU: {item.hdSku || 'N/A'}
                      </Text>
                    </View>
                    <View style={styles.actionMenuItem}>
                      <Text style={styles.actionMenuText}>
                        Brand: {item.brand || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              <View style={styles.inputsContainer}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Unit Cost</Text>
                  <Text style={styles.inputValue}>
                    ${parseFloat(item.unitCost || 0).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Quantity</Text>
                  <Text style={styles.inputValue}>
                    {parseFloat(item.quantity || 0).toFixed(0)}
                  </Text>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabell}>Total</Text>
                  <Text style={styles.inputValuee}>
                    ${parseFloat(item.totalCost || 0).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </>
    );
  };

  const renderCostSummary = () => (
    <View style={styles.costContainer}>
      <View style={styles.leftIndicatorBlue} />
      <View style={styles.costRow}>
        <Text style={styles.costLabel}>Total Project Cost</Text>
        <Text style={styles.costValuee}>
          ${parseFloat(bid?.totalProjectCost || 0).toFixed(2)}
        </Text>
      </View>
      <View style={styles.costRow}>
        <Text style={styles.costLabel}>Markup Percentage</Text>
        <Text style={styles.costValuee}>
          {parseFloat(bid?.markupPercentage || 0).toFixed(1)}%
        </Text>
      </View>
      {/* Horizontal line divider */}
      <View style={styles.divider} />
      <View style={styles.costRow}>
        <Text style={styles.costLabel}>Final Cost</Text>
        <Text style={styles.costValue}>
          ${parseFloat(finalCost || 0).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <UpdateBidImages
          selectedImageFiles={selectedImageFiles}
          setSelectedImageFiles={setSelectedImageFiles}
        />
      );
    }

    if (currentStep === 2) {
      return renderBidInformation();
    }

    return renderStepItems();
  };

  return (
    <SafeAreaView style={styles.container}>
      {(isAddBidLoading || isUploadLoading) && <ActivityIndicatorModal />}
      <View style={styles.header}>
        <TouchableOpacity onPress={goToHomePage} style={styles.backButton}>
          <Image
            source={require('../../../../assets/icons/back-icon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Update Bid</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.stepIndicator}>
        {[1, 2, 3, 4, 5, , 6, 7].map(item => (
          <View
            key={item}
            style={[
              styles.stepCircle,
              currentStep >= item && styles.activeStep,
            ]}>
            <Text style={styles.stepText}>{item}</Text>
          </View>
        ))}
      </View>

      {currentStep === 2 ? (
        <>
          <Text style={styles.sectionTitle}>Bid Information</Text>
          <Text style={[styles.heading, {textAlign: 'center'}]}>Address</Text>
        </>
      ) : (
        <Text style={styles.sectionTitle}>
          {currentStep === 1 ? 'Images' : currentItems?.sectionName}
        </Text>
      )}

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {isLoading ? <ActivityIndicator /> : renderStepContent()}
      </ScrollView>
      <View style={{marginHorizontal: 10, marginTop: 10}}>
        {currentStep !== 1 && currentStep !== 2 && renderCostSummary()}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.prevButton,
            currentStep === 1 && styles.disabledButton,
          ]}
          onPress={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}>
          <Text style={[styles.buttonText, styles.prevButtonText]}>
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={isLoading ? styles.disabledButton : styles.button}
          onPress={
            currentStep === 7
              ? handleUpdate
              : () => {
                  currentStep === 1 &&
                    dispatch(
                      setUpdateBidImages({
                        sectionId: 'images',
                        sectionName: 'images',
                        images: selectedImageFiles?.images?.images,
                      }),
                    );
                  currentStep === 2 &&
                    dispatch(
                      setUpdateBidPropertySection({
                        sectionId:
                          propertySection &&
                          propertySection[Object.keys(propertySection)[0]]
                            ?.sectionId,
                        address: address,
                        areaSqft: area,
                        propertyId: selectedProperty?._id,
                        propertyName: selectedProperty?.name,
                      }),
                    );
                  setCurrentStep(currentStep + 1);
                }
          }
          disabled={isLoading}>
          <Text style={styles.buttonText}>
            {currentStep === 7 ? 'Update' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ViewBid;
