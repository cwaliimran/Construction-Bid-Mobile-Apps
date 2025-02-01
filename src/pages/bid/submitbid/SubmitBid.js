import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const SubmitBid = () => {
  const navigation = useNavigation();

  // Dummy functions to simulate actions
  const downloadInternalPDF = () => console.log('Downloading Internal PDF...');
  const downloadClientPDF = () => console.log('Downloading Client PDF...');
  const sendEmail = () => console.log('Sending Email...');
  const goToHomePage = () => navigation.navigate('Home'); // Adjust 'Home' as needed for your route name

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={goToHomePage} style={styles.backButton}>
          <Image
            source={require('../../../../assets/icons/back-icon.png')} // Make sure you have an icon for back
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Image
          source={require('../../../../assets/icons/trophy.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Bid Submitted Successfully.</Text>
        <TouchableOpacity
          style={styles.buttonInternalPDF}
          onPress={downloadInternalPDF}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../../../assets/icons/download.png')}
              style={styles.icon}
            />
          </View>
          <Text style={styles.buttonText}>Download Internal PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonClientPDF}
          onPress={downloadClientPDF}>
          <Image
            source={require('../../../../assets/icons/download.png')}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Download Clients PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonEmail} onPress={sendEmail}>
          <Image
            source={require('../../../../assets/icons/bid-email.png')} // Make sure this is correct
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Send Via Email</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubmitBid;
