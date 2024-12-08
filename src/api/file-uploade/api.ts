import axiosInstance from 'src/utils/axios';

export const FileUpload = async (file: FormData, folder = 'images') =>
  axiosInstance.post(`/upload?folder=${folder}`, file);
