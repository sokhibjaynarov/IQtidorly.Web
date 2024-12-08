import { useFileUpload } from 'src/api/file-uploade/hooks/useFileUpload';

type Folder = 'images' | 'audios' | 'documents' | 'files' | 'videos';

export default function useFileUploader(folder?: Folder | (string & NonNullable<unknown>)) {
  const { triggerFileUpload, isPending } = useFileUpload(folder);

  async function uploadFile<TData>(
    values: Record<string, any>,
    key: keyof TData & string
  ): Promise<TData> {
    const file = values[key];
    if (!(file instanceof File)) {
      return values as TData;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await triggerFileUpload(formData);
      return { ...values, [key]: data.data.url } as TData;
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }

  return { uploadFile, isPending };
}
