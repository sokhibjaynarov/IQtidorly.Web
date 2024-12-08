import { useMutation } from '@tanstack/react-query';

import { FileUpload } from '../api';

export const useFileUpload = (folder?: string) => {
  const { mutateAsync, isSuccess, isError, isPending } = useMutation({
    mutationFn: (file: any) => FileUpload(file, folder),
    onError: (error: any) => console.log(error),
  });

  return { triggerFileUpload: mutateAsync, isSuccess, isError, isPending };
};
