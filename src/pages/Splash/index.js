import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
} from 'react-native';
import { MyButton } from '../../components';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';

export default function Splash({ navigation }) {
  const top = new Animated.Value(0.3);

  const animasi = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(top, {
          toValue: 1,
          duration: 1000,
        }),
        Animated.timing(top, {
          toValue: 0.3,
          duration: 1000,
        }),
      ]),
      {
        iterations: 1,
      },
    ).start();
  };



  useEffect(() => {
    setTimeout(() => {
      getData('user').then(res => {
        if (!res) {
          navigation.replace('Login')
        } else {
          navigation.replace('Home')
        }
      })
    }, 1500)
  }, []);


  return (
    <ImageBackground
      source={require('../../assets/back.png')}
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>


        <ActivityIndicator size="large" color={colors.primary} />


      </View>




    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
