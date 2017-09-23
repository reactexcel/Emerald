import React, { Component } from 'react';
import { View, ScrollView, ListView, Dimensions } from 'react-native';
import style from './style';
import CardJoblist from './cardjoblist';
import { connect } from 'react-redux';

const _ = require('lodash');

class JobList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      ds,
      dataSource: ds.cloneWithRows([]),
      data: [],
    };
  }
  componentWillMount() {
    this.setState({
      data: this.props.getjobPost.data,
      dataSource: this.state.ds.cloneWithRows(this.props.getjobPost.data),
    });
  }
  componentWillReceiveProps(props) {
    this.setState({
      data: props.getjobPost.data,
      dataSource: this.state.ds.cloneWithRows(props.getjobPost.data),
    });
  }
  render() {
    const { data, selectHomeJobDetail, horizontal, onPress } = this.props;
    const { height, width } = Dimensions.get('window');
    return (
      <View style={style.OuterContainer}>
        <ScrollView
          horizontal={false}
        >
          <ListView
            horizontal={horizontal}
            enableEmptySections
            dataSource={this.state.dataSource}
            renderRow={rowData => <CardJoblist data={rowData} onPress={onPress} />}
          />
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { loader: state.loader.toJS(), getjobPost: state.getjobPost.toJS() };
}

export default connect(mapStateToProps)(JobList);
