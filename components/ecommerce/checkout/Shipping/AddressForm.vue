<script setup>
	import cloneDeep from 'lodash.clonedeep'

	const props = defineProps({
		address: {
			type: Object,
			required: true,
		},
		email: {
			type: String,
		},
		showDefaultToggleField: {
			type: Boolean,
			default: false,
		},
	})

	const emit = defineEmits(['updateAddress', 'updateEmail'])
	const countries = inject('countries')
	const states = inject('states')
	const localAddress = ref({})
	const localEmail = ref('')

	localAddress.value = cloneDeep(props.address)
	localEmail.value = props.email

	watch(
		() => localAddress.value,
		(newVal) => {
			emit('updateAddress', newVal)
		},
		{ deep: true }
	)

	watch(
		() => localEmail.value,
		(newVal) => {
			console.log(newVal)
			emit('updateEmail', newVal)
		}
	)
</script>

<template>
	<div class="flex-col">
		<div class="flex-col gap-2">
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
				<div class="flex-row gap-2 items-center" v-for="(phone, j) in localAddress.phones" :key="`phone-number-${j}`">
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
								@change="localAddress.phones[j].phoneCountryCode = countries.find((c) => c._id == $event.target.value)"
							>
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
						<FormsBaseInput label="Address Line 1" placeholder="Address Line 1" v-model="localAddress.addressLine1" />
					</div>
					<div class="flex-1">
						<FormsBaseInput label="Address Line 2" placeholder="Address Line 2" v-model="localAddress.addressLine2" />
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
			<section class="items-self-start" v-if="showDefaultToggleField">
				<FormsBaseToggle label="Set as the default delivery address" v-model="localAddress.isDefault" />
			</section>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
