<template>
    <div class="container">
        <div class="row">
            <div v-if="state.photo" class="col-lg-3 border rounded p-1">
                <img :src="state.photo" class="m-auto w-100 rounded shadow-sm" />
                <button class="btn btn-danger w-100 mt-1" @click="removeImage">Remove image</button>
            </div>

            <div :class="{'col-lg-12': !state.photo, 'col-9': state.photo}">
                <form class="d-flex flex-column" enctype="multipart/form-data">

                    <label class="form-group w-100">
                        <span>Name:</span>
                        <input type="text" v-model="state.form.name" name="name" class="form-control"/>
                    </label>


                    <label class="form-group w-100" v-if="!state.photo">
                        <span>Photo</span>
                        <input type="file" class="form-control form-control-file" id="customFile" @change="onFileChange"/>
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
            photo: '',
            form: {
                name: '',
                photo: ''
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

        function onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;

            state.form.photo = files[0] || null

            createImage(files[0]);
        }

        function createImage(file) {
            var image = new Image();
            var reader = new FileReader();

            reader.onload = (e) => {
                state.photo = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        function removeImage(e) {
            state.photo = ''
            state.form.photo = '';
        }

        return {state, createCategory, onFileChange, removeImage}
    }
}
</script>
