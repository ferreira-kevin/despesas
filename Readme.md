# Documentação da API de Despesas

Esta é uma API Node.js com TypeScript e Sequelize para gerenciar despesas.

## Instalação

1. Clone este repositório:

```bash
git clone https://github.com/ferreira-kevin/despesas.git
```

2. Instale as dependências:

```bash
cd despesas
npm install
```

3. Configure as variáveis de ambiente para execução localmente:

Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis:

```
PORT=3000
DB_HOST=seu-host-do-banco-de-dados
DB_USER=seu-usuario-do-banco-de-dados
DB_PASSWORD=sua-senha-do-banco-de-dados
DB_NAME=nome-do-seu-banco-de-dados
```

## Execução

Para iniciar o servidor, execute o seguinte comando:

```bash
npm start
```

## Rotas

### Despesas

- **GET /despesas**: Retorna todas as despesas.
- **GET /despesas/:id**: Retorna uma despesa específica pelo ID.
- **POST /despesas**: Cria uma nova despesa.
  - Corpo da requisição:
    ```json
    {
      "descricao": "Descrição da despesa",
      "valor": 50.00,
      "data": "2024-03-06"
    }
    ```
- **PUT /despesas/:id**: Atualiza uma despesa existente pelo ID.
  - Corpo da requisição (parâmetros opcionais):
    ```json
    {
      "descricao": "Nova descrição da despesa",
      "valor": 60.00,
      "data": "2024-03-07"
    }
    ```
- **DELETE /despesas/:id**: Exclui uma despesa pelo ID.

## Modelos

### Despesa

- **id**: uuid (Chave primária)
- **descricao**: String
- **valor**: Float
- **data**: Date

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Sequelize
- Express
