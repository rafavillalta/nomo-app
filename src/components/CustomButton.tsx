import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

type CustomButtonProps = {
  title: string; // Título do botão
  onPress: () => void; // Função chamada ao pressionar
  disabled?: boolean; // Desabilitar botão (opcional)
  style?: StyleProp<ViewStyle>; // Estilo adicional (opcional)
};

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, disabled = false, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#CCC',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default CustomButton;
