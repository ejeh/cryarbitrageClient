import { BUY_CRYTO } from "./types";
import { API_KEY, BACKEND_URL } from "./api";

export const loadBuyCryto = (result) => {
  return {
    type: BUY_CRYTO,
    payload: result,
  };
};

export const buyCryto = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BACKEND_URL}/buycryto/?key=${API_KEY}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (json.error) {
        throw json.error;
      }
      return dispatch(loadBuyCryto(json));
    } catch (err) {
      return dispatch(
        loadBuyCryto({
          success: false,
          data: err.message,
        })
      );
    }
  };
};
