import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
  Modal,
} from 'react-native';

// Styles
import styles from '../../pages/bid/addbid/styles';

// Third Party
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

// Import Components
import {getBidMiscWorkItem} from '../../store/slices/bid';
import ActivityIndicator from '../modal/ActivityIndicator';
import ItemList from './ItemList';

const BidItemStepMiscWork = ({handleData}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.bid);
  const [data, setData] = useState([]);
  const [sectionId, setSectionId] = useState('');

  const [totalProjectCost, setTotalProjectCost] = useState(0);
  const [markupPercentage, setMarkupPercentage] = useState('');
  const [finalCost, setFinalCost] = useState(0);

  useEffect(() => {
    if (data?.length > 0) {
      const parentData = {[sectionId]: data};
      handleData(parentData);
    }
  }, [data]);

  useEffect(() => {
    dispatch(getBidMiscWorkItem())
      .then(response => {
        setData(response?.data?.items);
        setSectionId(response?.data?.sectionId);
      })
      .catch(error => {
        console.log('error Misc. Work api ------->', error?.response?.data);
      });
  }, []);

  return (
    <View>
      <Text style={styles.sectionTitle}>Misc. Work</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {data.map(item => (
            <ItemList item={item} data={data} setData={setData} />
          ))}
        </View>
      )}
    </View>
  );
};

export default BidItemStepMiscWork;
