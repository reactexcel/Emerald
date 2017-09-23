import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  OuterContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  TextInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  container: {
    height: 140,
    width: 160,
  },
  selectedcontainer: {
    height: 140,
    width: 160,
    borderTopWidth: 4,
    borderTopColor: '#1e90ff',
  },
});
