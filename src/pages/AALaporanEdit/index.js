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

export default function AALaporanEdit({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    const [kirim, setKirim] = useState(route.params);



    // setLoading(false);

    const sendServer = () => {
        console.log('otw pengeluaran', kirim);



        navigation.navigate('AALaporanReview', kirim)

        // setLoading(true);


    }



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
                <MyInput2 value={kirim.total_stock} keyboardType="number-pad" label="TOTAL STOCK" onChangeText={x => setKirim({ ...kirim, total_stock: x })} />
                <MyInput2 value={kirim.ditarik} keyboardType="number-pad" label="DITARIK" onChangeText={x => setKirim({ ...kirim, ditarik: x })} />
                <MyInput2 value={kirim.sisa_mentah} keyboardType="number-pad" label="SISA MENTAH" onChangeText={x => setKirim({ ...kirim, sisa_mentah: x })} />
                <MyInput2 value={kirim.sisa_mateng} keyboardType="number-pad" label="SISA MATENG" onChangeText={x => setKirim({ ...kirim, sisa_mateng: x })} />
                <MyInput2 value={kirim.qris} keyboardType="number-pad" label="QRIS" onChangeText={x => setKirim({ ...kirim, qris: x })} />
                <MyInput2 value={kirim.grab_gojek} keyboardType="number-pad" label="GRAB GOJEK" onChangeText={x => setKirim({ ...kirim, grab_gojek: x })} />
                <MyInput2 value={kirim.reseller} keyboardType="number-pad" label="RESELLER" onChangeText={x => setKirim({ ...kirim, reseller: x })} />

                <MyInput2 value={kirim.minyak} label="MINYAK" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, minyak: x })} />
                <MyInput2 value={kirim.tisu} label="TISU" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, tisu: x })} />
                <MyInput2 value={kirim.lumpia} label="LUMPIA" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, lumpia: x })} />
                <MyInput2 value={kirim.sewa} label="SEWA" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, sewa: x })} />
                <MyInput2 value={kirim.listrik} label="LISTRIK" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, listrik: x })} />
                <MyInput2 value={kirim.atk} label="ATK" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, atk: x })} />
                <MyInput2 value={kirim.gas} label="GAS" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, gas: x })} />
                <MyInput2 value={kirim.gaji} label="GAJI" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, gaji: x })} />
                <MyInput2 value={kirim.lainnya} label="LAINNYA" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, lainnya: x })} />


                <MyInput2 value={kirim.modal} label="MODAL" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, modal: x })} />
                <MyInput2 value={kirim.tunai_qris} label="TUNAI QRIS" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, tunai_qris: x })} />
                <MyInput2 value={kirim.tarik_tunai} label="TARIK TUNAI" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, tarik_tunai: x })} />
                <MyInput2 value={kirim.diskon_reseller} label="DISKON RESELLER" keyboardType="number-pad" onChangeText={x => setKirim({ ...kirim, diskon_reseller: x })} />

            </ScrollView>
            <MyGap jarak={20} />
            {!loading && <MyButton onPress={sendServer} title="KIRIM LAPORAN DAN LANJUT" warna={colors.primary} Icons="cloud-upload" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})