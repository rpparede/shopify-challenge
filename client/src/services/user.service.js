import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3080/api/test/';

class UserService {
    getPublicContent(params) {
        return axios.get(API_URL + 'all', { params });
    }

    getUserBoard(params) {
        return axios.get('http://localhost:3080/api/posts/user', { headers: authHeader() }, { params });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }

    createPost(data, config) {
        return axios.post('http://localhost:3080/posts/store', data, { headers: authHeader() }, config);
    }
    editPost(data, postId) {
        return axios.put('http://localhost:3080/posts/' + postId, data, { headers: authHeader() });
    }
    deletePost(postId) {
        return axios.delete('http://localhost:3080/posts/' + postId, { headers: authHeader() });
    }
}

export default new UserService();