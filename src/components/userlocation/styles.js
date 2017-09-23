import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
module.exports = StyleSheet.create({
  OuterContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textcontainer: {
    marginVertical: 80,
    position: 'absolute',
    bottom: 560,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  loader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 8,
  },
  SecondInput: {
    padding: 8,
    height: 40,
    width: 340,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
