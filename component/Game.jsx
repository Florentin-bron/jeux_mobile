import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { styles } from '../assets/styles';

export default function Game() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [positionx, setPositionx] = useState(0);
  const [positiony, setPositiony] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const { x, y, z } = data;
  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(50);
  };

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
        if (round(accelerometerData['x']) > 0.2){
          mooveLeft()
          console.log(accelerometerData['x']);
        }

      })
    );
  };

  const mooveLeft = () => {
    setPositionx(positionx - 10)
  };

  const mooveRight = () => {
    setPositionx(positionx + 10)
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

 
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
      <Text style={styles.text}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <Text style={{ top: positiony, left: positionx}}>
        🔴
      </Text>
      <Text>
        {positionx}
      </Text>
      <Text>
        {positiony}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}