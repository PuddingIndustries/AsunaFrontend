<script setup>

import {
  BBadge,
  BListGroup,
  BListGroupItem,
} from "bootstrap-vue-next";

const props = defineProps(['wifi_status'])

</script>

<template>
  <BListGroup>
    <BListGroupItem class="d-flex justify-content-between align-items-center">
      <span>Connected clients</span>
      <BBadge>{{ props.wifi_status.ap.clients }}</BBadge>
    </BListGroupItem>
  </BListGroup>
</template>

<style scoped>

</style>