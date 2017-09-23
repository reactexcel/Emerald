import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import style from './styles';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
const { width, height } = Dimensions.get('window');
import { List } from 'react-native-elements';
const ImagePicker = require('react-native-image-picker');
import Icon from 'react-native-vector-icons/FontAwesome';
import * as updateProfileAction from '../../actions/updateProfile';


class UserPlotImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plotimage: [],
      laod: false,
    };
  }
  uploadImage() {
    this.setState({ load: true });
    const userId = this.props.signupID.data || this.props.loginID.data;
    const images = this.state.plotimage;
    this.props.onUploadImage(userId, images).then((val) => {
      this.setState({ load: false });
      this.props.navigator.pop({});
    });
  }
  componentWillMount(props) {
    const userId = this.props.signupID.data || this.props.loginID.data;
    const fetchImages = this.props.getjobPost.member[userId];
    if (fetchImages.profile.image !== undefined) {
      this.setState({ plotimage: fetchImages.profile.image });
    }
  }

  selectPhotoTapped() {
    const images = this.state.plotimage;
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
        images.push(firebasesource);
        this.setState({ plotimage: images });
      }
    });
  }
  render() {
    console.log(this.props.loader.isLoading, 'Image Upload');
    return (
      <View style={{ flex: 1 }}>
        {this.state.load ?
          <View style={style.loader}>
            <ActivityIndicator
              animating={this.state.load}
              style={{ height: 80 }}
              size="small"
            />
          </View>
        : <View style={style.OuterContainer}>
          <ScrollView style={{ flex: 1, margin: 5 }}>
            {this.state.plotimage.length > 0 ? <List containerStyle={{ borderTopWidth: 0, borderBottomColor: 0, marginTop: 0, marginBottom: 5 }}>
              {
                this.state.plotimage.map((img, index) => (
                  <Image
                    key={index}
                    style={{ height: 220, width: 368, marginBottom: 10 }}
                    source={{ uri: img.uri }}
                  />
                ))
              }
            </List> : <Text style={{ alignSelf: 'center' }}>Select Image to upload</Text>}
          </ScrollView>
          <View style={style.bottom}>
            {this.state.plotimage.length > 0 ? <View style={style.button}>
              <TouchableOpacity onPress={() => { this.selectPhotoTapped(); }} style={style.touch1}>
                <Text style={style.text}>
                   Select Images
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.uploadImage(); }} style={style.touch2}>
                <Text style={style.text}>
                  Upload Images
                  </Text>
              </TouchableOpacity>
            </View> :
            <View style={style.button}>
              <TouchableOpacity onPress={() => { this.selectPhotoTapped(); }} style={style.touch}>
                <Text style={style.text}>
                   Select Images
                </Text>
              </TouchableOpacity>
            </View>
              }
          </View>
        </View>}
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { signupID: state.signup.toJS(), loginID: state.login.toJS(), getjobPost: state.getjobPost.toJS(), loader: state.loader.toJS() };
}
const mapDispatchToProps = dispatch => ({
  onUploadImage: (userId, images) => dispatch(updateProfileAction.userImageUpload(userId, images)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPlotImage);
