import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Button
} from 'react-native';
import CustomButton from './CustomButton'
import ScalableText from 'react-native-text';
import he from 'he';

let width = Dimensions.get('window').width;

export default class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      answers: [],
      rand: Math.floor(Math.random() * 4)
    }
  }

  componentWillMount() {
    this.loadAnswers(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.state.rand = Math.floor(Math.random() * 4);
    this.loadAnswers(newProps);
  }

  loadAnswers = (answers) => {
    this.state.answers = [];
    let j = 0;
    for (var i = 0; i < 4; i++) {
      if (i == this.state.rand) {
        this.state.answers.push(
          <CustomButton key={i} onPress={this.checkAnswer.bind(this, i)} button={styles.answerButton} text={styles.answerText}>{he.decode(answers.trivia.correct_answer)}</CustomButton>
        );
      } else {
        this.state.answers.push(
          <CustomButton key={i} onPress={this.checkAnswer.bind(this, i, j)} button={styles.answerButton} text={styles.answerText}>{he.decode(answers.trivia.incorrect_answers[j])}</CustomButton>
        );
        j++;
      }
    }
  }

  checkAnswer = (key, index) => {
    this.state.answers = [];
    let that = this;
    let j = 0;
    for (var i = 0; i < 4; i++) {
      if (i == this.state.rand) {
        this.state.answers.push(
          <CustomButton key={i} button={styles.answerButton} text={styles.answerText}>{he.decode(this.props.trivia.correct_answer)}</CustomButton>
        );
      } else {
        this.state.answers.push(
          <CustomButton key={i} button={styles.answerButton} text={styles.answerText}>{he.decode(this.props.trivia.incorrect_answers[j])}</CustomButton>
        );
        j++;
      }
    }
    if (key == this.state.rand) {
      this.setState({
        score: this.state.score + 1
      });
      this.state.answers[key] = (
        <CustomButton key={key} button={[styles.answerButton, styles.correctAnswer]} text={styles.answerText}>{he.decode(this.props.trivia.correct_answer)}</CustomButton>
      );

    } else {
      this.setState(this.state);
      this.state.answers[key] = (
        <CustomButton key={key} button={[styles.answerButton, styles.incorrectAnswer]} text={styles.answerText}>{he.decode(this.props.trivia.incorrect_answers[index])}</CustomButton>
      );
      this.state.answers[this.state.rand] = (
        <CustomButton key={this.state.rand} button={[styles.answerButton, styles.correctAnswer]} text={styles.answerText}>{he.decode(this.props.trivia.correct_answer)}</CustomButton>
      );
    }
    setTimeout(function() {
      that.props.nextQuestion(that.state.score);
    }, 1500);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{
          flex: 1,
          justifyContent: 'flex-end'
        }}>
          <ScalableText style={styles.questionCount}>Question {this.props.questionCount + 1}</ScalableText>
        </View>
        <View style={{
          flex: 2,
          justifyContent: 'center'
        }}>
          <ScalableText style={styles.question}>{he.decode(this.props.trivia.question)}</ScalableText>
        </View>
        <View style={{
          flex: 5,
          justifyContent: 'center'
        }}>
          {this.state.answers}
        </View>
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
  },
  question: {
    marginHorizontal: 20,
    fontSize: 24,
    textAlign: 'center',
    color: '#fff'
  },
  questionCount: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff'
  },
  answerButton: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 20,
    marginVertical: 5,
    width: width * 0.85
  },
  correctAnswer: {
    backgroundColor: '#1ADA83'
  },
  incorrectAnswer: {
    backgroundColor: '#FF4646'
  },
  answerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center'
  }
});
