import React, { Component } from 'react';
import { View, Text } from 'react-native';
import style from './style';
import { Avatar, Button } from 'react-native-elements';


export default class ReviewSection extends Component {
  render() {
    return (
      <View style={style.OuterContainer}>
        <View
          style={{
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 25,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Avatar
                medium
                style={{
                  marginBottom: 10,
                  marginRight: 75,
                }}
                rounded
                source={{ uri: 'https://pbs.twimg.com/profile_images/630823040499081216/ebjXEq2y_400x400.jpg' }}
                activeOpacity={0.7}
              />
              <View
                style={{

                  flexDirection: 'column',
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  Jackie
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  Apr 2017
                </Text>
              </View>
            </View>

          </View>
          <Text
            style={{
              fontSize: 17,
            }}
          >
            fantastic Work done by ABC, Beautiful design, this pepole who take care of the project  are the most
            wornderfull pepole, you must give them a chance to work with them.
          </Text>
        </View>
      </View>
    );
  }
}
