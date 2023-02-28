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
import 'moment/locale/id'
import MyInput2 from '../../components/MyInput2';


const MyList = ({ l, v, judul = false }) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: colors.border, }}>
            <Text style={styles.judulFooterTotal}>{l}</Text>
            <Text style={styles.judulFooterIsi}>{v}</Text>
        </View>
    )
}


export default function AALaporanKeuanganDetail({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [total, setTotal] = useState({});

    const [kirim, setKirim] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
    });

    // setLoading(false);

    const [data, setData] = useState({});
    const sendServer = () => {
        console.log(kirim);
        setLoading(true);

        setTimeout(() => {

            axios.post(apiURL + 'keuangan_detail', kirim).then(res => {
                console.log(res.data);
                if (res.data == null) {
                    setLoading(false);
                    setOpen(false);
                    Alert.alert(MYAPP, 'Tidak ada laporan di tanggal ' + moment(kirim.tanggal).format('DD/MMM/YYYY'))
                } else {
                    setLoading(false);
                    setOpen(true);
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
        }}>


            <ScrollView showsVerticalScrollIndicator={false}>


                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <DatePicker
                            style={{ width: '100%' }}
                            date={kirim.tanggal}
                            mode="date"
                            placeholder="Silahkan pilih tanggal"
                            format="YYYY-MM"
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
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <TouchableOpacity onPress={sendServer} style={{
                            backgroundColor: colors.primary,
                            height: 40,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 10,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.white
                            }}>SET TAHUN DAN BULAN</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* result() */}









                {open && <View>

                    <View style={{ flex: 1, marginTop: 5, flexDirection: 'row', backgroundColor: colors.border, }}>
                        <Text style={styles.judulFooterTotal}>ITEM</Text>
                        <Text style={styles.judulFooterTotal}>BULAN INI</Text>
                    </View>

                    <MyList l="MINYAK" v={'Rp' + new Intl.NumberFormat().format(data.minyak)} />
                    <MyList l="COKELAT" v={'Rp' + new Intl.NumberFormat().format(data.cokelat)} />
                    <MyList l="PISANG" v={'Rp' + new Intl.NumberFormat().format(data.pisang)} />
                    <MyList l="LUMPIA" v={'Rp' + new Intl.NumberFormat().format(data.lumpia)} />
                    <MyList l="MIKA" v={'Rp' + new Intl.NumberFormat().format(data.mika)} />
                    <MyList l="PLASTIK" v={'Rp' + new Intl.NumberFormat().format(data.plastik)} />
                    <MyList l="KOTAK" v={'Rp' + new Intl.NumberFormat().format(data.kotak)} />
                    <MyList l="SEWA" v={'Rp' + new Intl.NumberFormat().format(data.sewa)} />
                    <MyList l="DONASI" v={'Rp' + new Intl.NumberFormat().format(data.donasi)} />
                    <MyList l="IKLAN" v={'Rp' + new Intl.NumberFormat().format(data.iklan)} />
                    <MyList l="REWARD" v={'Rp' + new Intl.NumberFormat().format(data.reward)} />
                    <MyList l="PERALATAN" v={'Rp' + new Intl.NumberFormat().format(data.peralatan)} />
                    <MyList l="PERLENGKAPAN" v={'Rp' + new Intl.NumberFormat().format(data.perlengkapan)} />
                    <MyList l="GAJI" v={'Rp' + new Intl.NumberFormat().format(data.gaji)} />
                    <MyList l="LAINNYA" v={'Rp' + new Intl.NumberFormat().format(data.lainnya)} />




                </View>}




            </ScrollView>

            <MyGap jarak={20} />


            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
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
        textAlign: 'center'
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