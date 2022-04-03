<script setup>
const showMenuItem1= ref(false)

// const navLinkItems = ref([
//   {
//     title: 'Coffee',
//     icon: 'IconsCoffee',
//     show: false,
//     subMenu: [
//       {
//         title: 'Coffee',
//         image: 'coffee-OLVL-480x480.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//       {
//         title: 'Barista Creations',
//         image: 'nav-caramel.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//       {
//         title: 'Capsule Recycling',
//         image: 'caps-rec.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//       {
//         title: '',
//         content: 'Hello World',
//         image: '2nav-coffee-reedem10.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//     ],
//   },
//   {
//     title: 'Machines',
//     icon: 'IconsCoffeeMaker',
//     show: false,
//     subMenu: [
//       {
//         title: 'Coffee',
//         image: 'Machines-All-02.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//       {
//         title: 'Barista Creations',
//         image: 'nav-caramel.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//       {
//         title: 'Capsule Recycling',
//         image: 'caps-rec.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//       {
//         title: '',
//         content: 'Hello World',
//         image: '2nav-coffee-reedem10.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//     ],
//   },
//   {
//     title: 'Accessories',
//     icon: 'IconsAccessories',
//     show: false,
//     subMenu: [
//       {
//         title: 'Coffee',
//         image: 'coffee-OLVL-480x480.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//       {
//         title: 'Barista Creations',
//         image: 'nav-caramel.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//       {
//         title: 'Capsule Recycling',
//         image: 'caps-rec.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//       {
//         title: '',
//         content: 'Hello World',
//         image: '2nav-coffee-reedem10.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//     ],
//   },
//   {
//     title: 'Recycling',
//     icon: 'IconsRecycling',
//     show: false,
//     subMenu: [
//       {
//         title: 'Coffee',
//         image: 'coffee-OLVL-480x480.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//       {
//         title: 'Barista Creations',
//         image: 'nav-caramel.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//       {
//         title: 'Capsule Recycling',
//         image: 'caps-rec.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//       {
//         title: '',
//         content: 'Hello World',
//         image: '2nav-coffee-reedem10.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//     ],
//   },
//   {
//     title: 'Sustainability',
//     icon: 'IconsSustainability',
//     show: false,
//     subMenu: [
//       {
//         title: 'Coffee',
//         image: 'coffee-OLVL-480x480.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//       {
//         title: 'Barista Creations',
//         image: 'nav-caramel.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//       {
//         title: 'Capsule Recycling',
//         image: 'caps-rec.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//       {
//         title: '',
//         content: 'Hello World',
//         image: '2nav-coffee-reedem10.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//     ],
//   },
//   {
//     title: 'Store Locator',
//     icon: 'IconsLocationPin',
//     show: false,
//     subMenu: [
//       {
//         title: 'Coffee',
//         image: 'coffee-OLVL-480x480.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//       {
//         title: 'Barista Creations',
//         image: 'nav-caramel.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//       {
//         title: 'Capsule Recycling',
//         image: 'caps-rec.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//       {
//         title: '',
//         content: 'Hello World',
//         image: '2nav-coffee-reedem10.webp',
//         link: { title: 'Shop Original Coffee', page: 'index' },
//       },
//     ],
//   },
// ])
</script>

<template>
  <div class="flex-row justify-center bg-slate-700">
    <ul class="items relative flex-row items-center justify-between w-996p">
      <li class="item" @mouseenter="showMenuItem = true" @mouseleave="showMenuItem = false">
        <div class="menu-item">
          <div>Coffee</div>
          <IconsCoffee />
        </div>
        <transition name="dropdown">
          <ul class="submenu shadow-md" v-show="showMenuItem">
            <li class="submenu-item">
              <NuxtLink class="link" :to="{ name: `index` }">
                <div>Coffee</div>
                <img class="" :src="`/assets/coffee-OLVL-480x480.webp`" alt="" />
                <div>Shop Original Coffee</div>
              </NuxtLink>
            </li>
            <li class="submenu-item">
              <NuxtLink class="link" :to="{ name: `index` }">
                <div>Barista Creations</div>
                <img class="" :src="`/assets/nav-caramel.webp`" alt="" />
                <div>Shop Original Coffee</div>
              </NuxtLink>
            </li>
            <li class="submenu-item">
              <NuxtLink class="link" :to="{ name: `index` }">
                <div>Capsule Recycling</div>
                <img class="" :src="`/assets/caps-rec.webp`" alt="" />
                <div>Shop Original Coffee</div>
              </NuxtLink>
            </li>
            <li class="submenu-item">
              <NuxtLink class="link" :to="{ name: `index` }">
                <div>Hello World</div>
                <img class="" :src="`/assets/2nav-coffee-reedem10.webp`" alt="" />
                <div>Shop Original Coffee</div>
              </NuxtLink>
            </li>
          </ul>
        </transition>
      </li>

      <!-- <li
        class="item text-slate-50 cursor-pointer border-x-slate-500 w-full text-center ml--1"
        v-for="(item, index) in navLinkItems"
        :key="item.title"
        @mouseenter="navLinkItems[index].show = true"
        @mouseleave="navLinkItems[index].show = false"
      >
        <div class="menu-item">
          <component :is="item.icon"></component>
          <div>{{ item.title }}</div>
        </div>

        <transition name="dropdown">
          <ul class="submenu shadow-md" v-show="item.show">
            <li class="submenu-item" v-for="subItem in item.subMenu" :key="subItem.title">
              <NuxtLink class="link" :to="{ name: `${subItem.link.page}` }">
                <div>{{ subItem.title }}</div>
                <img class="" :src="`/assets/${subItem.image}`" alt="" />
                <div>{{ subItem.link.title }}</div>
              </NuxtLink>
            </li>
          </ul>
        </transition>
      </li> -->
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.items {
  // position: relative;

  .item {
    // border: 1px solid red;
    cursor: pointer;
    border-right: 1px $slate-500;
    border-left: 1px $slate-500;
    width: 100%;
    margin-right: 1px solid $slate-500;
    transition: all 0.3 ease;

    svg {
      fill: $slate-50;
    }

    &:hover {
      background-color: white;
      color: $slate-800;

      svg {
        fill: $slate-800;
      }
    }

    .menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: $slate-50;
      text-transform: uppercase;
      font-size: 1.2rem;
      font-weight: 600;
      padding: 1rem;

      svg {
        fill: $slate-50;
      }
    }

    .submenu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      color: $slate-800;
      background-color: white;

      .submenu-item {
        border: 1px solid $slate-200;
        border-top: none;
        .link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          padding: 2rem;
        }

        img {
          width: 50%;
          height: 50%;
          object-fit: contain;
        }

        &:last-child {
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
    }
  }
}
</style>
