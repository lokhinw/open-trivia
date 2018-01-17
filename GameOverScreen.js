import React from 'react';
import {StyleSheet, View, Text, Dimensions, Button, Alert} from 'react-native';

var width = Dimensions.get('window').width;

export default class GameOverScreen extends React.Component {
  constructor(props) {
    super(props);

  }
render(){
  return(
      <View style={styles.container}>
        <Text>{this.props.score}</Text>
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
    width: width
  }
});
