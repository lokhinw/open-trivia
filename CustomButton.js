import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import ScalableText from 'react-native-text';

export default class CustomButton extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={this.props.button}>
          <ScalableText style={this.props.text}>{this.props.children}</ScalableText>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
