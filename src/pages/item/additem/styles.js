import {StyleSheet} from 'react-native';
import {colors} from '../../../utls/styles';
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
  header: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#FFF',
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
  placeholder: {
    width: 40,
  },
  backIcon: {
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
    // marginBottom: 16,
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
  checkIcon: {
    width: 16,
    height: 16,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  totalCost: {
    height: 48,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    fontSize: 16,
    textAlignVertical: 'center',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '80%',
    maxWidth: 340,
  },
  successIcon: {
    width: 64,
    height: 64,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  modalText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
  },
  continueText: {
    textAlign: 'center', // Additional centering for the text
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  img: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 130,
    right: 15,
    left: 15,
    height: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 999,
  },
  suggestion: {
    paddingVertical: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
