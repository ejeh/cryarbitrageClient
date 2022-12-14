const {
  NODE_ENV,
  REACT_APP_DEV_API_KEY,
  REACT_APP_PROD_API_KEY,
  REACT_APP_PROD_API_URL,
  REACT_APP_DEV_API_URL,
} = process.env;

export const BACKEND_URL =
  NODE_ENV === "production" ? REACT_APP_PROD_API_URL : REACT_APP_DEV_API_URL;

export const API_KEY =
  NODE_ENV === "production" ? REACT_APP_PROD_API_KEY : REACT_APP_DEV_API_KEY;
