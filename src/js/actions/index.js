
/** Update user details when the firebase authentication is changed */
export const UPDATE_USER = (auth) => {
    return {
        type:"UPDATE_USER",
        auth: auth
    }
}

/** Update the store as the user signs out */
export const SIGN_OUT = () => {
    return {
        type:"SIGNOUT_USER"
    }
}