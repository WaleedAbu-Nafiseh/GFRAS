import axios from 'axios';

export const fetchUser = UserId =>{
    console.log('Git in fetchUSer');
    return axios
        .get(`/api/users/${UserId}`)
        .then(resp=>resp.data);
};