import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';

const router = Router();

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
        url: 'https://chat-app-kappa-two-45.vercel.app', // Deployed URL
        description: 'Production server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to API route files
};

const specs = swaggerJsdoc(options);

// ✅ Fix: Use router instead of exporting directly
router.use('/', swaggerUi.serve, swaggerUi.setup(specs));

export default router;
