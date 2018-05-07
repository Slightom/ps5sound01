import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';


// Import the react-native-sound module
var Sound = require('react-native-sound');

// Enable playback in silence mode
Sound.setCategory('Playback');

// Load the sound file 'whoosh.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
var chopin_spring_waltz = new Sound('chopin_spring_waltz.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log('duration in seconds: ' + chopin_spring_waltz.getDuration() + 'number of channels: ' + chopin_spring_waltz.getNumberOfChannels());
});


export default class App extends Component {

  
  play(){
    // Play the sound with an onEnd callback
  chopin_spring_waltz.play((success) => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
      // reset the player to its uninitialized state (android only)
      // this is the only option to recover after an error occured and use the player again
      chopin_spring_waltz.reset();
    }
  });
  }

  render() {

    // // Reduce the volume by half
    // chopin_spring_waltz.setVolume(0.5);

    // // Position the sound to the full right in a stereo field
    // chopin_spring_waltz.setPan(1);

    // // Loop indefinitely until stop() is called
    // chopin_spring_waltz.setNumberOfLoops(-1);

    // // Get properties of the player instance
    // console.log('volume: ' + chopin_spring_waltz.getVolume());
    // console.log('pan: ' + chopin_spring_waltz.getPan());
    // console.log('loops: ' + chopin_spring_waltz.getNumberOfLoops());

    // // Seek to a specific point in seconds
    // chopin_spring_waltz.setCurrentTime(2.5);

    // // Get the current playback point in seconds
    // chopin_spring_waltz.getCurrentTime((seconds) => console.log('at ' + seconds));

    // // Pause the sound
    // chopin_spring_waltz.pause();

    // // Stop the sound and rewind to the beginning
    // chopin_spring_waltz.stop(() => {
    //   // Note: If you want to play a sound after stopping and rewinding it,
    //   // it is important to call play() in a callback.
    //   chopin_spring_waltz.play();
    // });

    // // Release the audio player resource
    // chopin_spring_waltz.release();

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Button title='play' onPress={() => this.play()}/>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
    backgroundColor: 'yellow',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
