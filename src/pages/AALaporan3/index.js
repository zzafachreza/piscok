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

export default function AALaporan3({ navigation, route }) {

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


    useEffect(() => {



    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>


            <ScrollView showsVerticalScrollIndicator={false}>
                <MyInput2 label="MODAL" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, modal: x })} />
                <MyInput2 label="TUNAI QRIS" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, tunai_qris: x })} />
                <MyInput2 label="TARIK TUNAI" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, tarik_tunai: x })} />
                <MyInput2 label="DISKON RESELLER" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, diskon_reseller: x })} />
            </ScrollView>

            <MyGap jarak={20} />
            {!loading && <MyButton onPress={sendServer} title="KIRIM LAPORAN DAN CEK" warna={colors.primary} Icons="cloud-upload" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})