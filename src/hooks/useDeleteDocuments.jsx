import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

// Estado inicial do reducer: sem carregamento e sem erro
const initialState = {
  loading: null,
  error: null,
};

// Função reducer que lida com os estados de inserção
const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      // Define que a operação está em andamento
      return { loading: true, error: null };
    case "DELETED_DOC":
      // Define que a operação foi concluída com sucesso
      return { loading: false, error: null };
    case "ERROR":
      // Define que ocorreu um erro durante a operação
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const deleteDocument = async (id) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const deletedDocument = await deleteDoc(doc(db, docCollection, id));

      checkCancelBeforeDispatch({
        type: "DELETED_DOC",
        payload: deletedDocument,
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
  return { deleteDocument, response };
};
