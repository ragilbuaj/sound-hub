<template>
  <div class="dropdown dropdown-end self-end h-max lg:mt-10 pr-2">
    <div tabindex="0" role="button">
      <button
        class="btn btn-sm bg-neutral-300 text-gray-900 stroke-black hover:text-white focus:bg-gray-900 hover:stroke-white"
      >
        <svg
          class="h-4 w-4"
          viewBox="0 0 32 32"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.241 7.646 13 19v9l6-4v-5l9.759-11.354c.556-.65.089-1.646-.773-1.646H4.014c-.862 0-1.329.996-.773 1.646z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
          />
        </svg>
        Filter
      </button>
    </div>
    <ul
      tabindex="0"
      class="dropdown-content menu bg-neutral-300 text-gray-900 rounded-box z-[1] w-52 p-0 shadow"
    >
      <li>
        <h2 class="menu-title text-gray-900">Filters</h2>
      </li>
      <li class="w-full hover:bg-neutral-300 focus:bg-neutral-300">
        <h3>Select brand</h3>
        <InputSelect
          :for="'brand'"
          :placeholder="'select brand'"
          :model="useSearchStore.filter.brand"
          :is-required="false"
          @update="handleChangeSelect($event, 'brand')"
        />
      </li>
      <li
        class="w-full flex flex-col hover:bg-neutral-300 focus:bg-neutral-300"
      >
        <h3>Price range</h3>
        <InputText
          :for="'minPrice'"
          :placeholder="'minimum price'"
          :model="useSearchStore.filter.minPrice"
          :is-number="true"
          :is-required="false"
          @input="handleInputText($event, 'minPrice')"
        />
        <h3 class="self-center">to</h3>
        <InputText
          :for="'maxPrice'"
          :placeholder="'maximum price'"
          :model="useSearchStore.filter.maxPrice"
          :is-number="true"
          :is-required="false"
          @input="handleInputText($event, 'maxPrice')"
        />
      </li>
      <li
        class="w-full flex flex-col hover:bg-neutral-300 focus:bg-neutral-300"
      >
        <h3>Year release</h3>
        <InputSelect
          :for="'year'"
          :placeholder="'select year'"
          :model="useSearchStore.filter.year"
          :is-required="false"
          @update="handleChangeSelect($event, 'year')"
        />
      </li>
      <li
        class="w-full flex flex-col hover:bg-neutral-300 focus:bg-neutral-300 active:bg-neutral-300"
      >
        <div class="w-full flex justify-between">
          <button
            type="button"
            class="btn btn-sm text-white bg-black"
            @click="handleClickClear()"
          >
            Clear
          </button>
          <button
            type="button"
            class="btn btn-sm text-white bg-[#6d31edff]"
            @click="handleClickFilter()"
          >
            Filter
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const useSearchStore = searchStore();

const handleInputText = (e: string, model: string) => {
  if (model == "minPrice") {
    useSearchStore.filter.minPrice = Number(removeNonDigits(e));
  } else if (model == "maxPrice") {
    useSearchStore.filter.maxPrice = Number(removeNonDigits(e));
  }
};

const handleChangeSelect = (e: string, model: string) => {
  if (model == "brand") {
    useSearchStore.filter.brand = e;
  } else if (model == "year") {
    useSearchStore.filter.year = e;
  }
};

const handleClickFilter = async () => {
  await useSearchStore.filterProductsByName();
};

const handleClickClear = () => {
  useSearchStore.resetFilter();
};
</script>
