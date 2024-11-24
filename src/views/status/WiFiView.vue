<script setup>

import {ref, onMounted, onUnmounted} from 'vue'

import {
  BAccordion,
  BAccordionItem,
} from "bootstrap-vue-next";

import WiFiSTACard from "@/components/status/WiFiSTACard.vue";
import WiFiAPCard from "@/components/status/WiFiAPCard.vue";

let refreshTimerID = 0;

const failure = ref(false)
const wifi_status = ref({
  ap: {
    clients: 0
  },
  sta: {
    connected: false,
    ssid: "",
    bssid: ""
  }
})

async function updateWiFiStatus() {
  const resp = await fetch('/api/status/wifi')
  if (resp.ok) {
    wifi_status.value = await resp.json();
  } else {
    failure.value = true
  }
}

onMounted(async () => {
  await updateWiFiStatus()

  refreshTimerID = setInterval(async () => {
    await updateWiFiStatus()
  }, 5000)
})

onUnmounted(async () => {
  clearInterval(refreshTimerID)
})

</script>

<template>
  <BAccordion>
    <BAccordionItem title="Station Status" visible>
      <WiFiSTACard :wifi_status="wifi_status"></WiFiSTACard>
    </BAccordionItem>
    <BAccordionItem title="AP Status">
      <WiFiAPCard :wifi_status="wifi_status"></WiFiAPCard>
    </BAccordionItem>
  </BAccordion>
</template>

<style scoped>

</style>