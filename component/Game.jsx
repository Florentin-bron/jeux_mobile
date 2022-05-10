import React, { useState, useEffect } from 'react';
import { StatusBar, Dimensions, Alert } from "react-native";
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { styles } from '../assets/styles';
import CountDown from 'react-native-countdown-component';

export default function Game() {
  const { width, height } = Dimensions.get("window");
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [score, setScore] = useState(0);
  const [positionx, setPositionx] = useState(0);
  const [positiony, setPositiony] = useState(0);
  const [pointsx, setPointsx] = useState(width/2);
  const [pointsy, setPointsy] = useState(height/2);
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
      }) 
  };

  const setRandomPoints = () =>{
    const currentHeight = height - 200;
    const currentWidth = width - 40;
    const randX = Math.floor(Math.random() * (currentWidth + 1));
    const randY = Math.floor(Math.random() * (currentHeight + 1));
    setPointsx(randX)
    setPointsy(randY)
  };

  const checkForContact = () =>{
    // console.log(pointsx, pointsy);
    const playerX = round(positionx)
    const playerY = round(positiony)
    // console.log(round(positionx), pointsx);
    if(pointsx - 40 < playerX &&  playerX < pointsx + 25 && pointsy - 40 <  playerY && playerY < pointsy + 25){
      setScore(score + 1)
      setRandomPoints()
    }
  }

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    //gauche
    if(data['x'] > 0.1 && positionx >= 0){
      setPositionx(positionx - Math.pow(10 * data['x'], 1.5));
    }
    //droite
    else if(data['x'] < -0.1 && positionx <= width - 40){
      setPositionx(positionx + Math.pow(10 * (-data['x']), 1.5));
    }
    //bas
    if(data['y'] > 0.1 && positiony <= height - 100){
      setPositiony(positiony + Math.pow(10 * data['y'], 1.5));
    }
    //haut
    else if(data['y'] < -0.1 && positiony >= 0){
    setPositiony(positiony - Math.pow(10 * (-data['y']), 1.5));
    }
    if(data['z'] > 2){
      // console.log('JUMP !');
    }
    checkForContact();
  }, [data]);
  
  useEffect(() => {
    console.log('new score : ', score);
  }, [score]);

  useEffect(() => {
    _subscribe();
    Accelerometer.setUpdateInterval(10);
    return () => _unsubscribe();
  }, []);

  const onFinishCD = () => {
    Alert.alert("Votre score final est de: " + score + ' !');
    setScore(0);
    Accelerometer.setUpdateInterval(100000000000);
  }

 
  return (
    <View style={styles.containerGame}>
      <Image style={{ top: positiony, left: positionx, width: 40, height: 40, zIndex: 100}} source={
        require('../assets/dot.png')
      }/>
      <View style={{left:width - 100, top: -40, zIndex: 110}}>
        <Text style={{ fontSize:50, color: 'white'}}>
          {score}
        </Text>
      </View>
      <View style={{top: pointsy, left: pointsx, zIndex: 90, position: 'absolute'}}>
        <Text>
          🟦
        </Text>
      </View>
      <CountDown
          until={30} 
          onFinish={onFinishCD}
          digitStyle={{backgroundColor: '#FFF'}}
          digitTxtStyle={{color: '#1CC625'}}
          timeToShow={['S']}
          timeLabels={{s: ''}}
          size={20}
          style={{position: 'absolute', left: width/2}}
        />
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}