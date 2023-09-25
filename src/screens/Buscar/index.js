import React, { useState } from 'react';
import { TextInput, Image, TouchableOpacity, View } from 'react-native'; 
import Footer from '../../components/Footer';
import { Container, TopContainer, Logo, Content, Title, SearchInput, SearchIconContainer, FooterContainer } from './styles';
import logo from '../../assets/logo.png';
import axios from 'axios'; // Importe o Axios
import { useNavigation } from '@react-navigation/native';

export default function Buscar() { 
  const navigation = useNavigation()
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');

  async function enviarPerguntaParaGPT() {
    try {
      const apiKey = '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'; 
      const endpoint = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';

      const prompt = `Pergunta relacionada à agricultura: ${pergunta}`;

      const response = await axios.post(
        endpoint,
        {
          prompt: pergunta,
          max_tokens: 100,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const respostaDoGPT = response.data.choices[0].text;

      setResposta(respostaDoGPT);

    } catch (error) {
      console.error('Erro ao enviar pergunta para o GPT:', error);
    }
  }

  return (
    <Container>
      <TopContainer>
        <Logo source={logo} style={{ width: 61, height: 61 }} resizeMode="contain" />
      </TopContainer>
      <Content>
        {resposta ? (
          <Title>{resposta}</Title>
        ) : (
          <Title>No AgTech você consegue realizar pesquisas em tempo real sobre o que quiser do mundo Agro!</Title>
        )}
      </Content>
      <SearchInput>
        <TextInput
          placeholder="Realizar busca"
          value={pergunta}
          onChangeText={setPergunta}
        />
        <View style={{ marginLeft: 100 }}>
          <TouchableOpacity onPress={enviarPerguntaParaGPT}>
            <Image
              source={require('../../assets/enviar.png')} 
              style={{ width: 21, height: 18 }} 
            />
          </TouchableOpacity>
        </View>
      </SearchInput>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </Container>
  );
}
