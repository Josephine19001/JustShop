import { ALERT_CLEAR, ALERT_ERROR, ALERT_SUCCESS, Alert } from "../../types";

const initialState: Alert = {
  type: "",
  message: "",
};
function alert(state = initialState, action: any) {
  switch (action.type) {
    case ALERT_SUCCESS:
      return {
        ...state,
        type: "alert-success",
        message: action.payload.message,
      };
    case ALERT_ERROR:
      return {
        ...state,
        type: "alert-danger",
        message: action.payload.message,
      };
    case ALERT_CLEAR:
      return {};
    default:
      return state;
  }
}
export default alert;
