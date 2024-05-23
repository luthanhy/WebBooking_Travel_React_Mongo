import LoginAdmin from "../Admin/LoginAdmin";

export const isLoggedIn = async () => {
    const islogin = await LoginAdmin.IsLoginSuccess;
    console.log(islogin);
};
export const isAdmin = async () => {

};