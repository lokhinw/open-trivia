import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Picker,
  Image,
  Dimensions,
  Button,
  ActivityIndicator
} from 'react-native';

var width = Dimensions.get('window').width;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      difficulty: 'medium',
      totalQuestions: 1,
      category: 9,
      gameStarted: false
    }
  }
  componentDidMount () {
    return fetch('https://opentdb.com/api_category.php').then((response) => response.json()).then((responseJson) => {
      this.setState({
        isLoading: false,
        categories: responseJson.trivia_categories
      }, function() {

      });
    }).catch((error) => {
      console.error(error);
    });
  }
  render() {
    let pickernumbers = [];
      for (var i = 1; i <= 50; i++) {
pickernumbers.push(<Picker.Item key={i} label={(i).toString()} value={i}/>)
      }
      if (this.state.isLoading) {
        return (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <ActivityIndicator/>
          </View>
        );
      }
    return (
      <View style={styles.container}>
        <Image style={{
          width: width * 0.6,
          height: (width * 0.6) / 1.285
        }} source={require('./logo.png')}/>
        <Picker style={{
          width: width * 0.5
        }} selectedValue={this.state.difficulty} onValueChange={(itemValue, itemIndex) => this.setState({difficulty: itemValue})}>
          <Picker.Item label="Easy" value="easy"/>
          <Picker.Item label="Medium" value="medium"/>
          <Picker.Item label="Hard" value="hard"/>
        </Picker>
        <Picker style={{
          width: width * 0.5
        }} selectedValue={this.state.totalQuestions} onValueChange={(itemValue, itemIndex) => this.setState({totalQuestions: itemValue})}>
        {pickernumbers}
        </Picker>
        <Picker style={{
          width: width * 0.5}}
        selectedValue={this.state.category} onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
            {this.state.categories.map((category) => {
    return (
<Picker.Item value={category.id} label={category.name} key={category.id} />
    );
})}
    </Picker>
        <Button onPress={this.props.getTrivia.bind(this, this.state.difficulty, this.state.totalQuestions, this.state.category)} title="Play" color="#841584"/>
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
