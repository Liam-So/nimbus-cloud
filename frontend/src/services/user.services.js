import axios from '../axios';

class UserDataService {
  getUser(id) {
    return axios.get(`/users/${id}`);
  }

  postUser(data) {
    return axios.post('/users', data);
  }
}

export default new UserDataService();
