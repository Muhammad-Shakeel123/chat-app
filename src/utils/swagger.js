import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chat App API - Comprehensive Documentation',
      description:
        'Detailed API documentation for the Chat Application, providing secure and efficient communication built with Node.js and Express.',
    },
    servers: [
      {
        url: 'https://chat-app-kappa-two-45.vercel.app/api-docs',
        description: 'Production Server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Ensure this path correctly points to your route files
};

// Generate the Swagger documentation
const swaggerSpec = swaggerJsdoc(options);

// ✅ Add custom styles and scripts for an enhanced UI
const swaggerOptions = {
  customCssUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
  ],
};

const setupSwagger = app => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerOptions),
  );
  console.log('🔥 Swagger API Docs are live at: /api-docs');
};

export default setupSwagger;
