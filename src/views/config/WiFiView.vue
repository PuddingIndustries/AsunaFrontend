<script setup>

import {
  BAccordion,
  BAccordionItem,
} from "bootstrap-vue-next";

import WiFiForm from "../../components/config/WiFiForm.vue";

</script>

<template>
  <BAccordion>
    <BAccordionItem title="WiFi Configuration" visible>
      <WiFiForm/>
    </BAccordionItem>
  </BAccordion>
</template>

<style scoped>

</style>