const swaggerJsdoc = require('swagger-jsdoc')

// Swagger konfiguratsiyasi
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Anilive API',
      version: '1.0.0',
      description: 'Authentication system with login, register, and logout features.',
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
        },
      },
    },
  },
  apis: ['./router/*.js'], // Routerlar joylashgan joy
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs