export const FETCH_USERDETAILS_PENDING = "FETCH_USERDETAILS_PENDING";
export const FETCH_USERDETAILS_SUCCESS = "FETCH_USERDETAILS_SUCCESS";
export const FETCH_USERDETAILS_ERROR = "FETCH_USERDETAILS_ERROR";

/** Update user details when the firebase authentication is changed */
export const UPDATE_USER = (auth) => {
  return {
    type: "UPDATE_USER",
    auth: auth,
  };
};

/** Update the store as the user signs out */
export const SIGN_OUT = () => {
  return {
    type: "SIGNOUT_USER",
  };
};

const initialstate = {
  pending: false,
  userDetails: [],
  error: null,
};

export function fetchUserDetailsPending() {
  return {
    type: FETCH_USERDETAILS_PENDING,
    pending: true,
  };
}
export function fetchUserDetailsSuccess(userDetails) {
  return {
    type: FETCH_USERDETAILS_SUCCESS,
    pending: false,
    userDetails: userDetails,
  };
}
export function fetchUserDetailsError(error) {
  return {
    type: FETCH_USERDETAILS_ERROR,
    error: error,
    pending: false,
  };
}
