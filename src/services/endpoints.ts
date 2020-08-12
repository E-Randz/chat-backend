import { Service } from 'typedi';
import { IEndpointsService } from '../typescript/IServices';
import { IStringMap } from '../typescript/IGeneric';

@Service()
export default class EndpointsService implements IEndpointsService {
  public Endpoints(): { endpoints: IStringMap } {
    const endpoints = {
      '/': 'serving a list of endpoints and available methods',
    };

    return { endpoints };
  }
}
