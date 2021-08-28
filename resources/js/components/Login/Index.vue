<template>
    <div>
        <h1>Login</h1>

        <form action="#" @submit.prevent="submitFormLogin">

            <label class="form-group">
                <span>E-mail:</span>
                <input class="form-control"
                    type="text"
                    name="email"
                    required
                    autocomplete="email"
                    autofocus
                    v-model="state.formData.email"/>
            </label>

            <label class="form-group">
                <span>Senha:</span>
                <input class="form-control"
                    type="password"
                    name="password"
                    required
                    autocomplete="current-password"
                    autofocus
                    v-model="state.formData.password"/>
            </label>

            <div>
                <button class="btn btn-primary">Logar</button>
            </div>

        </form>

    </div>
</template>

<script>
import { reactive } from 'vue'
import services from "../../services"
import { useToast } from "vue-toastification";

export default {
    setup: (props, {emit}) => {

        const toast = useToast();
        const state = reactive({
            isLoading: false,
            hasError: false,
            csrfCookie: '',
            formData: {
                email: '',
                password: ''
            }
        })

        const submitFormLogin = async () => {
            try {

                const { cookieData, cookieErrors } = await services.auth.csrfCookie();

                if(!cookieErrors){
                    const { data, errors } = await services.auth.login(state.formData);
                }

                if (!errors) {
                    emit('userLogin', state.user)
                    return;
                }

                if (errors.status === 404) {
                    toast.error("Usuário não encontrado");
                }

                if (errors.status === 401) {
                    toast.error("Dados inválidos");
                }

                if (errors.status === 400) {
                    toast.error("Ocorreu um erro ao obter dados do usuário");
                }
            } catch (error) {
                state.isLoading = false;
                state.hasError = !!error;
                toast.error("Ocorreu um erro ao obter dados do usuário");
            }
        }

        return { emit, state, submitFormLogin}
    }
}
</script>

<style>

</style>
