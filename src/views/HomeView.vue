<script setup lang="ts">
import MenuItem from "@/components/MenuItem.vue";
import { mockData } from "@/mock/data"
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/";

const router = useRouter()
const store = useMainStore()

const goDetail = (item: MenuItem) => {
  store.currentItem = item
  router.push({ name: 'detail', })
}
</script>

<template>
  <div class="content">
    <MenuItem v-for="item in mockData" :item="item" :key="item.id" @click="goDetail(item)" />
  </div>
</template>

<style scoped lang="scss">
.content {
  width: 375px;
  padding: 12px;
}
</style>
