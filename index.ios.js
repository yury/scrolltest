/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Linking,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Screen1 extends Component {
  props: {
    onPress: () => any;
  }
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={ 'handled' }
          style={{ marginBottom: 28 }}
          extraScrollHeight={ 28 }
          resetScrollToCoords={{x: 0, y: 0}}
         >
          <Text>Screen1 - With KB aware scroll view</Text>
          <TextInput
             blurOnSubmit={false}
             onSubmitEditing={() => this.refs.password.focus()}
             style={{height: 44, marginTop: 300, backgroundColor: 'green'}}
             keyboardAppearance={'dark'}
          />
          <TextInput ref='password'
             keyboardAppearance={'dark'}
             style={{height: 44, marginTop: 30, backgroundColor: 'blue'}} secureTextEntry={true}
           />
          <Button title="next" onPress={ this.props.onPress } />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

class Screen2 extends Component {
  props: {
    onPress: () => any;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Screen2 - NO KB aware scroll view</Text>
        <TextInput
          blurOnSubmit={false}
          onSubmitEditing={() => this.refs.password.focus()}
          style={{height: 44, marginTop: 30, backgroundColor: 'green'}}
          keyboardAppearance={'dark'}
        />
        <TextInput ref='password'
          keyboardAppearance={'dark'}
          style={{height: 44, marginTop: 30, backgroundColor: 'blue'}} secureTextEntry={true}
         />
        <Button title="next" onPress={ this.props.onPress } />
      </View>
    );
  }
}



class Screen3 extends Component {
  props: {
    onPress: () => any;
  }

  render() {
    return (
      <View style={styles.continer}>
        <Text>Screen3</Text>
        <Button title="back" onPress={this.props.onPress} />
      </View>
    );
  }

}

const START_SCREEN = 'screen1'

export default class ScrollTestCase extends Component {

  state = {
    screen: START_SCREEN
  }

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL = () => this.setState({screen: 'screen3'});

  render() {
    const { screen } = this.state;
    if (screen === 'screen1') {
      return <Screen1 onPress={this._handleOpenURL}/>
    } else if (screen === 'screen2') {
      return <Screen2 onPress={this._handleOpenURL}/>
    }
    return <Screen3 onPress={this._onBack }/>
  }

  _onBack = () => {
    this.setState({screen: START_SCREEN});
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('ScrollTestCase', () => ScrollTestCase);
