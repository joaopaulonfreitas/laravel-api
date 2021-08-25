<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <form class="d-flex flex-column">
                    <label>
                        <span>Name:</span>
                        <input type="text" v-model="state.form.name" name="name" class="form-control"/>
                    </label>
                    <div class="mt-3">
                    <button class="btn btn-primary" @click.prevent="createCategory">
                        <span v-if="state.isLoading">
                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </span>
                        <span v-else>
                            Add Category
                        </span>
                    </button>


                    <!-- <button class="btn btn-primary" type="button" disabled>
  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
  Loading...
</button> -->
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {onMounted, reactive} from 'vue'
import { useToast } from "vue-toastification";
import services from '../../services'

export default {
    setup(){
        const toast = useToast();

        const state = reactive({
            isLoading: false,
            hasError: false,
            form: {
                name: ''
            }
        })

        onMounted(() => {
            toast.clear();
        })

        async function createCategory() {
            try{
                state.isLoading = true

                const { data, errors } = await services.categories.store(state.form)

                if (!errors) {
                    state.form = data.data.name
                    toast.success(`A categoria ${data.data.name} foi cadastrada com sucesso!`);
                    state.isLoading = false;
                    return;
                }

                if (errors.status === 401) {
                    toast.error("Dados inválidos");
                }

                if (errors.status === 400) {
                    toast.error("Ocorreu um erro ao cadastrar a categoria")
                }

                state.isLoading = false

            }catch (error) {
                state.isLoading = false
                state.hasError = !!error
                toast.error("Ocorreu um erro ao cadastrar a categoria")
            }
        }

        return {state, createCategory}
    }
}
</script>
