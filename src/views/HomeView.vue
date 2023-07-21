<script setup lang="ts">
import * as THREE from "three";
import { onMounted, ref } from "vue";

const renderEl = ref<HTMLCanvasElement>();

const init = () => {
  const scene = new THREE.Scene();

  const geometry = new THREE.BoxGeometry(2, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const sizes = {
    width: 800,
    height: 600,
  };

  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
  );
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({
    canvas: renderEl.value,
  });

  renderer.setSize(sizes.width, sizes.height);

  camera.position.z = 2;
  camera.position.y = 0;

  renderer.render(scene, camera);
};

onMounted(() => {
  init();
});
</script>

<template>
  <canvas ref="renderEl"></canvas>
</template>

<style scoped lang="scss"></style>
