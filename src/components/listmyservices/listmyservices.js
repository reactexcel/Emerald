import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, AlertIOS } from 'react-native';
import style from './styles';
import MyServices from '../../api/servicesupdate';
import { List, ListItem, Icon } from 'react-native-elements';
import MyService from '../myservice/myservice';
import UserPlotImage from '../plotimage/plotimage';
import ServicesPrices from '../servicesprice/servicesprice';
import { Error } from '../error/error';
import UserLocation from '../userlocation/userlocation';
import { connect } from 'react-redux';
import * as firebase from 'firebase';


const ImagePicker = require('react-native-image-picker');



class MyServiesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: "",
      location: "",
      image: null,
      errormsg: "",
      error: false,
    }
    this.onSelectItem = this.onSelectItem.bind(this);
  }
  componentDidMount() {
    this.subscription = this.props.events.addListener('service_list_pressed', () => this.onSave());
    this.subscription2 = this.props.events.addListener('location_updated', (data) => this.setState({
      location: data.location,
      userlocation: data.geometry
    }));
  }
  componentWillUnmount() {
    this.props.events.removeSubscription(this.subscription);
    this.props.events.removeSubscription(this.subscription2);
  }

  onSave() {
    const userId = this.props.signupID.data || this.props.loginID.data;
    if (!this.state.name.length || !this.state.price.length || !this.state.location.length || this.state.image === null) {
      this.setState({ errormsg: 'PLEASE FILL IN ALL REQUIRED FIELDS', error: true });
    } else {
      this.setState({ errormsg: '', error: false });
      firebase.database().ref(`/userInfo/${userId}/profile`).update({
        userlocation: this.state.userlocation,
        location: this.state.location,
        price: this.state.price,
        skills: [this.state.name],
        skill: this.state.name,
        description: this.state.description,
        image: [this.state.image]
      }).then(() => {
        AlertIOS.alert("New service added.");
        window.setTimeout(() => {
          this.props.navigator.pop();
        }, 1000);
      }).catch((err) => {
        this.setState({
          errormsg: "error while saving new service: " + err
        })
      });
    }
  }
  addImage() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = { uri: response.uri };

        // You can also display the image using data:
        const firebasesource = { uri: `data:image/jpeg;base64,${response.data}` };
        this.setState({ image: firebasesource });
      }
    });
  }
  onSelectItem(item) {
    if (item.id === 'services') {
      this.props.navigator.push({
        component: MyService,
        tintColor: '#01395e',
        title: 'Services',
      });
    } else if (item.id === 'plotpic') {
      this.props.navigator.push({
        component: UserPlotImage,
        tintColor: '#01395e',
        title: 'Service Photos',
      });
    } else if (item.id === 'price') {
      this.props.navigator.push({
        component: ServicesPrices,
        tintColor: '#01395e',
        title: 'Service Price',
      });
    }
  }
  openMap() {
    this.props.navigator.push({
      component: UserLocation,
      tintColor: '#01395e',
      title: 'Choose your location',
      passProps: { events: this.props.events }
    });
  }
  render() {
    return (
      <View style={style.OuterContainer}>
        <View style={[this.state.error ? style.errorborder : style.border]}>
          <TextInput
            ref="1"
            autoCapitalize="none"
            enablesReturnKeyAutomatically
            style={style.Input}
            placeholderTextColor={'grey'}
            onChangeText={name => this.setState({ name })}
            returnKeyType="next"
            value={this.state.name}
            placeholder="Name of Service"
          />
        </View>
        <View style={[style.border, {
          height: 150
        }]}>
          <TextInput
            ref="2"
            multiline={true}
            autoCapitalize="none"
            enablesReturnKeyAutomatically
            style={style.InputArea}
            placeholderTextColor={'grey'}
            onChangeText={description => this.setState({ description })}
            returnKeyType="next"
            value={this.state.description}
            placeholder="Description of Service"
          />
        </View>
        <View style={[this.state.error ? style.errorborder : style.border]}>
          <TextInput
            ref="3"
            autoCapitalize="none"
            enablesReturnKeyAutomatically
            style={style.Input}
            placeholderTextColor={'grey'}
            onChangeText={price => this.setState({ price })}
            returnKeyType="next"
            value={this.state.price}
            placeholder="Price(Per Hours)"
          />
        </View>
        <View style={[(this.state.error ? style.errorborder : style.border), {
          height: 200,
          overflow: 'hidden',
          justifyContent: "center",
          alignItems: "center"
        }]}>{this.state.image !== null &&
          <Image
            style={{ height: 200, width: '100%' }}
            source={{ uri: this.state.image.uri }}
          />}
          <TouchableOpacity style={style.addButton} onPress={() => this.addImage()}>
            <Icon name="add" raised containerStyle={{ position: 'absolute', backgroundColor: '#01395e', width: 40, height: 40, borderRadius: 50 }} color="white" />
          </TouchableOpacity>
        </View>
        <View style={[this.state.error ? style.errorborder : style.border]}>
          <TextInput
            ref="4"
            autoCapitalize="none"
            enablesReturnKeyAutomatically
            style={style.Input}
            onFocus={() => this.openMap()}
            placeholderTextColor={'grey'}
            onChangeText={location => this.setState({ location })}
            returnKeyType="next"
            value={this.state.location}
            placeholder="Service Location"
          />
        </View>
        <Error text={this.state.errormsg} />
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { signupID: state.signup.toJS(), loginID: state.login.toJS() };
}
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MyServiesList);
