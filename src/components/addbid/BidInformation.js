import React, {useState, useEffect} from 'react';
import {Image, ScrollView, Text, TextInput, View} from 'react-native';

// Styles
import styles from '../../pages/bid/addbid/styles';
import {useDispatch} from 'react-redux';

// Third Party
import ChevronIcon from 'react-native-vector-icons/Feather';
import {Dropdown} from 'react-native-element-dropdown';

// Import Components
import {getBidPropertyType} from '../../store/slices/bid';
import {colors, fonts} from '../../utls/styles';
import Toast from 'react-native-toast-message';

const BidInformation = ({
  selectedProperty,
  setSelectedProperty,
  address,
  setAddress,
  area,
  setArea,
  handleData,
}) => {
  const [areas, setAreas] = useState({
    livingRoom: '',
    kitchen: '',
    diningRoom: '',
    bathroom: '',
    bedroom1: '',
    bedroom2: '',
    bedroom3: '',
    bedroom4: '',
    basement: '',
    other: '',
  });
  const handleChange = (key, value) => {
    if (/^\d*$/.test(value)) {
      setAreas(prev => ({...prev, [key]: value}));
    }
  };
  const getTotalArea = () => {
    return Object.values(areas).reduce(
      (acc, val) => acc + (parseInt(val) || 0),
      0,
    );
  };

  const renderInput = (label, key) => (
    <View style={styles.inputWrapper} key={key}>
      <Text style={styles.arearLabel}>{label}</Text>
      <TextInput
        placeholder="0"
        style={styles.areaInput}
        placeholderTextColor="#CCCCCC"
        keyboardType="numeric"
        value={areas[key]}
        onChangeText={value => handleChange(key, value)}
      />
    </View>
  );

  const roomLabels = [
    {label: 'Living Room', key: 'livingRoom'},
    {label: 'Kitchen', key: 'kitchen'},
    {label: 'Dining Room', key: 'diningRoom'},
    {label: 'Bathroom', key: 'bathroom'},
    {label: 'Bedroom 1', key: 'bedroom1'},
    {label: 'Bedroom 2', key: 'bedroom2'},
    {label: 'Bedroom 3', key: 'bedroom3'},
    {label: 'Bedroom 4', key: 'bedroom4'},
    {label: 'Basement', key: 'basement'},
    {label: 'Other', key: 'other'},
  ];

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
    if (selectedProperty && selectedProperty?._id && area && address) {
      const parentData = {
        ['678b5d9f713248c7aca857be']: {
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
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error?.response?.data?.error || 'Something went wrong',
        });
      });
  }, []);

  useEffect(() => {
    const totalArea = getTotalArea(areas);
    if (totalArea === 0) {
      setArea('');
    } else {
      setArea(totalArea.toString());
    }
  }, [areas]);

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 300}}
      showsVerticalScrollIndicator={false}>
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
      <View
        style={[
          styles.inputContainer,
          {borderWidth: 0, marginTop: -20, marginLeft: -20},
        ]}>
        <Image
          source={require('../../../assets/icons/selection.png')}
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, {marginTop: 3, marginLeft: -5}]}
          placeholderTextColor="#CCCCCC"
          keyboardType="numeric"
          value={area || '0'}
          editable={false}
        />
      </View>
      <View style={styles.areaInputsWrapper}>
        {roomLabels.map((room, index) => {
          if (index % 3 === 0) {
            return (
              <View key={index} style={styles.areaRow}>
                {roomLabels
                  .slice(index, index + 3)
                  .map(r => renderInput(r.label, r.key))}
              </View>
            );
          }
        })}
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
    </ScrollView>
  );
};

export default BidInformation;
