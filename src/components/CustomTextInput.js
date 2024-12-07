// src/components/CustomTextInput.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({ placeholder, value, onChangeText, secureTextEntry, style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
  },
});

export default CustomTextInput;
