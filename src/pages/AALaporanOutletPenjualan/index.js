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


export default function AALaporanOutletPenjualan({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [total, setTotal] = useState({});

    const [kirim, setKirim] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
    });

    // setLoading(false);

    const [data, setData] = useState([]);
    const sendServer = () => {
        // console.log(kirim);
        setLoading(true);

        setTimeout(() => {

            axios.post(apiURL + 'laporan_outlet', kirim).then(res => {
                console.log(res.data);
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

                <View style={{
                    flex: 1,
                    marginTop: 5,
                    flexDirection: 'row',
                    backgroundColor: colors.border,
                }}>
                    <Text style={styles.judul}>OUTLET</Text>
                    <Text style={styles.judul}>TOTAL STOCK</Text>
                    <Text style={styles.judul}>DITARIK</Text>
                    <Text style={styles.judul}>SISA MENTAH</Text>
                    <Text style={styles.judul}>SISA MATENG</Text>
                    <Text style={styles.judul}>QRIS</Text>
                    <Text style={styles.judul}>GRAB GOJEK</Text>
                    <Text style={styles.judul}>RESELLER</Text>
                    <Text style={styles.judul}>PEMBELIAN</Text>
                </View>


                {open && <View>

                    {data.map(item => {
                        return (
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                backgroundColor: colors.border,
                            }}>
                                <Text style={styles.isi}>{item.cabang}<TouchableOpacity onPress={() => {
                                    Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                                        { text: 'TIDAK' },
                                        {
                                            text: 'IYA',
                                            onPress: () => {
                                                axios.post(apiURL + 'laporan_outlet_delete', {
                                                    id_laporan: item.id
                                                }).then(rs => {
                                                    console.log(rs.data);
                                                    sendServer();
                                                })
                                            }
                                        }
                                    ])
                                }}><Icon type='ionicon' name='trash' size={10} /></TouchableOpacity></Text>
                                <Text style={styles.isi}>{item.total_stock}</Text>
                                <Text style={styles.isi}>{item.ditarik}</Text>
                                <Text style={styles.isi}>{item.sisa_mentah}</Text>
                                <Text style={styles.isi}>{item.sisa_mateng}</Text>
                                <Text style={styles.isi}>{item.qris}</Text>
                                <Text style={styles.isi}>{item.grab_gojek}</Text>
                                <Text style={styles.isi}>{item.reseller}</Text>
                                <Text style={styles.isi}>{new Intl.NumberFormat().format(item.pembelian_outlet)}{'\n'}
                                    <TouchableOpacity onPress={() => {
                                        console.log(item);
                                        navigation.navigate('AACekLaporan', {
                                            cabang: item.cabang,
                                            tanggal: kirim.tanggal
                                        })
                                    }}>
                                        <Icon type='ionicon' name='eye' size={15} />
                                    </TouchableOpacity>

                                </Text>

                            </View>
                        )
                    })}

                    <View style={{
                        flex: 1,

                        flexDirection: 'row',
                        backgroundColor: colors.border,
                    }}>
                        <Text style={styles.judulFooter}>TOTAL</Text>
                        <Text style={styles.judulFooter}>{total.total_stockTotal}</Text>
                        <Text style={styles.judulFooter}>{total.ditarikTotal}</Text>
                        <Text style={styles.judulFooter}>{total.sisa_mentahTotal}</Text>
                        <Text style={styles.judulFooter}>{total.sisa_matengTotal}</Text>
                        <Text style={styles.judulFooter}>{total.qrisTotal}</Text>
                        <Text style={styles.judulFooter}>{total.grab_gojekTotal}</Text>
                        <Text style={styles.judulFooter}>{total.resellerTotal}</Text>
                        <Text style={styles.judulFooter}>{new Intl.NumberFormat().format(total.pembelian_outletTotal)}</Text>

                    </View>

                    <View style={{ flex: 1, marginTop: 5, flexDirection: 'row', backgroundColor: colors.border, }}>
                        <Text style={styles.judulFooterTotal}>PENJUALAN KOTOR</Text>
                        <Text style={styles.judulFooterIsi}>{'Rp' + new Intl.NumberFormat().format(total.penjualan_kotorTotal)}</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: colors.border, }}>
                        <Text style={styles.judulFooterTotal}>PENJUALAN NON TUNAI</Text>
                        <Text style={styles.judulFooterIsi}>{'Rp' + new Intl.NumberFormat().format(total.penjualan_nontunaiTotal)}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: colors.border, }}>
                        <Text style={styles.judulFooterTotal}>TOTAL PENGELUARAN</Text>
                        <Text style={styles.judulFooterIsi}>{'Rp' + new Intl.NumberFormat().format(total.pembelian_outletTotal)}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: colors.border, }}>
                        <Text style={styles.judulFooterTotal}>PENJUALAN TUNAI</Text>
                        <Text style={styles.judulFooterIsi}>{'Rp' + new Intl.NumberFormat().format(total.penjualan_tunaiTotal)}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: colors.border, }}>
                        <Text style={styles.judulFooterTotal}>MODAL</Text>
                        <Text style={styles.judulFooterIsi}>{'Rp' + new Intl.NumberFormat().format(total.modalTotal)}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: colors.border, }}>
                        <Text style={styles.judulFooterTotal}>DISKON RESELLER</Text>
                        <Text style={styles.judulFooterIsi}>{'Rp' + new Intl.NumberFormat().format(total.diskon_resellerTotal)}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: colors.border, }}>
                        <Text style={styles.judulFooterTotal}>TOTAL SETORAN</Text>
                        <Text style={styles.judulFooterIsi}>{'Rp' + new Intl.NumberFormat().format(total.setoran_outletTotal)}</Text>
                    </View>



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