import axios from "axios";

export const saveUserDataToLocalStorage = (user, token) => {
    localStorage.setItem('user', JSON.stringify({
        userId: user._id,
        token: token
    }))
}

export const setupAuthHeaderForServiceCalls = (token) => {    
    if (token) {        
        return (axios.defaults.headers.common["Authorization"] = token);
    }
    delete axios.defaults.headers.common["Authorization"];
}

export const setupAuthExceptionHandler = (dispatch, signOutUser, navigate, addToast) => {
    const UNAUTHORIZED = 401;
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error?.response?.status === UNAUTHORIZED) {
                addToast(`Session Expired`,{appearance: 'error' });
                dispatch(signOutUser());
                navigate("signin");
            }
            return Promise.reject(error);
        }
    );
}