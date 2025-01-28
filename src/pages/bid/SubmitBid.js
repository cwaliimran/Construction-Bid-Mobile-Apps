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
            source={require('../../../assets/icons/back-icon.png')} // Make sure you have an icon for back
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Image
          source={require('../../../assets/icons/trophy.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Bid Submitted Successfully.</Text>
        <TouchableOpacity
          style={styles.buttonInternalPDF}
          onPress={downloadInternalPDF}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../../assets/icons/download.png')}
              style={styles.icon}
            />
          </View>
          <Text style={styles.buttonText}>Download Internal PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonClientPDF}
          onPress={downloadClientPDF}>
          <Image
            source={require('../../../assets/icons/download.png')}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Download Clients PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonEmail} onPress={sendEmail}>
          <Image
            source={require('../../../assets/icons/bid-email.png')} // Make sure this is correct
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Send Via Email</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    alignItems: 'center',
    paddingTop: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
  },
  backIcon: {
    width: 32,
    height: 32,
  },
  image: {
    width: 320,
    height: 320,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonClientPDF: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Added for horizontal centering
    backgroundColor: '#DC3838',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 50,
    marginBottom: 10,
    width: '80%',
  },
  buttonInternalPDF: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Added for horizontal centering
    backgroundColor: '#0060CE',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 50,
    marginBottom: 10,
    width: '80%',
  },
  buttonEmail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Ensures content is centered horizontally
    backgroundColor: '#299397',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 50,
    marginBottom: 10,
    width: '80%',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center', // Ensures text is centered within its component
  },
});

export default SubmitBid;
