<script setup lang="ts">
import { useMainStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const store = useMainStore()
const { currentItem: item } = storeToRefs(store)
const renderTarget = ref<HTMLCanvasElement>()

onMounted(() => {
    const width = renderTarget.value!.clientWidth
    const height = renderTarget.value!.clientHeight

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    const [x, y, z] = item.value!.cameraPos
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas: renderTarget.value, antialias: true });
    renderer.setClearColor("#ffffff", 0);
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
    loader.load(item.value!.model, (gltf) => {
        const model = gltf.scene;
        model.position.set(item.value!.position[0], -item.value!.modelHeight / 2, item.value!.position[2])
        model.rotation.set(item.value!.rotation[0], item.value!.rotation[1], item.value!.rotation[2])
        model.scale.set(item.value!.scale[0], item.value!.scale[1], item.value!.scale[2])
        scene.add(model);

        renderScene()
    });
})
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

    canvas {
        width: 100%;
        height: 100%;
    }

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