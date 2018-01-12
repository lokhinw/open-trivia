import React from 'react';
import {StyleSheet, View, Text, Dimensions, Button} from 'react-native';

export default class GameScreen extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    let rand = Math.floor(Math.random() * 4);
    let answers = [];
    let j = 0;
    for (var i = 0; i < 4; i++) {
      if (i == rand) {
        answers.push(<Button title={this.props.trivia.correct_answer}/>);
      } else {
        answers.push(<Button title={this.props.trivia.incorrect_answers[j]}/>);
        j++;
      }
    }
    return (
      <View>
        <Text>{rand}</Text>
        <Text>{this.props.trivia.question}</Text>
        {answers}
      <Text>-----</Text>
        <Button onPress={() => this.props.nextQuestion()} title="NEXT"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
