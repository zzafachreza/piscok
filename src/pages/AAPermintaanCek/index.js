import { Alert, StyleSheet, Text, View, Image, ActivityIndicator, TextInput } from 'react-native'
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


const MyCekDetail = ({ l, v, index, onChangeText }) => {
    return (
        <View style={{
            marginVertical: 2,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <View style={{
                flex: 0.8,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 15,
                }}>{l}</Text>
            </View>
            <View style={{
                flex: 1,
            }}>
                <TextInput onChangeText={onChangeText} keyboardType='number-pad' style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 12,
                    padding: 3,
                    backgroundColor: colors.white,
                    width: 50,
                    borderColor: colors.primary,
                    borderWidth: 1,
                    color: colors.black,
                    textAlign: 'center',
                }} />
            </View>
        </View>
    )
}


const MyCek = ({ index, onChangeText,
    cabang,
    tanggal,
    minyak,
    plastik_kecil,
    plastik_susu,
    kotak12x16,
    mikaisi5,
    handglove,
    lainnya,
    catatan
}) => {
    return (
        <View style={{
            flexDirection: 'row',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.border
        }}>

            <View style={{
                flex: 1,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 17,
                }}>{cabang}</Text>
                {minyak > 0 && <MyCekDetail onChangeText={x => {
                    console.log(x)
                }} index={index} l="MINYAK" v={minyak} />}
                {plastik_kecil > 0 && <MyCekDetail onChangeText={x => {
                    console.log(x)
                }} index={index} l="PLASTIK KECIL" v={plastik_kecil} />}
                {plastik_susu > 0 && <MyCekDetail onChangeText={x => {
                    console.log(x)
                }} index={index} l="PLASTIK SUSU" v={plastik_susu} />}
                {kotak12x16 > 0 && <MyCekDetail onChangeText={x => {
                    console.log(x)
                }} index={index} l="KOTAK 12x16" v={kotak12x16} />}
                {mikaisi5 > 0 && <MyCekDetail onChangeText={x => {
                    console.log(x)
                }} index={index} l="MIKA ISI 5" v={mikaisi5} />}
                {handglove > 0 && <MyCekDetail onChangeText={x => {
                    console.log(x)
                }} index={index} l="HANDGLOVE" v={handglove} />}
                {lainnya > 0 && <MyCekDetail onChangeText={x => {
                    console.log(x)
                }} index={index} l="LAINNYA" v={lainnya} />}
                {lainnya > 0 && <View>
                    <Text style={{
                        fontFamily: fonts.secondary[200],
                        color: colors.primary,
                    }}>Notes : {catatan}</Text>
                </View>}
            </View>
            <View style={{

                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Icon type='ionicon' name='create' />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 17,
                    color: colors.secondary,
                }}>Edit</Text>
            </View>
        </View>
    )
}

export default function AAPermintaanCek({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [kirim, setKirim] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
    });

    // setLoading(false);

    const [data, setData] = useState([]);
    const sendServer = () => {
        console.log(data);
        setLoading(true);

        setTimeout(() => {

            axios.post(apiURL + 'permintaan_cek', kirim).then(res => {
                console.log(res.data);
                if (res.data.length == 0) {
                    setLoading(false);
                    setOpen(false);
                    Alert.alert(MYAPP, 'Tidak ada permintaan di tanggal ' + moment(kirim.tanggal).format('DD/MMM/YYYY'))
                } else {
                    setLoading(false);
                    setOpen(true);
                    setData(res.data);
                }
            })
        }, 200)



    }


    const sendUpdate = () => {
        console.log(data);

        setLoading(true);

        axios.post(apiURL + 'permintaan_update', data).then(res => {
            console.log(res.data);
            setLoading(false);
            Alert.alert(MYAPP, 'Permintaan tanggal ' + moment(kirim.tanggal).format('DD/MMM/YYYY') + ' berhasil di update !');
            navigation.replace('Home');
        });

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


                {open && <View>
                    <Text style={{
                        marginTop: 10,
                        fontFamily: fonts.secondary[600],
                        fontSize: 17,
                        color: colors.primary,
                        textAlign: 'right'
                    }}>{moment(kirim.tanggal).format('DD/MMM/YYYY')}</Text>
                    {data.map((item, index) => {
                        return (

                            <View style={{
                                flexDirection: 'row',
                                padding: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: colors.border
                            }}>

                                <View style={{
                                    flex: 1,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 17,
                                    }}>{item.cabang}</Text>
                                    {item.minyak > 0 && <MyCekDetail onChangeText={x => data[index].minyak = x} index={index} l="MINYAK" v={item.minyak} />}
                                    {item.plastik_kecil > 0 && <MyCekDetail onChangeText={x => data[index].plastik_kecil = x} index={index} l="PLASTIK KECIL" v={item.plastik_kecil} />}
                                    {item.plastik_susu > 0 && <MyCekDetail onChangeText={x => data[index].plastik_susu = x} index={index} l="PLASTIK SUSU" v={item.plastik_susu} />}
                                    {item.kotak12x16 > 0 && <MyCekDetail onChangeText={x => data[index].kotak12x16 = x} index={index} l="KOTAK 12x16" v={item.kotak12x16} />}
                                    {item.mikaisi5 > 0 && <MyCekDetail onChangeText={x => data[index].mikaisi5 = x} index={index} l="MIKA ISI 5" v={item.mikaisi5} />}
                                    {item.handglove > 0 && <MyCekDetail onChangeText={x => data[index].handglove = x} index={index} l="HANDGLOVE" v={item.handglove} />}
                                    {item.lainnya > 0 && <MyCekDetail onChangeText={x => data[index].lainnya = x} index={index} l="LAINNYA" v={item.lainnya} />}
                                    {item.lainnya > 0 && <View>
                                        <Text style={{
                                            fontFamily: fonts.secondary[200],
                                            color: colors.primary,
                                        }}>Notes : {item.catatan}</Text>
                                    </View>}
                                </View>

                            </View>
                        )
                    })}
                </View>}
            </ScrollView>

            <MyGap jarak={20} />
            {!loading && <MyButton onPress={sendUpdate} title="KIRIM LAPORAN DAN LANJUT" warna={colors.primary} Icons="cloud-upload" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})