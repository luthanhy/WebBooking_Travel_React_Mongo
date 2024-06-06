let dataGlobal = null;

export const setData = (data) => {
    dataGlobal = data;
    console.log(dataGlobal); 
}
export const getDataGlobal = ()=> {
    console.log("data result ",dataGlobal);
    return dataGlobal;
}