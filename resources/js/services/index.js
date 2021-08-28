import axios from 'axios';

const httpClient = axios.create({
    baseURL: process.env.APP_URL,
    withCredentials: true,
    headers: {
        common: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    }
})

httpClient.interceptors.response.use((response) => response, (error) => {
    const canThrowAnError = error.request.status === 0 || error.request.status === 500

    if(canThrowAnError){
        throw new Error(error.message)
    }

    return error
})


import AuthService from './auth'
import ProductService from './products'
import CategoryService from './categories'

export default{
    auth: AuthService(httpClient),
    products: ProductService(httpClient),
    categories: CategoryService(httpClient),
}
