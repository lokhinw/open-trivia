import React from 'react';
import {StyleSheet, View} from 'react-native';
import HomeScreen from './HomeScreen';
import GameScreen from './GameScreen';
import GameOverScreen from './GameOverScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      questionCount: 0,
      score: 0
    }
  }
  getTrivia = (difficulty, totalQuestions, category) => {
    return fetch('https://opentdb.com/api.php?amount=' + totalQuestions + '&difficulty=' + difficulty + '&category=' + category + '&type=multiple').then((response) => response.json()).then((responseJson) => {
      this.setState({
        isLoading: false,
        gameStarted: true,
        totalQuestions: totalQuestions,
        trivia: responseJson.results
      }, function() {
      });
    }).catch((error) => {
      console.error(error);
    });
  }
  nextQuestion = (score) => {
    if (this.state.questionCount < this.state.totalQuestions) {
      this.setState({
        questionCount: this.state.questionCount + 1,
        score: score
      });
    }
  }
  resetGame = () => {
    this.setState({gameStarted: false, questionCount: 0});
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.questionCount >= this.state.totalQuestions
          ? <GameOverScreen score={this.state.score} totalQuestions={this.state.totalQuestions} resetGame={this.resetGame}></GameOverScreen>
          : this.state.gameStarted
            ? <GameScreen nextQuestion={this.nextQuestion} trivia={this.state.trivia[this.state.questionCount]} questionCount={this.state.questionCount}></GameScreen>
            : <HomeScreen getTrivia={this.getTrivia}></HomeScreen>}
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
