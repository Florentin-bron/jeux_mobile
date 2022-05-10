import * as React from 'react';
import * as Battery from 'expo-battery';
import { StyleSheet, Button, Text, View } from 'react-native';
import { styles } from '../assets/styles';

export default class Batterie extends React.Component {
    state = {
      batteryLevel: null,
    };
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }
  
    componentDidMount() {
      this._subscribe();
    }
  
    componentWillUnmount() {
      this._unsubscribe();
    }
  
    async _subscribe() {
      const batteryLevel = await Battery.getBatteryLevelAsync();
      this.setState({ batteryLevel });
      this._subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
        this.setState({ batteryLevel });
        console.log('batteryLevel changed!', batteryLevel);
      });
    }
  
    _unsubscribe() {
      this._subscription && this._subscription.remove();
      this._subscription = null;
    }
  
    render() {
      return (
        <View>
          <Text>Current Battery Level: {this.state.batteryLevel}</Text>
          <Text>Vous avez cliqué {this.state.count} fois</Text>
          <Button title="Cliquez ici" onPress={() => this.setState({ count: this.state.count + 1 })}/>
        </View>
      );
    }
  }