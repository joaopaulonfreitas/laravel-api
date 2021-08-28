export default httpClient => ({

    csrfCookie: async () => {
        const response = await httpClient.get(`/sanctum/csrf-cookie`, {})
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

    login: async ({email, password}) => {

        //this.csrfCookie()

        const response = await httpClient.post(`/login`, {email: email, password: password })
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
