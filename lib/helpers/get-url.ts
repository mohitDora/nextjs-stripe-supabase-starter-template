export const getURL = () => {
  let url = process?.env?.NEXT_PUBLIC_VERCEL_URL;

  return url;
};
