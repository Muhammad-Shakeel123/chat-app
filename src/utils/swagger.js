// utils/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js API Documentation',
      version: '1.0.0',
      description: 'API documentation for your Node.js application',
    },
    servers: [
      {
        url: 'https://chat-app-kappa-two-45.vercel.app/api/v1/docs', // Change to the Vercel URL for production
      },
    ],
  },
  apis: ['../routes/*.js'], // Path to the API routes (adjust as needed)
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Route for Swagger UI
  console.log('Swagger Docs available at /api-docs');
};

export default setupSwagger;
