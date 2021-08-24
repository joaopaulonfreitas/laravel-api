<template>

<section class="py-5">
    <div class="container px-4 px-lg-5 mt-5">
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

            <product v-for="product in state.products"
                :key="product.id"
                v-bind="{...product}"/>

        </div>
    </div>
</section>

</template>

<script>
import { onMounted, reactive } from 'vue'
import {useToast} from 'vue-toastification'
import services from '../../services'
import Product from './Product.vue'

export default{
    components: {
        Product
    },
    setup() {
        const toast = useToast()
        const state = reactive({
            hasError: false,
            isLoading: false,
            products: []
        })

        async function GetProducts()
        {
            try{
                toast.clear()
                state.isLoading = true
                const {data, errors} = await services.products.get({})

                if(!errors){
                    state.products = data.data
                    return
                }

                if(errors.status === 404){
                    toast.error('Produtos não encontrados')
                }

                if(errors.status === 401){
                    toast.error('Dados inválidos')
                }

                if(errors.status === 400){
                    toast.error('Ocorreu um erro ao obter produtos')
                }

                state.isLoading = false

            }catch(error){
                state.isLoading = false
                state.hasError = !!error
                toast.error('Ocorreu um erro ao obter produtos')
            }
        }

        onMounted(() => {
            GetProducts()
        })

        return {state}
    }
}
</script>
