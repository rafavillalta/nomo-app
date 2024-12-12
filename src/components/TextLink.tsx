import React from 'react';
import { Text, TouchableOpacity, StyleSheet, StyleProp, TextStyle } from 'react-native';

type TextLinkProps = {
  text: string; // Texto do link
  onPress: () => void; // Função chamada ao pressionar
  style?: StyleProp<TextStyle>; // Estilo opcional para o texto
};

const TextLink: React.FC<TextLinkProps> = ({ text, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.linkText, style]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkText: {
    color: '#8A2BE2',
    fontSize: 14,
  },
});

export default TextLink;
