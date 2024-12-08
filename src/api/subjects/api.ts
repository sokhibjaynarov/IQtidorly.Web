import axiosInstance from 'src/utils/axios';

export const GetSubjectsList = async () => axiosInstance.get(`/subjects?limit=50`);
