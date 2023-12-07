<script setup lang="ts">

import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue';

</script>

<template>
    <NavBar/>

    <main class="px-1">
        <router-view/>
    </main>

    <Footer/>
</template>
