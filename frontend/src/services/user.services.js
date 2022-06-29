import axios from '../axios';

class UserDataService {
  getUser() {
    return axios.get('/');
  }

  postUser(data) {
    return axios.post('/', data);
  }
}

export default new UserDataService();
