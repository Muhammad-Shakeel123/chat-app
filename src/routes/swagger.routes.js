import { Router } from 'express';
import { swaggerUi, swaggerSpec } from '../utils/swagger.js';

const router = Router();

// ✅ Serve Swagger UI at `/docs`
router.route('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
