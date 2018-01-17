import React from 'react';
import {StyleSheet, View, Text, Dimensions, Button, Alert} from 'react-native';
import ScalableText from 'react-native-text';
var width = Dimensions.get('window').width;

export default class GameOverScreen extends React.Component {
  constructor(props) {
    super(props);

  }
render(){
  return(
      <View style={styles.container}>
        <ScalableText style={{fontSize: 72, color: '#FFF', textAlign: 'center'}}>YOUR SCORE IS</ScalableText>
        <ScalableText style={{color: '#FFF'}}>{this.props.score}/{this.props.totalQuestions} ({Math.round((this.props.score / this.props.totalQuestions * 100))}%)</ScalableText>
    <Button onPress={this.props.resetGame.bind(this)} title="Restart" color="#841584"/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
