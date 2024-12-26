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


export default function AACekLaporan({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [ubah, setUbah] = useState({
        cabang: route.params.cabang,
        tanggal: typeof route.params.tanggal === "undefined" ? moment().format('YYYY-MM-DD') : route.params.tanggal,
    })

    const [kirim, setKirim] = useState({
        cabang: route.params.cabang,
        tanggal: typeof route.params.tanggal === "undefined" ? moment().format('YYYY-MM-DD') : route.params.tanggal,
    });

    // setLoading(false);

    const [data, setData] = useState({});

    const sendUbah = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan ubah tanggal dari ' + moment(data.tanggal).format('DD/MMM/YYYY') + ' ke tangal ' + moment(ubah.tanggal).format('DD/MMM/YYYY'),
            [
                { text: 'TIDAK' },
                {
                    text: 'IYA',
                    onPress: () => {
                        setLoading(true);

                        setTimeout(() => {

                            axios.post(apiURL + 'laporan_update', {
                                id_laporan: data.id_laporan,
                                tanggal: ubah.tanggal
                            }).then(res => {
                                console.log(res.data);
                                setLoading(false);
                                setData({
                                    ...data,
                                    tanggal: ubah.tanggal
                                });

                            })
                        }, 200)
                    }
                }
            ])
    }

    useEffect(() => {
        console.log(route.params.tanggal)
        if (typeof route.params.tanggal !== "undefined") {
            axios.post(apiURL + 'laporan_cek', kirim).then(res => {
                console.log(res.data);
                if (res.data.data == null) {
                    setLoading(false);
                    setOpen(false);
                    Alert.alert(MYAPP, 'Tidak ada laporan di tanggal ' + moment(kirim.tanggal).format('DD/MMM/YYYY'))
                } else {
                    setLoading(false);
                    setOpen(true);
                    setData(res.data.data);
                }
            })
        }
    }, [])

    const sendServer = () => {
        console.log(kirim);
        setLoading(true);

        setTimeout(() => {

            axios.post(apiURL + 'laporan_cek', kirim).then(res => {
                console.log(res.data);
                if (res.data.data == null) {
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

                <Text style={{
                    textAlign: 'center',
                    fontFamily: fonts.secondary[600],
                    marginBottom: 10,
                    fontSize: 18,
                }}>CABANG [ {route.params.cabang} ]</Text>

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
                            }}>SET TANGGAL</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* result() */}
                <Text></Text>
                {open && <View>
                    <Text style={{
                        marginTop: 10,
                        fontFamily: fonts.secondary[600],
                        fontSize: 17,
                        color: colors.primary,
                        textAlign: 'right'
                    }}>{moment(data.tanggal).format('DD/MMM/YYYY')}</Text>
                    <MyList l='TOTAL STOCK' v={data.total_stock} />
                    <MyList l='DITARIK' v={data.ditarik} />
                    <MyList l='SISA MENTAH' v={data.sisa_mentah} />
                    <MyList l='SISA MATENG' v={data.sisa_mateng} />



                    <MyList l='JUMLAH' judul v={new Intl.NumberFormat().format(data.jumlah) + ' PCS'} />
                    <MyList l='PENJUALAN KOTOR' judul v={new Intl.NumberFormat().format(data.penjualan_kotor)} />

                    <MyGap jarak={20} />
                    <MyList l='QRIS x 4,000' v={new Intl.NumberFormat().format(data.qris * 4000)} />
                    <MyList l='TUNAI QRIS' v={`( ${new Intl.NumberFormat().format(data.tunai_qris)} )`} />
                    <MyList l='GRAB GOJEK x 4,000' v={new Intl.NumberFormat().format(data.grab_gojek * 4000)} />
                    <MyList l='RESELLER x 4,000' v={new Intl.NumberFormat().format(data.reseller * 4000)} />
                    <MyList l='TARIK TUNAI' v={new Intl.NumberFormat().format(data.tarik_tunai)} />
                    <MyList judul l='PENJUALAN NONTUNAI' v={new Intl.NumberFormat().format(data.penjualan_nontunai)} />

                    <MyGap jarak={20} />
                    {data.gaji > 0 && <MyList l='GAJI' v={new Intl.NumberFormat().format(data.gaji)} />}
                    {data.minyak > 0 && <MyList l='PEMBELIAN MINYAK' v={new Intl.NumberFormat().format(data.minyak)} />}
                    {data.tisu > 0 && <MyList l='PEMBELIAN TISU' v={new Intl.NumberFormat().format(data.tisu)} />}
                    {data.lumpia > 0 && <MyList l='LUMPIA' v={new Intl.NumberFormat().format(data.lumpia)} />}
                    {data.gas > 0 && <MyList l='PEMBELIAN GAS' v={new Intl.NumberFormat().format(data.gas)} />}
                    {data.sewa > 0 && <MyList l='PEMBELIAN SEWA' v={new Intl.NumberFormat().format(data.sewa)} />}
                    {data.listrik > 0 && <MyList l='PEMBELIAN LISTRIK' v={new Intl.NumberFormat().format(data.listrik)} />}
                    {data.atk > 0 && <MyList l='PEMBELIAN ATK' v={new Intl.NumberFormat().format(data.atk)} />}
                    {data.lainnya > 0 && <MyList l='PEMBELIAN LAINNYA' v={new Intl.NumberFormat().format(data.lainnya)} />}
                    <MyList judul l='TOTAL PENGELUARAN' v={new Intl.NumberFormat().format(data.pembelian_outlet)} />
                    <MyGap jarak={20} />
                    <MyList judul l='PENJUALAN TUNAI' v={new Intl.NumberFormat().format(data.penjualan_tunai)} />
                    <MyList judul l='MODAL' v={new Intl.NumberFormat().format(data.modal)} />
                    <MyList judul l='DISKON RESELLER' v={new Intl.NumberFormat().format(data.diskon_reseller)} />
                    <MyList judul l='SETORAN TUNAI' v={new Intl.NumberFormat().format(data.setoran_outlet)} />

                    <MyGap jarak={20} />

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <DatePicker
                                style={{ width: '100%' }}
                                date={ubah.tanggal}
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
                                onDateChange={date => setUbah({ ...kirim, tanggal: date })}
                            />
                        </View>
                        <View style={{
                            flex: 1,
                        }}>
                            <TouchableOpacity onPress={sendUbah} style={{
                                backgroundColor: colors.danger,
                                height: 40,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 10,
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.white
                                }}>UBAH TANGGAL</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                }
            </ScrollView>




            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})