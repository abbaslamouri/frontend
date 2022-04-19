<script setup>
defineProps({
  address: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="flex-col gap-05 text-xs">
    <div class="flex-col items-start">
      <div class="flex-row gap-05">
        <div v-if="address && address.title">{{ address.title }}.</div>
        <div>{{ address.name }}</div>
      </div>
      <div>{{ address.company }}</div>
      <div>{{ address.addressLine1 }}</div>
      <div>{{ address.addressLine2 }}</div>
      <div class="flex-row gap-03">
        <div>{{ address.city }},</div>
        <div v-if="address.state">
          {{ address.state.name }}
        </div>
        <div>{{ address.postalCode }}</div>
      </div>
      <div v-if="address.country">{{ address.country.countryName }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
