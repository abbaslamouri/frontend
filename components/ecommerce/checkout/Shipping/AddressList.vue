<script setup>
defineProps({
  addresses: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['setSelectedAddress'])
</script>

<template>
  <div class="flex-col gap-2 p-2 text-xs">
    <div class="flex-row gap-3" v-for="(address, i) in addresses" :key="`address-${i}`">
      <div :class="{ selected: address.selected }">
        <div class="flex-row gap-05">
          <div v-if="address.title">{{ address.title }}</div>
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
      <button class="btn btn__link px-2 py-05 text-xs" @click.prevent="$emit('setSelectedAddress', i)">
        Select this Address
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selected {
  font-weight: 700;
}
</style>
