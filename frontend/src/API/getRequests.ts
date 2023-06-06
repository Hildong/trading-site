import axios from 'axios'

export const getUserData = async () => {
    const x = await axios.get(`${process.env.REACT_APP_ENDPOINT}/API/getUser`, {params: {name: "admin"}})
    console.log(x.data)
    return x.data
}

export const getTrades = async () => {
    const trades = await axios.get(`${process.env.REACT_APP_ENDPOINT}/API/getTradeHistory`, {params: {name: "admin"}})
    return trades.data;
}

