export default httpClient => ({
    get: async ({url, page}) => {

        const response = await httpClient.get(url || `/api/categories?page=${page}`, {})
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
    show: async ({category}) => {
        const response = await httpClient.get(`/api/categories/${category}`, {})
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
    store: async ({name}) => {
        const response = await httpClient.post(`/api/categories`, {name: name})
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
