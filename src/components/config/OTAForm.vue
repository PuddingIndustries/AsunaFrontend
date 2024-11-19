<script setup>

import {
  BButton,
  BForm,
  BFormFile,
  BFormGroup,
  BProgress,
  BProgressBar,
} from "bootstrap-vue-next";

import {reactive} from 'vue'

const firmware_form = reactive({file: null})
const upgrade_status = reactive({in_progress: false, has_error: false, current: 0, total: 0})

async function onSubmitFirmware(event) {
  event.preventDefault()

  upgrade_status.has_error = false
  upgrade_status.in_progress = true

  const init_resp = await ota_session_init()
  const session = init_resp.session

  let reader = new FileReader()

  reader.onload = async (e) => {
    const data = new Uint8Array(e.target.result)
    const data_len = e.target.result.byteLength

    upgrade_status.current = 0
    upgrade_status.total = e.target.result.byteLength

    let retry_count = 0

    for (let i = 0; i < data_len; i += 512) {
      if(retry_count) {
        i -= 512
      }

      upgrade_status.current = i

      let payload = btoa(String.fromCharCode.apply(null, data.slice(i, i + 512)))

      try {
        await ota_session_upload_chunk(session, i / 512, payload)
        retry_count = 0
      } catch (e) {
        if(retry_count <= 3) {
          retry_count += 1
        } else {
          upgrade_status.has_error = true
          return
        }
      }
    }

    upgrade_status.current = upgrade_status.total

    await ota_session_submit(session)

    upgrade_status.in_progress = false
  }

  reader.readAsArrayBuffer(firmware_form.file)
}

async function ota_session_init() {
  const resp = await fetch('/api/config/upgrade', {
    method: "POST",
    body: JSON.stringify({action: 0})
  })

  if (resp.ok) {
    return resp.json()
  }
}

async function ota_session_upload_chunk(session, id, chunk) {
  const resp = await fetch('/api/config/upgrade', {
    method: "POST",
    body: JSON.stringify({
      action: 1,
      session: session,
      payload: {
        id: id,
        data: chunk
      }
    })
  })

  if (resp.ok) {
    return resp.json()
  } else {
    throw new Error(resp.error)
  }
}

async function ota_session_submit(session) {
  const resp = await fetch('/api/config/upgrade', {
    method: "POST",
    body: JSON.stringify({
      action: 2,
      session: session
    })
  })

  if (resp.ok) {
    return resp.json()
  } else {
    throw new Error(resp.error)
  }
}

</script>

<template>
  <BProgress v-if="upgrade_status.in_progress" :max="upgrade_status.total" height="2rem">
    <BProgressBar :value="upgrade_status.current" :variant="upgrade_status.has_error ? 'danger' : 'info'">
      <span><strong>{{ (100.0 * upgrade_status.current / upgrade_status.total).toFixed(2) }}%</strong></span>
    </BProgressBar>
  </BProgress>
  <BForm @submit="onSubmitFirmware" v-else>
    <BFormGroup id="firmware-file-group" label="Firmware" label-for="firmware-file">
      <BFormFile id="firmware-file" v-model="firmware_form.file" required/>
    </BFormGroup>
    <BButton type="submit" variant="primary">Submit</BButton>
  </BForm>

</template>

<style scoped>

</style>