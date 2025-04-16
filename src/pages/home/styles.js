import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../utls/styles';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.74)',
    // justifyContent: 'flex-start',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'lightgrey',
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
    marginBottom: 20,
  },
  filterButton: {
    padding: 5,
    marginRight: 0,
    marginBottom: 20,
  },
  filterIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  bidsList: {
    paddingBottom: 100,
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
    height: 70,
    backgroundColor: '#00FFB7',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
    top: 0,
    // zIndex: 99,
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
    paddingLeft: 5,
    borderRadius: 8,
    marginRight: 10,
  },
  icon: {
    width: 40,
    height: 40,
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
    paddingLeft: 10,
    borderRadius: 8,
  },
  editIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  confirmationModal: {
    width: 300,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  confirmationImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  confirmationText: {
    fontSize: 15,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  confirmation: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    fontWeight: 'bold',
    // marginBottom: 20,
  },
  confirmationButtons: {
    width: '100%',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10, // Add space between buttons
    shadowColor: 'rgba(227, 24, 55, 0.24)', // Adjusted to the RGBA color format
    shadowOffset: {width: 0, height: 13}, // x, y offset
    shadowOpacity: 0.24, // Opacity of shadow
    shadowRadius: 27, // Blur radius
    elevation: 10, // for Android shadow
  },

  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  cancelButton: {
    // backgroundColor: '#cccccc',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#000000',
    fontSize: 14,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    width: 100,
  },
  deleteIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#1D75D8',
    borderRadius: 50,
    padding: 20,
    elevation: 10,
  },
  addIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  popupMenu: {
    position: 'absolute',
    top: 80,
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
    padding: 5,
  },
  popupIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
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
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.blue,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    height: 50,
    marginBottom: 20,
  },
  img: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});
export default styles;
