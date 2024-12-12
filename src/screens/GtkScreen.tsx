import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GtkScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Get to know</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GtkScreen;
