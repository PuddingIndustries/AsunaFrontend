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
      <span>SSID</span>
      <BSpinner v-if="props.loading"></BSpinner>
      <BBadge v-else>{{ props.wifi_status.sta.ssid }}</BBadge>
    </BListGroupItem>
    <BListGroupItem class="d-flex justify-content-between align-items-center">
      <span>BSSID</span>
      <BSpinner v-if="props.loading"></BSpinner>
      <BBadge v-else>{{ props.wifi_status.sta.bssid }}</BBadge>
    </BListGroupItem>
    <BListGroupItem class="d-flex justify-content-between align-items-center">
      <span>RSSI</span>
      <BSpinner v-if="props.loading"></BSpinner>
      <BBadge v-else>{{ props.wifi_status.sta.rssi }}dBm</BBadge>
    </BListGroupItem>
  </BListGroup>
</template>

<style scoped>

</style>