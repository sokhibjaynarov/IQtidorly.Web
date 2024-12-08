interface IProps {
  fileUrl: string;
  fileName: string;
}

export default async function downloadFile({ fileUrl, fileName }: IProps) {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(new Blob([blob]));

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName || 'downloaded-file');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Error fetching the file:', error);
  }
}
