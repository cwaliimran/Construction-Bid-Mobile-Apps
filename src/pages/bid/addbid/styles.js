import {StyleSheet} from 'react-native';
import {colors, fonts, fontSizes} from '../../../utls/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    paddingHorizontal: 16,
  },
  deleteModalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  deleteModalIcon: {
    width: 140,
    height: 140,
    marginBottom: 15,
  },
  deleteModalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000',
  },
  deleteModalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: '#DC3838',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
    boxShadow: '0px 13px 27px 0px #E318373D',
  },

  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'column',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'visible', // Changed from 'hidden' to 'visible'
    position: 'relative', // Added to establish positioning context
    zIndex: 1, // Ensure proper layering
  },
  leftIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: '#00FF00',
  },
  actionMenuIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },

  actionMenuText: {
    fontSize: 16,
    color: '#333333',
  },

  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },

  // // Update itemContainer to allow overflow
  // itemContainer: {
  //   flexDirection: 'column',
  //   marginBottom: 10,
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 10,
  //   overflow: 'visible', // Changed from 'hidden' to 'visible'
  // },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  itemName: {
    flex: 1,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
  },
  finalCostLabel: {
    // backgroundColor: '#0060CE',
    fontWeight: 'bold',
    color: '#000000', // White text for readability
    fontSize: 16,
    // padding: 5, // Optional for better spacing
    borderRadius: 5, // Optional for rounded corners
  },
  finalCostValue: {
    fontSize: 16,
    fontWeight: 'bold',
    // backgroundColor: '#0060CE',
    color: '#0060CE', // White text for readability
    padding: 5, // Optional for better spacing
    borderRadius: 5, // Optional for rounded corners
  },
  costContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  costLabel: {
    fontSize: 16,
  },
  costValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputPercentage: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: 100,
    textAlign: 'right',
  },
  actionButton: {
    width: 24,
    marginLeft: 10,
  },
  inputsContainer: {
    borderColor: '#C0C0C0', // Changed to a lighter grey color
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15,
    marginVertical: 10,
    marginLeft: 10,
    // padding: 5,
  },
  textinput: {
    // borderWidth: 1,
    // borderColor: '#000', // Changed from '#C0C0C0' to '#000' for black border
    // borderRadius: 5,
    // padding: 10,
    // flex: 1,
    // marginHorizontal: 5,
    // numberOfLines: 1,
    // ellipsizeMode: 'tail',
    width: '25%',
    // height: 34,
    borderRadius: 10,
    borderColor: '#0000001A',
    borderWidth: 1,
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  checkButton: {
    padding: 10,
  },
  checkIcon: {
    width: 24,
    height: 24,
  },
  moreButton: {
    padding: 10,
  },
  moreIcon: {
    width: 24,
    height: 24,
  },
  menuWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    elevation: 5,
  },

  itemSubtext: {
    fontSize: 12,
    color: '#666',
    top: 5,
    // marginBottom: 20,
    // marginTop: 2,
  },

  itemActionsMenu: {
    position: 'absolute',
    right: 30,
    top: 20, // Moved up to appear above the item
    backgroundColor: '#F1F8FF',
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
    zIndex: 1000, // Higher than the overlay
  },

  lastMenuItem: {
    borderBottomWidth: 0, // Remove border from last item
  },
  actionMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  actionMenuIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998, // Lower than itemActionsMenu but higher than other content
  },

  actionMenuText: {
    fontSize: 16,
    color: '#333333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity here if needed
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Ensure it covers the full width
    height: '100%', // Ensure it covers the full height
    position: 'absolute', // Ensures it covers the entire screen
    top: 0,
    left: 0,
    zIndex: 99,
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#1D75D8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    height: 66,
    marginTop: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  leftIndicatorBlue: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: '#007AFF',
  },
  costContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
    position: 'relative', // This ensures the positioning context is set correctly
    overflow: 'hidden', // Ensures nothing spills out, particularly the blue line
    backgroundColor: '#FFF', // Ensures the background matches
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  costLabel: {
    fontSize: 16,
  },
  costValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputPercentage: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: 100,
    textAlign: 'right',
  },
  addItemText: {
    color: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures spacing on both ends
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  backButton: {
    width: 32, // Ensure the button has a width even if back icon is not visible
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 32,
    height: 32,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 32, // Placeholder to balance the back button for centering the title
  },

  uploadIcon: {
    width: 24,
    height: 24,
    marginRight: 10, // Space between the icon and text
  },
  addItemText: {
    color: '#007AFF', // Text color
    fontSize: 16,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  activeStep: {
    backgroundColor: '#007AFF',
  },
  stepText: {
    color: '#FFF',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    marginBottom: 15,
    padding: 5,
    height: 50,
    alignSelf: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#000',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 60,
    width: '100%',
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    flex: 1,
    height: 50,
    backgroundColor: '#0060CE',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    boxShadow: '0px 13px 27px 0px #0060CE3D',
  },

  prevButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#DC3838',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    boxShadow: '0px 13px 27px 0pxrgba(169, 69, 38, 0.24)',
  },

  disabledButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#C7C7CC',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    boxShadow: '0px 13px 27px 0pxrgba(53, 55, 57, 0.24)',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    height: 50,
    width: '100%',
    marginBottom: 15,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  dropdown: {
    flex: 1,
    height: 50,
    fontFamily: fonts.Regular,
  },
  placeholderStyle: {
    fontSize: fontSizes.small,
    paddingHorizontal: 10,
    fontFamily: fonts.Regular,
    color: colors.grey,
  },
  dropDownInput: {
    paddingHorizontal: 10,
    fontFamily: fonts.Regular,
    fontSize: fontSizes.small,
    color: colors.black,
    flex: 1,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: fontSizes.medium,
    fontFamily: fonts.Regular,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: colors.black,
  },
});
export default styles;
