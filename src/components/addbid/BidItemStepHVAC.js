import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
  Modal,
  FlatList,
} from 'react-native';

// Styles
import styles from '../../pages/bid/addbid/styles';

// Third Party
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LoaderKit from 'react-native-loader-kit';

// Import Components
import {getBidHVACItem} from '../../store/slices/bid';
import ActivityIndicator from '../modal/ActivityIndicator';
import ItemList from './ItemList';
import Toast from 'react-native-toast-message';
import {colors} from '../../utls/styles';

const BidItemStepHVAC = ({
  handleData,
  setCurrentSectionId,
  setCurrentSection,
  activeItemActionsId,
  setActiveItemActionsId,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isLoading, addNewItem, totalPagesItem} = useSelector(
    state => state.bid,
  );
  const [data, setData] = useState([]);
  const [sectionId, setSectionId] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [isMoreLoading, setIsMoreLoading] = useState(false);

  useEffect(() => {
    if (addNewItem && addNewItem.length > 0) {
      const newData = addNewItem.filter(i => i.sectionId === sectionId);

      if (newData.length > 0) {
        setData(prevData => [...prevData, ...newData]);
      }
    }
  }, [addNewItem]);

  useEffect(() => {
    if (data?.length > 0) {
      const parentData = {[sectionId]: data};
      handleData(parentData);
    }
  }, [data]);

  const fetchData = () => {
    dispatch(getBidHVACItem(page, search))
      .then(response => {
        setData(response?.data?.items);
        setSectionId(response?.data?.sectionId);
        setCurrentSectionId(response?.data?.sectionId);
        setCurrentSection('HVAC');
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error?.response?.data?.error || 'Something went wrong',
        });
      });
  };

  useEffect(() => {
    setPage(1);
    fetchData();
  }, []);

  useEffect(() => {
    setPage(1);
    fetchData();
  }, [search]);

  const handleSearch = () => {
    setPage(1);
    fetchData();
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
    if (!isMoreLoading && page < totalPagesItem) {
      setIsMoreLoading(true);
      const nextPage = page + 1;

      dispatch(getBidHVACItem(nextPage, search))
        .then(response => {
          setData(prevData => [...prevData, ...response?.data?.items]);
          setIsMoreLoading(false);
          setPage(nextPage);
        })
        .catch(error => {
          setIsMoreLoading(false);
        });
    }
  };

  return (
    <View style={{flex: 1}}>
      <Text style={styles.sectionTitle}>HVAC</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{flex: 1}}>
          {/* {data.map(item => (
            <ItemList item={item} data={data} setData={setData} />
          ))} */}

          {/* <View style={styles.searchInput}>
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
                onPress={() => {
                  setSearch('');
                }}>
                <Image
                  source={require('../../../assets/icons/cross.png')}
                  style={styles.img}
                  tintColor={colors.grey}
                />
              </TouchableOpacity>
            )}
          </View> */}

          <FlatList
            data={data}
            renderItem={({item}) => (
              <ItemList
                item={item}
                data={data}
                setData={setData}
                activeItemActionsId={activeItemActionsId}
                setActiveItemActionsId={setActiveItemActionsId}
              />
            )}
            keyExtractor={item => item._id}
            // showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
          />
        </View>
      )}
    </View>
  );
};

export default BidItemStepHVAC;
