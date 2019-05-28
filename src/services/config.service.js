import axios from 'axios';

export class ConfigService {
  constructor() {
  }

  getConfig() {
    return new Promise((resolve, reject) => {
      if(this.hasOwnProperty('config' && this.config)) {
        resolve(this.config);
      } else {
        axios.get('./config/config.json').then(success => {
          this.config = success;
          resolve(this.config);
        });
      }
    });
  }
}
