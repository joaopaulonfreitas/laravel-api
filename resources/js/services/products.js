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
    }
})
