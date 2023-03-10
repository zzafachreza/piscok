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

export default function AALaporanReview({ navigation, route }) {

    const [loading, setLoading] = useState(false);


    const [kirim, setKirim] = useState(route.params);
    const [add, setAdd] = useState({
        jumlah: parseFloat(route.params.total_stock) - (
            parseFloat(route.params.ditarik) +
            parseFloat(route.params.sisa_mentah) +
            parseFloat(route.params.sisa_mateng)),
        total_beli: (parseFloat(route.params.minyak) +
            parseFloat(route.params.tisu) +
            parseFloat(route.params.gas) +
            parseFloat(route.params.sewa) +
            parseFloat(route.params.listrik) +
            parseFloat(route.params.atk) +
            parseFloat(route.params.lainnya)),
    })

    // setLoading(false);

    useEffect(() => {
        setKirim({
            ...kirim,
            jumlah: parseFloat(route.params.total_stock) - (
                parseFloat(route.params.ditarik) +
                parseFloat(route.params.sisa_mentah) +
                parseFloat(route.params.sisa_mateng)),
            penjualan_kotor: add.jumlah * 3500,
            penjualan_nontunai: (kirim.qris * 3500) + (kirim.grab_gojek * 3500) + (kirim.reseller * 3000),
            penjualan_tunai: (add.jumlah * 3500) - ((kirim.qris * 3500) + (kirim.grab_gojek * 3500) + (kirim.reseller * 3000)),
            pembelian_outlet: add.total_beli,
            setoran_outlet: ((add.jumlah * 3500) - ((kirim.qris * 3500) + (kirim.grab_gojek * 3500) + (kirim.reseller * 3000))) - add.total_beli
        });
    }, [])

    const sendServer = () => {
        // setLoading(true);


        setTimeout(() => {
            console.log('send server', kirim)
            axios.post(apiURL + 'laporan_add', kirim).then(res => {

                console.log(res.data);
                if (res.data.status == 200) {
                    setLoading(false);
                    setKirim({})
                    Alert.alert(MYAPP, 'Laporan tanggal ' + moment(kirim.tanggal).format('DD/MMM/YYYY') + ' berhasil di simpan !');
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
                <MyList l='TOTAL STOCK' v={kirim.total_stock} />
                <MyList l='DITARIK' v={kirim.ditarik} />
                <MyList l='SISA MENTAH' v={kirim.sisa_mentah} />
                <MyList l='SISA MATENG' v={kirim.sisa_mateng} />



                <MyList l='JUMLAH' judul v={new Intl.NumberFormat().format(kirim.jumlah) + ' PCS'} />
                <MyList l='PENJUALAN KOTOR' judul v={new Intl.NumberFormat().format(kirim.penjualan_kotor)} />

                <MyGap jarak={20} />
                <MyList l='QRIS x 3,500' v={new Intl.NumberFormat().format(kirim.qris * 3500)} />
                <MyList l='GRAB GOJEK x 3,500' v={new Intl.NumberFormat().format(kirim.grab_gojek * 3500)} />
                <MyList l='RESELLER x 3,000' v={new Intl.NumberFormat().format(kirim.reseller * 3000)} />
                <MyList judul l='PENJUALAN NONTUNAI' v={new Intl.NumberFormat().format(kirim.penjualan_nontunai)} />
                <MyGap jarak={20} />
                <MyList judul l='PENJUALAN TUNAI' v={new Intl.NumberFormat().format(kirim.penjualan_tunai)} />
                <MyGap jarak={20} />
                {kirim.minyak > 0 && <MyList l='PEMBELIAN MINYAK' v={new Intl.NumberFormat().format(kirim.minyak)} />}
                {kirim.tisu > 0 && <MyList l='PEMBELIAN TISU' v={new Intl.NumberFormat().format(kirim.tisu)} />}
                {kirim.gas > 0 && <MyList l='PEMBELIAN GAS' v={new Intl.NumberFormat().format(kirim.gas)} />}
                {kirim.sewa > 0 && <MyList l='PEMBELIAN SEWA' v={new Intl.NumberFormat().format(kirim.sewa)} />}
                {kirim.listrik > 0 && <MyList l='PEMBELIAN LISTRIK' v={new Intl.NumberFormat().format(kirim.listrik)} />}
                {kirim.atk > 0 && <MyList l='PEMBELIAN ATK' v={new Intl.NumberFormat().format(kirim.atk)} />}
                {kirim.lainnya > 0 && <MyList l='PEMBELIAN LAINNYA' v={new Intl.NumberFormat().format(kirim.lainnya)} />}
                <MyList judul l='PEMBELIAN OUTLET' v={new Intl.NumberFormat().format(kirim.pembelian_outlet)} />

                <MyGap jarak={20} />
                <MyList judul l='SETORAN OUTLET' v={new Intl.NumberFormat().format(kirim.setoran_outlet)} />
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
                        <MyButton onPress={() => navigation.navigate('AALaporan')} title="EDIT" warna={colors.primary} Icons="create-outline" />
                    </View>
                </View>}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})