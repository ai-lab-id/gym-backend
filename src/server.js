import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import config from './config/index.js';

import apiRouter from './routes/index.js';
import errorHandler from './middlewares/error.js';

const app = express();
app.use(cors({
    origin: '*',
}));
app.use(express.json());

// Swagger Documentation
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Main API Router
app.use('/', apiRouter);

// Global Error Handler
app.use(errorHandler);

const PORT = config.app.port;
app.listen(PORT, () => console.log(`🏋️  Gym Plus API running on http://localhost:${PORT}`));
