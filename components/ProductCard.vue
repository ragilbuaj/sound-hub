<template>
  <div
    v-if="product"
    class="card card-compact product-card h-full max-h-72 bg-neutral-300 w-full shadow-xl lg:hover:scale-105 lg:hover:transition-all lg:hover:ease-in-out"
  >
    <figure
      @click="handleClickProduct($props.productId)"
      class="cursor-pointer h-max max-h-28 md:max-h-32"
    >
      <img
        :src="
          route.path == '/'
            ? product.product_image_url
            : product.product.product_image_url
        "
        :alt="
          route.path == '/'
            ? product.name + 'image'
            : product.product.name + 'image'
        "
      />
    </figure>
    <div class="card-body text-gray-900">
      <h2
        class="card-title text-base cursor-pointer"
        @click="handleClickProduct($props.productId)"
      >
        {{ route.path == "/" ? product.name : product.product.name }}
      </h2>
      <p class="cursor-pointer" @click="handleClickProduct($props.productId)">
        {{
          route.path == "/"
            ? `Rp${formatUang(product.price)}`
            : `Rp${formatUang(product.product.price)}`
        }}
      </p>
      <div class="card-actions justify-end">
        <button type="button" @click="handleChangeWishList()">
          <svg
            v-if="!isWishList"
            class="w-8 h-8 text-[#FF56A5] lg:w-7 lg:h-7"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
            />
          </svg>

          <svg
            v-else
            class="w-8 h-8 text-[#FF56A5] lg:w-7 lg:h-7"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  productId: string;
  productIndex: any;
}

const props = defineProps<Props>();
const route = useRoute();
const useAuthStore = authStore();
const useWishlistStore = wishlistStore();
const useSearchStore = searchStore();

let store: any;

if (route.path == "/") {
  store = productStore();
} else if (route.path == "/wishlist") {
  store = wishlistStore();
}

const product = computed(() => {
  if (route.path == "/") {
    return store.datas?.find(
      (product: Product) => product.id === props.productId
    );
  } else if (route.path == "/wishlist") {
    return store.datas.find(
      (wishlist: Wishlist) => wishlist.product?.id === props.productId
    );
  }
});

const isWishList = computed(() => {
  if (route.path == "/") {
    return product.value?.wishlist?.some(
      (item: Wishlist) => item.user_id == useAuthStore.authData.user_id
    );
  } else {
    return true;
  }
});

const handleChangeWishList = async () => {
  if (useAuthStore.authData.user_id.length <= 0) {
    const modal = document.getElementById(
      "modal-login"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
    return;
  }

  if (isWishList.value) {
    if (route.path == "/") {
      try {
        const wishlist = product.value?.wishlist?.find(
          (item: Wishlist) => item.user_id == useAuthStore.authData.user_id
        );

        const data = await useWishlistStore.deleteWishlist(wishlist.id);

        if (data) {
          store.datas[props.productIndex].wishlist = store.datas[
            props.productIndex
          ]?.wishlist?.filter((item: Wishlist) => {
            item.id !== wishlist.id;
          });

          productStore().showToast = true;
          productStore().messageToast = "Product dropped from wishlist";
          productStore().changesToast = "delete";

          setTimeout(() => {
            productStore().showToast = false;
            productStore().messageToast = "";
            productStore().changesToast = "";
          }, 2000);
        }

        if (useSearchStore.isFilter) {
          await refreshNuxtData("filter-products");
        } else {
          await refreshNuxtData("products");
        }
      } catch (e) {
        console.log(e);
      }
    } else if (route.path == "/wishlist") {
      try {
        const data = await useWishlistStore.deleteWishlist(product.value?.id);
        if (data) {
          useWishlistStore.datas = useWishlistStore.datas?.filter(
            (item: any) => {
              item.product.id !== product.value?.id;
            }
          );

          productStore().showToast = true;
          productStore().messageToast = "Product dropped from wishlist";
          productStore().changesToast = "delete";

          setTimeout(() => {
            productStore().showToast = false;
            productStore().messageToast = "";
            productStore().changesToast = "";
          }, 2000);
        }
      } catch (e) {
        console.log(e);
      }
    }
  } else {
    try {
      const data = await useWishlistStore.addWishlist({
        user_id: useAuthStore.authData.user_id as string,
        product_id: product.value?.id as string,
      });

      if (route.path == "/" && data) {
        store.datas[props.productIndex].wishlist.push({
          id: data.id as string,
          user_id: useAuthStore.authData.user_id as string,
        });

        store.showToast = true;
        store.messageToast = "Product added to wishlist";
        store.changesToast = "add";

        setTimeout(() => {
          store.showToast = false;
          store.messageToast = "";
          store.changesToast = "";
        }, 2000);
      }

      await refreshNuxtData("products");
    } catch (e) {
      console.log(e);
    }
  }
};

const handleClickProduct = (id: string) => {
  navigateTo(`/product/${id}`);
};
</script>
