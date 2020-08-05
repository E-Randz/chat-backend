import { Router } from 'express';
import { Container } from 'typedi';
import EndpointsService from '../../services/endpoints';

const route = Router();

export default (app: Router): void => {
  app.use('/', route);

  route.get('/', (req, res) => {
    const endpointServiceInstance = Container.get(EndpointsService);
    const { endpoints } = endpointServiceInstance.Endpoints();
    return res.status(200).send({ endpoints });
  });
};
