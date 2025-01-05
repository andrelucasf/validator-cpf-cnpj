# Descrição do Projeto

Este projeto tem como objetivo a criação de uma aplicação para **validação de CPF/CNPJ**. A aplicação permite o **gerenciamento** de CPF/CNPJ com operações de **CRUD** (Criar, Ler, Atualizar, Deletar), além de **filtros**, **ordenação** e a possibilidade de marcar itens na **blocklist**.

A aplicação é dividida em três partes principais:

- **Frontend**: Interface do usuário construída com **React** e **TypeScript**.
- **Backend**: API desenvolvida com **Node.js** e **NestJS** utilizando **TypeScript**.
- **Banco de Dados**: **PostgreSQL** para gerenciamento de dados.

A aplicação foi containerizada com Docker e pode ser executada facilmente usando `docker-compose`.

---

## Requisitos

Antes de iniciar, certifique-se de que você tem as seguintes ferramentas instaladas:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/andrelucasf/validator-cpf-cnpj.git
   cd validator-cpf-cnpj
   ```

2. Certifique-se de que as seguintes pastas estão organizadas no diretório raiz:
   - `/frontend`
   - `/backend`

## Como Executar a Aplicação

1. Antes de iniciar, garanta que nenhuma outra aplicação esteja utilizando as portas `5432` (PostgreSQL), `3000` (Backend) ou `3001` (Frontend).

2. Inicie os containers:

   ```bash
   docker-compose up --build
   ```

   Este comando irá construir as imagens Docker e iniciar os containers.

3. Verifique se os serviços estão funcionando corretamente:

- Frontend: Acesse http://localhost:3001 no navegador.
- Backend: Teste a API em http://localhost:3000.
- Banco de Dados: O PostgreSQL está disponível na porta 5432.

## Funcionalidades Implementadas

- **Validação de CPF/CNPJ:** A aplicação valida corretamente os números de CPF e CNPJ, incluindo a verificação dos dígitos verificadores.
- **CRUD:** O sistema permite criar, ler, atualizar e deletar CPFs/CNPJs na base de dados.
- **Filtros e Ordenação:** A aplicação permite filtrar e ordenar os CPFs/CNPJs listados conforme critérios específicos.
- **Blocklist:** É possível adicionar CPFs/CNPJs à blocklist, para que sejam tratados de forma diferenciada.
- **Rota de Status:** A API disponibiliza uma rota /status que retorna o tempo de up-time do servidor e a quantidade de consultas realizadas desde o início da aplicação.

## Estrutura do Projeto

A aplicação segue uma arquitetura simples com a separação de responsabilidades entre o frontend, backend e banco de dados. A comunicação entre as camadas é feita via HTTP (REST API), e os dados são armazenados no banco de dados PostgreSQL.

- **frontend:** Contém o código da interface de usuário, desenvolvida com React e TypeScript.
- **backend:** Contém a API RESTful desenvolvida com Node.js e NestJS, com a lógica de validação e manipulação dos dados.
- **docker-compose.yml:** Arquivo de configuração do Docker Compose, responsável por orquestrar os containers do frontend, backend e banco de dados.

### Swagger

A API é documentada utilizando Swagger. Para acessar a documentação interativa, basta acessar a URL:

```bash
http://localhost:3000/api-docs
```

A documentação gerada pelo Swagger permite testar os endpoints da API diretamente no navegador, facilitando a interação com o backend e a verificação dos parâmetros e respostas.

### Testes

A aplicação contém testes unitários para garantir a validação correta de CPFs e CNPJs, incluindo:

**Validação do CPF:** Testes unitários verificam se a função de validação do CPF funciona corretamente, validando os dígitos verificadores.
**Validação do CNPJ:** Testes unitários verificam a mesma lógica para o CNPJ.

Os testes estão localizados na pasta /backend, e para executá-los, basta rodar o comando:

```bash
cd backend
npm run test
```
