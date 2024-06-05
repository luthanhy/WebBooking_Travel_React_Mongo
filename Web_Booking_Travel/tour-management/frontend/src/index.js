import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContextProvider } from "./context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
const clientId = '1009681352887-gptnd0cjmrq6gt92u2ejqltkthtmfi6m.apps.googleusercontent.com';
root.render(
  <React.StrictMode>
     <GoogleOAuthProvider clientId={clientId}>
    <AuthContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
