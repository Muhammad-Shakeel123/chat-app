import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Chat App API Documentation',
    version: '1.0.0',
    description: 'API documentation for the Chat App',
  },
  servers: [
    {
      url: 'https://chat-app-kappa-two-45.vercel.app', // Change this based on your deployment
      description: 'Production Server',
    },
    {
      url: 'http://localhost:5000',
      description: 'Local Development Server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Auto-loads routes documentation
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
