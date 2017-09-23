import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  OuterContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 70,
    margin: 10,
  },
  InsideContainer: {
    flex: 0.3,
    margin: 10,
    flexDirection: 'column',
  },
  TextInput: {
    flex: 1,
    height: 40,
  },
  TextHolder: {
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
  },
  SecondInput: {
    padding: 8,
    height: 37,
    width: 311,
  },
  InputContainer: {
    flexDirection: 'row',
  },
  Buttons: {
    flex: 1,
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
  errorborder: {
    marginBottom: 10,
    borderColor: '#b22222',
    borderWidth: 1,
    borderRadius: 5,
  },
});
