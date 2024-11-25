<script setup>

import {ref, onMounted} from "vue";

import {
  BSpinner,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BCollapse,
  BButtonGroup,
  BButton,
} from "bootstrap-vue-next";

const bw_options = [
  {value: 0, text: "125kHz"},
  {value: 1, text: "250kHz"},
  {value: 2, text: "500kHz"},
]

const sf_options = [
  {value: 0, text: "SF5"},
  {value: 1, text: "SF6"},
  {value: 2, text: "SF7"},
  {value: 3, text: "SF8"},
  {value: 4, text: "SF9"},
  {value: 5, text: "SF10"},
  {value: 6, text: "SF11"},
  {value: 7, text: "SF12"},

]

const cr_options = [
  {value: 0, text: "4/5"},
  {value: 1, text: "4/6"},
  {value: 2, text: "4/7"},
  {value: 3, text: "4/8"},
]

const loading = ref(true)
const failure = ref(false)
const editable = ref(false)
const config = ref({
  forward_rtcm: false,
  modem_config: {
    "freq": 0,
    "power": 7,
    "type": 1,
    "bw": 1,
    "sf": 0,
    "cr": 0,
    "ldr_opt": false,
  }
})

async function loadLoRaConfig() {
  const resp = fetch('/api/config/lora')
  if (resp.ok) {
    config.value = await resp.json()
  } else {
    throw new Error(resp.error)
  }
}

async function saveLoRaConfig() {
  const resp = fetch('/api/config/lora', {
    method: 'POST',
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
    await loadLoRaConfig()
  } catch (e) {
    failure.value = true
  }

  loading.value = false
})
</script>

<template>
  <div class="d-flex justify-content-center" v-if="loading">
    <BSpinner/>
  </div>
  <BForm v-else row @submit="saveLoRaConfig">
    <BFormGroup label="Forward RTCM" label-for="lora-enabled" label-cols-lg="2" content-cols-lg="10">
      <BFormCheckbox id="lora-enabled" v-model="config.forward_rtcm" :disabled="!editable">Enable</BFormCheckbox>
    </BFormGroup>
    <BCollapse v-model="config.forward_rtcm" header="Forwarder Configuration">
      <BFormGroup label="Frequency" label-for="lora-freq" label-cols-lg="2" content-cols-lg="10">
        <BFormInput id="lora-freq" v-model="config.modem_config.freq"></BFormInput>
      </BFormGroup>
      <BFormGroup label="RF Power" label-for="lora-power" label-cols-lg="2" content-cols-lg="10">
        <BFormInput id="lora-power" v-model="config.modem_config.power"></BFormInput>
      </BFormGroup>
      <BFormGroup label="Bandwidth" label-for="lora-bw" label-cols-lg="2" content-cols-lg="10">
        <BFormSelect id="lora-bw" v-model="config.modem_config.bw" :options="bw_options"></BFormSelect>
      </BFormGroup>
      <BFormGroup label="Spread Factor" label-for="lora-sf" label-cols-lg="2" content-cols-lg="10">
        <BFormSelect id="lora-sf" v-model="config.modem_config.sf" :options="sf_options"></BFormSelect>
      </BFormGroup>
      <BFormGroup label="Coding Rate" label-for="lora-cr" label-cols-lg="2" content-cols-lg="10">
        <BFormSelect id="lora-cr" v-model="config.modem_config.cr" :options="cr_options"></BFormSelect>
      </BFormGroup>
    </BCollapse>
    <hr/>
    <BButtonGroup>
      <BButton variant="warning" :disabled="editable" @click="enableEdit()">Edit</BButton>
      <BButton type="submit" variant="primary" :disabled="!editable">Save</BButton>
    </BButtonGroup>
  </BForm>
</template>

<style scoped>

</style>