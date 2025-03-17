import React, {useState, useEffect} from 'react';
import {Image, Text, TextInput, View} from 'react-native';

import {Picker} from '@react-native-picker/picker';

// Styles
import styles from '../../pages/bid/addbid/styles';
import {useDispatch} from 'react-redux';

// Third Party
import ChevronIcon from 'react-native-vector-icons/Feather';
import {Dropdown} from 'react-native-element-dropdown';

// Import Components
import {getBidPropertyType} from '../../store/slices/bid';
import {colors, fonts} from '../../utls/styles';

const BidInformation = ({
  selectedProperty,
  setSelectedProperty,
  address,
  setAddress,
  area,
  setArea,
  handleData,
}) => {
  const dispatch = useDispatch();
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [sectionId, setSectionId] = useState('');

  const renderItem = () => (
    <ChevronIcon
      name="chevron-down"
      size={24}
      color={colors.black}
      style={{marginRight: 10}}
    />
  );

  useEffect(() => {
    console.log(
      'object ------>',
      selectedProperty && area && address,
      selectedProperty,
      area,
      address,
    );
    if (selectedProperty && selectedProperty?._id && area && address) {
      const parentData = {
        [sectionId]: {
          address: address,
          propertyId: selectedProperty?._id,
          areaSqft: Number(area),
        },
      };
      handleData(parentData);
    }
  }, [address, area, selectedProperty]);

  useEffect(() => {
    dispatch(getBidPropertyType())
      .then(response => {
        setPropertyOptions(response?.data?.properties);
        setSectionId(response?.data?.sectionId);
      })
      .catch(error => {
        console.log('error poroperty api ------->', error?.response?.data);
      });
  }, []);

  return (
    <>
      <Text style={styles.sectionTitle}>Bid Information</Text>
      <Text style={styles.heading}>Address</Text>
      <View style={styles.inputContainer}>
        <Image
          source={require('../../../assets/icons/location.png')}
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
          source={require('../../../assets/icons/location.png')}
          style={styles.icon}
        />
        <TextInput
          placeholder="Enter Area (sq.ft)"
          style={styles.input}
          placeholderTextColor="#CCCCCC"
          keyboardType="numeric"
          value={area}
          onChangeText={text => setArea(text)}
        />
      </View>
      <Text style={styles.heading}>Property Type</Text>

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
};

export default BidInformation;
