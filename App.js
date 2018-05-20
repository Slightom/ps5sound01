import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  AppState
} from 'react-native';
import { StackNavigator } from 'react-navigation';



var Sound = require('react-native-sound'); // Import the react-native-sound module
Sound.setCategory('Playback'); // Enable playback in silence mode

let defaultColor = 'powderblue';
let playingColor = 'yellow';
let pausedColor = 'skyblue';

let actualPlaying = {
  song: null, title: "", isPaused: false, id: -1,
};


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 0, name: 'chopin_spring_waltz', backgroundColor: defaultColor },
        { id: 1, name: 'kortez_wracaj_do_domu', backgroundColor: defaultColor },
        { id: 2, name: 'kortez_pierwsza', backgroundColor: defaultColor },
        { id: 3, name: 'krawczyk_nosowska_bezsenni', backgroundColor: defaultColor },
        { id: 4, name: 'pulp_fiction_lonesome_town', backgroundColor: defaultColor },
        { id: 5, name: 'halina_benedyk_mamy_po_20_lat', backgroundColor: defaultColor },
        { id: 6, name: 'michal_lorenc_taniec_eleny', backgroundColor: defaultColor },
      ],
      refresh: false,
    }
  }

  play() {
    actualPlaying.song.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        actualPlaying.song.reset();
      }
    });
  }

  updateBackground(id, color) {
    var newTable = this.state.data;
    newTable[id].backgroundColor = color;
    this.setState({ data: newTable });
    this.setState({ refresh: !this.state.refresh })
  }

  songClicked(p1, name, id) {

    if (actualPlaying.title === name) {
      if (!actualPlaying.isPaused) {
        actualPlaying.song.pause();
        actualPlaying.isPaused = true;
        this.updateBackground(id, pausedColor);
      }
      else {
        actualPlaying.song.play();
        actualPlaying.isPaused = false;
        this.updateBackground(id, playingColor);
      }
      return;
    }
    else {
      if(actualPlaying.song !== null){
        actualPlaying.song.stop();
        this.updateBackground(actualPlaying.id, defaultColor);
      }      

      actualPlaying.isPaused = false;
      actualPlaying.title = name;
      actualPlaying.id = id;
      actualPlaying.song = new Sound(name + '.wav', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        this.play();
      });
      this.updateBackground(id, playingColor);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          extraData={this.state.refresh}
          renderItem={({ item }) =>
            <View >
              <TouchableOpacity onPress={() => this.songClicked(this, item.name, item.id)} style={styles.songItem}>
                <View style={{ backgroundColor: this.state.data[item.id].backgroundColor, alignItems: 'center' }}>
                  <Text style={styles.item}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  }
}

AppState.addEventListener('change', state => {
  if (state === 'active') {
    console.log("active");
    //actualPlayingSong.stop();
  } else if (state === 'background') {
    console.log("background");
    //actualPlayingSong.stop();

  } else if (state === 'inactive') {
    console.log("inactive");
    //actualPlayingSong.stop();
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
    //backgroundColor: playingColor,
    backgroundColor: defaultColor,
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
  item: {
    padding: 20,
    fontSize: 28,
    height: 120,
  },
  songItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});
