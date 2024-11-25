<script setup>

import {
  BButton,
  BButtonGroup,
  BCollapse,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BForm,
  BSpinner, BAlert,
} from "bootstrap-vue-next";

import {onMounted, ref, reactive} from 'vue'

let loading = ref(true)
let failure = ref(false)
let editable = ref(false)
let config = ref({
  ap: {
    enabled: true,
    ssid: '',
    pass: '',
    chan: 0,
  },
  sta: {
    enabled: true,
  }
})

async function loadWiFiConfig() {
  const resp = await fetch('/api/config/wifi')
  if (resp.ok) {
    config.value = await resp.json()
  } else {
    throw new Error(resp.error)
  }
}

async function saveWiFiConfig() {
  const resp = await fetch('/api/config/wifi', {
    method: "POST",
    body: JSON.stringify(config.value),
  })
  if (resp.ok) {
    await resp.json()
  } else {
    throw new Error(resp.error)
  }
}

async function enableEdit() {
  editable.value = true
}

onMounted(async () => {
  loading.value = true

  try {
    await loadWiFiConfig()
  } catch (e) {
    failure.value = true
  }

  loading.value = false
})

</script>

<template>
  <BAlert v-if="failure" variant="danger" :model-value="true">Failed to load Wi-Fi configuration.</BAlert>
  <div v-else>
    <div class="d-flex justify-content-center" v-if="loading">
      <BSpinner/>
    </div>
    <BForm v-else row @submit="saveWiFiConfig()">
      <BFormCheckbox v-model="config.ap.enabled" :disabled="!editable">Enable Access Point</BFormCheckbox>
      <BCollapse v-model="config.ap.enabled" header="AP Configuration">
        <BFormGroup label="SSID" label-for="ap-ssid" label-cols-lg="2" content-cols-lg="10">
          <BFormInput id="ap-ssid" v-model="config.ap.ssid" placeholder="MY SSID" required :disabled="!editable"/>
        </BFormGroup>
        <BFormGroup label="Password" label-for="ap-pass" label-cols-lg="2" content-cols-lg="10">
          <BFormInput id="ap-pass" v-model="config.ap.pass" placeholder="MY PASSWORD" required :disabled="!editable"/>
        </BFormGroup>
        <BFormGroup label="Channel" label-for="ap-chan" label-cols-lg="2" content-cols-lg="10">
          <BFormInput id="ap-chan" v-model="config.ap.chan" type="number" placeholder="1-12" required
                      :disabled="!editable"/>
        </BFormGroup>
      </BCollapse>
      <hr/>
      <BFormCheckbox v-model="config.sta.enabled" :disabled="!editable">Enable Station</BFormCheckbox>
      <BCollapse v-model="config.sta.enabled" header="Station Configuration">
        <BFormGroup label="SSID" label-for="sta-ssid" label-cols-lg="2" content-cols-lg="10">
          <BFormInput id="sta-ssid" v-model="config.sta.ssid" placeholder="YOUR SSID" required :disabled="!editable"/>
        </BFormGroup>
        <BFormGroup label="Password" label-for="sta-pass" label-cols-lg="2" content-cols-lg="10">
          <BFormInput id="sta-pass" v-model="config.sta.pass" placeholder="YOUR PASSWORD" required
                      :disabled="!editable"/>
        </BFormGroup>
      </BCollapse>
      <hr/>
      <BButtonGroup>
        <BButton variant="warning" :disabled="editable" @click="enableEdit()">Edit</BButton>
        <BButton type="submit" variant="primary" :disabled="!editable">Save</BButton>
      </BButtonGroup>
    </BForm>
  </div>
</template>
<style scoped>

</style>