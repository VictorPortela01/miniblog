import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanup
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  const checkIfIsCancelled = () => {
    if (cancelled) {
      return;
    }
  };

  // register
  // Função assíncrona para criar um novo usuário com e-mail e senha
  const createUser = async (data) => {
    // Verifica se a operação foi cancelada antes de continuar (boa prática para evitar ações desnecessárias)
    checkIfIsCancelled();
    // Ativa o estado de carregamento (loading) para informar que algo está em andamento
    setLoading(true);

    try {
      // Tenta criar o usuário usando Firebase Auth com e-mail e senha
      const { user } = await createUserWithEmailAndPassword(
        auth, // instância de autenticação do Firebase
        data.email, // e-mail fornecido no formulário
        data.password // senha fornecida no formulário
      );
      // Atualiza o perfil do usuário recém-criado, adicionando o displayName (nome de exibição)
      await updateProfile(user, {
        displayName: data.displayName,
      });

      // Retorna o usuário criado com sucesso
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }

      setError(systemErrorMessage);
    }

    setLoading(false);
  };
  //logout - sing out
  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };

  // login - sing in
  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      console.log(error.message.includes("user-not"));

      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }

      console.log(systemErrorMessage);

      setError(systemErrorMessage);
    }

    console.log(error);

    setLoading(false);
  };

  // Efeito colateral que executa apenas uma vez ao montar o componente
  useEffect(() => {
    // Quando o componente for desmontado, marca como cancelado (útil para evitar atualizações de estado em componentes desmontados)
    return () => setCancelled(true);
  }, []);

  // Retorna os itens que serão utilizados no restante da aplicação
  return {
    auth, // instância do Firebase Auth
    createUser, // função de criar usuário
    error, // estado de erro (assumido que foi definido fora desse trecho)
    loading, // estado de carregamento.
    logout,
    login,
  };
};
