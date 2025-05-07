# Trybesmith - Branch Customizada

## 📄 Descrição do Projeto

Este projeto é uma API RESTful que simula o backend de uma loja de itens medievais, como espadas, escudos e poções. A aplicação permite gerenciar usuários, produtos, pedidos e autenticação via JWT. Esta branch contém implementações personalizadas e melhorias adicionais em relação à base original do projeto.

## 🛠 Tecnologias Utilizadas

- **Node.js** — ambiente de execução JavaScript
- **TypeScript** — tipagem estática para JavaScript
- **Express** — framework web minimalista
- **Sequelize** — ORM para banco de dados relacional
- **MySQL** — sistema de gerenciamento de banco de dados
- **JWT (JSON Web Token)** — autenticação
- **Docker & Docker Compose** — ambiente de desenvolvimento isolado
- **Mocha, Chai e Sinon** — testes automatizados
- **ESLint** — padronização de código

## ▶️ Como Executar o Projeto

### 1. Clone o repositório
```bash
git clone git@github.com:DadAquino/projeto-trybesmith.git
cd seu-repositorio
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute com Docker
Certifique-se de que o Docker esteja instalado e rodando em sua máquina. Depois, execute:

```bash
docker-compose up -d --build
```

Isso criará dois containers: `trybesmith_api` (a aplicação) e `trybesmith_db` (o banco de dados MySQL).

### 4. Configure o banco de dados
Com os containers rodando, entre no container da aplicação:

```bash
docker exec -it trybesmith_api bash
```

Dentro do container, execute:

```bash
npm run db:reset
```

Esse comando criará e populará o banco de dados.

### 5. Inicie a aplicação manualmente (opcional)
Se quiser rodar manualmente no container:

```bash
npm run dev
```

A aplicação estará disponível na porta **3001**.

### 6. Executar os testes
Para rodar os testes:

```bash
npm run test:local
```

Para verificar a cobertura dos testes:

```bash
npm run test:coverage
```

---
