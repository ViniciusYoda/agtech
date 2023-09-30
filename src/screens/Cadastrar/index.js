import React, { useState } from 'react';
import styled from 'styled-components/native';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Center, Subtitle, InputSpacing } from './styles';
import { useNavigation } from '@react-navigation/native';
import { cadastrar } from '../../services/requisicoesFirebase';

export default function Cadastrar() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Função para lidar com o cadastro
  const handleCadastro = async () => {
    try {
      // Chame a função "cadastrar" da sua camada de serviços que interage com o Firebase
      await cadastrar(nome, cpf, email, senha);

      // Cadastro bem-sucedido, você pode navegar para a próxima tela ou fazer algo mais
      navigation.navigate('TelaSeguinte'); // Substitua 'TelaSeguinte' pelo nome da tela que você deseja navegar
    } catch (error) {
      console.error(error);
      // Trate os erros de cadastro aqui
    }
  };

  return (
    <Container>
      <Header title="CADASTRAR" />
      <Center>
        <Subtitle>Informe seus dados para complementar o cadastro.</Subtitle>
        <Input
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <InputSpacing />
        <Input
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
        />
        <InputSpacing />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <InputSpacing />
        <Input
          placeholder="Senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />
      </Center>
      <Button title="ENVIAR" onPress={handleCadastro} />
    </Container>
  );
}
