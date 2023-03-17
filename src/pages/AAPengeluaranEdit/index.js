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

export default function AAPengeluaranEdit({ navigation, route }) {

    const [loading, setLoading] = useState(false);


    const [kirim, setKirim] = useState(route.params);

    // setLoading(false);

    const sendServer = () => {
        console.log(kirim);

        navigation.navigate('AAPengeluaranReview', kirim)

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



                <MyInput2 value={kirim.minyak} keyboardType="number-pad" label="MINYAK" onChangeText={x => setKirim({ ...kirim, minyak: x })} />
                <MyInput2 value={kirim.cokelat} keyboardType="number-pad" label="COKELAT" onChangeText={x => setKirim({ ...kirim, cokelat: x })} />
                <MyInput2 value={kirim.pisang} keyboardType="number-pad" label="PISANG" onChangeText={x => setKirim({ ...kirim, pisang: x })} />
                <MyInput2 value={kirim.lumpia} keyboardType="number-pad" label="LUMPIA" onChangeText={x => setKirim({ ...kirim, lumpia: x })} />
                <MyInput2 value={kirim.mika} keyboardType="number-pad" label="MIKA" onChangeText={x => setKirim({ ...kirim, mika: x })} />
                <MyInput2 value={kirim.plastik} keyboardType="number-pad" label="PLASTIK" onChangeText={x => setKirim({ ...kirim, plastik: x })} />
                <MyInput2 value={kirim.kotak} keyboardType="number-pad" label="KOTAK" onChangeText={x => setKirim({ ...kirim, kotak: x })} />
                <MyInput2 value={kirim.tissue} keyboardType="number-pad" label="TISSUE" onChangeText={x => setKirim({ ...kirim, tissue: x })} />
                <MyInput2 value={kirim.sewa} keyboardType="number-pad" label="SEWA" onChangeText={x => setKirim({ ...kirim, sewa: x })} />
                <MyInput2 value={kirim.donasi} keyboardType="number-pad" label="DONASI" onChangeText={x => setKirim({ ...kirim, donasi: x })} />
                <MyInput2 value={kirim.iklan} keyboardType="number-pad" label="IKLAN" onChangeText={x => setKirim({ ...kirim, iklan: x })} />
                <MyInput2 value={kirim.reward} keyboardType="number-pad" label="REWARD" onChangeText={x => setKirim({ ...kirim, reward: x })} />
                <MyInput2 value={kirim.peralatan} keyboardType="number-pad" label="PERALATAN" onChangeText={x => setKirim({ ...kirim, peralatan: x })} />
                <MyInput2 value={kirim.perlengkapan} keyboardType="number-pad" label="PERLENGKAPAN" onChangeText={x => setKirim({ ...kirim, perlengkapan: x })} />
                <MyInput2 value={kirim.gaji} keyboardType="number-pad" label="GAJI" onChangeText={x => setKirim({ ...kirim, gaji: x })} />
                <MyInput2 value={kirim.lainnya} keyboardType="number-pad" label="LAINNYA" onChangeText={x => setKirim({ ...kirim, lainnya: x })} />

            </ScrollView>

            <MyGap jarak={20} />
            {!loading && <MyButton onPress={sendServer} title="NEXT" warna={colors.primary} Icons="cloud-upload" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})