import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, LogoContainer, Logo, InputContainer, CreateAccountText } from './styles';
import logo from '../../assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import { logar } from '../../services/requisicoesFirebase'; // Importe a função de login

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Função para lidar com o login
  const handleLogin = async () => {
    try {
      // Chame a função "logar" da sua camada de serviços que interage com o Firebase
      const resultado = await logar(email, senha);

      if (resultado === "sucesso") {
        // O login foi bem-sucedido, você pode navegar para a próxima tela ou fazer algo mais
        navigation.navigate('Inicio'); // Substitua 'TelaSeguinte' pelo nome da tela que você deseja navegar
      } else {
        // Trate o erro de login aqui
        alert('Erro ao fazer login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handleCreateAccount() {
    navigation.navigate('Cadastrar');
  }

  return (
    <Container>
      <LogoContainer>
        <Logo source={logo} />
      </LogoContainer>
      <InputContainer>
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input
          placeholder="Senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />
      </InputContainer>
      <TouchableOpacity onPress={handleCreateAccount}>
        <CreateAccountText>Já possui conta? Criar conta</CreateAccountText>
      </TouchableOpacity>
      <Button title="LOGIN" onPress={handleLogin} />
    </Container>
  );
}
