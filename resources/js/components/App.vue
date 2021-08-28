<template>

    <login v-if="!state.user" @userLogin="userLogin"/>
    <home v-else/>

</template>
<script>
    import {reactive} from 'vue'
    import Login from './Login/Index.vue'
    import Home from './Home/Index.vue'

    export default{
        components: {
            Login,
            Home
        },
        setup: () => {

            const state = reactive({
                user: null
            });

            const userLogin = (payload) => {
                state.user = payload
            }

            return {state, userLogin}
        }
    }
</script>
