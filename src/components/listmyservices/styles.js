import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  OuterContainer: {
    flex: 1,
    marginTop: 45,
    padding: 30,
    justifyContent: "center"
  },
  Input: {
    flex: 1,
    padding: 8,
    height: 37,
  },
  addButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20
  },
  border: {
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    height: 40
  },
  errorborder: {
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    borderColor: '#b22222'
  },
  textarea: {
    height: 150,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15
  },
  InputArea: {
    flex: 1,
    padding: 8
  }
});
