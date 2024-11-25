<script setup>

import {
  BCollapse,
  BDropdownItem,
  BNavbar,
  BNavbarBrand,
  BNavbarNav,
  BNavbarToggle,
  BNavItem,
  BNavItemDropdown,
} from "bootstrap-vue-next";

</script>

<template>
  <BNavbar toggleable="lg">
    <BNavbarBrand href="/">Project Asuna</BNavbarBrand>
    <BNavbarToggle target="nav-collapse"/>
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav>
        <BNavItem :to="{name: 'index'}" active-class="active">Index</BNavItem>
        <BNavItemDropdown text="Status" right>
          <BDropdownItem :to="{name: 'status-wifi'}" active-class="active">Wi-Fi</BDropdownItem>
        </BNavItemDropdown>
        <BNavItemDropdown text="Configuration" right>
          <BDropdownItem :to="{name: 'config-lora'}" active-class="active">LoRa</BDropdownItem>
          <BDropdownItem :to="{name: 'config-wifi'}" active-class="active">Wi-Fi</BDropdownItem>
          <BDropdownItem :to="{name: 'config-version'}" active-class="active">Upgrade</BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>

<style scoped>
</style>