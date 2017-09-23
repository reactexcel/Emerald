import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  OuterContainer: {
    flex: 1,
    marginTop: 70,
  },
  InsideContainer: {
    flex: 1,
    margin: 10,
    flexDirection: 'column',
  },
  TextInput: {
    paddingLeft: 7,
    flex: 1,
    height: 40,
  },
  TextHolder: {
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
  },
  SecondInput: {
    paddingLeft: 7,
    height: 40,
    width: 311,
  },
  InputContainer: {
    // paddingLeft: 7,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
  },
  Buttons: {
    flex: 0.2,
    marginBottom: 5,
    justifyContent: 'flex-end',
  },
  loader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 8,
  },
  border: {
    // paddingLeft: 7,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});
