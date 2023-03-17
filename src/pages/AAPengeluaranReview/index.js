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


const MyList = ({ l, v, judul = false }) => {
    return (
        <View style={{
            flexDirection: 'row',
            padding: 3,
            marginVertical: 1,
            borderBottomWidth: 1,
            borderBottomColor: colors.zavalabs
        }}>
            <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: 14,
                color: judul ? colors.danger : colors.black,
                flex: 1,
            }}>{l}</Text>
            <Text style={{
                flex: 0.1,
                fontFamily: fonts.secondary[600],
                fontSize: 14
            }}>:</Text>
            <Text style={{
                flex: 1,
                textAlign: judul ? 'center' : 'left',
                fontFamily: judul ? fonts.secondary[600] : fonts.secondary[400],
                fontSize: 15,
                color: judul ? colors.danger : colors.black,
            }}>{v}</Text>
        </View>
    )
}

export default function AAPengeluaranReview({ navigation, route }) {

    const [loading, setLoading] = useState(false);


    const [kirim, setKirim] = useState(route.params);
    const [add, setAdd] = useState({
        pembelian_total: parseFloat(kirim.minyak) +
            parseFloat(kirim.cokelat) +
            parseFloat(kirim.pisang) +
            parseFloat(kirim.lumpia) +
            parseFloat(kirim.mika) +
            parseFloat(kirim.plastik) +
            parseFloat(kirim.kotak) +
            parseFloat(kirim.sewa) +
            parseFloat(kirim.donasi) +
            parseFloat(kirim.iklan) +
            parseFloat(kirim.tissue) +
            parseFloat(kirim.reward) +
            parseFloat(kirim.peralatan) +
            parseFloat(kirim.perlengkapan) +
            parseFloat(kirim.gaji) +
            parseFloat(kirim.lainnya),
    })

    // setLoading(false);

    useEffect(() => {
        setKirim({
            ...kirim,
            pembelian_total: add.pembelian_total
        });
    }, [])

    const sendServer = () => {
        setLoading(true);


        setTimeout(() => {
            console.log('send server', kirim)
            axios.post(apiURL + 'pengeluaran_add', kirim).then(res => {

                console.log(res.data);
                if (res.data.status == 200) {
                    setLoading(false);
                    setKirim({})
                    Alert.alert(MYAPP, 'Pengeluaran Office tanggal ' + moment(kirim.tanggal).format('DD/MMM/YYYY') + ' berhasil di simpan !');
                    navigation.replace('Home');
                }
            })
        }, 1200)

        // navigation.navigate('AALaporanReview', kirim)


    }



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>


            <ScrollView showsVerticalScrollIndicator={false}>

                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 17,
                    color: colors.primary,
                    textAlign: 'right'
                }}>{moment(kirim.tanggal).format('DD/MMM/YYYY')}</Text>

                {kirim.minyak > 0 && <MyList v={new Intl.NumberFormat().format(kirim.minyak)} l='MINYAK' />}
                {kirim.cokelat > 0 && <MyList v={new Intl.NumberFormat().format(kirim.cokelat)} l='COKELAT' />}
                {kirim.pisang > 0 && <MyList v={new Intl.NumberFormat().format(kirim.pisang)} l='PISANG' />}
                {kirim.lumpia > 0 && <MyList v={new Intl.NumberFormat().format(kirim.lumpia)} l='LUMPIA' />}
                {kirim.mika > 0 && <MyList v={new Intl.NumberFormat().format(kirim.mika)} l='MIKA' />}
                {kirim.plastik > 0 && <MyList v={new Intl.NumberFormat().format(kirim.plastik)} l='PLASTIK' />}
                {kirim.kotak > 0 && <MyList v={new Intl.NumberFormat().format(kirim.kotak)} l='KOTAK' />}
                {kirim.tissue > 0 && <MyList v={new Intl.NumberFormat().format(kirim.tissue)} l='TISSUE' />}
                {kirim.sewa > 0 && <MyList v={new Intl.NumberFormat().format(kirim.sewa)} l='SEWA' />}
                {kirim.donasi > 0 && <MyList v={new Intl.NumberFormat().format(kirim.donasi)} l='DONASI' />}
                {kirim.iklan > 0 && <MyList v={new Intl.NumberFormat().format(kirim.iklan)} l='IKLAN' />}
                {kirim.reward > 0 && <MyList v={new Intl.NumberFormat().format(kirim.reward)} l='REWARD' />}
                {kirim.peralatan > 0 && <MyList v={new Intl.NumberFormat().format(kirim.peralatan)} l='PERALATAN' />}
                {kirim.perlengkapan > 0 && <MyList v={new Intl.NumberFormat().format(kirim.perlengkapan)} l='PERLENGKAPAN' />}
                {kirim.gaji > 0 && <MyList v={new Intl.NumberFormat().format(kirim.gaji)} l='gaji' />}
                {kirim.lainnya > 0 && <MyList v={new Intl.NumberFormat().format(kirim.lainnya)} l='LAINNYA' />}
                <MyGap jarak={20} />
                <MyList judul l='TOTAL PEMBELIAN' v={'Rp.' + new Intl.NumberFormat().format(add.pembelian_total)} />


            </ScrollView>

            <MyGap jarak={20} />
            {!loading &&
                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                        padding: 10,
                    }}>
                        <MyButton onPress={sendServer} title="KIRIM" warna={colors.primary} Icons="cloud-upload-outline" />
                    </View>
                    <View style={{
                        flex: 1,
                        padding: 10,
                    }}>
                        <MyButton onPress={() => navigation.replace('AAPengeluaranEdit', kirim)} title="EDIT" warna={colors.primary} Icons="create-outline" />
                    </View>
                </View>}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})