

export const UPDATE_USER = (auth) => {
    return {
        type:"UPDATE_USER",
        auth: auth
    }
}

export const SIGN_OUT = () => {
    return {
        type:"SIGNOUT_USER"
    }
}