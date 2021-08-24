<template>
<home />
</template>
<script>
import Home from './Home/Index.vue'

export default{
    components: {
        Home
    },
    setup: () => ({
        greeting: 'Hello World from Vue 3!'
    })
}
</script>
