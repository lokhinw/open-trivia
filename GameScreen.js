import React from 'react';
import {StyleSheet, View, Text, Dimensions, Button, Alert} from 'react-native';
import CustomButton from './CustomButton'
import ScalableText from 'react-native-text';
import he from 'he';

var width = Dimensions.get('window').width;

export default class GameScreen extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    checkAnswer = (key) => {
      if (key == rand) {
        Alert.alert(
                'correct'
             )
      } else {
        Alert.alert(
                'wrong'
             )
      }
      this.props.nextQuestion();
   }
    let rand = Math.floor(Math.random() * 4);
    let answers = [];
    let j = 0;
    for (var i = 0; i < 4; i++) {
      if (i == rand) {
        answers.push(
          <CustomButton key={i} onPress={checkAnswer.bind(this, i)} button={styles.answerButton} text={{
            fontSize: 22,
            fontWeight: '700',
            color: '#000'
          }}>{he.decode(this.props.trivia.correct_answer)}</CustomButton>
        );
      } else {
        answers.push(
          <CustomButton key={i} onPress={checkAnswer.bind(this, i)} button={styles.answerButton} text={{
            fontSize: 22,
            fontWeight: '700',
            color: '#000'
          }}>{he.decode(this.props.trivia.incorrect_answers[j])}</CustomButton>
        );
        j++;
      }
    }
    return (
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <ScalableText style={{
            margin: 20,
            fontSize: 24,
            textAlign: 'center',
            color: '#fff'
          }}>{he.decode(this.props.trivia.question)}</ScalableText>
        </View>
        <View style={{flex: 2, justifyContent: 'center'}}>
          {answers}
        </View>
      </View>
    );
  }
}
// red: #ff4646
// green: #1ada83
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    justifyContent: 'center'
  },
  answerButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 20,
    marginVertical: 5,
    width: width * 0.85
  }
});
