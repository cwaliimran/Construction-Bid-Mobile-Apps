import React, {useState, useEffect, useCallback} from 'react';
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
  TextInput,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../store/slices/user';
import GeneralModal from '../../components/modal/general-modal';
import ActivityIndicatorModal from '../../components/modal/ActivityIndicatorModal';
import {deleteBid, emptyAddItem, getBids} from '../../store/slices/bid';
import ActivityIndicator from '../../components/modal/ActivityIndicator';
import {colors, commonStyles} from '../../utls/styles';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';
import LoaderKit from 'react-native-loader-kit';
import FastImage from 'react-native-fast-image';

const Home = ({navigation}) => {
  // API data
  const dispatch = useDispatch();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const {isLoading, isDeleteLoading, bids, totalPages} = useSelector(
    state => state.bid,
  );

  const {user} = useSelector(state => state.auth);

  const [showPopup, setShowPopup] = useState(false);

  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [selectedBidId, setSelectedBidId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [isMoreLoading, setIsMoreLoading] = useState(false);
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
    await dispatch(getBids(1, search));
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(emptyAddItem());
    }, []),
  );

  useEffect(() => {
    setPage(1);
    fetchBids();
  }, []);

  // const onRefresh = () => {
  //   fetchBids();
  // };

  const onRefresh = () => {
    setPage(1);
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

  const handleSearch = () => {
    setPage(1);
    fetchBids();
  };

  const renderFooter = () => {
    if (!isMoreLoading) return null;
    return (
      <View style={{paddingVertical: 20, alignSelf: 'center'}}>
        <LoaderKit
          style={{width: 40, height: 40}}
          name={'BallSpinFadeLoader'}
          color={colors.blue}
        />
      </View>
    );
  };

  const handleLoadMore = () => {
    if (!isMoreLoading && page < totalPages) {
      setIsMoreLoading(true);
      const nextPage = page + 1;
      setPage(nextPage);
      dispatch(getBids(nextPage, search))
        .then(() => {
          setIsMoreLoading(false);
        })
        .catch(error => {
          setIsMoreLoading(false);
        });
    }
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

  const Item = ({item, index}) => {
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
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate('ViewBid', {
                bidId: item.id,
              })
            }>
            <Image
              source={require('../../../assets/icons/edit.png')}
              style={styles.editIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate('SubmitBid', {
                bidId: item.id,
              })
            }>
            <Image
              source={require('../../../assets/icons/more.png')}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
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
          {user?.profilePicture ? (
            <FastImage
              source={{
                uri: user?.profilePicture,
                priority: FastImage.priority.high,
              }}
              style={styles.profileImage}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <Image
              source={require('../../../assets/icons/profile.png')}
              style={styles.profileImage}
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>
      </View>
      <DeleteConfirmationModal />
      <PopupMenu />

      <View style={styles.titleAndFilter}>
        <Text style={styles.myBidsTitle}>My Bids</Text>
        {/* <TouchableOpacity
          style={styles.filterButton}
          onPress={() => console.log('Filter pressed')}>
          <Image
            source={require('../../../assets/icons/filter.png')}
            style={styles.filterIcon}
          />
        </TouchableOpacity> */}
      </View>

      <View style={styles.input}>
        <Image
          source={require('../../../assets/icons/search-01.png')}
          style={styles.img}
          tintColor={colors.blue}
        />
        <TextInput
          placeholder={'Search'}
          placeholderTextColor={colors.grey}
          style={{width: '82%', color: colors.black}}
          value={search}
          onChangeText={text => setSearch(text)}
          onSubmitEditing={handleSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity
            onPress={async () => {
              setSearch('');
              setPage(1);
              await dispatch(getBids(1, ''));
            }}>
            <Image
              source={require('../../../assets/icons/cross.png')}
              style={styles.img}
              tintColor={colors.grey}
            />
          </TouchableOpacity>
        )}
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={bids}
          renderItem={({item, index}) => <Item item={item} index={index} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.bidsList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={() => (
            <>
              {!isLoading && bids?.length < 1 && (
                <View style={{marginVertical: 20}}>
                  <Text style={commonStyles.noDataText}>No data found</Text>
                </View>
              )}
              {renderFooter()}
            </>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
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
