import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../assets/styles';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Header({title}){
    return (
        <View style={styles.header}>
            <Text>{title}</Text>

        </View>
    );
}
