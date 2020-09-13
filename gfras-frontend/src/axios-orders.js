import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://gfras-8ded2.firebaseio.com/'
})

export default instance