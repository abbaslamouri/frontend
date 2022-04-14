<script setup>
	const { cart } = useCart()
	const { $fetchAll } = useNuxtApp()

	const countries = (await $fetchAll('countries', { sort: 'countryName' })).docs
	const states = (await $fetchAll('states', { sort: 'name' })).docs
	provide('countries', countries)
	provide('states', states)

	onMounted(async () => {
		console.log(cart.value)
	})

	const setDefaultAddress = (payload) => {
		const { index, value } = payload
		for (const prop in cart.value.customer.shippingAddresses) {
			cart.value.customer.shippingAddresses[prop].default = false
		}
		cart.value.customer.shippingAddresses[index].default = value
	}
</script>

<template>
	<div class="secure w-full flex-1 bg-slate-900 flex-col items-center gap-1">
		<div class="content flex-row items-start gap-2 w-996p">
			<EcommerceCheckoutSteps :step="2" activeColor="#16a34a" />
		</div>
		<ClientOnly>
			<div class="gap-2 w-996p flex-row justify-center gap-2" v-if="cart.items">
				<div class="main flex-1 bg-slate-50">
					<!-- <EcommerceCheckoutShippingAddresses :customer="cart.customer" @setDefaultAddress="setDefaultAddress" /> -->

					<!-- <EcommerceCheckoutShippingOptions /> -->

					<div class="flex-row items-end justify-between gap-2 bg-stone-300 px-3 py-1 text-sm">
						<NuxtLink class="link btn__link" :to="{ name: 'ecommerce-checkout' }">
							<IconsChevronLeft /><span>Back to Basket</span>
						</NuxtLink>
						<NuxtLink class="btn btn__checkout px-1 py-05" :to="{ name: 'ecommerce-payment' }">
							<span> continue</span><IconsChevronRight />
						</NuxtLink>
					</div>
				</div>
				<div class="aside bg-slate-50 border-pink w-32">
					<!-- <EcommerceCheckoutShippingCartOverview /> -->
				</div>
			</div>
			<div v-else class="flex-1 flex-col gap-2 bg-slate-50 mt-10 p-4 br-3">
				<p>You have no items in your bag</p>
				<NuxtLink class="btn btn__checkout px-2 py-05" :to="{ name: 'ecommerce-products' }">
					<span>Start Shopping</span>
				</NuxtLink>
			</div>
		</ClientOnly>
		-->
	</div>
</template>

<style lang="scss" scoped></style>
