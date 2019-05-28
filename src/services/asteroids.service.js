import { ApiService } from './api.service';

export class AsteroidsService {
  constructor() {
    this.apiService = new ApiService();
  }
  getFeed(queryParams) {
    const pathParams = [
      {
        name: 'feed',
        value: ''
      }
    ];

    return this.apiService.get(pathParams, queryParams);
  }
}
