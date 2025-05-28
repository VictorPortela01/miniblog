import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

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

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };

      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );

      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
    }
  };
  // Marca como cancelado se o componente for desmontado (previne vazamento de memória)
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  // Retorna a função de inserção e o estado da operação
  return { insertDocument, response };
};
