import axios from 'axios'
import { IdefaultUserValues } from './interfaces'

export const resetUser = async (defaultUserData: IdefaultUserValues) => {
    await axios.post(`${process.env.REACT_APP_ENDPOINT}/API/updateUser`, defaultUserData)
    .then(data => data.data)
}

export const buyCrypto = async (cyrptoPurchaseData: Object) => {
    await axios.post(`${process.env.REACT_APP_ENDPOINT}/API/buyCrypto`, cyrptoPurchaseData)
    .then(data => data.data)
}

export const sellCrypto = async (cyrptoPurchaseData: Object) => {
    await axios.post(`${process.env.REACT_APP_ENDPOINT}/API/sellCrypto`, cyrptoPurchaseData)
    .then(data => data.data)
}
