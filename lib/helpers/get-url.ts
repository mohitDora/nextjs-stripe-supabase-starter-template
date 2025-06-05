export const getURL = () => {
  const url = process?.env?.NEXT_PUBLIC_VERCEL_URL;

  return url;
};
