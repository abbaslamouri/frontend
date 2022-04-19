<script setup>
defineProps({
  freeSamples: {
    type: Array,
    required: true,
  },
})
const { cart, addItem } = useCart()
const quantitySelectors = ref([])

const resetQuantitySelectors = () => {
  for (const prop in cart.value.items) {
    quantitySelectors.value[prop] = false
  }
}

const toggleQuantitySelectors = (status, index) => {
  resetQuantitySelectors()
  quantitySelectors.value[index] = status
  // updateItemQuantity(cart.value.items[index], event.quantity)
}
</script>
<template>
  <div class="w-32 bg-slate-50 flex-col gap-2 p-2">
    <div class="text-center font-bold tracking-wide">Add Free Sample Pack and Recycling Bag</div>
    <div v-for="(freeSample, index) in freeSamples" :key="freeSample._id">
      <div class="py-2 px-1 border-b-stone-300">
        <div class="flex-row items-center justify-between">
          <div class="w-6 h-6 border-pink">
            <img
              class="w-full h-full contain"
              v-if="freeSample.gallery[0]"
              :src="freeSample.gallery[0].path"
              :alt="`${freeSample.gallery[0].name} Image`"
            />
            <img v-else src="placeholder.png" :alt="`Placeholder Image`" />
          </div>
          <div class="font-bold text-">
            {{ freeSample.name }}
          </div>
        </div>
        <div class="flex-row items-center justify-between">
          <div class="price text-yellow-700 text-sm">$0.00</div>
          <div v-if="freeSample.slug === 'recycling-bag'">
            <EcommerceQuantitySelector
              parentComponent="cart"
              :product="freeSample"
              :minVal="0"
              :maxVal="2"
              :stepVal="1"
              :showQuantitySelector="quantitySelectors[index]"
              :btnText="freeSample.quantity"
              @toggleQuantitySelectors="toggleQuantitySelectors($event, index)"
              @cancel="resetQuantitySelectors"
            />
          </div>
          <div v-else>
            <EcommerceQuantitySelector
              parentComponent="cart"
              :product="freeSample"
              :minVal="0"
              :maxVal="1"
              :stepVal="1"
              :showQuantitySelector="quantitySelectors[index]"
              :btnText="freeSample.quantity"
              @toggleQuantitySelectors="toggleQuantitySelectors($event, index)"
              @cancel="resetQuantitySelectors"
            />
          </div>
          <!-- <button class="btn btn__quantity-selector px-1" @click="addItem(freeSample, 1)"><IconsPlus /></button> -->
        </div>
      </div>
    </div>
    <div class="text-center">
      <h3 class="my1">NYC: No Bag Needed</h3>
      <p>Just place used capsules in your blue recycling bin</p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
