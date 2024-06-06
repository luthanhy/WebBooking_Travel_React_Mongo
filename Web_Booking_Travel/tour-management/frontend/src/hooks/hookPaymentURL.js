import { URL_DOMAIN } from "../utils/config";
export const getMoMoURL = async(data) => {
     try {
      const res = await fetch(`${URL_DOMAIN}/paymentmmo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        console.log("error");
      } else {
         const result = await res.json();
        const url = result.data.payUrl;
        console.log("ylu",url);
        return url;
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
    return null;
}
export const getPayPalURL = async(data) => {
  try {
    const res = await fetch(`${URL_DOMAIN}/paymentPayPal`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(data)
   });
   if (!res.ok) {
     console.log("error");
   } else {
     const result = await res.json();
     const link = result.data.links[1].href;
    return link;
    }
 } catch (error) {
   console.error("Error occurred:", error);
    return null;
  }
 return null;
}  