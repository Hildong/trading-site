import axios from 'axios'
import { IdefaultUserValues } from './interfaces'

export const resetUser = async (defaultUserData: IdefaultUserValues) => {
    await axios.post(`${process.env.REACT_APP_ENDPOINT}/API/updateUser`, defaultUserData)
    .then(data => data.data)
}
