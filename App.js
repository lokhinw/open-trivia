import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HomeScreen from './HomeScreen';
import GameScreen from './GameScreen';
import GameOverScreen from './GameOverScreen';

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      difficulty: 'medium',
      gameStarted: false,
      questionCount: 0,
      score: 0
    }
  }
  getTrivia = () => {
    return fetch('https://opentdb.com/api.php?amount=10&difficulty=' + this.state.difficulty + '&type=multiple').then((response) => response.json()).then((responseJson) => {
      this.setState({
        isLoading: false,
        gameStarted: true,
        trivia: responseJson.results
      }, function() {
        // console.log(this.state.trivia)
      });
    }).catch((error) => {
      console.error(error);
    });
  }
  nextQuestion = (score) => {
    if (this.state.questionCount < 9) {
      this.setState({
        questionCount: this.state.questionCount + 1,
        score: score
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>

              {this.state.questionCount == 9 ? <GameOverScreen score={this.state.score}></GameOverScreen> : this.state.gameStarted
                ? <GameScreen nextQuestion={this.nextQuestion} trivia={this.state.trivia[this.state.questionCount]}></GameScreen>
                : <HomeScreen getTrivia={this.getTrivia}></HomeScreen>}
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
