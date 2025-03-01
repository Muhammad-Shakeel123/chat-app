import path from 'path';
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
        url: 'https://chat-app-kappa-two-45.vercel.app', // Your Vercel URL
        description: 'Production Server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Ensure your routes have Swagger comments
};

const specs = swaggerJsdoc(options);

// Serve API Docs at /docs
router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Serve Swagger UI files at /swagger-ui
router.use(
  '/swagger-ui',
  express.static(path.join(process.cwd(), 'public/swagger-ui')),
);

export default router;
