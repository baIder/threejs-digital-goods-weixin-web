<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const props = defineProps<{
    item: MenuItem
}>()

const renderTarget = ref<HTMLCanvasElement>()

onMounted(() => {

    const scene = new THREE.Scene();

    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ canvas: renderTarget.value });

    const light = new THREE.AmbientLight(0x404040, 2); // 柔和的白光
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load(props.item.model, (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        // 渲染循环
        const animate = () => {
            requestAnimationFrame(animate);

            // 这里可以添加模型的动画或其他操作

            renderer.render(scene, camera);
        };

        animate();
    });

})
</script>

<template>
    <div class="menu-item">
        <div class="menu-item__media">
            <canvas ref="renderTarget"></canvas>
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

        >canvas {
            width: 100%;
            height: 100%;
        }
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