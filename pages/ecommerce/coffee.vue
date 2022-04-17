<script setup>
useMeta({
  title: 'Coffee | YRL',
})
definePageMeta({
  // layout: 'checkout',
})
// const { fetchAll } = useProduct()
const { fetchAll } = useHttp()
const products = ref([])
const totalCount = ref(null) // Total item count in the database

const route = useRoute()
const page = ref(1)
const perPage = ref(10)
const selectedCategories = ref('')
const timer = ref(null)
const slides = ref(['/assets/vday-d-3.webp', '/assets/dott-baristatray-choco.webp'])
const heroBgImage = computed(() =>
  route.name === 'ecommerce-coffee' ? '/assets/hero-original.webp' : '/assets/hero-virtuo.webp'
)

const response = await fetchAll('products', { 'price[gt]': '0' })
// console.log(response)
products.value = response.docs
totalCount.value = response.totalCount
// console.log(route.name)

// const response = await fetchAll()
// console.log(response)
// const pages = computed(() =>
// 	state.totalItemCount % perPage.value
// 		? parseInt(state.totalItemCount / perPage.value) + 1
// 		: parseInt(state.totalItemCount / perPage.value)
// )
// state.query.fields = 'name,slug,price'
// state.query.page = 1
// state.query.limit = perPage.value
// state.query.populate = 'featuredImage categories'
// state.sort.field = 'createdAt'
// state.sort.order = '-'
// state.query.sort = `${state.sort.order}${state.sort.field}`
// await Promise.all([actions.fetchAll(), actions.fetchCount()])
const setPage = async (currentPage) => {
  // console.log(currentPage)
  // state.query.page = currentPage
  // await actions.fetchAll()
}
const handleSearch = async () => {
  // await actions.fetchAll()
}
// watch(
//   () => selectedCategories.value,
//   async (newVal) => {
//     if (newVal) {
//       console.log(newVal)
//       filters.categories = selectedCategories.value
//     } else {
//       delete filters.categories
//     }
//   }
// )
// watch(
//   () => price,
//   async (newVal) => {
//     filters['price[gte]'] = newVal.min || '0'
//     filters['price[lte]'] = newVal.max || '0'
//   },
//   { deep: true }
// )
// watch(
//   () => filters,
//   async (newVal) => {
//     if (timer.value) {
//       clearTimeout(timer.value)
//     }
//     timer.value = setTimeout(async () => {
//       await Promise.all([await actions.fetchAll(filters), await actions.fetchCount(filters)])
//     }, 500)
//   },
//   { deep: true }
// )
</script>

<template>
  <div class="oroginal-coffee-pods">
    <section class="offers-carousel">
      <Carousel :slides="slides" indicators controls interval="5" height="10" />
    </section>
    <EcommerceProductsHero />
    <EcommerceProductsFiltersAndViews />
    <!-- <div v-if="products.length" class="main"> -->
    <!-- <div class="content shadow-md"> -->
    <EcommerceProductsList :products="products" />
    <!-- </div> -->
    <!-- </div> -->
    <!-- <div v-else class="no-products shadow-md">
      <div class="inner">
        <h3 class="">Add your first physical or digital product</h3>
        <div class="">Add your roduct and variants. Products must have at least a name and a price</div>
        <NuxtLink class="link" :to="{ name: 'index', params: { slug: ' ' } }">
          <button class="btn btn-primary">
            <IconsPlus />
            <span>Add</span>
          </button>
        </NuxtLink>
      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
.oroginal-coffee-pods {
  min-height: 100%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .offers-carousel {
    width: 996px;
    background-color: white;
  }
  .hero {
    position: relative;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    height: auto;
    min-height: 40rem;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem 3rem;
    padding: 0 3rem;
    color: $slate-50;
    .links {
      display: flex;
      align-items: center;
      .btn {
        background-color: $slate-50;
        color: $slate-800;
        border-radius: 5px;
        padding: 1rem 2rem;
        font-size: 1.2rem;
        letter-spacing: 0.2rem;
        svg {
          // width: 4rem;
          // height: 4rem;
        }
        span {
          opacity: 0.5;
        }
      }
    }
    .content {
      align-self: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      letter-spacing: 0.25rem;
      text-align: center;
      h1 {
        font-size: 5rem;
        letter-spacing: 1rem;
        max-width: 996px;
      }
      .link {
        .btn {
          background-color: transparent;
          border: none;
          font-size: 1.4rem;
          letter-spacing: 0.25rem;
          &:hover {
            color: $slate-300;
          }
        }
      }
    }
    // background-image: url('assets/');
  }
  // padding: 3rem 2rem;
  .main {
    border: 1px solid teal;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      padding: 2rem;
    }
  }
  .no-products {
    height: 92vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .inner {
      gap: 1rem;
      border: 1px solid $slate-200;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      transform: translateY(-50%);
      background-color: White;
      padding: 4rem;
      border-radius: 5px;
      .link {
        align-self: flex-end;
      }
      // justify-content: center;
      // align-items: center;
      // absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border rounded flex flex-col gap-1 items-start w-84 p-4 space-y-2
    }
  }
  .btn {
    svg {
      fill: $slate-50;
      width: 1.8rem;
      height: 1.8rem;
    }
  }
}
// h-full relative py-6 px-4
</style>
