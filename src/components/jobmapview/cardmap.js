import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import style from './style';
import StarRating from '../star/starrating';

export default class CardMap extends Component {
  render() {
    let { price, skill, selected } = this.props.data;
    if (this.props.selectedIndex === this.props.index) {
      selected = true;
    } else {
      selected = false;
    }
    const { onPress } = this.props;
    const test = 'https://www.landequity.com/admin/uploads/7964334land.jpg';
    const actucalskill = this.props.data.skills !== undefined ? this.props.data.skills[0] : this.props.data.description;
    const img = this.props.data.image === undefined ? test : this.props.data.image[0].uri;
    return (
      <View style={style.OuterContainer}>
        <TouchableOpacity onPress={() => onPress(this.props.data)}>
          <Card
            containerStyle={selected === true ? style.selectedcontainer : style.container}
            image={{ uri: img }}
            imageStyle={{ height: 95, width: 160 }}
          >
            <Text
              style={{
                fontFamily: 'Verdana',
                color: '#696969',
                fontSize: 10,
              }}
            >
              ${price} {actucalskill}
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <StarRating
                maxStars={5}
                rating={4}
                disabled={false}
                starSize={10}
              />
              <Text
                style={{
                  fontSize: 8,
                  marginLeft: 5,
                  marginTop: 2,
                  color: '#696969',
                }}
              >66 Review</Text>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
}
