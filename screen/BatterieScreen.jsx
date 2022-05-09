import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Batterie from '../component/Batterie';

export default function BatterieScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Batterie/>
      <Button
        title="Go to Content"
        onPress={() => navigation.navigate('Content')}
      />
    </View>
  );
}