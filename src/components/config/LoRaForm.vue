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
  BInputGroup,
} from "bootstrap-vue-next";

const bw_options = [
  {value: 0, text: "125"},
  {value: 1, text: "250"},
  {value: 2, text: "500"},
]

const sf_options = [
  {value: 0, text: "5"},
  {value: 1, text: "6"},
  {value: 2, text: "7"},
  {value: 3, text: "8"},
  {value: 4, text: "9"},
  {value: 5, text: "10"},
  {value: 6, text: "11"},
  {value: 7, text: "12"},

]

const cr_options = [
  {value: 0, text: "5"},
  {value: 1, text: "6"},
  {value: 2, text: "7"},
  {value: 3, text: "8"},
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
  const resp = await fetch('/api/config/lora')
  if (resp.ok) {
    let data = await resp.json()
    console.log(data)
    config.value = data
  } else {
    throw new Error(resp.error)
  }
}

async function saveLoRaConfig() {
  const resp = await fetch('/api/config/lora', {
    method: 'POST',
    body: JSON.stringify(config.value),
  })
  if (resp.ok) {
    await resp.json()
    editable.value = false

    await loadLoRaConfig()
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
  <BForm v-else row @submit="saveLoRaConfig()">
    <BFormGroup label="Forward RTCM" label-for="lora-enabled" label-cols-lg="2" content-cols-lg="10">
      <BFormCheckbox id="lora-enabled" v-model="config.forward_rtcm" :disabled="!editable">Enable</BFormCheckbox>
    </BFormGroup>
    <BCollapse v-model="config.forward_rtcm" header="Forwarder Configuration">
      <BFormGroup label="Frequency" label-for="lora-freq" label-cols-lg="2" content-cols-lg="10">
        <BInputGroup append="Hz">
          <BFormInput id="lora-freq" v-model="config.modem_config.freq" :type="'number'"></BFormInput>
        </BInputGroup>
      </BFormGroup>
      <BFormGroup label="RF Power" label-for="lora-power" label-cols-lg="2" content-cols-lg="10">
        <BInputGroup append="dBm">
          <BFormInput id="lora-power" v-model="config.modem_config.power" :type="'number'"></BFormInput>
        </BInputGroup>
      </BFormGroup>
      <BFormGroup label="Bandwidth" label-for="lora-bw" label-cols-lg="2" content-cols-lg="10">
        <BInputGroup append="kHz">
          <BFormSelect id="lora-bw" v-model="config.modem_config.bw" :options="bw_options"></BFormSelect>
        </BInputGroup>
      </BFormGroup>
      <BFormGroup label="Spread Factor" label-for="lora-sf" label-cols-lg="2" content-cols-lg="10">
        <BInputGroup prepend="SF">
          <BFormSelect id="lora-sf" v-model="config.modem_config.sf" :options="sf_options"></BFormSelect>
        </BInputGroup>
      </BFormGroup>
      <BFormGroup label="Coding Rate" label-for="lora-cr" label-cols-lg="2" content-cols-lg="10">
        <BInputGroup prepend="4 /">
          <BFormSelect id="lora-cr" v-model="config.modem_config.cr" :options="cr_options"></BFormSelect>
        </BInputGroup>
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