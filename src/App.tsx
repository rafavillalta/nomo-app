import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CadastroScreen from './screens/CadastroScreen';
import EventoScreen from './screens/EventoScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import { RootStackParamList } from './types/navigation';
import LoginScreen from './screens/LoginScreen';
import GtkScreen from './screens/GtkScreen';

const Stack = createStackNavigator<RootStackParamList>(); // Tipando o Stack Navigator

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Evento" component={EventoScreen} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
