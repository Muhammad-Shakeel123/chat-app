import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../utils/swagger.js';

const router = express.Router();

// Serve Swagger UI
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve Swagger JSON (helps debug issues)
router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

export default router;
