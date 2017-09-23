import React, { Component } from 'react';
import { View } from 'react-native';
import Login from '../login/login';
import style from './styles';
import UserProfile from '../userprofile/userprofile';
import PolygonCreator from '../map/map';
import Skill from '../skillpage/addskill';
import list from '../../api/profileupdate';
import UserLocation from '../userlocation/userlocation';
import ShowUserPlots from '../showuserplot/showuserplot';
import { List, ListItem } from 'react-native-elements';
import UserPlotImage from '../plotimage/plotimage';


export default class ProfileComplete extends Component {
  constructor(props) {
    super(props);
    this.onSelectItem = this.onSelectItem.bind(this);
  }

  onSelectItem(item) {
    if (item.id === 'basic') {
      this.props.navigator.push({ component: UserProfile,
        tintColor: '#01395e',
        title: 'Profile',
      });
    } else if (item.id === 'land') {
      this.props.navigator.push({ component: PolygonCreator,
        tintColor: '#01395e',
        title: 'LandPlot',
      });
    } else if (item.id === 'skill') {
      this.props.navigator.push({ component: Skill,
        tintColor: '#01395e',
        title: 'Skill',
      });
    } else if (item.id === 'map') {
      this.props.navigator.push({ component: UserLocation,
        tintColor: '#01395e',
        title: 'User Location',
      });
    } else if (item.id === 'ploted') {
      this.props.navigator.push({ component: ShowUserPlots,
        tintColor: '#01395e',
        title: 'Plots',
      });
    } else if (item.id === 'plotpic') {
      this.props.navigator.push({ component: UserPlotImage,
        tintColor: '#01395e',
        title: 'Images',
      });
    }
  }
  render() {
    return (
      <View style={style.OuterContainer}>
        <List>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                onPress={() => { this.onSelectItem(item); }}
                title={item.title}
                leftIcon={{ name: item.icon }}
              />
            ))
          }
        </List>
      </View>
    );
  }
}
