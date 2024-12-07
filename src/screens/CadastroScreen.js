// src/screens/CadastroScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// Importar componentes reutilizáveis
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import TextLink from '../components/TextLink';

const CadastroScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // Configurar Google Sign-In com o ID do cliente da web do Firebase
    GoogleSignin.configure({
      webClientId: '429399084890-2mtisijv10ncpgtkdtv5u1540qu1fne0.apps.googleusercontent.com',
    });

    setIsButtonDisabled(!(email && senha));
  }, [email, senha]);

  // Função para autenticação com Google
  const signInWithGoogle = async () => {
    try {
      // Faz o login com o Google
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      
      // Cria uma credencial do Firebase usando o token do Google
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      // Faz o login no Firebase com a credencial do Google
      await auth().signInWithCredential(googleCredential);
      
      // Redireciona para a tela principal
      navigation.replace('Home');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Usuário cancelou o login com Google');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Login em progresso');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Serviços do Google Play não disponíveis');
      } else {
        console.error(error);
      }
    }
  };

  const handleAvancar = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, senha);
      navigation.replace('Home');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        navigation.navigate('Register');
      } else {
        console.error(error);
        alert("Erro ao autenticar. Verifique os dados e tente novamente.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.slogan}>a mundo com menos missing out</Text>

      {/* Botão de Login com Google */}
      <CustomButton
        title="Continuar com Google"
        onPress={signInWithGoogle}
        style={styles.googleButton}
      />

      <Text style={styles.orText}>OU</Text>

      {/* Input de Email */}
      <CustomTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Input de Senha */}
      <CustomTextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {/* Botão Avançar */}
      <CustomButton
        title="Avançar"
        onPress={handleAvancar}
        disabled={isButtonDisabled}
      />

      {/* Links adicionais */}
      <TextLink text="Esqueceu sua senha?" onPress={() => navigation.navigate('ForgotPassword')} />
      <View style={styles.registerContainer}>
        <Text>Não tem uma conta?</Text>
        <TextLink text=" Registre-se aqui" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  slogan: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 20,
  },
  orText: {
    marginVertical: 10,
    fontSize: 16,
    color: '#555555',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default CadastroScreen;