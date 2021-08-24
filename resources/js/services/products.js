export default httpClient => ({
    get: async ({}) => {
        const response = await httpClient.get('/api/products', {})
        let errors = null

        if(!response.data)
        {
            errors = {
                status: response.request.status,
                statusText: response.request.statusText
            }
        }

        return {
            data: response.data,
            errors:errors
        }
    },
    getCategories: async ({}) => {
        const response = await httpClient.get('/api/categories', {})
        let errors = null

        if(!response.data)
        {
            errors = {
                status: response.request.status,
                statusText: response.request.statusText
            }
        }

        return {
            data: response.data,
            errors:errors
        }
    }
})
