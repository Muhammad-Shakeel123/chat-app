import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const router = express.Router();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation for your project',
    },
    servers: [
      {
        url: process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}/api/v1`
          : 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Make sure this path is correct
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
