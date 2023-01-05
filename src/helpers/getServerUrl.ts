// Description: This file should get the VERCEL_URL environment variable and return it as a string depending on VERCEL_ENV environment variable. if VERCEL_ENV is not defined return localhost:3000, if VERCEL_ENV is development return http://VERCEL_URL, if VERCEL_ENV is production return https://VERCEL_URL
function getServerUrl() {
  const { VERCEL_ENV, VERCEL_URL } = process.env;
  if (!VERCEL_ENV) {
    return "http://localhost:3000";
  }
  if (!VERCEL_URL) {
    return "http://localhost:3000";
  }
  if (VERCEL_ENV === "development") {
    return `http://${VERCEL_URL}`;
  }
  if (VERCEL_ENV === "production") {
    return `https://${VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export default getServerUrl;
