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
        url: 'https://chat-app-kappa-two-45.vercel.app/api-docs',
      },
    ],
  },
  apis: ['./routes/*.js'], // Make sure the path is correct
};

// Generate the Swagger documentation
const swaggerSpec = swaggerJsdoc(options);

// ✅ Add custom styles and scripts
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
  console.log('Swagger Docs available at /api-docs');
};

export default setupSwagger;
