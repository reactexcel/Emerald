import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  OuterContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 65,
    margin: 10,
  },
  InsideContainer: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'column',
  },
  TextInput: {
    flex: 1,
    padding: 8,
    height: 37,
  },
  TextHolder: {
    borderWidth: 1,
    flexDirection: 'row',
  },
  SecondInput: {
    padding: 8,
    height: 37,
    width: 311,
  },
  InputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
  },
  button: {
    flex: 0.3,
    justifyContent: 'flex-end',
  },
  loader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 8,
  },
  border: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  errorInput: {
    borderWidth: 1,
    borderColor: '#b22222',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
  },
  errorborder: {
    marginBottom: 10,
    borderColor: '#b22222',
    borderWidth: 1,
    borderRadius: 5,
  },
});
