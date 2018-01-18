import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Button
} from 'react-native';
import ScalableText from 'react-native-text';

let width = Dimensions.get('window').width;

export default class GameOverScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScalableText style={{
          fontSize: 72,
          color: '#FFF',
          textAlign: 'center'
        }}>YOUR SCORE IS</ScalableText>
        <ScalableText style={{
          fontSize: 36,
          color: '#FFF'
        }}>{this.props.score} / {this.props.totalQuestions} ({Math.round((this.props.score / this.props.totalQuestions * 100))}%)</ScalableText>
        <View style={{
          marginTop: 20,
          width: width * 0.85
        }}>
          <Button onPress={this.props.resetGame.bind(this)} title="Continue" color="#22A7F0"/></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
