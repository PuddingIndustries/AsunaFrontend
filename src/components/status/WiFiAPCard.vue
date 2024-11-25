<script setup>

import {
  BBadge,
  BListGroup,
  BListGroupItem,
  BSpinner,
} from "bootstrap-vue-next";

const props = defineProps(['wifi_status', 'loading'])

</script>

<template>
  <BListGroup>
    <BListGroupItem class="d-flex justify-content-between align-items-center">
      <span>Connected clients</span>
      <BSpinner v-if="loading"></BSpinner>
      <BBadge v-else>{{ props.wifi_status.ap.clients }}</BBadge>
    </BListGroupItem>
  </BListGroup>
</template>

<style scoped>

</style>