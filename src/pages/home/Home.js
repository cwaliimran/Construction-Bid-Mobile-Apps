import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  RefreshControl,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../store/slices/user';
import GeneralModal from '../../components/modal/general-modal';
import ActivityIndicatorModal from '../../components/modal/ActivityIndicatorModal';
import {deleteBid, getBids} from '../../store/slices/bid';
import ActivityIndicator from '../../components/modal/ActivityIndicator';
import {commonStyles} from '../../utls/styles';
import moment from 'moment';
import Toast from 'react-native-toast-message';

const Home = ({navigation}) => {
  // API data
  const dispatch = useDispatch();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const {isLoading, isDeleteLoading, bids} = useSelector(state => state.bid);

  const [showPopup, setShowPopup] = useState(false);

  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [selectedBidId, setSelectedBidId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // const fetchBids = async () => {
  //   // setRefreshing(true);
  //   // try {
  //   //   const response = await fetch('http://192.168.18.234:5000/home/bids', {
  //   //     method: 'GET',
  //   //     headers: {
  //   //       Authorization: `Bearer ${token}`,
  //   //     },
  //   //   });
  //   //   const json = await response.json();
  //   //   if (json.message === 'Bids fetched successfully') {
  //   //     setBids(
  //   //       json.bids.map((bid, index) => ({
  //   //         id: String(index + 1),
  //   //         title: bid.address,
  //   //         created: new Date(bid.createdAt).toLocaleDateString(),
  //   //       })),
  //   //     );
  //   //   }
  //   // } catch (error) {
  //   //   console.error('Failed to fetch bids', error);
  //   // } finally {
  //   //   setRefreshing(false);
  //   // }
  // };

  const fetchBids = async () => {
    await dispatch(getBids());
  };

  useEffect(() => {
    fetchBids();
  }, []);

  // const onRefresh = () => {
  //   fetchBids();
  // };

  const onRefresh = () => {
    setRefreshing(true);
    fetchBids();
    setRefreshing(false);
  };

  const handleLogout = () => {
    setShowPopup(false);
    setIsLogoutLoading(true);
    setTimeout(() => {
      setIsLogoutLoading(false);
      dispatch(setUser(null));
      navigation.reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      });
    }, 1000);
  };

  const handleProfilePress = () => {
    setShowPopup(false);
    setTimeout(() => {
      navigation.navigate('ProfileScreen');
    }, 400);
  };

  const handleDelete = async () => {
    setDeleteConfirmVisible(false);
    await dispatch(deleteBid(selectedBidId))
      .then(response => {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response?.data?.message,
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

  const renderBidItem = ({item, index}) => {
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
                title: item.title,
                created: item.created,
                id: item.id,
              },
            })
          }>
          <View style={styles.bidContainer}>
            <View style={styles.greenBar}></View>
            <View style={styles.bidContent}>
              <View style={styles.numberWrapper}>
                <Text style={styles.numberText}>
                  {' '}
                  {String(index + 1).padStart(2, '0')}
                </Text>
              </View>
              <View style={styles.iconWrapper}>
                <Image
                  source={require('../../../assets/icons/pdf.png')}
                  style={styles.icon}
                />
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.bidTitle}>{item.address}</Text>
                <Text style={styles.bidDate}>
                  Created {moment(item.createdAt).format('DD MMM YYYY')}
                </Text>
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
      {(isLogoutLoading || isDeleteLoading) && <ActivityIndicatorModal />}
      {err && (
        <GeneralModal
          modalError={true}
          description={errMsg}
          Set_Modal_Visibilty={setErr}
        />
      )}
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

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={bids}
          renderItem={renderBidItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.bidsList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={
            !isLoading &&
            bids?.length < 1 && (
              <View style={{marginVertical: 20}} refre>
                <Text style={commonStyles.noDataText}>No data found</Text>
              </View>
            )
          }
        />
      )}

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
