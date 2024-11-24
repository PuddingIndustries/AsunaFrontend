<script setup>

import {
  BAccordion,
  BAccordionItem,
} from "bootstrap-vue-next";

import OTACard from "../../components/config/OTACard.vue";
import OTAForm from "../../components/config/OTAForm.vue";

</script>

<template>
  <BAccordion>
    <BAccordionItem title="Version Status" visible>
      <OTACard/>
    </BAccordionItem>
    <BAccordionItem title="Manual OTA">
      <OTAForm/>
    </BAccordionItem>
  </BAccordion>
</template>

<style scoped>

</style>