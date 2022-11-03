/**
 * This is a helper function around the Browser storage to add a little security
 */
import secureLocalStorage from "react-secure-storage";

export const addToLocalStorage = (key, value) => {
  if (typeof value !== "string") value = JSON.stringify(value);
  try {
    secureLocalStorage.setItem(key, value);
  } catch (err) {
    console.log(err);
  }
};

export const getFromLocalStorage = (key) => {
  try {
    return secureLocalStorage.getItem(key);
  } catch (err) {
    return null;
  }
};

export const removeFromLocalStorage = (key) => {
  secureLocalStorage.removeItem(key);
};

export const addToSessionStorage = (key, value) => {
  if (typeof value !== "string") value = JSON.stringify(value);
  try {
    sessionStorage.setItem(key, value);
  } catch (err) {}
};

export const removeFromSessionStorage = (key) => {
  sessionStorage.removeItem(key);
};
