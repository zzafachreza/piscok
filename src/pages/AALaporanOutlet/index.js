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


export default function AALaporanOutlet({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [total, setTotal] = useState({});

    const [kirim, setKirim] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
    });

    // setLoading(false);

    const [data, setData] = useState([]);
    const sendServer = () => {
        console.log(kirim);
        setLoading(true);

        setTimeout(() => {

            axios.post(apiURL + 'laporan_outlet', kirim).then(res => {
                console.log(res.data.total);
                if (res.data == null) {
                    setLoading(false);
                    setOpen(false);
                    Alert.alert(MYAPP, 'Tidak ada laporan di tanggal ' + moment(kirim.tanggal).format('DD/MMM/YYYY'))
                } else {
                    setLoading(false);
                    setOpen(true);
                    setTotal(res.data.total);
                    setData(res.data.data);
                }
            })
        }, 200)



    }



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
            justifyContent: 'space-around'
        }}>



            <TouchableOpacity
                onPress={() => navigation.navigate('AALaporanOutletPenjualan')}
                style={{
                    height: windowHeight / 3,
                    backgroundColor: colors.primary,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Icon type='ionicon' name='pie-chart' size={100} color={colors.white} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    color: colors.white
                }}>LAPORAN PENJUALAN</Text>

            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('AALaporanOutletPermintaan')}
                style={{
                    height: windowHeight / 3,
                    backgroundColor: colors.secondary,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Icon type='ionicon' name='receipt' size={100} color={colors.white} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    color: colors.white
                }}>LAPORAN PERMINTAAN BAHAN</Text>

            </TouchableOpacity>


        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    judul: {
        flex: 1,
        backgroundColor: colors.primary,
        margin: 1,
        paddingHorizontal: 3,
        paddingVertical: 5,
        color: colors.white,
        fontFamily: fonts.secondary[600],
        fontSize: 7,
        textAlign: 'center'
    },
    judulFooterIsi: {
        flex: 1,
        backgroundColor: colors.white,
        margin: 1,
        paddingHorizontal: 3,
        paddingVertical: 5,
        color: colors.black,
        fontFamily: fonts.secondary[600],
        fontSize: 11,
        textAlign: 'center'
    },
    judulFooterTotal: {
        flex: 1,
        backgroundColor: colors.primary,
        margin: 1,
        paddingHorizontal: 3,
        paddingVertical: 5,
        color: colors.white,
        fontFamily: fonts.secondary[600],
        fontSize: 11,
    },
    judulFooter: {
        flex: 1,
        backgroundColor: colors.white,
        margin: 1,
        paddingHorizontal: 3,
        paddingVertical: 5,
        color: colors.black,
        fontFamily: fonts.secondary[600],
        fontSize: 10,
        textAlign: 'center'
    },
    isi: {
        flex: 1,
        backgroundColor: colors.white,
        margin: 1,
        paddingHorizontal: 3,
        paddingVertical: 5,
        color: colors.primary,
        fontFamily: fonts.secondary[400],
        fontSize: 10,
        textAlign: 'center'
    }
})