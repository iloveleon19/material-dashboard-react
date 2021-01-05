import { history } from "../history/history.js";

const url = 'http://www.laravel.test/api/auth';
const authHeader = () => {
  const token = localStorage.getItem('token');

  const header = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }

  return token ? { ...header, "Authorization": `Bearer ${token}` } : header;
}

// Action Creators

const setUser = (payload) => ({ type: "SET_USER", payload})
const logUserOut = () => ({type:"LOG_OUT"})

// Methods

export const logOut = () => dispatch => {
    fetch(`${url}/logout`, {
        method: "POST",
        headers: authHeader(),
    })
    .then(res => {
        localStorage.removeItem("token");
        dispatch(logUserOut());
        history.push("/singin");
        return res.json();
    })
    .then(data => {});
}

export const fetchUser = (userInfo) => dispatch => {
    fetch(`${url}/login`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(data => {
        if ( data.hasOwnProperty('access_token') && data.hasOwnProperty('user') ) {
            localStorage.setItem("token", data.access_token)
            dispatch(setUser(data.user))
            history.push("/admin/dashboard");
        } else {
            alert("找不到使用者");
        }
    });
}

// export const signUserUp = (userInfo) => dispatch => {
//     fetch(`${url}/register`, {
//         method: "POST",
//         headers: authHeader(),
//         body: JSON.stringify(userInfo)
//     })
//     .then(res => res.json())
//     .then(data => {
//         if ( data.hasOwnProperty('access_token') && data.hasOwnProperty('user') ) {
//             localStorage.setItem("token", data.access_token)
//             dispatch(setUser(data.user))
//             history.push("/admin/dashboard");
//         } else {
//             alert("註冊失敗");
//         }
//     })
// }

export const autoLogin = () => dispatch => {
    fetch(`${url}/refresh`, {
        method: "POST",
        headers: authHeader(),
    })
    .then(res => res.json())
    .then(data => {
        if ( data.hasOwnProperty('access_token') && data.hasOwnProperty('user') ) {
            localStorage.setItem("token", data.access_token)
            dispatch(setUser(data.user))
            history.push("/admin/dashboard");
        }
    });
}
