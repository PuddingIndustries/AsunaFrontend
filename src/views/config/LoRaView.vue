<script setup>

import {
  BSpinner,
  BForm,
  BFormCheckbox,
  BAccordion,
  BAccordionItem,
} from "bootstrap-vue-next";

import LoRaForm from "@/components/config/LoRaForm.vue";

</script>

<template>
  <BAccordion>
    <BAccordionItem title="LoRa Configuration" visible>
      <LoRaForm></LoRaForm>
    </BAccordionItem>
  </BAccordion>
</template>

<style scoped>

</style>