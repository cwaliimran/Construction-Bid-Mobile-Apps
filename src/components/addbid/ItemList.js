import React, {useState, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  Modal,
} from 'react-native';

// Styles
import styles from '../../pages/bid/addbid/styles';
import Toast from 'react-native-toast-message';
import AddModal from './AddModal';

const ItemList = ({
  item,
  data,
  setData,
  activeItemActionsId,
  setActiveItemActionsId,
}) => {
  const [isChecked, setIsChecked] = useState(item.completionStatus);

  const [modalType, setModalType] = useState('');
  const [modalValue, setModalValue] = useState('');

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [unitCost, setUniotCost] = useState(item.unitCost || 0);
  const [quantity, setQuantity] = useState(item.quantity || 0);
  const totalCost = useMemo(() => unitCost * quantity, [unitCost, quantity]);
  const showItemActions = activeItemActionsId === item._id;

  // useEffect(() => {
  //   const total = unitCost * quantity;
  //   setTotalCost(total);
  // }, [unitCost, quantity]);

  const handleModalSubmit = () => {
    setData(prevData =>
      prevData.map(d =>
        d._id === item._id
          ? {
              ...d,
              ...(modalType === 'Brand'
                ? {brand: modalValue}
                : {hdSku: modalValue}),
            }
          : d,
      ),
    );

    setIsModalVisible(false);
    setModalValue('');
  };

  const toggleCheck = useCallback(() => {
    setIsChecked(prev => !prev);
    setData(prevData =>
      prevData.map(d =>
        d._id === item._id
          ? {
              ...d,
              completionStatus: !d?.completionStatus,
            }
          : d,
      ),
    );
  }, []);

  const toggleItemActions = useCallback(() => {
    setActiveItemActionsId(prevId => (prevId === item._id ? null : item._id));
  }, [item._id, activeItemActionsId]);

  const openModal = useCallback((type, itemId) => {
    setModalType(type);
    setModalValue(type === 'Brand' ? item.brand : item.hdSku);
    setIsModalVisible(true);
    setActiveItemActionsId(null);
  }, []);

  const DeleteConfirmationModal = () => {
    return (
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
                source={require('../../../assets/icons/deletemodal.png')}
                style={styles.deleteModalIcon}
              />
              <Text style={styles.deleteModalTitle}>Confirmation</Text>
              <Text style={styles.deleteModalText}>
                Are you sure you want to delete this item?
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  setIsDeleteModalVisible(false);
                  if (data.length === 1) {
                    Toast.show({
                      type: 'error',
                      text1: 'Error',
                      text2: 'At least one item must remain.',
                    });
                    return;
                  }

                  setData(prevData => prevData.filter(i => i._id !== item._id));
                  Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Item deleted successfully.',
                  });
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
  };

  const ItemActions = item => {
    return (
      <Pressable
        style={styles.menuWrapper}
        onPress={() => setActiveItemActionsId(null)}>
        <View style={styles.itemActionsMenu}>
          <TouchableOpacity
            style={styles.actionMenuItem}
            onPress={() => openModal('HD SKU', item.id)}>
            <Image
              source={require('../../../assets/icons/add-icon-popup.png')}
              style={styles.actionMenuIcon}
            />
            <Text style={styles.actionMenuText}>HD SKU</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionMenuItem}
            onPress={() => openModal('Brand', item.id)}>
            <Image
              source={require('../../../assets/icons/add-icon-popup.png')}
              style={styles.actionMenuIcon}
            />
            <Text style={styles.actionMenuText}>Brand</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionMenuItem, styles.lastMenuItem]}
            onPress={() => {
              // setSelectedItemId(item.id);
              setIsDeleteModalVisible(true);
              setActiveItemActionsId(null);
            }}>
            <Image
              source={require('../../../assets/icons/delete-icon-popup.png')}
              style={styles.actionMenuIcon}
            />
            <Text style={styles.actionMenuText}>Delete Item</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  };

  return (
    <View>
      <DeleteConfirmationModal />
      <AddModal
        isModalVisible={isModalVisible}
        Set_Modal_Visibilty={setIsModalVisible}
        modalType={modalType}
        handleModalSubmit={handleModalSubmit}
        modalValue={modalValue}
        setModalValue={setModalValue}
      />
      {showItemActions && <ItemActions item={item} />}
      <View key={item._id} style={styles.itemContainer}>
        <View style={styles.leftIndicator}></View>

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
            <TouchableOpacity onPress={toggleCheck} style={styles.actionButton}>
              <Image
                source={
                  isChecked
                    ? require('../../../assets/icons/check.png')
                    : require('../../../assets/icons/uncheck.png')
                }
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleItemActions}
              style={styles.actionButton}>
              <Image
                source={require('../../../assets/icons/more.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.textinput}
            placeholder="Unit cost"
            placeholderTextColor="#CCCCCC"
            value={String(unitCost)}
            onChangeText={text => {
              const sanitizedText = text.replace(/[^0-9.]/g, '');
              const validText =
                sanitizedText.split('.').length > 2
                  ? sanitizedText.slice(0, sanitizedText.lastIndexOf('.'))
                  : sanitizedText;
              const updatedUnitCost = Number(validText);
              setUniotCost(updatedUnitCost);
              setData(prevData =>
                prevData.map(d =>
                  d._id === item._id
                    ? {
                        ...d,
                        unitCost: updatedUnitCost,
                        totalCost: updatedUnitCost * d.quantity,
                      }
                    : d,
                ),
              );
            }}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.textinput}
            placeholder="Quantity"
            keyboardType="numeric"
            value={String(quantity)}
            onChangeText={text => {
              const sanitized = text.replace(/[^0-9]/g, '');
              const updatedQuantity = Number(sanitized);
              setQuantity(updatedQuantity);
              setData(prevData =>
                prevData.map(d =>
                  d._id === item._id
                    ? {
                        ...d,
                        unitCost: updatedQuantity,
                        totalCost: updatedQuantity * d.unitCost,
                      }
                    : d,
                ),
              );
            }}
          />
          {/* <Text style={styles.textinput}>{totalCost}</Text> */}
          <TextInput
            style={styles.textinput}
            placeholder="Total"
            value={String(totalCost)}
            keyboardType="numeric"
            editable={false}
          />
        </View>
        {/* <CostSummary totalProjectCost={totalProjectCost} /> */}
      </View>
    </View>
  );
};

export default ItemList;
