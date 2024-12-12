import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OnboardingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Bem-vindo ao Onboarding!</Text>
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

export default OnboardingScreen;
