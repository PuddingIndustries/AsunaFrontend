<script setup>

import {ref, onMounted, onUnmounted} from 'vue'

import {
  BAlert,
  BAccordion,
  BAccordionItem,
  BSpinner,
} from "bootstrap-vue-next";

import WiFiSTACard from "@/components/status/WiFiSTACard.vue";
import WiFiAPCard from "@/components/status/WiFiAPCard.vue";

let refreshTimerID = 0;

const loading = ref(false)
const failure = ref(false)
const wifiStatus = ref({
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
    wifiStatus.value = await resp.json()
    failure.value = false
  } else {
    failure.value = true
  }
}

onMounted(async () => {
  loading.value = true
  await updateWiFiStatus()
  loading.value = false

  refreshTimerID = setInterval(async () => {
    loading.value = true
    await updateWiFiStatus()
    loading.value = false
  }, 5000)
})

onUnmounted(async () => {
  clearInterval(refreshTimerID)
})

</script>

<template>
  <BAlert v-if="failure" variant="danger" :model-value="true">
    <div class="d-flex align-items-center">
      <span>Failed to load Wi-Fi status, retrying...</span>
      <BSpinner class="ms-auto"/>
    </div>
  </BAlert>
  <BAccordion v-else>
    <BAccordionItem title="Station Status" visible>
      <WiFiSTACard :wifi_status="wifiStatus" :loading="loading" :failure="failure"></WiFiSTACard>
    </BAccordionItem>
    <BAccordionItem title="AP Status">
      <WiFiAPCard :wifi_status="wifiStatus" :loading="loading" :failure="failure"></WiFiAPCard>
    </BAccordionItem>
  </BAccordion>
</template>

<style scoped>

</style>