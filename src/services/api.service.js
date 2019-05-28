import axios from 'axios';
import { ConfigService } from './config.service';

export class ApiService {
    constructor() {
      this.configService = new ConfigService();
      this.getConfigPromise = this.configService.getConfig();
      this.getConfigPromise.then(this.getConfigHandler.bind(this));
      this.headers = [
        { name: "X-RapidAPI-Host", value: "NasaAPIdimasV1.p.rapidapi.com" },
        { name: "X-RapidAPI-Key", value: "SIGN-UP-FOR-KEY" },
        { name: "Content-Type", value: "application/x-www-form-urlencoded"}
      ];

      // this.headers.forEach(header => this.setHeader(header.name, header.value))
    };

    getConfigHandler(config) {
      this.apiKey = config.data.apiKey;
      this.baseUrl = config.data.baseUrl;
      return Promise.resolve('done');
    }

    get apiKey() {return this._apiKey}
    set apiKey(key) { this._apiKey = key };
    get baseUrl() {return this._baseUrl}
    set baseUrl(key) { this._baseUrl = key };

    setHeader(headerName, headerValue) {
      axios.defaults.headers.common[headerName] = headerValue;
    }

    removeHeader(headerName) {
      axios.defaults.headers.common[headerName] = '';
    }

    buildUrl(pathParams, queryParams = []) {
      const buildQueryString = () => {
        queryParams.push({name: 'api_key', value: this.apiKey});
        return queryParams.map(param => param.name &&
          param.value &&
          `${encodeURIComponent(param.name)}=${encodeURIComponent(param.value)}`).join('&');
      };

      const buildPath = () => {
        return pathParams ?
          pathParams.map(param => `/${param.name}${param.value && `/${param.value}`}`) :
          '';
      };

      return new Promise((resolve, reject) => {
        if (this.apiKey && this.baseUrl) {
          resolve(`${this.baseUrl}${buildPath()}?${buildQueryString()}`);
        } else {
          return this.getConfigPromise.then(this.getConfigHandler.bind(this)).then(() => {
            resolve(`${this.baseUrl}${buildPath()}?${buildQueryString()}`);
          }).catch((error) => console.log(error));
        }
      });
    }

    get(resource, queryParams) {
      return this.buildUrl(resource, queryParams).then(url => {
        return axios.get(url);
      });
    }

    post(resource, data) {
      console.log('this.apiKey', this.apiKey);
      console.log(this.getConfigPromise);
      if (this.apiKey && this.baseUrl) {
        return axios.post(`${this.baseUrl}/${resource}`, data);
      } else {
        return this.getConfigPromise.then(this.getConfigHandler.bind(this)).then(success => {
          return axios.post(`${this.baseUrl}/${resource}`, data);
        });
      }
    }

    put(resource, data) {
      return axios.put(`${this.apiKey}/${resource}`, data);
    }

    delete(resource) {
      return axios.delete(`${this.apiKey}/${resource}`);
    }
}
