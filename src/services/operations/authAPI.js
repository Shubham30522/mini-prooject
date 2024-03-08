// import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";

const { SIGNUP_API, LOGIN_API, CREATE_API } = endpoints;

export async function signUp(userSignUpData) {
  try {
    const response = await apiConnector("POST", SIGNUP_API, userSignUpData);
    // console.log("SIGNUP API RESPONSE............", response);
  } catch (error) {
    console.log("SIGNUP API ERROR............", error);
  }
}

export function useLoginConnector() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.profile);
  const loginConnector = async (userLoginData) => {
    try {
      const response = await apiConnector("POST", LOGIN_API, userLoginData);

      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));

      console.log("after redux step: ", user);

      // Log the current state of the Redux store
      // console.log("Redux State after setting token:", dispatch.getState().auth);

      localStorage.setItem("token", JSON.stringify(response.data.token));
      console.log("Token set in local storage:", response.data.token);

      return response;
      // console.log("LOGIN API RESPONSE............", response);
    } catch (error) {
      console.log("LOGIN API ERROR............", error.response.data.message);
      return error.response;
    }
  };

  return loginConnector;
}

export async function createRequest(requestData) {
  // console.log("in createRequest:", requestData);
  try {
    const response = await apiConnector("POST", CREATE_API, requestData);
    // console.log(" API RESPONSE............", response);
  } catch (error) {
    console.log("CREATE REQUEST API ERROR............", error);
  }
}