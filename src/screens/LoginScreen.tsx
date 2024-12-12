import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '429399084890-2mtisijv10ncpgtkdtv5u1540qu1fne0.apps.googleusercontent.com',
    });
  }, []);

  const handleLogin = async () => {
    try {
        await auth().signInWithEmailAndPassword(email, senha);
        // Sucesso: Redireciona
        navigation.replace('Home');
      } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
          Alert.alert(
            'Usuário não encontrado',
            'Deseja criar uma conta com esse email?',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Registrar', onPress: () => navigation.navigate('Cadastro') },
            ]
          );
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert('Erro', 'Senha incorreta. Tente novamente.');
        } else {
          Alert.alert('Erro', 'Algo deu errado. Tente novamente.');
        }
      }
      
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);

      // Verificar se é o primeiro acesso
      const isFirstAccess = await AsyncStorage.getItem('isFirstAccess');
      if (isFirstAccess === null) {
        await AsyncStorage.setItem('isFirstAccess', 'false');
        navigation.replace('GtkScreen');
      } else {
        navigation.replace('Home');
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelado', 'Login com Google cancelado.');
      } else {
        Alert.alert('Erro', 'Falha ao fazer login com Google.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* Texto "NOMO" */}
      <Text style={styles.subtitle}>ONDE É HOJE?</Text>

      {/* Inputs de Login */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {/* Botão "Bora lá?" */}
      <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
        <Text style={styles.primaryButtonText}>Bora lá?</Text>
      </TouchableOpacity>

      {/* Botão "Login via Google" */}
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.googleButtonText}>G Login via Google</Text>
      </TouchableOpacity>

      {/* Link para registro */}
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.registerLink}>
          Não tem uma conta? <Text style={styles.registerLinkBold}>Registre-se!</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF4814',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Arial MT Std Regular', // Certifique-se de carregar esta fonte
    color: '#FFF',
    marginBottom: 30,
  },
  input: {
    width: '90%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  primaryButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
    width: '90%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF4814',
  },
  googleButtonText: {
    color: '#FF4814',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 20,
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
  },
  registerLinkBold: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
