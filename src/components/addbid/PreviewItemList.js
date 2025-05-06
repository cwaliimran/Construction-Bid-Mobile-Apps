import React from 'react';
import {Text, TextInput, TouchableOpacity, View, Image} from 'react-native';

// Styles
import styles from '../../pages/bid/addbid/styles';

const PreviewItemList = ({item}) => {
  const totalCost = item?.unitCost || 0 * item?.quantity || 0;

  return (
    <View key={item?._id} style={[styles.itemContainer, {marginRight: 15}]}>
      <View style={styles.leftIndicator} />

      <View style={styles.itemDetails}>
        <View>
          <Text style={styles.itemName}>{item?.itemName}</Text>
          {(item?.hdSku || item?.brand) && (
            <Text style={styles.itemSubtext}>
              {item?.hdSku && `HD SKU: ${item?.hdSku}`}{' '}
              {item?.brand && `Brand: ${item?.brand}`}
            </Text>
          )}
        </View>
        <View style={styles.actions}>
          <TouchableOpacity disabled style={styles.actionButton}>
            <Image
              source={
                item?.completionStatus
                  ? require('../../../assets/icons/check.png')
                  : require('../../../assets/icons/uncheck.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputsContainer}>
        <TextInput
          style={{
            borderRadius: 10,
            borderColor: '#0000001A',
            borderWidth: 1,
            paddingVertical: 5,
            paddingHorizontal: 10
          }}
          editable={false}
          placeholder="Unit cost"
          placeholderTextColor="#CCCCCC"
          value={String(item?.unitCost || 0)}
        />
        <TextInput
          style={{
            borderRadius: 10,
            borderColor: '#0000001A',
            borderWidth: 1,
            paddingVertical: 5,
            paddingHorizontal: 10
          }}
          editable={false}
          placeholder="Quantity"
          value={String(item?.quantity || 0)}
        />
        <TextInput
          style={{
            borderRadius: 10,
            borderColor: '#0000001A',
            borderWidth: 1,
            paddingVertical: 5,
            paddingHorizontal: 10
          }}
          placeholder="Total"
          value={String(totalCost)}
          editable={false}
        />
      </View>
    </View>
  );
};

export default PreviewItemList;
