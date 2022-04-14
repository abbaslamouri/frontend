<script setup>
	import cloneDeep from 'lodash.clonedeep'

	const props = defineProps({
		shippingAddress: {
			type: Object,
			required: true,
		},

		email: {
			type: String,
		},
	})

	const emit = defineEmits(['setDefaultAddress', 'updateAddress'])
	const { errorMsg } = useAppState()
	const countries = inject('countries')
	const states = inject('states')

	const localAddress = ref(cloneDeep(props.shippingAddress))
	const localEmail = ref(props.email)
	if (!localAddress.value.state) localAddress.value.state = states.find((s) => s._id == '624ef322b9e91e20c3e32390')
	if (!localAddress.value.country)
		localAddress.value.country = countries.find((c) => c._id == '624ef31fb9e91e20c3e3215e')
	for (const prop in localAddress.value.phones) {
		if (!localAddress.value.phones[prop].phoneCountryCode)
			localAddress.value.phones[prop].phoneCountryCode = countries.find((c) => c._id == '624ef31fb9e91e20c3e3215e')
	}
	if (!localAddress.value.phones)
		localAddress.value.phones = [
			{
				phoneType: '',
				phoneNumber: '',
				phoneCountryCode: countries.find((c) => c._id == '624ef31fb9e91e20c3e3215e'),
			},
		]
	if (!localAddress.value.addressType) localAddress.value.addressType = 'Residential'

	localAddress.value.name = localAddress.value.name ? localAddress.value.name : 'Abbas Lamouri'
	localEmail.value = localEmail.value ? localEmail.value : 'abbaslamouri@yrlus.com'
	localAddress.value.addressLine1 = localAddress.value.addressLine1
		? localAddress.value.addressLine1
		: '599 Deep Woods Dr.'
	localAddress.value.city = localAddress.value.city ? localAddress.value.city : 'Aurora'
	localAddress.value.postalCode = localAddress.value.postalCode ? localAddress.value.postalCode : '44202'

	const addPhoneNumber = () => {
		if (localCustomer.value.phones.length >= 4)
			return (appMessage.errorMsg = 'You cannot enter more tghan 4 phone number')
		localCustomer.value.phones.push({
			phoneType: '',
			phoneNumber: '',
			phoneCountryCode: '1',
		})
	}

	const checkAddressData = () => {
		if (
			!localAddress.value.name ||
			!localEmail.value ||
			!localAddress.value.addressLine1 ||
			!localAddress.value.city ||
			!localAddress.value.postalCode
		)
			return false
		return true
	}

	const emitUpdate = () => {
		emit('updateAddress', { address: localAddress.value, email: localEmail.value })
		localAddress.value = {}
		localEmail.value = ''
	}

	const cancelAddressUpdate = () => {
		if (checkAddressData()) {
			localAddress.value = props.shippingAddress
			localEmail.value = props.email
		} else {
			localAddress.value = {}
			localEmail.value = ''
		}
		emitUpdate()
	}

	const updateAddress = () => {
		if (!checkAddressData()) return (errorMsg.value = 'name, email, address, city and postal code are required')
		else emitUpdate()
	}
</script>

