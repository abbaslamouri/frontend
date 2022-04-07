<script setup>
	const router = useRouter()
	const { cart, updateCartCustomer } = useCart()
	const { user, isAuthenticated } = useAuth()
	const { showCartSlideout } = useAppState()
	const { $fetchDoc } = useNuxtApp()

	const handleCheckoutBtnClick = async () => {
		showCartSlideout.value = false
		console.log('USER', user.value)
		if (isAuthenticated.value) {
			const response = await $fetchDoc('users/fetchLoggedIn', user.value._id)
			console.log('RES', response)
			const currentUser = response.doc
			currentUser.shippingAddresses.push({
				address: '599 Deep Doods Drive',
				city: 'Aurora',
				state: 'OH',
				postalCode: 44202,
				country: 'USA',
			})
			updateCartCustomer(currentUser)
			router.push({ name: 'ecommerce-checkout' })
			// }
		} else {
			router.push({ name: 'ecommerce-secure' })
		}
	}
</script>

<template>
	<div>
		<div class="fixed inset-0 w-100vw h-100vh z-99 bg-slate-900 opacity-70"></div>
		<div class="fixed top-0 right-0 h-100vh z-99 max-w-415p w-100-percent text-slate-800">
			<div class="h-100vh flex-col justify-between bg-white">
				<div class="bg-stone-300 p-1 flex-row items-center justify-between py-1 px-2">
					<h3 class="font-bold text-md uppercase">Shopping Bag</h3>
					<button class="btn btn__close" @click.prevent="showCartSlideout = false"><IconsClose /></button>
				</div>
				<div class="flex-1 p-2 flex-col gap-2">
					<div class="flex-row gap-1 items-center">
						<IconsCoffee class="w-4 h-4" />
						<div>
							<div class="font-bold">Free Coffee Samples with all orders.</div>
							<div>Add at Checkout</div>
						</div>
					</div>
					<div>
						<span>Free shipping from $35</span>
					</div>
					<div v-if="cart.items.length">
						<EcommerceCheckoutCartItemList />
						<EcommerceCheckoutCartTotal />
						<p class="text-xs">(Shipping costs, special offers not included)</p>
					</div>
				</div>
				<div class="p-1 bg-stone-300">
					<div class="flex-row justify-end px-3" v-if="cart.items.length">
						<button class="btn btn__checkout px-3 py-1" @click="handleCheckoutBtnClick">Checkout</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import '@/assets/scss/variables';
</style>
