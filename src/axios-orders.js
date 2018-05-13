import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://build-burger-4d80a.firebaseio.com/'
});

export default instance;