import express from 'express';
import { swaggerUi, swaggerSpec } from '../utils/swagger.js';

const router = express.Router();

// ✅ Serve Swagger UI at `/docs`
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
