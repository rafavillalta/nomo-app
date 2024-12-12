import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { RootStackParamList } from '../types/navigation';

// Importar componentes reutilizáveis
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import TextLink from '../components/TextLink';

// Importar tipos para navegação
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type CadastroScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Cadastro'>;
  route: RouteProp<RootStackParamList, 'Cadastro'>;
};

const CadastroScreen: React.FC<CadastroScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>(''); // Tipos explícitos
  const [senha, setSenha] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

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
      const userInfo: any = await GoogleSignin.signIn(); // Tipagem explícita como any
      const { idToken } = userInfo;
  
      if (!idToken) {
        throw new Error('Token de autenticação do Google não encontrado.');
      }
  
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      navigation.replace('Home');
    } catch (error: any) {
      // Tratamento de erros
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
      await auth().signInWithEmailAndPassword(email, senha);
      navigation.replace('Home');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        navigation.navigate('Register');
      } else {
        console.error(error);
        alert('Erro ao autenticar. Verifique os dados e tente novamente.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.slogan}>a mundo com menos missing out</Text>

      {/* Botão de Login com Google */}
      <CustomButton
        title="Continuar com Google"
        onPress={signInWithGoogle}
        style={styles.googleButton} />

      <Text style={styles.orText}>OU</Text>

      {/* Input de Email */}
      <CustomTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address" />

      {/* Input de Senha */}
      <CustomTextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry />

      {/* Botão Avançar */}
      <CustomButton
        title="Avançar"
        onPress={handleAvancar}
        disabled={isButtonDisabled} />

      {/* Links adicionais */}
      <TextLink
        text="Esqueceu sua senha?"
        onPress={() => navigation.navigate('ForgotPassword')} />
      <View style={styles.registerContainer}>
        <Text>Não tem uma conta?</Text>
        <TextLink
          text=" Registre-se aqui"
          onPress={() => navigation.navigate('Register')} />
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
  googleButton: {
    backgroundColor: '#4285F4', // Azul do Google
     marginBottom: 20,
  },
});

export default CadastroScreen;
