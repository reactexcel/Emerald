import React, { Component } from 'react';
import { View, Text, Picker, AlertIOS } from 'react-native';
import style from './styles';
import { Button } from 'react-native-elements';

export default class Skill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'Communication',
      text: [],
    };
  }
  onSelect(lang) {
    this.setState({ language: lang });
  }
  selectedValue() {
    const value = this.state.text;
    const test = [];
    value.map((val) => {
      if (val === this.state.language) {
        test.push(val);
      }
    });
    if (!test.length > 0) {
      value.push(this.state.language);
    }
    this.setState({ text: value });
  }
  updateSkill() {
    if (this.state.text.length >= 1) {
      this.props.navigator.pop();
      AlertIOS.alert(
        `Your Skill ${this.state.text} has been Updated`,
      );
    }
  }
  render() {
    return (
      <View style={style.OuterContainer}>
        <Text>
          Basic Structure where user can select there skill
        </Text>
        <Picker
          selectedValue={this.state.language}
          onValueChange={(lang) => { this.onSelect(lang); }}
        >
          <Picker.Item label="Communication" value="Communication" />
          <Picker.Item label="TeamWork" value="TeamWork" />
          <Picker.Item label="Problem Solving" value="Problem Solving" />
          <Picker.Item label="Enterprise" value="Enterprise" />
          <Picker.Item label="Self-Managemnet" value="Self-Managemnet" />
          <Picker.Item label="Learning" value="Learning" />
          <Picker.Item label="Technologies" value="Technologies" />
          <Picker.Item label="Positive" value="Positive" />
          <Picker.Item label="Flexibility" value="Flexibility" />
          <Picker.Item label="Adaptability" value="Adaptability" />
        </Picker>
        <Button
          raised
          title="Select Skill"
          onPress={() => {
            this.selectedValue();
          }}
          backgroundColor="#01395e"
          borderRadius={5}
        />
        <View
          style={{
            margin: 20,
          }}
        >
          <Text>{this.state.text}</Text>
        </View>
        <View style={style.button}>
          <Button
            raised
            title="Update Skill"
            onPress={() => { this.updateSkill(); }}
            backgroundColor="#01395e"
            borderRadius={5}
          />
        </View>
      </View>
    );
  }
}
