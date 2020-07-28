import { Router } from 'express';
import sendEndpoints from '../controllers/api';

const apiRouter = Router();

// routers
apiRouter.get('/', sendEndpoints);

export default apiRouter;
