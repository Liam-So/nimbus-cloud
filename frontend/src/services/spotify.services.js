import axios from '../axios';

class SpotifyDataService {
  getSong(id) {
    return axios.get(`/music/${id}`);
  }
}

export default new SpotifyDataService();
