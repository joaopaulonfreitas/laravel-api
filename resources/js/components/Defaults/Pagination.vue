<template>
    <nav v-if="links.length > 3" aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <template v-for="(link, p) in links" :key="p">
                <li class="page-item" :class="{ 'active': link.active }">

                <a  v-if="link.url === null"
                    v-html="link.label"
                    class="page-link"
                    href="#"
                    @click.prevent="() => emit('getproducts')"></a>

                <a  v-else
                    v-html="link.label"
                    class="page-link"
                    href="#"
                    @click.prevent="() => emit('getproducts', {url: link.url})"></a>

                </li>

            </template>
        </ul>
    </nav>
</template>

<script>
    export default {
        props: {
            links: {type: Array, default: []}
        },
        setup(_, {emit})
        {
            return { emit }
        }
    }

</script>
