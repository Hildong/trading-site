import axios from 'axios'

export const getUserData = async () => {
    const x = await axios.get(`${process.env.REACT_APP_ENDPOINT}/API/getUser`)
    return x.data
}
