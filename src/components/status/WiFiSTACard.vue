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
      <span>SSID</span>
      <BBadge>{{ props.wifi_status.sta.ssid }}</BBadge>
    </BListGroupItem>
    <BListGroupItem class="d-flex justify-content-between align-items-center">
      <span>BSSID</span>
      <BBadge>{{ props.wifi_status.sta.bssid }}</BBadge>
    </BListGroupItem>
    <BListGroupItem class="d-flex justify-content-between align-items-center">
      <span>RSSI</span>
      <BBadge>{{ props.wifi_status.sta.rssi }}dBm</BBadge>
    </BListGroupItem>
  </BListGroup>
</template>

<style scoped>

</style>