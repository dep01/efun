import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {sys_colors, sys_font} from '../../../utils/constants';

export const CustomInput = ({
  label = '',
  left = null,
  right = null,
  inputStyle = {},
  labelStyle = {},
  containerText = {},
  onChangeText,
  secureTextEntry,
  keyboardType,
  placeholder = '',
  value = '',
  maxLength = 30,
  numberOfLines = 1,
}) => {
  return (
    <View style={styles.container}>
      {label != '' ? (
        <Text style={[styles.labelStyle, labelStyle]}>
          {label.toUpperCase()}
        </Text>
      ) : null}
      <View style={[styles.containerText, containerText]}>
        {left != null ? (
          <View
            style={{
              width: '15%',
            }}>
            {left}
          </View>
        ) : null}

        <TextInput
          style={[
            styles.inputStyle,
            {paddingLeft: left != null ? 5 : 30},
            inputStyle,
          ]}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholder={placeholder}
          maxLength={maxLength}
          numberOfLines={numberOfLines}
          value={value}
        />
        {right != null ? (
          <View
            style={{
              width: '15%',
            }}>
            {right}
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
  },
  containerText: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: sys_colors.white,
    marginTop: 15,
  },
  labelStyle: {
    color: sys_colors.text.black,
    fontSize: 14,
    fontFamily: sys_font.primary[700],
  },
  inputStyle: {
    backgroundColor: sys_colors.white,
    paddingLeft: 30,
    fontSize: 14,
    flex: 1,
    minWidth: '70%',
    color: sys_colors.text.black,
    fontFamily: sys_font.primary[400],
  },
});
