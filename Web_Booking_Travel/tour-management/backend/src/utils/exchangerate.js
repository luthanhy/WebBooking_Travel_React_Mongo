
export const PriceExchangeRate = async(BaseCode,TargetCode,Amount) => {
    try {
        const res  = await fetch(`https://v6.exchangerate-api.com/v6/4899eb41b44b4ffa39654441/pair/${BaseCode}/${TargetCode}/${Amount}`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const result  = await res.json();
        return result.conversion_result;
    }catch(err) {
        console.log(err);
    }
}
