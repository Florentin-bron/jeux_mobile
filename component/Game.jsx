import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
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
    Accelerometer.setUpdateInterval(100);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(10);
  };

  const _subscribe = () => {
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
        /*if (round(accelerometerData['x']) > 0.2){
          
        //setPositionx(accelerometerData['x']*100);
        setPositionx(positionx - 10);
        //console.log(accelerometerData['x']);
        }
        if (round(accelerometerData['x']) < -0.2){
          //setPositionx(positionx + 10)
          console.log('droite: ' + positionx);
          console.log(accelerometerData['x']);
        }
        if (round(accelerometerData['y']) < -0.2){
         // setPositionx(0);
          console.log('reset: ' + positionx);
        }*/

      })
    
  };

  const mooveLeft = (current) => {
    console.log('currentL: ', positionx);
    setPositionx(positionx - 10);
    console.log('currentL: ', positionx);
  };

  const mooveRight = (current) => {
    //setPositionx(current + 10)
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    if(data['x'] > 0.1){
      setPositionx(positionx - (10 * data['x']));
    }
    else if(data['x'] < -0.1){
      setPositionx(positionx + (10 * (-data['x'])));
    }
    if(data['y'] > 0.1){
      setPositiony(positiony + (10 * data['y']));
    }
    else if(data['y'] < -0.1){
    setPositiony(positiony - (10 * (-data['y'])));
    }
  }, [data]);
  

  useEffect(() => {
    _subscribe();
    Accelerometer.setUpdateInterval(10);
    return () => _unsubscribe();
  }, []);

 
  return (
    <View style={styles.container}>
      <Image style={{ top: positiony, left: positionx, width: 40, height: 40}} source={
        require('../assets/dot.png')
      }/>
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