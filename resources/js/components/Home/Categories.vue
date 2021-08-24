<template>
<div class="col mb-5">

    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <a v-for="category in categories" :key="category.id" class="nav-link">
        {{category.name}}
        </a>
    </div>

</div>
</template>

<script>
export default {
    props: {
        categories: {type: Array, default: []}
    }
}
</script>

