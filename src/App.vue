<script setup>
import {BContainer} from "bootstrap-vue-next";
import {RouterView} from 'vue-router'

import NavBar from './components/NavBar.vue'

</script>

<template>
  <NavBar/>
  <BContainer>
    <RouterView/>
  </BContainer>
</template>

<style scoped>
</style>
