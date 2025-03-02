import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../utils/swagger.js';

const router = express.Router();

// Serve Swagger UI
router.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
  }),
);

// Serve Swagger JSON (helps debug issues)
router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

export default router;
