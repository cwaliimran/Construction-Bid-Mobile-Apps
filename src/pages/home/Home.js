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
import {fonts} from '../../utls/styles';
import {Swipeable} from 'react-native-gesture-handler';
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

  const renderBidItem = ({item}) => {
    const renderRightActions = () => (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}>
        <Image
          source={require('../../../assets/icons/delete.png')}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    );

    return (
      <Swipeable renderRightActions={renderRightActions}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 39,
    height: 39,
    resizeMode: 'contain',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 4, 4, 0.4)',
    justifyContent: 'flex-start',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  titleAndFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  myBidsTitle: {
    fontWeight: '700',
    fontSize: 24,
    fontFamily: fonts.Medium,
    color: '#333333',
  },
  filterButton: {
    padding: 10,
    marginRight: 0,
  },
  filterIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  bidsList: {
    marginBottom: 70,
  },
  bidContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 0,
    paddingLeft: 35,
  },
  greenBar: {
    width: 8,
    height: 85,
    backgroundColor: '#00FFB7',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  bidContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  numberWrapper: {
    position: 'absolute',
    top: -16,
    left: -40,
    backgroundColor: '#0060CE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  numberText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 8,
    marginRight: 15,
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  textWrapper: {
    flex: 1,
  },
  bidTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: fonts.Medium,
    color: '#333333',
  },
  bidDate: {
    fontSize: 12,
    color: '#666666',
  },
  editButton: {
    padding: 10,
    borderRadius: 8,
  },
  editIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    width: 100,
  },
  deleteIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#1D75D8',
    borderRadius: 50,
    padding: 15,
    elevation: 10,
  },
  addIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  popupMenu: {
    position: 'absolute',
    top: 80, // Adjusted to be below header
    right: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 150,
    zIndex: 1000,
  },
  popupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  popupIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  popupText: {
    fontSize: 16,
    color: '#333333',
    fontFamily: fonts.Medium,
  },
  popupDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 4,
  },
});

export default Home;
