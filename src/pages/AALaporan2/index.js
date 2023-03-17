import { Alert, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import {
    formatCurrency,
    getSupportedCurrencies,
} from "react-native-format-currency";
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import MyInput2 from '../../components/MyInput2';

export default function AALaporan2({ navigation, route }) {

    const [loading, setLoading] = useState(false);


    const [kirim, setKirim] = useState(route.params);

    // setLoading(false);

    const sendServer = () => {
        console.log('otw keungan', kirim);

        navigation.navigate('AALaporan3', kirim)
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>


            <ScrollView showsVerticalScrollIndicator={false}>

                <MyInput2 value={kirim.minyak} label="MINYAK" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, minyak: x })} />
                <MyInput2 value={kirim.tisu} label="TISU" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, tisu: x })} />
                <MyInput2 value={kirim.lumpia} label="LUMPIA" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, lumpia: x })} />
                <MyInput2 value={kirim.sewa} label="SEWA" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, sewa: x })} />
                <MyInput2 value={kirim.listrik} label="LISTRIK" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, listrik: x })} />
                <MyInput2 value={kirim.atk} label="ATK" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, atk: x })} />
                <MyInput2 value={kirim.gas} label="GAS" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, gas: x })} />
                <MyInput2 value={kirim.gaji} label="GAJI" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, gaji: x })} />
                <MyInput2 value={kirim.lainnya} label="LAINNYA" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, lainnya: x })} />

            </ScrollView>

            <MyGap jarak={20} />
            {!loading && <MyButton onPress={sendServer} title="KIRIM LAPORAN DAN LANJUT" warna={colors.primary} Icons="cloud-upload" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})