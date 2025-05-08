import styles from "./Login.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useState, useEffect } from "react";

// Componente de login
const Login = () => {
  // States para armazenar os dados dos inputs
  const [email, setEmail] = useState(""); // Armazena o e-mail digitado pelo usuário
  const [password, setPassword] = useState(""); // Armazena a senha digitada

  // State para armazenar mensagens de erro
  const [error, setError] = useState("");

  // Hook customizado de autenticação
  // 'login' é a função usada para autenticar
  // 'authError' é um possível erro retornado do back-end
  // 'loading' indica se a requisição está em andamento
  const { login, error: authError, loading } = useAuthentication();

  // Função chamada ao enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    setError(""); // Limpa mensagens de erro anteriores

    // Cria um objeto com os dados do usuário
    const user = {
      email,
      password,
    };

    // Chama a função de login com os dados fornecidos
    const res = await login(user);

    // Apenas para fins de depuração
    console.log(res);
  };

  // useEffect que observa se há erros de autenticação
  // Se houver, atualiza o state de erro local
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sistema</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="text"
            name="email"
            placeholder="E-mail do usuário"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {/* Se houver uma mensagem de erro, ela será exibida em um parágrafo com a classe "error" */}
        {error && <p className="error">{error}</p>}

        {/* Se não estiver carregando (loading === false), exibe o botão "Entrar" normalmente */}
        {!loading && <button className="btn">Entrar</button>}

        {/* Se estiver carregando (loading === true), exibe um botão desabilitado com o texto "Aguarde..." */}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
