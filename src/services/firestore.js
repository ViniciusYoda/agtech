import firestore from '@react-native-firebase/firestore';

// Para adicionar um documento à coleção 'users':
firestore()
  .collection('users')
  .add({
    nome: 'João',
    cpf: '123.456.789-00',
  })
  .then((docRef) => {
    console.log('Documento adicionado com ID: ', docRef.id);
  })
  .catch((error) => {
    console.error('Erro ao adicionar documento: ', error);
  });

// Para recuperar dados da coleção 'users':
firestore()
  .collection('users')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((documentSnapshot) => {
      console.log('ID do Documento:', documentSnapshot.id);
      console.log('Dados:', documentSnapshot.data());
    });
  })
  .catch((error) => {
    console.error('Erro ao recuperar documentos: ', error);
  });
