import React from 'react';
import { TextInput, StyleSheet, TextInputProps, StyleProp, ViewStyle } from 'react-native';

type CustomTextInputProps = TextInputProps & {
  style?: StyleProp<ViewStyle>; // Estilo adicional (opcional)
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  style,
  ...props
}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      {...props} // Permitir passar outras propriedades do TextInput
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
