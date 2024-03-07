import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'API Despesas',
        description: 'Esta é uma API Node.js com TypeScript e Sequelize para gerenciar despesas.'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        },
        schemas: {
            CadastrarUsuarioRequest: {
                email: "usuario@gmail.com",
                nome: "usuario",
                password: "Abc@1234"
            },
            CadastrarDespesaRequest: {
                descricao: 'Está é uma despesa.',
                data: '2024-03-07T15:30:00Z',
                valor: 199.99
            }
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);
