const getConversion = async (currency: string, currency2:string): Promise<any> => {
    const response = await fetch(`https://open.er-api.com/v6/latest/${currency}`)
    const data = await response.json()
    return data;
}


 
export {getConversion}
