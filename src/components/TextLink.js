// src/components/TextLink.js
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const TextLink = ({ text, onPress, style }) => {
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
