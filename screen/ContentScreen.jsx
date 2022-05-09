import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ContentScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Test</Text>
      <Button
        title="Check your battery"
        onPress={() => navigation.navigate('Batterie')}
      />
      <Button
        title="Play the game !"
        onPress={() => navigation.navigate('Game')}
      />
    </View>
  );
}