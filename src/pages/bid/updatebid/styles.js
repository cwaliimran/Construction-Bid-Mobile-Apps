import {StyleSheet} from 'react-native';

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

export default styles;
