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

Para interagir com a API deste projeto, consulte a documentação Swagger abaixo:

- [Documentação da API](http://localhost:3000/api-docs)

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
