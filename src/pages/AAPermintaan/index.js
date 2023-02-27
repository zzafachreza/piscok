import { Alert, StyleSheet, Text, View, Image, ActivityIndicator, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
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


const MyCek = ({ label, value, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={{
            marginVertical: 10,
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: colors.primary,
        }}>
            <View style={{
                flex: 1,
            }}>
                <Icon type='ionicon' name='checkmark-circle' size={35} color={value > 0 ? colors.primary : colors.white} />
            </View>
            <View style={{
                backgroundColor: colors.primary,
                height: 40,
                width: windowWidth / 2,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text
                    style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: 12,
                    }}>
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default function AAPermintaan({ navigation, route }) {

    const [loading, setLoading] = useState(false);

    const myRef = useRef();


    const [kirim, setKirim] = useState({
        cabang: route.params.cabang,
        tanggal: moment().format('YYYY-MM-DD'),
        minyak: 0,
        plastik_kecil: 0,
        plastik_susu: 0,
        kotak12x16: 0,
        mikaisi5: 0,
        handglove: 0,
        lainnya: 0,
        catatan: '',
    });

    // setLoading(false);

    const sendServer = () => {
        console.log(kirim);

        if (kirim.lainnya > 0 && kirim.catatan.length == 0) {
            Alert.alert(MYAPP, 'Catatan lainnya masih kosong !')
        } else {
            setLoading(true);
            setTimeout(() => {
                axios.post(apiURL + 'permintaan_add', kirim).then(res => {

                    console.log(res.data);
                    if (res.data.status == 200) {
                        // setLoading(false);
                        Alert.alert(MYAPP, 'Permintaan bahan tanggal ' + moment(kirim.tanggal).format('DD/MMM/YYYY') + ' berhasil di simpan !');
                        navigation.replace('Home');
                    }
                })
            }, 1000)
        }





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

                <MyCek label="MINYAK" value={kirim.minyak} onPress={() => kirim.minyak > 0 ? setKirim({ ...kirim, minyak: 0 }) : setKirim({ ...kirim, minyak: 1 })} />
                <MyCek label="PLASTIK KECIL" value={kirim.plastik_kecil} onPress={() => kirim.plastik_kecil > 0 ? setKirim({ ...kirim, plastik_kecil: 0 }) : setKirim({ ...kirim, plastik_kecil: 1 })} />
                <MyCek label="PLASTIK SUSU" value={kirim.plastik_susu} onPress={() => kirim.plastik_susu > 0 ? setKirim({ ...kirim, plastik_susu: 0 }) : setKirim({ ...kirim, plastik_susu: 1 })} />
                <MyCek label="KOTAK 12X16" value={kirim.kotak12x16} onPress={() => kirim.kotak12x16 > 0 ? setKirim({ ...kirim, kotak12x16: 0 }) : setKirim({ ...kirim, kotak12x16: 1 })} />
                <MyCek label="MIKA ISI 5" value={kirim.mikaisi5} onPress={() => kirim.mikaisi5 > 0 ? setKirim({ ...kirim, mikaisi5: 0 }) : setKirim({ ...kirim, mikaisi5: 1 })} />
                <MyCek label="HANDGLOVE" value={kirim.handglove} onPress={() => kirim.handglove > 0 ? setKirim({ ...kirim, handglove: 0 }) : setKirim({ ...kirim, handglove: 1 })} />
                <MyCek label="LAINNYA" value={kirim.lainnya} onPress={() => {
                    if (kirim.lainnya > 0) {
                        setKirim({ ...kirim, lainnya: 0 });

                    } else {
                        setKirim({ ...kirim, lainnya: 1 });
                        myRef.current.focus();
                    }
                }} />

                <TextInput ref={myRef} onChangeText={x => setKirim({
                    ...kirim,
                    catatan: x
                })} autoCapitalize="none" placeholder='Masukan catatan lainnya' style={{
                    fontFamily: fonts.primary[400],
                    paddingLeft: 10,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    fontSize: 14
                }} />

            </ScrollView>

            <MyGap jarak={20} />
            {!loading && <MyButton onPress={sendServer} title="KIRIM LAPORAN DAN LANJUT" warna={colors.primary} Icons="cloud-upload" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})