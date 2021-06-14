import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {sys_colors, sys_font} from '../../../utils/constants';

export const CustomLabel = ({
  label = '',
  children,
  labelStyle = {},
  containerText = {},
}) => {
  return (
    <View style={styles.container}>
      {label != '' ? (
        <Text style={[styles.labelStyle, labelStyle]}>
          {label.toUpperCase()}
        </Text>
      ) : null}
      <View style={[styles.containerText, containerText]}>{children}</View>
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
});
