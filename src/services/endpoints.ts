import { Service } from 'typedi';
import { IEndpointsService } from '../interfaces/services';

@Service()
export default class EndpointsService implements IEndpointsService {
  public Endpoints(): { endpoints: { [key: string]: string } } {
    const endpoints = {
      '/': 'serving a list of endpoints and available methods',
    };

    return { endpoints };
  }
}
