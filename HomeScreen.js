import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Picker,
  Image,
  Dimensions,
  Button
} from 'react-native';

var width = Dimensions.get('window').width;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      difficulty: 'medium',
      gameStarted: false
    }
  }
  render() {
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
        <Button onPress={() => this.props.getTrivia()} title="Play" color="#841584"/>
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
