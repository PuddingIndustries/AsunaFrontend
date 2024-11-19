<script setup>

import {
  BAlert,
  BBadge,
  BButton,
  BCard,
  BCardText,
  BCardTitle,
  BCol,
  BCollapse,
  BListGroup,
  BListGroupItem,
  BRow,
  BSpinner,
} from 'bootstrap-vue-next'

import {onMounted, ref} from 'vue'

let loading = ref(true)
let failure = ref(false)
let versions = ref([])

async function loadVersions() {
  const resp = await fetch('/api/config/upgrade')
  if (resp.ok) {
    const v = await resp.json()
    versions.value = v.versions
  } else {
    failure.value = true
  }
}

function stateToString(state) {
  switch (state) {
    case "in_use":
      return "IN USE"
    case "ready":
      return "READY"
    case "invalid":
      return "INVALID"
    default:
      return "ERROR"
  }
}

function stateToBorder(state) {
  switch (state) {
    case "in_use":
      return "primary"
    case "ready":
      return "success"
    case "invalid":
      return "danger"
    default:
      return ""
  }
}

onMounted(() => {
  loading.value = true
  loadVersions()
  loading.value = false
})

</script>

<template>
  <div class="d-flex justify-content-center" v-if="loading">
    <BSpinner/>
  </div>
  <BRow v-else>
    <BCol md="6" v-for="v in versions">
      <BCard header-tag="header" v-if="(v.state !== 'empty')" :border-variant="stateToBorder(v.state)">
        <template #header>
          <span class="mb-0">OTA Slot {{ v.slot.toString() }}</span>
        </template>
        <BCardTitle>{{ v.name }}</BCardTitle>
        <hr/>
        <BCardText>
          <BListGroup>
            <BListGroupItem class="d-flex justify-content-between align-items-center">
              <span>APP version</span>
              <BBadge variant="info">{{ v.app_version }}</BBadge>
            </BListGroupItem>
            <BListGroupItem class="d-flex justify-content-between align-items-center">
              <span>IDF version</span>
              <BBadge variant="success">{{ v.idf_version }}</BBadge>
            </BListGroupItem>
            <BListGroupItem class="d-flex justify-content-between align-items-center">
              <span>Build time</span>
              <BBadge>{{ v.date }} {{ v.time }}</BBadge>
            </BListGroupItem>
            <BListGroupItem class="d-flex justify-content-between align-items-center">
              <span>Status</span>
              <BBadge :variant="stateToBorder(v.state)"> {{ stateToString(v.state) }}</BBadge>
            </BListGroupItem>
            <BListGroupItem class="d-flex justify-content-between align-items-center">
              <span>Checksum</span>
              <BBadge variant="dark">{{ v.sha256.slice(0, 8) }} ... {{ v.sha256.slice(24, 33) }}</BBadge>
            </BListGroupItem>
          </BListGroup>
        </BCardText>
      </BCard>
      <BCard header-tag="header" v-else>
        <template #header>
          <span class="mb-0">Slot {{ v.slot.toString() }}</span>
        </template>
        <BCardText>
          This slot is invalid.
        </BCardText>
      </BCard>
    </BCol>
  </BRow>

</template>

<style scoped>
</style>