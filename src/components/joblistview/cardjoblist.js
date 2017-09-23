import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import style from './style';
import Joblistpage from '../joblistpage/joblistpage';
import * as getuserInfoAction from '../../actions/getuserprofile';
import StarRating from '../star/starrating';

export default class CardJoblist extends Component {
  render() {
    const { location, price, skill, image } = this.props.data;
    const userprice = this.props.data.price || this.props.data.servicesPrice;
    const { onPress } = this.props;
    const actucalskill = this.props.data.skills !== undefined ? this.props.data.skills[0] : this.props.data.skill;
    const test = 'https://www.landequity.com/admin/uploads/7964334land.jpg';
    const img = this.props.data.image === undefined ? test : this.props.data.image[0].uri;
    return (
      <View
        style={{
          flex: 1,
          marginBottom: 5,
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity onPress={() => onPress(this.props.data)}>
          <Card
            containerStyle={{ height: 315, width: 345, borderWidth: 0 }}
            image={{ uri: img }}
            imageStyle={{ height: 220, width: 343 }}
          >

            <Text
              style={{
                fontFamily: 'Verdana',
                fontWeight: 'bold',
                color: '#696969',
                fontSize: 15,
                marginBottom: 5,
              }}
            >
              ${price} {actucalskill}
            </Text>

            <Text
              style={{
                marginBottom: 3,
                fontFamily: 'Verdana',
                color: '#696969',
                fontSize: 14,
              }}
            >
              {location}
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
                starSize={17}
              />
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 5,
                  marginTop: 4,
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
