<script setup lang="ts">
import { useMainStore } from '@/stores';
import { storeToRefs } from 'pinia';

const store = useMainStore()
const { currentItem: item } = storeToRefs(store)
</script>

<template>
    <div class="container">
        <header>
            <div class="title">{{ item?.name }}</div>
            <div class="desc">{{ item?.detail }}</div>
        </header>
        <section class="modelContainer">
            <canvas ref="renderTarget" />
            <div class="colors">
                <div class="color" :class="idx === 0 ? 'active' : ''" v-for="(i, idx) in item?.color" :key="i.id">
                    <span :style="{ backgroundColor: i.value }" />
                    {{ i.text }}
                </div>
            </div>
            <div class="features">
                <div class="feature active">外观</div>
                <div class="feature" v-for="i in item?.features" :key="i.clipName">{{ i.name }}</div>
                <div class="feature">其他热点</div>
            </div>
            <div class="reset">
                <img src="@/assets/reset.png" alt="">
                <span>复位</span>
            </div>
        </section>
        <footer>
            <div class="tab">
                <img src="@/assets/AR.png" alt="">
                <span>AR体验</span>
            </div>
            <div class="tab active">
                <img src="@/assets/3D.png" alt="">
                <span>3D演示</span>
            </div>
        </footer>
    </div>
</template>

<style scoped lang="scss">
.modelContainer {
    flex-grow: 1;
    position: relative;

    .colors {
        width: 100%;
        position: absolute;
        bottom: 18px;
        display: flex;
        justify-content: center;
        gap: 18px;

        >.color {
            width: 80px;
            height: 30px;
            background: rgba(255, 255, 255, 0.13);
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 13px;
            color: #fff;

            span {
                width: 12px;
                height: 12px;
                margin-right: 10px;
            }

            &.active {
                border: 1px solid rgba(255, 255, 255, 0.5);
            }
        }
    }

    .features {
        position: absolute;
        right: 0;
        bottom: 200px;

        >.feature {
            width: 88px;
            height: 36px;
            background: rgba(255, 255, 255, 0.12);
            border-radius: 20px 0px 0px 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 16px;
            font-size: 14px;
            color: #FFFFFF;
            transition: all 250ms;

            &.active {
                background: #00BB31;
                box-shadow: 0px 8px 17px 0px rgba(0, 0, 0, 0.25);
            }
        }
    }

    .reset {
        position: absolute;
        bottom: 100px;
        right: 11px;
        display: flex;
        flex-direction: column;
        align-items: center;

        >img {
            width: 40px;
            height: 40px;
            margin-bottom: 5px;
        }

        >span {
            width: 24px;
            height: 17px;
            font-size: 12px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 14px;
            text-shadow: 0px 8px 8px rgba(0, 0, 0, 0.42);
        }
    }
}

header {
    width: 100%;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    font-family: Archivo-Regular, Archivo;
    padding-left: 20px;
    padding-top: 14px;

    >.title {
        width: 171px;
        height: 22px;
        font-size: 16px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 22px;
        margin-bottom: 8px;
    }

    >.desc {
        width: 171px;
        height: 18px;
        font-size: 13px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.8);
        line-height: 18px;
    }
}

footer {
    width: 100%;
    height: 90px;
    background: rgba(0, 0, 0, 0.26);
    display: flex;
    justify-content: space-around;
    padding-top: 8px;

    >.tab {
        display: flex;
        flex-direction: column;
        align-items: center;

        >img {
            width: 24px;
            height: 24px;
        }

        >span {
            width: 41px;
            height: 17px;
            font-size: 12px;
            font-family: Archivo-Regular, Archivo;
            font-weight: 400;
            color: #CCCCCC;
            line-height: 17px;
        }

        &.active {
            >img {
                width: 30px;
                height: 30px;
            }
        }
    }
}

.container {
    width: 100%;
    height: 100%;
    background: linear-gradient(220deg, #3A3B43 0%, #535355 100%);
    display: flex;
    flex-direction: column;
}
</style>