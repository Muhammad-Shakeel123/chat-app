import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation for your project',
    },
    servers: [{ url: 'https://your-vercel-app.vercel.app/api' }], // Replace with your Vercel URL
  },
  apis: ['./src/routes/*.js'], // Ensure this path matches your project
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
