import axios from 'axios';

import ProductService from './products'
import CategoryService from './categories'

const httpClient = axios.create({
    baseURL: process.env.APP_URL,
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

export default{
    products: ProductService(httpClient),
    categories: CategoryService(httpClient),
}
