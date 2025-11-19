# 📚 Minha Estante Virtual

Projeto acadêmico de uma aplicação web full-stack para gerenciamento de uma estante de livros pessoal. A aplicação permite buscar livros em uma API externa (Google Books) e gerenciar uma coleção pessoal com operações de CRUD (Criar, Ler, Atualizar e Deletar).

O projeto foi desenvolvido com foco em um backend robusto em C# .NET e um frontend reativo em JavaScript puro, com uma interface de usuário moderna no estilo "dark mode".

<img width="1919" height="867" alt="image" src="https://github.com/user-attachments/assets/5f23d52f-3432-4ee8-84cf-8193f27494fe" />

---

## ✨ Funcionalidades Principais

* **Busca na Google Books API:** Busca dinâmica de livros por título ou autor.
* **Backend Próprio (CRUD Completo):**
    * **Create:** Adicionar livros da busca para a estante pessoal.
    * **Read:** Listar todos os livros salvos na estante ao carregar a página.
    * **Update:** Editar o status de um livro ("Quero Ler", "Lendo", "Lido") e adicionar uma nota.
    * **Delete:** Remover livros da estante.
* **Interface Sofisticada ("Noite Estada"):** Um tema escuro (dark mode) elegante com foco em usabilidade.
* **UX Moderna:**
    * **Indicador de Carregamento (Spinner):** Feedback visual durante as chamadas de API.
    * **Notificações "Toast":** Mensagens de sucesso, erro e confirmação que substituem os alertas padrão do navegador.

---

## 🚀 Tecnologias Utilizadas

### **Backend**
* **C# .NET 9** (ou a versão que você usou)
* **ASP.NET Core Web API**
* **Entity Framework Core** (para ORM)
* **SQLite** (para o banco de dados local)
* **Swagger (Swashbuckle)** (para documentação e teste da API)

### **Frontend**
* **HTML5** (Estrutura semântica)
* **CSS3** (Estilização moderna com Flexbox, Gradientes e Animações)
* **JavaScript (ES6+)**
* **Fetch API** (para comunicação com o backend e a Google API)
* **Toastify.js** (para notificações)

---

## ⚙️ Como Executar o Projeto

Para rodar este projeto localmente, siga os passos abaixo:

### **Pré-requisitos**
* [.NET SDK 9.0](https://dotnet.microsoft.com/download) (ou a versão do seu projeto)
* Um navegador web moderno (Chrome, Firefox, etc.)

### **Instruções**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/MinhaEstanteVirtual.git](https://github.com/SEU_USUARIO/MinhaEstanteVirtual.git)
    cd MinhaEstanteVirtual
    ```

2.  **Execute o Backend (API):**
    * O servidor .NET irá rodar o backend e também servirá os arquivos do frontend.
    ```bash
    dotnet run
    ```
    * O terminal indicará que a API está rodando (ex: `http://localhost:5041`).

3.  **Abra a Aplicação:**
    * Em um navegador, abra o arquivo `index.html` que está dentro da pasta `frontend`.
    * **Caminho:** `Caminho_Onde_Voce_Clonou/MinhaEstanteVirtual/frontend/index.html`

---

## 👨‍💻 Autor

* **João Pinheiro** - [Seu GitHub] (https://github.com/joaofrancop)
* **Vittor**
* **Gabriel**
