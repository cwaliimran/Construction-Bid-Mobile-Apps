import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import PreviewItemList from '../../../components/addbid/PreviewItemList';

const PreviewBid = ({navigation, route}) => {
  const bidData = route?.params?.bidData;

  const sections = [
    {
      _id: '678b5d9f713248c7aca857be',
      name: 'Bid Information',
    },
    {
      _id: '678b5db2713248c7aca857bf',
      name: 'Plumbing',
    },
    {
      _id: '678b5db7713248c7aca857c0',
      name: 'HVAC',
    },
    {
      _id: '678b5dc2713248c7aca857c1',
      name: 'Electric',
    },
    {
      _id: '678b5dc8713248c7aca857c2',
      name: 'General',
    },
    {
      _id: '678b5de1713248c7aca857c3',
      name: 'Miscellaneous Work',
    },
  ];

  const properties = [
    {
      _id: '6818c17a4ddb086a016d701d',
      name: 'Apartment',
    },
    {
      _id: '6818c18d4ddb086a016d701e',
      name: 'House',
    },
    {
      _id: '6818c19c9528e726fa9a4464',
      name: 'Other',
    },
  ];

  const selectedProperty = properties?.find(
    item =>
      item?._id === bidData?.sections['678b5d9f713248c7aca857be']?.propertyId,
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../../../../assets/icons/back-icon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Preview Bid</Text>
        </View>
        <View style={styles.placeholder} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        style={{marginHorizontal: 15}}>
        <Text style={styles.heading}>Address</Text>
        <Text style={styles.detailText}>
          {bidData?.sections['678b5d9f713248c7aca857be']?.address}
        </Text>
        <Text style={styles.heading}>Property Type</Text>
        <Text style={styles.detailText}>{selectedProperty?.name}</Text>
        <Text style={styles.heading}>Area (Sq.ft)</Text>
        <Text style={styles.detailText}>
          {bidData?.sections['678b5d9f713248c7aca857be']?.areaSqft}
        </Text>
        <Text style={styles.heading}>Total Project Cost</Text>
        <Text style={styles.detailText}>
          $ {bidData?.totalProjectCost?.toFixed(2)}
        </Text>
        <Text style={styles.heading}>Markup Percentage</Text>
        <Text style={styles.detailText}>{bidData?.markupPercentage}</Text>
        <Text style={styles.heading}>Final Cost</Text>
        <Text style={styles.detailText}>$ {bidData?.finalCost.toFixed(2)}</Text>
        {bidData?.selectedImageFiles?.length > 0 && (
          <>
            <Text style={styles.heading}>Images</Text>
            <FlatList
              style={{flexGrow: 1}}
              data={bidData?.selectedImageFiles}
              horizontal
              renderItem={({item, index}) => (
                <FastImage
                  key={index}
                  source={{
                    uri: item?.fileUrl,
                    priority: FastImage.priority.high,
                  }}
                  style={styles.img_upload}
                  resizeMode={FastImage.resizeMode.cover}
                />
              )}
              keyExtractor={(item, index) => index?.toString()}
            />
          </>
        )}
        {bidData?.sections['678b5db2713248c7aca857bf']?.length > 0 && (
          <>
            <Text style={styles.heading}>Plumbing</Text>
            <FlatList
              data={bidData?.sections['678b5db2713248c7aca857bf']}
              horizontal
              renderItem={({item}) => <PreviewItemList item={item} />}
              keyExtractor={(item, index) => index?.toString()}
            />
          </>
        )}
        {bidData?.sections['678b5db7713248c7aca857c0']?.length > 0 && (
          <>
            <Text style={styles.heading}>HVAC</Text>
            <FlatList
              data={bidData?.sections['678b5db7713248c7aca857c0']}
              horizontal
              renderItem={({item}) => <PreviewItemList item={item} />}
              keyExtractor={(item, index) => index?.toString()}
            />
          </>
        )}
        {bidData?.sections['678b5dc2713248c7aca857c1']?.length > 0 && (
          <>
            <Text style={styles.heading}>Electric</Text>
            <FlatList
              data={bidData?.sections['678b5dc2713248c7aca857c1']}
              horizontal
              renderItem={({item}) => <PreviewItemList item={item} />}
              keyExtractor={(item, index) => index?.toString()}
            />
          </>
        )}
        {bidData?.sections['678b5dc8713248c7aca857c2']?.length > 0 && (
          <>
            <Text style={styles.heading}>General</Text>
            <FlatList
              data={bidData?.sections['678b5dc8713248c7aca857c2']}
              horizontal
              renderItem={({item}) => <PreviewItemList item={item} />}
              keyExtractor={(item, index) => index?.toString()}
            />
          </>
        )}
        {bidData?.sections['678b5de1713248c7aca857c3']?.length > 0 && (
          <>
            <Text style={styles.heading}>Misc Work</Text>
            <FlatList
              data={bidData?.sections['678b5de1713248c7aca857c3']}
              horizontal
              renderItem={({item}) => <PreviewItemList item={item} />}
              keyExtractor={(item, index) => index?.toString()}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PreviewBid;
