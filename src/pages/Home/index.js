import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, judul, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import { SliderBox } from "react-native-image-slider-box";


const MyMenu = ({ img, judul, onPress, desc }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{
      marginVertical: 5,
      borderRadius: 10,
      marginHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      height: windowHeight / 8
    }} >
      <View style={{

      }}>
        <Image source={img} style={{
          width: windowHeight / 6,
          height: windowHeight / 12,
          resizeMode: 'contain'
        }} />
      </View>
      <View>
        <Text style={{
          fontFamily: fonts.secondary[600],
          color: colors.white,
          fontSize: windowWidth / 20,

        }}>{judul}</Text>
        <Text style={{
          fontFamily: fonts.secondary[400],
          color: colors.white,
          fontSize: windowWidth / 30,

        }}>{desc}</Text>
      </View>
    </TouchableOpacity>
  )
}

const MyMenu2 = ({ img, judul, onPress, desc }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{
      marginVertical: 5,
      borderRadius: 10,
      marginHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.secondary,
      height: windowHeight / 12
    }} >
      <View style={{

      }}>
        <Image source={img} style={{
          width: windowHeight / 7,
          height: windowHeight / 20,
          resizeMode: 'contain'
        }} />
      </View>
      <View>
        <Text style={{
          fontFamily: fonts.secondary[600],
          color: colors.primary,
          fontSize: windowWidth / 25,

        }}>{judul}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function Home({ navigation }) {


  const [ENTRIES, SETENTITIES] = useState([]);
  const [mutasi, setMutasi] = useState({
    order: 0,
    setor: 0,
    saldo: 0
  });
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();
  useEffect(() => {

    if (isFocused) {
      __getTransaction();
    }


  }, [isFocused]);
  const [data, setData] = useState([]);
  const __getTransaction = () => {
    getData('user').then(res => {
      setUser(res);


      axios.post(apiURL + 'riwayat_sales', {
        fid_sales: res.id_user
      }).then(res => {
        console.log(res.data);
        setData(res.data);
      })


      axios.post(apiURL + 'saldo', {
        fid_user: res.id
      }).then(dd => {
        console.log(dd.data);
        setMutasi(dd.data);

      })

    })

    axios.post(apiURL + 'slider').then(res => {
      console.log(res.data)
      SETENTITIES(res.data);
    })

  }


  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };






  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>
      {/* header */}
      <View style={{
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>

        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flex: 1,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>Selamat datang, {user.nama_lengkap}</Text>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>{MYAPP}</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30
          }}>
            <Icon type='ionicon' name='person' color={colors.white} />

          </TouchableOpacity>

        </View>


      </View>





      <Image source={require('../../assets/logo2.png')} style={{
        width: windowWidth,
        height: 200,
      }} />

      <Text style={{
        fontFamily: fonts.secondary[600],
        textAlign: 'center',
        color: colors.white,
        fontSize: 20,
        backgroundColor: colors.black,
        padding: 10,
      }}>{user.level} {user.level == 'CABANG' ? `[ ${user.cabang} ]` : ''}</Text>

      {user.level == 'CABANG' &&

        <View style={{
          flex: 1,
          justifyContent: 'center',
        }}>
          <MyMenu onPress={() => navigation.navigate('AALaporan', user)} img={require('../../assets/A3.png')} judul="LAPORAN" desc="Input data laporan" />
          <MyMenu onPress={() => navigation.navigate('AASetor', user)} img={require('../../assets/A4.png')} judul="PERMINTAAN BAHAN" desc="Input permintaan bahan" />
          <MyMenu onPress={() => navigation.navigate('Account')} img={require('../../assets/A1.png')} judul="CEK LAPORAN" desc="Cek data laporan" />
        </View>
      }

      {user.level == 'PUSAT' &&

        <View style={{
          flex: 1,
          justifyContent: 'center',
        }}>
          <MyMenu2 onPress={() => navigation.navigate('AALaporan', user)} img={require('../../assets/A1.png')} judul="PERMINTAAN OUTLET" />
          <MyMenu2 onPress={() => navigation.navigate('AALaporan', user)} img={require('../../assets/A2.png')} judul="LAPORAN OUTLET" />
          <MyMenu2 onPress={() => navigation.navigate('AALaporan', user)} img={require('../../assets/A3.png')} judul="PENGELUARAN OFFICE" />
          <MyMenu2 onPress={() => navigation.navigate('AALaporan', user)} img={require('../../assets/A4.png')} judul="LAPORAN KEUANGAN" />
          <MyMenu2 onPress={() => navigation.navigate('Pengguna')} img={require('../../assets/A5.png')} judul="DATA PENGGUNA" />
        </View>
      }


    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: windowHeight,
    height: windowWidth / 2,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});