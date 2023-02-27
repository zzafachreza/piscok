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
        console.log(kirim);

        navigation.navigate('AALaporanReview', kirim)

        // axios.post(apiURL + 'laporan_add', kirim).then(res => {
        //     setLoading(true);
        //     console.log(res.data);
        //     if (res.data.status == 200) {
        //         // setLoading(false);
        //         Alert.alert(MYAPP, 'Laporan tanggal' + moment(kirim.tanggal).format('DD/MM/YYYY') + ' berhasil di simpan !');
        //         navigation.replace('Home');
        //     }
        // })
    }

    const [region, setRegion] = useState([]);

    useEffect(() => {

        axios.post(apiURL + 'sales').then(res => {
            console.log(res.data);
            setRegion(res.data);

        })

    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>


            <ScrollView showsVerticalScrollIndicator={false}>
                <MyInput2 label="MINYAK" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, minyak: x })} />
                <MyInput2 label="TISU" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, tisu: x })} />
                <MyInput2 label="GAS" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, gas: x })} />
                <MyInput2 label="SEWA" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, sewa: x })} />
                <MyInput2 label="LISTRIK" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, listrik: x })} />
                <MyInput2 label="ATK" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, atk: x })} />
                <MyInput2 label="LAINNYA" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, lainnya: x })} />
            </ScrollView>

            <MyGap jarak={20} />
            {!loading && <MyButton onPress={sendServer} title="KIRIM LAPORAN DAN CEK" warna={colors.primary} Icons="cloud-upload" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})