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

export default function AALaporan({ navigation, route }) {

    const [loading, setLoading] = useState(false);


    const [kirim, setKirim] = useState({
        cabang: route.params.cabang,
        tanggal: moment().format('YYYY-MM-DD'),
        total_stock: 0,
        ditarik: 0,
        sisa_mentah: 0,
        sisa_mateng: 0,
        qris: 0,
        grab_gojek: 0,
        reseller: 0,
        minyak: 0,
        tisu: 0,
        lumpia: 0,
        sewa: 0,
        listrik: 0,
        atk: 0,
        gas: 0,
        gaji: 0,
        lainnya: 0,
        modal: 0,
        tunai_qris: 0,
        tarik_tunai: 0,
        diskon_reseller: 0,
    });

    // setLoading(false);

    const sendServer = () => {
        console.log(kirim);

        navigation.navigate('AALaporan2', kirim)

        // setLoading(true);


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
                <DatePicker
                    style={{ width: '100%' }}
                    date={kirim.tanggal}
                    mode="date"
                    placeholder="Silahkan pilih tanggal"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            borderWidth: 1,
                            backgroundColor: colors.zavalabs,
                            borderColor: colors.primary,
                            borderRadius: 10,
                            color: colors.black,
                            fontSize: 12,
                            fontFamily: fonts.primary[400],
                            width: '100%'
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={date => setKirim({ ...kirim, tanggal: date })}
                />
                <MyInput2 keyboardType="number-pad" label="TOTAL STOCK" onChangeText={x => setKirim({ ...kirim, total_stock: x })} />
                <MyInput2 keyboardType="number-pad" label="DITARIK" onChangeText={x => setKirim({ ...kirim, ditarik: x })} />
                <MyInput2 keyboardType="number-pad" label="SISA MENTAH" onChangeText={x => setKirim({ ...kirim, sisa_mentah: x })} />
                <MyInput2 keyboardType="number-pad" label="SISA MATENG" onChangeText={x => setKirim({ ...kirim, sisa_mateng: x })} />
                <MyInput2 keyboardType="number-pad" label="QRIS" onChangeText={x => setKirim({ ...kirim, qris: x })} />
                <MyInput2 keyboardType="number-pad" label="GRAB GOJEK" onChangeText={x => setKirim({ ...kirim, grab_gojek: x })} />
                <MyInput2 keyboardType="number-pad" label="RESELLER" onChangeText={x => setKirim({ ...kirim, reseller: x })} />


            </ScrollView>

            <MyGap jarak={20} />
            {!loading && <MyButton onPress={sendServer} title="KIRIM LAPORAN DAN LANJUT" warna={colors.primary} Icons="cloud-upload" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})