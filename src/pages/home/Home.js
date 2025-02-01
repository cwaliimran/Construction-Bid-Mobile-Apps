import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {INITIAL_ITEMS} from '../../data/viewbid/INITIAL_ITEMS';
import {Swipeable} from 'react-native-gesture-handler';
import styles from './styles';

const Home = () => {
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);
  const [bids, setBids] = useState([
    {id: '01', title: 'Bid Address', created: '13 Jan 2025'},
    {id: '02', title: 'Bid Address', created: '14 Jan 2025'},
    {id: '03', title: 'Bid Address', created: '15 Jan 2025'},
    {id: '04', title: 'Bid Address', created: '16 Jan 2025'},
    {id: '05', title: 'Bid Address', created: '17 Jan 2025'},
    {id: '06', title: 'Bid Address', created: '18 Jan 2025'},
    {id: '07', title: 'Bid Address', created: '18 Jan 2025'},
  ]);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [selectedBidId, setSelectedBidId] = useState(null);

  const handleLogout = () => {
    setShowPopup(false);
    navigation.navigate('SignIn');
  };

  const handleProfilePress = () => {
    setShowPopup(false);
    navigation.navigate('ProfileScreen');
  };

  const handleDelete = id => {
    setBids(bids.filter(bid => bid.id !== id));
    setDeleteConfirmVisible(false);
  };
  const PopupMenu = () => (
    <Modal
      transparent={true}
      visible={showPopup}
      onRequestClose={() => setShowPopup(false)}
      animationType="fade">
      <TouchableWithoutFeedback onPress={() => setShowPopup(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.popupMenu}>
              <TouchableOpacity
                style={styles.popupItem}
                onPress={handleProfilePress}>
                <Image
                  source={require('../../../assets/icons/profile-popup.png')}
                  style={styles.popupIcon}
                />
                <Text style={styles.popupText}>Profile</Text>
              </TouchableOpacity>

              <View style={styles.popupDivider} />

              <TouchableOpacity style={styles.popupItem} onPress={handleLogout}>
                <Image
                  source={require('../../../assets/icons/logout-popup.png')}
                  style={styles.popupIcon}
                />
                <Text style={styles.popupText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
  const DeleteConfirmationModal = () => (
    <Modal
      transparent={true}
      visible={deleteConfirmVisible}
      animationType="fade">
      <TouchableWithoutFeedback onPress={() => setDeleteConfirmVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.confirmationModal}>
              <Image
                source={require('../../../assets/icons/deletemodal.png')}
                style={styles.confirmationImage}
              />
              <Text style={styles.confirmation}>Confirmation</Text>
              <Text style={styles.confirmationText}>
                Are you sure you want to delete this bid?
              </Text>
              <View style={styles.confirmationButtons}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => handleDelete(selectedBidId)}>
                  <Text style={styles.confirmButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setDeleteConfirmVisible(false)}>
                  <Text style={styles.cancelButtonText}>Not Yet</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const renderBidItem = ({item}) => {
    const renderRightActions = () => (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          setSelectedBidId(item.id);
          setDeleteConfirmVisible(true);
        }}>
        <Image
          source={require('../../../assets/icons/delete.png')}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    );
    return (
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ViewBid', {
              bidData: {
                tittle: 'Jan 31st',
                step: 1,
                address: item.title,
                area: '1000',
                propertyType: 'Single Bedroom',
                itemsByStep: INITIAL_ITEMS,
                totalProjectCost: 50,
                markupPercentage: 50,
                finalCost: 75,
              },
            })
          }>
          <View style={styles.bidContainer}>
            <View style={styles.greenBar}></View>
            <View style={styles.bidContent}>
              <View style={styles.numberWrapper}>
                <Text style={styles.numberText}>{item.id}</Text>
              </View>
              <View style={styles.iconWrapper}>
                <Image
                  source={require('../../../assets/icons/pdf.png')}
                  style={styles.icon}
                />
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.bidTitle}>{item.title}</Text>
                <Text style={styles.bidDate}>Created {item.created}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Image
                source={require('../../../assets/icons/edit.png')}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/icons/LOGO(Home).png')}
          style={styles.logo}
        />
        <TouchableOpacity onPress={() => setShowPopup(!showPopup)}>
          <Image
            source={require('../../../assets/icons/profile.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      <DeleteConfirmationModal />
      <PopupMenu />

      <View style={styles.titleAndFilter}>
        <Text style={styles.myBidsTitle}>My Bids</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => console.log('Filter pressed')}>
          <Image
            source={require('../../../assets/icons/filter.png')}
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={bids}
        renderItem={renderBidItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.bidsList}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddBid')}>
        <Image
          source={require('../../../assets/icons/add.png')}
          style={styles.addIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
