import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 20,
    },
    cancelButton: {
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      height: 56,
  
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: '#FFF',
    },
    successModalView: {
      backgroundColor: 'white',
      width: '90%',
      maxWidth: 340,
      paddingVertical: 32,
      paddingHorizontal: 24,
      alignItems: 'center',
    },
    successIconContainer: {
      marginBottom: 24,
    },
    successModalImage: {
      width: 140,
      height: 140,
    },
    successModalTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: '#000',
      marginBottom: 8,
      textAlign: 'center',
    },
    successModalText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 32,
      lineHeight: 24,
    },
    successModalButton: {
      backgroundColor: '#0060CE',
      width: '100%',
      boxShadow: '0px 13px 27px 0pxrgba(55, 105, 199, 0.24)',
      height: 48,
      borderRadius: 8,
    },
    successButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center',
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteModalTitle: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 10,
      color: '#000',
    },
    deleteButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backIcon: {
      width: 32,
      height: 32,
    },
    deleteIcon: {
      width: 32,
      height: 32,
    },
    form: {
      padding: 16,
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      marginBottom: 8,
      fontSize: 16,
      fontWeight: '500',
      color: '#333',
    },
    input: {
      height: 48,
      borderColor: '#E5E5E5',
      borderWidth: 1,
      paddingHorizontal: 12,
      borderRadius: 8,
      backgroundColor: '#FFF',
      fontSize: 16,
    },
    readOnlyInput: {
      height: 48,
      borderColor: '#E5E5E5',
      borderWidth: 1,
      paddingHorizontal: 12,
      borderRadius: 8,
      backgroundColor: '#F5F5F5',
      justifyContent: 'center',
    },
    readOnlyText: {
      fontSize: 16,
      color: '#666',
    },
    pickerContainer: {
      borderColor: '#E5E5E5',
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: '#FFF',
    },
    picker: {
      height: 60,
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      gap: 12,
    },
    checkbox: {
      height: 24,
      width: 24,
      borderColor: '#E5E5E5',
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
    },
    checkedBox: {
      backgroundColor: '#007AFF',
      borderColor: '#007AFF',
    },
    readOnlyCheckbox: {
      backgroundColor: '#F5F5F5',
    },
    checkIcon: {
      width: 16,
      height: 16,
      tintColor: '#FFF',
    },
    statusText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#333',
    },
    editButton: {
      backgroundColor: '#007AFF',
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginTop: 16,
    },
    saveButton: {
      backgroundColor: '#0060CE',
      boxShadow: '0px 13px 27px 0pxrgba(66, 68, 186, 0.24)',
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
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
    modalImage: {
      width: 140,
      height: 140,
      marginBottom: 20,
    },
    modalText: {
      marginBottom: 20,
      textAlign: 'center',
      fontSize: 16,
    },
    modalButton: {
      width: '80%',
      padding: 12,
      marginVertical: 5,
      borderRadius: 8,
      elevation: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteModalButton: {
      backgroundColor: '#DC3838',
      boxShadow: '0px 13px 27px 0px #E318373D',
    },
  
    cancelModalButton: {
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    modalButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
    },
    cancelButtonText: {
      color: '#666',
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center',
    },
  });
  
export default styles;