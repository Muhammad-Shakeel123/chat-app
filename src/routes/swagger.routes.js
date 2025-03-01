// routes/swagger.routes.js
import express from 'express';
import setupSwagger from '../utils/swagger.js';

const router = express.Router();

router.get('/swagger', (req, res) => {
  res.json(swaggerSpec);
});

export default router;
