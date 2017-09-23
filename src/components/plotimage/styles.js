import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
module.exports = StyleSheet.create({
  OuterContainer: {
    flex: 1,
    // justifyContent: 'flex-end',
    // paddingBottom: 10,
  },
  Button: {
    flex: 0.100,
  },
  bottom: {
    flex: 0.100,
    borderWidth: 1,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#01395e',
    flexDirection: 'row',
    height: 63,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  touch: {
    justifyContent: 'center',
    width,
    marginTop: 5,
    // marginBottom: 5,
    borderRightWidth: 0.5,
    borderRightColor: '#a3aab1',
  },
  touch1: {
    justifyContent: 'center',
    width: width / 2,
    marginTop: 5,
    // marginBottom: 5,
    borderRightWidth: 0.5,
    borderRightColor: '#a3aab1',
  },
  touch2: {
    marginTop: 5,
    // marginBottom: 5,
    justifyContent: 'center',
    width: width / 2,
  },
  loader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 8,
  },
});
