import axiosInstance from 'src/utils/axios';

export const GetMyBlance = () => axiosInstance.get('/profile/my-balance');
