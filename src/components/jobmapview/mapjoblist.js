import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, ListView, Dimensions, StyleSheet, flatlist } from 'react-native';
const _ = require('lodash');
import style from './style';
import CardMap from './cardmap.js';
import { Card, Button } from 'react-native-elements';
export default class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xposition: 190,
    };
  }
  componentWillReceiveProps(props) {
    if (props.marker) {
      const selectedMarkerId = props.selectedIndex;
      const approxLength = selectedMarkerId * 190;
      this._scrollView.scrollTo({ x: approxLength, y: 0, animated: true });
    }
  }

  render() {
    const { width, height } = Dimensions.get('window');
    let i = 0;
    const { data, selected, index, onPress } = this.props;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSource = ds.cloneWithRows(data);
    return (
      <View style={style.OuterContainer}>
        <ScrollView
          scrollEnabled
          style={{ width }}
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={400}
          ref={scrollView => this._scrollView = scrollView}
          horizontal
        >
          <ListView
            horizontal
            enableEmptySections
            dataSource={dataSource}
            renderRow={(rowData) => {
              i++;
              return <CardMap data={rowData} selected={false} selectedIndex={this.props.selectedIndex} index={i - 1} onPress={onPress} />;
            }}
          />
        </ScrollView>
      </View>
    );
  }
}
