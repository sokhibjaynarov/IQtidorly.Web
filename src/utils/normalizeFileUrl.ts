export default function normalizeFileUrl(fileUrl?: string) {
  return fileUrl ? `${process.env.NEXT_PUBLIC_FILE_URL}${fileUrl}` : '';
}
