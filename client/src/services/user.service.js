import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3080/api/';

class UserService {
    getPublicContent(params) {
        return axios.get(API_URL + 'posts', { params });
    }

    getUserBoard(params) {
        return axios.get(API_URL + 'posts/user', { headers: authHeader(), params: params });
    }


    createPost(data, config) {
        return axios.post(API_URL + 'posts/store', data, { headers: authHeader() }, config);
    }
    editPost(data, postId) {
        return axios.put(API_URL + 'posts/' + postId, data, { headers: authHeader() });
    }
    deletePost(postId) {
        return axios.delete(API_URL + 'posts/' + postId, { headers: authHeader() });
    }
}

export default new UserService();