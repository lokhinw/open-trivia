import React from 'react';
import {
  StyleSheet,
  View,
  Picker,
  Image,
  Dimensions,
  Button,
  ActivityIndicator
} from 'react-native';

let width = Dimensions.get('window').width;

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

  componentDidMount() {
    return fetch('https://opentdb.com/api_category.php').then((response) => response.json()).then((responseJson) => {
      this.setState({
        isLoading: false,
        categories: responseJson.trivia_categories
      }, function() {});
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    let pickernumbers = [];
    for (var i = 1; i <= 50; i++) {
      if (i == 1) {
        pickernumbers.push(<Picker.Item key={i} label={(i).toString() + ' Question'} value={i}/>)
      } else {
        pickernumbers.push(<Picker.Item key={i} label={(i).toString() + ' Questions'} value={i}/>)
      }
    }
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color="#22A7F0"/>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./logo.png')}/>
        <Picker style={[
          styles.picker, {
            marginTop: 20
          }
        ]} selectedValue={this.state.difficulty} onValueChange={(itemValue, itemIndex) => this.setState({difficulty: itemValue})}>
          <Picker.Item label="Easy" value="easy"/>
          <Picker.Item label="Medium" value="medium"/>
          <Picker.Item label="Hard" value="hard"/>
        </Picker>
        <Picker style={styles.picker} selectedValue={this.state.totalQuestions} onValueChange={(itemValue, itemIndex) => this.setState({totalQuestions: itemValue})}>
          {pickernumbers}
        </Picker>
        <Picker style={styles.picker} selectedValue={this.state.category} onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
          {this.state.categories.map((category) => {
            return (<Picker.Item value={category.id} label={category.name} key={category.id}/>);
          })}
        </Picker>
        <View style={{
          marginTop: 20,
          width: width * 0.85
        }}>
          <Button onPress={this.props.getTrivia.bind(this, this.state.difficulty, this.state.totalQuestions, this.state.category)} title="Play" color="#22A7F0"/></View>
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
  logo: {
    width: width * 0.6,
    height: (width * 0.6) / 1.285
  },
  picker: {
    width: width * 0.85,
    color: '#FFF'
  }
});
