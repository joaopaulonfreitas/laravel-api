<template>
  <section class="py-5">
    <div class="container px-4 px-lg-5 mt-5">
      <div
        class="
          row
          gx-4 gx-lg-5
          row-cols-1 row-cols-md-3 row-cols-xl-4
          justify-content-center
        "
      >
        <categories :categories="state.categories.data" />

        <div class="flex-fill text-text-center">

          <div class=" row px-0 gx-4 gx-lg-5 row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 justify-content-center">
            <product
              v-for="product in state.products.data"
              :key="product.id"
              v-bind="{ ...product }"
            />
          </div>

          <pagination
            @getproducts="GetProducts"
            class="mt-6"
            :links="state.products.meta ? state.products.meta.links : []"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onBeforeUnmount, onMounted, reactive } from "vue";
import { useToast } from "vue-toastification";
import services from "../../services";
import usePaginate from "../../hooks/usePaginate";
import Categories from "./Categories.vue";
import Product from "./Product.vue";

import Pagination from "../Defaults/Pagination.vue";

export default {
  components: {
    Categories,
    Product,
    Pagination,
  },
  setup() {
    const toast = useToast();
    const paginate = usePaginate();

    const state = reactive({
      hasError: false,
      isLoading: false,
      categories: {},
      products: {},
    });

    onMounted(() => {
      //paginate.listen(GetProducts);

      toast.clear();
      state.isLoading = true;

      GetProducts({});
      GetCategories();

      state.isLoading = false;
    });

    onBeforeUnmount(() => {
      //paginate.off(GetProducts);
    });

    async function GetProducts(payload) {
      try {
        const { data, errors } = await services.products.get(payload);

        if (!errors) {
          state.products = data;
          toast.success("Produtos carregados com sucesso");
          return;
        }

        if (errors.status === 404) {
          toast.error("Produtos não encontrados");
        }

        if (errors.status === 401) {
          toast.error("Dados inválidos");
        }

        if (errors.status === 400) {
          toast.error("Ocorreu um erro ao obter produtos");
        }
      } catch (error) {
        state.isLoading = false;
        state.hasError = !!error;
        toast.error("Ocorreu um erro ao obter produtos");
      }
    }

    async function GetCategories() {
      try {
        const { data, errors } = await services.products.getCategories({});

        if (!errors) {
          state.categories = data;
          return;
        }

        if (errors.status === 404) {
          toast.error("Categorias não encontradas");
        }

        if (errors.status === 401) {
          toast.error("Dados inválidos");
        }

        if (errors.status === 400) {
          toast.error("Ocorreu um erro ao obter categorias");
        }

        state.isLoading = false;
      } catch (error) {
        state.isLoading = false;
        state.hasError = !!error;
        toast.error("Ocorreu um erro ao obter categorias");
      }
    }

    return { state, GetProducts };
  },
};
</script>
