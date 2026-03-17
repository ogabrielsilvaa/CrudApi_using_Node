const swaggerJsdoc = require('swagger-jsdoc');

const options = {
 definition: {
  openapi: '3.0.0',
  info: {
    title: 'API de Usuários, Contatos e Endereços',
    version: '1.0.0',
    description: 'Documentação da API desenvolvida com Express e Sequelize'
  },
  servers: [
    {
    url: 'http://localhost:3000',
    description: 'Servidor local'
    }
  ],
  components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    }
 },
 apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
