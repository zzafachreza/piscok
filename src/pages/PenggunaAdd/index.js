import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

export default function PenggunaAdd({ navigation, route }) {


    const [kirim, setKirim] = useState({
        cabang: '',
        nama_lengkap: '',
        telepon: '',
        password: '',
        level: 'CABANG'
    });
    const [loading, setLoading] = useState(false);
    const sendServer = () => {

        console.log(kirim);

        setLoading(true);
        axios.post(apiURL + 'pengguna_add', kirim).then(res => {

            setLoading(false);

            if (res.data.status == 200) {
                Alert.alert(MYAPP, res.data.message);
                console.log(res.data);

                navigation.goBack();
            } else {
                showMessage({
                    type: 'danger',
                    message: res.data.message
                })
            }
        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <MyInput label="Cabang" iconname="git-branch" placeholder="Masukan nama cabang" value={kirim.cabang} onChangeText={x => setKirim({ ...kirim, cabang: x })} />
                <MyGap jarak={10} />
                <MyInput label="Nama Lengkap" iconname="person" placeholder="Masukan nama lengkap" value={kirim.nama_lengkap} onChangeText={x => setKirim({ ...kirim, nama_lengkap: x })} />
                <MyGap jarak={10} />
                <MyInput label="Telepon" placeholder="Masukan telepon" iconname="call" value={kirim.telepon} onChangeText={x => setKirim({ ...kirim, telepon: x })} />
                <MyGap jarak={10} />
                <MyPicker label="Tipe User" value={kirim.level} onValueChange={x => setKirim({ ...kirim, level: x })} iconname="medal" data={[
                    {
                        value: 'CABANG',
                        label: 'CABANG'
                    },
                    {
                        value: 'PUSAT',
                        label: 'PUSAT'
                    },

                ]} />
                <MyGap jarak={10} />
                <MyInput label="Password" iconname="key" secureTextEntry={true} onChangeText={x => setKirim({ ...kirim, password: x })} placeholder="Masukan password" />
                <MyGap jarak={20} />
                {loading && <ActivityIndicator color={colors.primary} size="large" />}

                {!loading && <MyButton onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})