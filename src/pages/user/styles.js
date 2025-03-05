import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 48 : 16,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  headerRight: {
    width: 32,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 32,
    height: 32,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 32,
    width: 100,
    height: 100,
  },
  profileImageWrapper: {
    position: 'relative',
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent:'center',
    alignItems:'center'
  },
  profileBorder: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: -5,
    left: 0,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 45,
   
  },
  cameraButtonContainer: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    zIndex: 1,
  },
  cameraButton: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  cameraIcon: {
    width: 16,
    height: 16,
    tintColor: '#FFF',
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    fontWeight: '500',
  },
  info: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    borderBottomWidth: 1, // Adds a line below the text
    borderBottomColor: '#E8E8E8', // Sets the color of the line
    paddingBottom: 8, // Adds padding below the text, above the line
  },

  input: {
    height: 48,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 24,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFF',
    width: '100%',
  },
  footer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  footerWithKeyboard: {
    bottom: 0,
  },
  updateButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  resetButton: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  footerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#0060CE',
    boxShadow: '0px 13px 27px 0pxrgba(26, 17, 157, 0.24)',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default styles;
