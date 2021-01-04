import { ALERT_CLEAR, ALERT_ERROR, ALERT_SUCCESS } from "../../types";

export const alertSuccess = (message: string) => {
  return {
    type: ALERT_SUCCESS,
    payload: { message },
  };
};
export const alertFailure = (message: string) => {
  return {
    type: ALERT_ERROR,
    payload: { message },
  };
};
export const alertClear = () => {
  return {
    type: ALERT_CLEAR,
  };
};
