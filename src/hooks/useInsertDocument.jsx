import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { colletion, addDoc, Timestamp } from "firebase/firestore";

// Estado inicial do reducer: sem carregamento e sem erro
const initialState = {
  loading: null,
  error: null,
};

// Função reducer que lida com os estados de inserção
const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      // Define que a operação está em andamento
      return { loading: true, error: null };
    case "INSERTED_DOC":
      // Define que a operação foi concluída com sucesso
      return { loading: false, error: null };
    case "ERROR":
      // Define que ocorreu um erro durante a operação
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Hook customizado para inserir documentos em uma coleção do Firebase
export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  // Variável para evitar vazamento de memória ao desmontar o componente
  const [cancelled, setCancelled] = useState(false);

  // Só despacha ações se o componente ainda estiver montado
  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  // Função assíncrona para inserir um documento
  const insertDocument = async (document) => {
    // Dispara estado de carregamento
    checkCancelBeforeDispatch({
      type: "LOADING",
    });

    try {
      // Adiciona um timestamp ao documento
      const newDocument = { ...document, createAt: Timestamp.now };

      // Tenta adicionar o documento na coleção do Firebase
      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );

      // Dispara ação de sucesso
      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument,
      });
    } catch (error) {
      // Dispara ação de erro com a mensagem retornada
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  // Marca como cancelado se o componente for desmontado (previne vazamento de memória)
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  // Retorna a função de inserção e o estado da operação
  return { insertDocument, response };
};
