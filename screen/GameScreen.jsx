import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Game from '../component/Game';

export default function GameScreen({ navigation }) {
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <Game/>
    </View>
  );
}