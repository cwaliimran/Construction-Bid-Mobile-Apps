import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {INITIAL_ITEMS} from '../../../data/addbid/INITIAL_ITEMS';
import styles from './styles';

const InitialData = INITIAL_ITEMS;

const STEP_DETAILS = {
  2: {title: 'Plumbing'},
  3: {title: 'HVAC'},
  4: {title: 'Electric'},
  5: {title: 'General'},
  6: {title: 'Misc. Work'},
};

const ViewBid = ({route}) => {
  const navigation = useNavigation();
  const {bidData} = route.params;

  const [currentStep, setCurrentStep] = React.useState(bidData.step || 1);
  const [showItemActions, setShowItemActions] = React.useState(null);

  // Get items directly from bidData or use InitialData as fallback
  const items = bidData.itemsByStep || InitialData;

  const goToHomePage = () => navigation.navigate('Home');

  const handleUpdate = () => {
    navigation.navigate('UpdateBid', {bidData});
  };

  const handleEditItem = item => {
    navigation.navigate('EditItem', {
      item,
      bidData,
      step: currentStep,
    });
  };

  const toggleItemActions = id => {
    setShowItemActions(showItemActions === id ? null : id);
  };

  const renderBidInformation = () => (
    <>
      <Text style={styles.sectionTitle}>Bid Information</Text>
      <Text style={styles.heading}>Address</Text>
      <View style={styles.inputContainer}>
        <Image
          source={require('../../../../assets/icons/location.png')}
          style={styles.icon}
        />
        <Text style={styles.viewText}>
          {bidData.address || 'No address provided'}
        </Text>
      </View>
      <Text style={styles.heading}>Area SQ.FT</Text>
      <View style={styles.inputContainer}>
        <Image
          source={require('../../../../assets/icons/location.png')}
          style={styles.icon}
        />
        <Text style={styles.viewText}>
          {bidData.area ? `${bidData.area} sq.ft` : 'No area specified'}
        </Text>
      </View>
      <Text style={styles.heading}>Property Type</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.viewText}>
          {bidData.propertyType || 'No property type specified'}
        </Text>
      </View>
    </>
  );

  const renderStepItems = () => {
    // Get items for current step
    const currentItems = items[currentStep] || [];

    return (
      <>
        <Text style={styles.sectionTitle}>
          {STEP_DETAILS[currentStep]?.title}
        </Text>
        {currentItems.length === 0 ? (
          <Text style={styles.noItemsText}>No items found for this step</Text>
        ) : (
          currentItems.map(item => (
            <View key={item.id} style={styles.itemContainer}>
              <View style={styles.leftIndicator} />
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
                  <Image
                    source={
                      item.checked
                        ? require('../../../../assets/icons/check.png')
                        : require('../../../../assets/icons/uncheck.png')
                    }
                    style={styles.icon}
                  />
                  <TouchableOpacity
                    onPress={() => handleEditItem(item)}
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
                    ${parseFloat(item.total || 0).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
        {renderCostSummary()}
      </>
    );
  };

  const renderCostSummary = () => (
    <View style={styles.costContainer}>
      <View style={styles.leftIndicatorBlue} />
      <View style={styles.costRow}>
        <Text style={styles.costLabel}>Total Project Cost</Text>
        <Text style={styles.costValuee}>
          ${parseFloat(bidData.totalProjectCost || 0).toFixed(2)}
        </Text>
      </View>
      <View style={styles.costRow}>
        <Text style={styles.costLabel}>Markup Percentage</Text>
        <Text style={styles.costValuee}>
          {parseFloat(bidData.markupPercentage || 0).toFixed(1)}%
        </Text>
      </View>
      {/* Horizontal line divider */}
      <View style={styles.divider} />
      <View style={styles.costRow}>
        <Text style={styles.costLabel}>Final Cost</Text>
        <Text style={styles.costValue}>
          ${parseFloat(bidData.finalCost || 0).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  const renderStepContent = () => {
    if (currentStep === 1) {
      return renderBidInformation();
    }
    return renderStepItems();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goToHomePage} style={styles.backButton}>
            <Image
              source={require('../../../../assets/icons/back-icon.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>{bidData.tittle}</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.stepIndicator}>
          {[1, 2, 3, 4, 5, 6].map(item => (
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

        {renderStepContent()}
      </ScrollView>

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
          style={styles.button}
          onPress={
            currentStep === 6
              ? handleUpdate
              : () => setCurrentStep(currentStep + 1)
          }>
          <Text style={styles.buttonText}>
            {currentStep === 6 ? 'Update' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ViewBid;
