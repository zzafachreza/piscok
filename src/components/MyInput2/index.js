import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';
import { TextInput } from 'react-native-gesture-handler';

export default function MyInput2({
  onFocus,
  label,
  icon = true,
  maxLength,
  iconname,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
  styleInput,
  placeholder,
  autoFocus,
  multiline,
  label2,
  styleLabel,
  colorIcon = colors.primary,
}) {

  const [tutup, setTutup] = useState(true);
  return (


    <View
      style={{

        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        marginVertical: 5,
      }}>
      <View style={{
        backgroundColor: colors.primary,
        height: 40,
        width: windowWidth / 2.5,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.white,
            fontSize: 12,
            ...styleLabel,
          }}>
          {label}
        </Text>
      </View>

      <View style={{
        flex: 1,
        paddingHorizontal: 10,
      }}>
        <TextInput placeholderTextColor={colors.border}
          maxLength={maxLength}
          multiline={multiline}
          autoFocus={autoFocus}
          onFocus={onFocus}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry ? tutup : false}
          keyboardType={keyboardType}

          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          style={{
            backgroundColor: colors.zavalabs,
            borderColor: colors.primary,
            borderRadius: 0,
            height: 40,
            // borderWidth: 1,
            paddingLeft: 10,
            color: colors.black,
            fontSize: 12,
            fontFamily: fonts.primary[400],
            ...styleInput,
          }} />
      </View>

    </View>



  );
}

const styles = StyleSheet.create({});
