<script setup lang="ts">
import MenuItem from "@/components/MenuItem.vue";
import { mockData } from "@/mock/data"

</script>

<template>
  <div class="content">
    <MenuItem v-for="item in mockData" :item="item" :key="item.id" />
  </div>
</template>

<style scoped lang="scss">
.content {
  width: 375px;
}
</style>