<template>
	<div class="flex-col">
		<Modal :outerBoxWidth="75" :outerBoxHeight="100" @closeModal="cancelAddressUpdate">
			<template v-slot:header>
				<h3>Address</h3>
			</template>
			<template v-slot:default>
				<div class="flex-col gap-2">
					CT{{}}=======
          {{ localAddress }}
					<p>Mandatory fields are marked with a *</p>
					<section class="flex-col gap-1">
						<div>
							<FormsBaseRadioGroup
								label="My delivery address is"
								v-model="localAddress.addressType"
								:options="[
									{ key: 'Residential', name: 'Residential' },
									{ key: 'Commercial', name: 'Commercial' },
								]"
							/>
						</div>
						<div class="flex-row items-center gap-2">
							<div class="min-w-20">
								<FormsBaseSelect
									label="Title"
									v-model="localAddress.title"
									:options="[
										{ key: 'Mr/Ms', name: 'Mr/Ms' },
										{ key: 'Ms', name: 'Ms' },
										{ key: 'Mr', name: 'Mr' },
										{ key: 'Dr', name: 'Dr' },
										{ key: 'Mrs', name: 'Mrs' },
										{ key: '', name: '-' },
									]"
								/>
							</div>
							<div class="flex-1">
								<FormsBaseInput class="flex-1" label="Name" placeholder="Name" v-model="localAddress.name" />
							</div>
						</div>
						<div class="flex-1">
							<FormsBaseInput class="flex-1" label="Email" placeholder="Email" v-model="localEmail" />
						</div>
					</section>
					<section class="flex-col gap-1">
						<div
							class="flex-row gap-2 items-center"
							v-for="(phone, j) in localAddress.phones"
							:key="`phone-number-${j}`"
						>
							<div class="min-w-14">
								<FormsBaseSelect
									label="PhoneType"
									v-model="phone.phoneType"
									:options="[
										{ key: 'Cell', name: 'Cell' },
										{ key: 'Home', name: 'Home' },
										{ key: 'Worrk', name: 'Mr' },
									]"
								/>
							</div>
							<div class="min-w-20">
								<FormsBaseInput label="Phone Number" placeholder="Phone Number" v-model="phone.phoneNumber" />
							</div>
							<div class="flex-1">
								<label class="base-select">
									<div class="label text-xs px-1">Country Code</div>
									<select
										@change="
											localAddress.phones[j].phoneCountryCode = countries.find((c) => c._id == $event.target.value)
										"
									>
										<!-- <option value="">Country Code</option> -->
										<option
											v-for="country in countries"
											:key="country._id"
											:value="country._id"
											:selected="localAddress.phones[j].phoneCountryCode._id == country._id"
										>
											{{ country.countryName }}
										</option>
									</select>
								</label>
							</div>
							<button
								class="btn btn__secondary"
								@click="localAddress.phones.splice(j, 1)"
								v-if="localAddress.phones.length > 1"
							>
								<IconsMinus />
							</button>
						</div>
						<button
							class="btn btn__secondary items-self-end px-2 py-05"
							@click="addPhoneNumber"
							:disabled="localAddress.phones.length >= 4"
						>
							Add Phone Number
						</button>
					</section>
					<section>
						<FormsBaseInput label="Company" placeholder="Company" v-model="localAddress.company" />
						<div class="flex-row gap-2">
							<div class="flex-1">
								<FormsBaseInput
									label="Address Line 1"
									placeholder="Address Line 1"
									v-model="localAddress.addressLine1"
								/>
							</div>
							<div class="flex-1">
								<FormsBaseInput
									label="Address Line 2"
									placeholder="Address Line 2"
									v-model="localAddress.addressLine2"
								/>
							</div>
						</div>
						<div class="flex-row gap-2 items-center">
							<div class="flex-1">
								<FormsBaseInput label="City" placeholder="City" v-model="localAddress.city" />
							</div>
							<div class="flex-1">
								<label class="base-select">
									<div class="label text-xs px-1">State</div>
									<select @change="localAddress.state = states.find((s) => s._id == $event.target.value)">
										<!-- <option value="">State</option> -->
										<option
											v-for="state in states"
											:key="state._id"
											:value="state._id"
											:selected="localAddress.state._id == state._id"
										>
											{{ state.abbreviation }}
										</option>
									</select>
								</label>
							</div>
						</div>
						<div class="flex-row items-center gap-2">
							<div class="min-w-20">
								<FormsBaseInput label="Postal Code" placeholder="Postal Code" v-model="localAddress.postalCode" />
							</div>
							<div class="flex-1">
								<label class="base-select">
									<div class="label text-xs px-1">Country</div>
									<select @change="localAddress.country = countries.find((c) => c._id == $event.target.value)">
										<!-- <option value="">Country Code</option> -->
										<option
											v-for="country in countries"
											:key="country._id"
											:value="country._id"
											:selected="localAddress.country._id == country._id"
										>
											{{ country.countryName }}
										</option>
									</select>
								</label>
							</div>
						</div>
					</section>
					<section class="delivery-instructions">
						<div class="field-group">
							<FormsBaseTextarea label="Delivery Instructions" rows="5" v-model="localAddress.deliveryInstructions" />
						</div>
					</section>
					<section class="items-self-start">
						<FormsBaseToggle label="Set as the default delivery address" v-model="localAddress.isDefault" />
					</section>
				</div>
			</template>
			<template v-slot:footer>
				<section class="flex-row gap-2 justify-end px-3">
					<button class="btn btn__secondary px-2 py-1" @click="cancelAddressUpdate">Cancel</button>
					<button class="btn btn__primary px-2 py-1" @click="updateAddress">Save Address</button>
				</section>
			</template>
		</Modal>
	</div>
</template>

<style lang="scss" scoped></style>
