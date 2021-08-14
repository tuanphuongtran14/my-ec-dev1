import axiosClient from "../apis/clients/axiosClient";

export const signIn = async (username, password) => {
    // Send request to login API
    const { data: { ok, errors } } = await axiosClient.post("/api/login", {
        username,
        password
    });

    const error = errors ? errors[0].extensions.exception.data.message[0].messages[0].id : null;

    if(error === "Auth.form.error.confirmed")
        return {
            success: false,
            error: "Not confirmed"
        }

    return {
        success: ok,
    }
};

export const signOut = async () => {
    const { data } = await axiosClient.get("/api/logout");
    const { success: signOutSuccessfully } = data;
    return signOutSuccessfully;
};
