<script setup>
defineProps({
  address: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['editAddress'])
</script>

<template>
  <div class="flex-col gap-05">
    <!-- <div class="flex-row gap-3"> -->
    <div class="flex-col items-start">
      <div class="flex-row gap-05">
        <div>{{ address.title }}</div>
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
    <div class="link">Currently set as your default delivery address</div>
    <button class="btn btn__link px-2 py-05 text-xs items-self-start" @click.prevent="$emit('editAddress')">
      Edit Address
    </button>
    <!-- </div> -->
  </div>
</template>

<style lang="scss" scoped></style>
