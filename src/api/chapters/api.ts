import axiosInstance from 'src/utils/axios';

import type { Chapter } from './types';

export const GetChapterList = async (subjectCode: string) =>
  axiosInstance.get<{ data: Chapter[] }>(`/chapters?limit=50&subject=${subjectCode}`);
