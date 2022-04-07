<script setup>
const { cart } = useCart()

onMounted(async () => {
  console.log(cart.value)
})
</script>

<template>
  <div class="secure w-full flex-1 bg-slate-900 flex-col items-center gap-1">
    <div class="content flex-row items-start gap-2 w-996p">
      <EcommerceCheckoutSteps :step="2" activeColor="#16a34a" />
    </div>
    <ClientOnly>
      <div class="gap-2 w-996p flex-row justify-center gap-2">
        <div class="main flex-1 bg-slate-50 border-red">
          <div class="">
            <div class="bg-stone-300 p-1">Shipping Addresses</div>
            <div
              class="flex-col gap-05 p-2"
              v-for="(shippingAddress, index) in cart.customer.shippingAddresses"
              :key="`address-${index}`"
            >
              <div>{{ shippingAddress.address }}</div>
              <div>{{ shippingAddress.city }}, {{ shippingAddress.state }} {{ shippingAddress.postalCode }}</div>
              <div>{{ shippingAddress.country }}</div>
              <button class="btn btn__secondary px-2 py-1 items-self-end" @click="handleAddAddressBtnClick">
                Add Address
              </button>
              <!-- <div class="addresses" v-if="cart.customer.shippingAddresses">
                <div class="address" v-for="(address, i) in cart.customer.shippingAddresses" :key="`address-${i}`">
                  <div class="default-status">
                    <FormsBaseRadio
                      v-model="cart.customer.shippingAddresses[i].default"
                      :value="true"
                      @update:modelValue="setDefaultAddress(i)"
                    />
                  </div>
                  <div class="details">
                    <div class="name">{{ address.name || cart.customer.name }}</div>
                    <div class="street">{{ address.address }}</div>
                    <div class="city-state-postalCode">
                      <span class="city">{{ address.city }}</span>
                      <span class="state">{{ address.state }}</span
                      >&nbsp;
                      <span class="postal-code">{{ address.postalCode }}</span>
                    </div>
                  </div>
                  <button class="btn btn-secondary edit-address" @click="handleEditAddressBtnClick(i)">
                    Edit Address
                  </button>
                  <Modal v-if="showAddressModalKeys[i]" :outerBoxWidth="75" :outerBoxHeight="100">
                    <template v-slot:header>
                      <h3>Address</h3>
                      <p>Mandatory fields are marked with a *</p>
                    </template>
                    <template v-slot:default>
                      <div class="shipping-address-popup-main">
                        {{ cart.customer }}
                        <section>
                          <div class="field-group">
                            <FormsBaseRadioGroup
                              label="My delivery address is"
                              v-model="cart.customer.shippingAddresses[i].addressType"
                              :options="[
                                { key: 'Residential', name: 'Residential' },
                                { key: 'Commercial', name: 'Commercial' },
                              ]"
                            />
                          </div>
                          <div class="field-group">
                            <FormsBaseSelect
                              label="Title"
                              v-model="cart.customer.shippingAddresses[i].title"
                              :options="[
                                { key: 'Mr/Ms', name: 'Mr/Ms' },
                                { key: 'Ms', name: 'Ms' },
                                { key: 'Mr', name: 'Mr' },
                                { key: 'Dr', name: 'Dr' },
                                { key: 'Mrs', name: 'Mrs' },
                                { key: '', name: '-' },
                              ]"
                            />
                            <FormsBaseInput
                              label="Name"
                              placeholder="Name"
                              v-model="cart.customer.shippingAddresses[i].name"
                            />
                          </div>
                          <div class="field-group"></div>
                        </section>
                        <section class="phone-numbers">
                          <div
                            class="field-group"
                            v-for="(phoneNumber, j) in cart.customer.phones"
                            :key="`phone-number-${j}`"
                          >
                            <div class="phone-number">
                              <FormsBaseInput
                                label="Phone Number"
                                placeholder="Phone Number"
                                v-model="cart.customer.phones[j].phoneNumber"
                              />
                            </div>
                            <div class="phone-type">
                              <FormsBaseSelect
                                label="PhoneType"
                                v-model="cart.customer.phones[j].phoneType"
                                :options="[
                                  { key: 'Cell', name: 'Cell' },
                                  { key: 'Home', name: 'Home' },
                                  { key: 'Worrk', name: 'Mr' },
                                ]"
                              />
                            </div>

                            <div class="phone-country-code">
                              <FormsBaseSelect
                                label="Country Code"
                                v-model="cart.customer.phones[j].phoneCountryCode"
                                :options="
                                  countryData.map((el) => {
                                    return { key: el.phone_code, name: el.country_name }
                                  })
                                "
                              />
                            </div>

                            <button
                              class="btn btn-secondary remove-phone-number"
                              @click="handleRemovePhoneNumberBtnClick(i)"
                              v-if="cart.customer.phones.length > 1"
                            >
                              <IconsMinus />
                            </button>
                          </div>
                          <button
                            class="btn btn-secondary add-phone-number"
                            @click="handleAddPhoneNumberBtnClick"
                            :disabled="cart.customer.phones.length >= 4"
                          >
                            Add Phone Number
                          </button>
                        </section>
                        <section>
                          <FormsBaseInput
                            label="Address"
                            placeholder="Address"
                            v-model="cart.customer.shippingAddresses[i].address"
                          />
                          <div class="field-group">
                            <FormsBaseInput
                              label="City"
                              placeholder="City"
                              v-model="cart.customer.shippingAddresses[i].city"
                            />
                            <FormsBaseSelect
                              label="State"
                              v-model="cart.customer.shippingAddresses[i].state"
                              :options="
                                stateData.map((el) => {
                                  return { key: el.abbreviation, name: el.name }
                                })
                              "
                            />
                          </div>
                          <div class="field-group">
                            <FormsBaseInput
                              label="Postal Code"
                              placeholder="Postal Code"
                              v-model="cart.customer.shippingAddresses[i].postalCode"
                            />
                            <FormsBaseSelect
                              label="Country"
                              v-model="cart.customer.shippingAddresses[i].country"
                              :options="
                                countryData.map((el) => {
                                  return { key: el.three_letter_country_code, name: el.country_name }
                                })
                              "
                            />
                          </div>
                        </section>
                        <section class="delivery-instructions">
                          <div class="field-group">
                            <FormsBaseTextarea
                              label="Delivery Instructions"
                              rows="5"
                              v-model="cart.customer.shippingAddresses[i].deliveryInstructions"
                            />
                          </div>
                        </section>
                        <section>
                          <FormsBaseToggle
                            label="Set as the default delivery address"
                            v-model="cart.customer.shippingAddresses[i].default"
                            @update:modelValue="setDefaultAddress(i)"
                          />
                        </section>
                      </div>
                    </template>
                    <template v-slot:footer>
                      <section class="actions">
                        <button class="btn btn-secondary cancel" @click="cancelCustomerShippingAddress(i)">
                          Cancel
                        </button>
                        <button class="btn btn-primary" @click="updateCustomerShippingAddress(i)">Save Address</button>
                      </section>
                    </template>
                  </Modal>
                </div>
              </div> -->
            </div>
            <div class="customer-address"></div>
          </div>
        </div>
        <div class="aside bg-slate-50 border-pink w-32">Aside</div>
      </div>
    </ClientOnly>
    -->
  </div>
</template>

<style lang="scss" scoped></style>
