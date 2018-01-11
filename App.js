import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import GameScreen from './GameScreen';

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      difficulty: 'medium'
    }
  }
  getTrivia = () => {
    return fetch('https://opentdb.com/api.php?amount=10&difficulty=' + this.state.difficulty + '&type=multiple').then((response) => response.json()).then((responseJson) => {
      this.setState({
        isLoading: false,
        trivia: responseJson.results
      }, function() {console.log(this.state.trivia)});
    }).catch((error) => {
      console.error(error);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <GameScreen getTrivia={this.getTrivia}></GameScreen>
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
