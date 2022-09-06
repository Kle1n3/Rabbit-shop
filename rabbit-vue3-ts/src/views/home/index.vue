<template>
    <div class="page-home">
        <div class="home-entry">
            <div class="container">
                <HomeCategory></HomeCategory>
                <HomeBanner></HomeBanner>
            </div>
        </div>
    </div>
</template>

<script setup name="Home" lang="ts">
import HomeCategory from './components/home-category.vue';
import HomeBanner from './components/home-banner.vue';

</script>

<style lang="less" scoped>

</style>