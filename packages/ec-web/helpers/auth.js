import axiosClient from "../apis/clients/axiosClient";
import {
    withIronSession
} from "next-iron-session";

export const isSignIn = ctx => {
    // Get jwt from coookies 
    const {
        req,
        res
    } = ctx;

    // Check if user logged in or not
    return;
}

export const signIn = async (username, password) => {
    // Send request to login API
    const { data: responseData } = await axiosClient.post("/api/login", {
        username,
        password
    });

    console.log("response");
    console.log(responseData);
    const { data, errors } = responseData;

    const error = errors ? errors[0].extensions.exception.data.message[0].messages[0].id : null;

    if(error === "Auth.form.error.confirmed")
        return {
            success: false,
            error: "Not confirmed"
        }

    return {
        success: data ? data.ok : false,
    }
};

export const signOut = async () => {
    const { data } = await axiosClient.get("/api/logout");
    console.log(data);
    const { success: signOutSuccessfully } = data;
    return signOutSuccessfully;
};

// export const forgotPassword = async (email) => {
//     // Send request to login API
//     const response = await fetch('/api/forgot-password', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         // body: JSON.stringify({
//         //     email
            
//         // }),
//     });

//     // Retrieve data from response and return it
//     const {
//         ok
//     } = await response.json();

//     return ok;
// };
export const useAuth = handler => withIronSession(handler, {
    password: 'DkAi0P2Aixgs9FWo66UMV3YdmksspNrW',
    cookieName: process.env.APPLICATION_COOKIE_NAME,
    // if your localhost is served on http:// then disable the secure flag
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true
    },
});