<script setup lang="ts">
const props = defineProps<{
    item: MenuItem
}>()
</script>

<template>
    <div class="menu-item">
        <div class="menu-item__media">

        </div>
        <div class="menu-item__desc">
            <span class="name">{{ item.name }}</span>
            <span class="tags">
                <span class="tag" v-for="tag in item.tag" :key="tag">{{ tag }}</span>
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.menu-item {
    width: 351px;
    height: 294px;
    border: 1px solid #45464E;
    margin-bottom: 12px;
    padding: 12px;
    color: #fff;

    >.menu-item__media {
        width: 100%;
        height: 230px;
        margin-bottom: 20px;
    }

    >.menu-item__desc {
        display: flex;
        justify-content: space-between;

        >.name {
            height: 20px;
            font-size: 14px;
            font-family: Archivo-Regular, Archivo;
            line-height: 20px;
        }

        >.tags {
            display: flex;

            >.tag {
                width: 54px;
                height: 19px;
                background: rgba(255, 255, 255, 0.18);
                border-radius: 37px;
                font-size: 11px;
                font-family: Archivo-Regular, Archivo;
                font-weight: 400;
                line-height: 19px;
                text-align: center;
                margin-left: 8px;
            }
        }
    }
}
</style>