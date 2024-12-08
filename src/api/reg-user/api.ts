import axiosInstance from 'src/utils/axios';

export const GetRegUsers = async (page: number, limit: number) =>
  axiosInstance.get(`/users?page=${page + 1}&limit=${limit}`);
