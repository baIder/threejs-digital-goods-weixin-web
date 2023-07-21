<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const props = defineProps<{
    item: MenuItem
}>()

const renderTarget = ref<HTMLCanvasElement>()

onMounted(() => {
    const width = renderTarget.value!.clientWidth
    const height = renderTarget.value!.clientHeight

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    const [x, y, z] = props.item.cameraPos
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas: renderTarget.value, antialias: true });
    renderer.setClearColor("#121521");
    renderer.setSize(width * 2, height * 2, false);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const light = new THREE.AmbientLight(0x404040, 10);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.rotation.set(40, 70, 0)
    scene.add(directionalLight);

    const renderScene = () => {
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
    }

    const loader = new GLTFLoader();
    loader.load(props.item.model, (gltf) => {
        const model = gltf.scene;
        model.position.set(0, -props.item.modelHeight / 2, 0)
        model.scale.set(props.item.scale[0], props.item.scale[1], props.item.scale[2])
        scene.add(model);

        renderScene()
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