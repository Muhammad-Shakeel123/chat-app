import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const router = express.Router();

// Swagger definition
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chat App API',
      version: '1.0.0',
      description: 'API documentation for the Chat App',
    },
    servers: [
      {
        url: 'https://chat-8iy29sswz-muhammad-shakeels-projects-72a083da.vercel.app', // Vercel deployment URL
        description: 'Production Server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Ensure your routes have Swagger comments
};

const specs = swaggerJsdoc(options);

// Fix routing for Vercel
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs));

export default router;
