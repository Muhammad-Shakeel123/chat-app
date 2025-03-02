import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation for your project',
    },
    servers: [{ url: 'https://chat-app-kappa-two-45.vercel.app//api/v1' }], // Ensure correct base URL
  },
  apis: [path.join(__dirname, '../routes/*.js')], // Adjusted path for Vercel
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
