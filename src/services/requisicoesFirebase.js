import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

function errosFirebase(error) {
  let mensagem = '';
  switch (error.code) {
    case "auth/email-already-in-use":
      mensagem = "Esse email já está em uso";
      break;
    case "auth/invalid-email":
      mensagem = "Email inválido";
      break;
    case "auth/weak-password":
      mensagem = "A senha precisa de no mínimo 6 caracteres";
      break;
    default:
      mensagem = "Erro desconhecido";
  }
  return mensagem;
}

export async function cadastrar(nome, cpf, email, senha) {
  try {
    const resultado = await createUserWithEmailAndPassword(auth, email, senha);
    const user = resultado.user;

    // Após criar o usuário com sucesso, atualize o perfil com nome
    await updateProfile(user, {
      displayName: nome,
    });

    // Armazene informações adicionais no Firestore
    const db = getFirestore();
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      nome,
      cpf,
    });

    return "sucesso";
  } catch (error) {
    return errosFirebase(error);
  }
}

export async function logar(email, senha) {
  try {
    const resultado = await signInWithEmailAndPassword(auth, email, senha);
    return "sucesso";
  } catch (error) {
    return errosFirebase(error);
  }
}
