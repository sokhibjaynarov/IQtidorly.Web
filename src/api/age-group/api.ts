import axiosInstance from 'src/utils/axios';

export const GetAgeGroup = async () => axiosInstance.get(`age-groups`);
