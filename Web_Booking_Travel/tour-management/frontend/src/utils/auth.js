import LoginAdmin from "../Admin/LoginAdmin";
export const isLoggedIn = async () => {
    const islogin = await LoginAdmin.IsLoginSuccess;
    console.log(LoginAdmin.IsLoginSuccess);
};
export const isAdmin = async () => {

};