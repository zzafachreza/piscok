import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Register,
  SCek,
  SPenyakit,
  STentang,
  SHasil,
  SDaftar,
  SAdd,
  SHutang,
  GetStarted,
  TimAdd,
  TimList,
  TimDetail,
  TimAddPemain,
  TimSet,
  TimSetDetail,
  TimMulai,
  TimHasil,
  Account,
  Riwayat,
  AccountEdit,
  SEdit,
  AAOrder,
  AASetor,
  AAMember,
  AALaporan,
  AALaporan2,
  PenggunaEdit,
  PenggunaAdd,
  Pengguna,
  AALaporanReview,
  AAPermintaan,
  AACekLaporan,
  AAPermintaanCek,
  AAPengeluaran,
  AAPengeluaran2,
  AAPengeluaranReview,
  AALaporanOutlet,
  AALaporanOutletPenjualan,
  AALaporanOutletPermintaan,
  AALaporanKeuangan,
  AALaporanKeuanganHeader,
  AALaporanKeuanganDetail,
  AALaporan3,
  AALaporanEdit,
  AAPengeluaranEdit,
} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          // headerTitle: 'Detail',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="SAdd"
        component={SAdd}
        options={{
          headerShown: true,
          headerTitle: 'Input Manual',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="AAOrder"
        component={AAOrder}
        options={{
          headerShown: true,
          headerTitle: 'Tambah Order Saldo',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="AALaporan"
        component={AALaporan}
        options={{
          headerShown: true,
          headerTitle: 'LAPORAN',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="AALaporan2"
        component={AALaporan2}
        options={{
          headerShown: true,
          headerTitle: 'PENGELUARAN',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="AALaporan3"
        component={AALaporan3}
        options={{
          headerShown: true,
          headerTitle: 'KEUANGAN',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="AALaporanEdit"
        component={AALaporanEdit}
        options={{
          headerShown: true,
          headerTitle: 'LAPORAN EDIT',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="AAPengeluaranEdit"
        component={AAPengeluaranEdit}
        options={{
          headerShown: true,
          headerTitle: 'PENGELUARAN EDIT',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />






      <Stack.Screen
        name="AALaporanReview"
        component={AALaporanReview}
        options={{
          headerShown: true,
          headerTitle: 'LAPORAN HARI INI',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="AAPermintaan"
        component={AAPermintaan}
        options={{
          headerShown: true,
          headerTitle: 'PERMINTAAN BAHAN',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="AACekLaporan"
        component={AACekLaporan}
        options={{
          headerShown: true,
          headerTitle: 'CEK LAPORAN',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="AAPermintaanCek"
        component={AAPermintaanCek}
        options={{
          headerShown: true,
          headerTitle: 'PERMINTAAN OUTLET',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="AAPengeluaran"
        component={AAPengeluaran}
        options={{
          headerShown: true,
          headerTitle: 'PENGELUARAN OFFICE 1/3',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="AAPengeluaran2"
        component={AAPengeluaran2}
        options={{
          headerShown: true,
          headerTitle: 'PENGELUARAN OFFICE 2/3',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="AAPengeluaranReview"
        component={AAPengeluaranReview}
        options={{
          headerShown: true,
          headerTitle: 'PENGELUARAN OFFICE 3/3',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="AALaporanOutlet"
        component={AALaporanOutlet}
        options={{
          headerShown: true,
          headerTitle: 'LAPORAN OUTLET',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />



      <Stack.Screen
        name="AALaporanOutletPenjualan"
        component={AALaporanOutletPenjualan}
        options={{
          headerShown: true,
          headerTitle: 'LAPORAN OUTLET PENJUALAN',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="AALaporanOutletPermintaan"
        component={AALaporanOutletPermintaan}
        options={{
          headerShown: true,
          headerTitle: 'LAPORAN OUTLET PERMINTAAN BAHAN',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="AALaporanKeuangan"
        component={AALaporanKeuangan}
        options={{
          headerShown: true,
          headerTitle: 'LAPORAN KEUANGAN',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="AALaporanKeuanganHeader"
        component={AALaporanKeuanganHeader}
        options={{
          headerShown: true,
          headerTitle: 'LAPORAN KEUANGAN SUMMARY',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="AALaporanKeuanganDetail"
        component={AALaporanKeuanganDetail}
        options={{
          headerShown: true,
          headerTitle: 'LAPORAN KEUANGAN DETAIL',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Pengguna"
        component={Pengguna}
        options={({ route, navigation }) => ({
          title: 'Daftar Pengguna',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0, // remove shadow on Android
          },
          headerRight: () => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PenggunaAdd')}
                style={{
                  position: 'relative',
                  padding: 5,
                  marginHorizontal: 5,
                }}>
                <Icon name="create" type="ionicon" color="white" size={20} />
              </TouchableOpacity>
            </View>
          ),
        })}
      />



      <Stack.Screen
        name="PenggunaAdd"
        component={PenggunaAdd}
        options={{
          headerShown: true,
          headerTitle: 'Tambah Pengguna',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />





      <Stack.Screen
        name="PenggunaEdit"
        component={PenggunaEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Pengguna',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="AASetor"
        component={AASetor}
        options={{
          headerShown: true,
          headerTitle: 'Tambah Setor Saldo',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="AAMember"
        component={AAMember}
        options={{
          headerShown: true,
          headerTitle: 'Data Member Saya',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="SEdit"
        component={SEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Data Sensus',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          headerTitle: 'Daftar Pengguna',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: true,
          headerTitle: 'Infromasi Akun',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Riwayat"
        component={Riwayat}
        options={{
          headerShown: true,
          headerTitle: 'Mutasi Saldo',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />




      <Stack.Screen
        name="SDaftar"
        component={SDaftar}
        options={{
          headerShown: true,
          headerTitle: 'Riwayat Member',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="SHutang"
        component={SHutang}
        options={{
          headerShown: true,
          headerTitle: 'Tambahkan Hutang Baru',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="SCek"
        component={SCek}
        options={{
          headerShown: true,
          headerTitle: 'CEK HARGA DAN STOCK',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="SPenyakit"
        component={SPenyakit}
        options={{
          headerShown: true,
          headerTitle: 'Indeks Penyakit',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}

      />

      <Stack.Screen
        name="STentang"
        component={STentang}
        options={{
          headerShown: false,
          headerTitle: 'Tentang',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="SHasil"
        component={SHasil}
        options={{
          headerShown: false,
          headerTitle: 'Hasil Analisa',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />


      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="TimAdd"
        component={TimAdd}
        options={{
          headerShown: true,
          headerTitle: 'Tim Baru',
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: colors.primary,
        }}
      />


      <Stack.Screen
        name="TimList"
        component={TimList}
        options={{
          headerShown: true,
          headerTitle: 'Brosur Download',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
        }}
      />


      <Stack.Screen
        name="TimDetail"
        component={TimDetail}
        options={{
          headerShown: true,
          headerTitle: 'Detail Tim',
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: colors.primary,
        }}
      />

      <Stack.Screen
        name="TimAddPemain"
        component={TimAddPemain}
        options={{
          headerShown: true,
          headerTitle: 'Tambah Pemain Tim',
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: colors.primary,
        }}
      />

      <Stack.Screen
        name="TimSet"
        component={TimSet}
        options={{
          headerShown: true,
          headerTitle: 'Pilih SET',
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: colors.primary,
        }}
      />

      <Stack.Screen
        name="TimSetDetail"
        component={TimSetDetail}
        options={({ route }) => ({
          title: route.params.name,
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: colors.primary,
        })}
      />
      <Stack.Screen
        name="TimMulai"
        component={TimMulai}
        options={({ route }) => ({
          title: route.params.name,
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: colors.primary,
        })}
      />

      <Stack.Screen
        name="TimHasil"
        component={TimHasil}
        options={({ route }) => ({
          title: route.params.name,
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: colors.primary,
        })}
      />



    </Stack.Navigator>
  );
}
