# MiniBlog 📚🚀

Projeto pessoal criado durante meus estudos de **React** e **Firebase**.  
A ideia foi construir um blog simples (“mini”) onde usuários podem se cadastrar, escrever posts com tags, pesquisar conteúdo e gerenciar suas próprias publicações. O foco principal foi praticar **React Router DOM v7**, **Context API**, hooks customizados, integração com o **Firebase Authentication** e com o **Cloud Firestore**.

> **Status**: em aprendizado – funcionalidades principais concluídas, mas sempre aberto a melhorias.

---

## ✨ Funcionalidades

| Funcionalidade | Descrição rápida |
| -------------- | ---------------- |
| **Cadastro / Login** | Autenticação de e-mail/senha via Firebase. |
| **Criar post** | Editor simples com título, imagem (URL), conteúdo e tags separadas por vírgula. |
| **Feed** | Lista de todos os posts em ordem cronológica (mais recente primeiro). |
| **Pesquisar** | Busca por tags (case-insensitive). |
| **Dashboard** | Área do usuário mostrando seus posts, com opções de editar ou excluir. |
| **Roteamento protegido** | Bloqueia rotas de criação/edição para quem não estiver logado. |
| **Responsividade** | Layout adaptável a desktop e mobile. |

---

## 🧑‍💻 Principais aprendizados

* **React Router DOM v7** – rotas aninhadas, navegação programática e `Navigate`.
* **Context API** – compartilhando o objeto `user` globalmente.
* **Hooks customizados** (`useAuthentication`, `useFetchDocuments`, etc.) para isolar lógica de Firebase. :contentReference[oaicite:0]{index=0}
* **Firebase v11** – Auth + Firestore com métodos assíncronos e listeners em tempo real.
* Boas práticas de **eslint** e projeto iniciado com **Vite** para HMR rápido. :contentReference[oaicite:1]{index=1}

---

## 🛠️ Stack & dependências

| Categoria | Pacotes / serviços |
|-----------|--------------------|
| Front-end | `react@19`, `react-dom@19`, `vite@6` |
| Roteamento | `react-router-dom@7` |
| Backend-as-a-Service | `firebase@11` (Auth + Firestore) |
| Lint | `eslint`, `@eslint/js`, `eslint-plugin-react-hooks` |
| Deploy sugerido | Vercel, Netlify ou Firebase Hosting |

---

## 📂 Estrutura (resumida)
src/
├─ assets/ # imagens e ícones
├─ components/ # Navbar, Footer, Button, etc.
├─ context/ # AuthContext.jsx
├─ hooks/ # lógica reutilizável (Firebase, fetch, auth)
├─ pages/ # Home, About, Login, Register, ...
│ └─ .../styles.css # estilos locais
├─ App.jsx # rotas e providers
└─ main.jsx # ponto de entrada React/Vite
---

