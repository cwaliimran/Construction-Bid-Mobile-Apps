import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

// Third Party
import {Overlay} from '@rneui/themed';

// Stylesheet
import styles from './styles';

// Components
import {useDispatch} from 'react-redux';
import {setUser} from '../../../store/slices/user';
import {appIcons} from '../../../utls/assets';
import {colors} from '../../../utls/styles';

const GeneralModal = ({
  modalSuccess,
  modalError,
  Set_Modal_Visibilty,
  imageSource,
  title,
  description,
  yesBtnTitle,
  handleYesPress,
  noBtnTitle,
  handleNoPress,
}) => {
  const dispatch = useDispatch();
  const tokenErrorMessage =
    'Your session has expired. Please login again to continue using application.';

  const handleLoginUser = () => {
    Set_Modal_Visibilty(false);
    setTimeout(() => {
      dispatch(setUser(null));
    }, 500);
  };
  return (
    <View style={styles.centeredView}>
      <Overlay
        overlayStyle={{
          padding: 0,
          marginBottom: 0,
          borderRadius: 20,
        }}
        animationType="fade"
        transparent={true}
        isVisible={
          modalSuccess === true
            ? modalSuccess
            : modalError === true
            ? modalError
            : false
        }
        onBackdropPress={() => {
          if (description === tokenErrorMessage) {
            null;
          } else {
            Set_Modal_Visibilty(false);
          }
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              {modalSuccess === true ? (
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Image source={imageSource} style={styles.modalImage} />
                  <Text
                    allowFontScaling={false}
                    style={[styles.titleText, colors.black]}>
                    {title}
                  </Text>
                  <Text allowFontScaling={false} style={styles.descriptionText}>
                    {description}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleYesPress()}>
                    <Text allowFontScaling={false} style={styles.buttonText}>
                      {yesBtnTitle}
                    </Text>
                  </TouchableOpacity>
                  {noBtnTitle && (
                    <TouchableOpacity
                      style={styles.notNowBtn}
                      onPress={() => handleNoPress()}>
                      <Text
                        allowFontScaling={false}
                        style={styles.notNowBtnText}>
                        {noBtnTitle}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : modalError === true ? (
                <View style={styles.modalView}>
                  <Image source={appIcons.errorRedIcon} style={styles.icon} />
                  <Text
                    style={[
                      styles.titleText,
                      {
                        marginTop: 10,
                        marginBottom: -10,
                        color: colors.errorRed,
                      },
                    ]}>
                    Error
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[styles.descriptionText, {marginBottom: 10}]}>
                    {description}
                  </Text>
                  {description === tokenErrorMessage && (
                    <TouchableOpacity
                      style={[
                        styles.button,
                        {
                          backgroundColor: colors.primary,
                          marginTop: -5,
                        },
                      ]}
                      onPress={handleLoginUser}>
                      <Text allowFontScaling={false} style={styles.buttonText}>
                        Login
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </Overlay>
    </View>
  );
};

export default GeneralModal;
