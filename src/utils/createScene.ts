import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export const useCreateScene = (options: {
  target: HTMLCanvasElement;
  item: MenuItem;
}) => {
  return new Promise<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    molGLTF: THREE.Group;
  }>((resolve) => {
    const { target, item } = options;
    const width = target.clientWidth;
    const height = target.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    const [x, y, z] = item.cameraPos;
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: target,
      antialias: true,
    });
    renderer.setClearColor("#ffffff", 0);
    renderer.setSize(width * 2, height * 2, false);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const light = new THREE.AmbientLight(0x404040, 1);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.rotation.set(40, 70, 0);
    scene.add(directionalLight);

    const renderScene = () => {
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    };

    const loader = new GLTFLoader();
    let molGLTF = {} as THREE.Group;
    loader.load(item.model, (gltf) => {
      molGLTF = gltf.scene;
      molGLTF.position.set(
        item.position[0],
        -item.modelHeight / 2,
        item.position[2]
      );
      molGLTF.rotation.set(
        item.rotation[0],
        item.rotation[1],
        item.rotation[2]
      );
      molGLTF.scale.set(item.scale[0], item.scale[1], item.scale[2]);
      scene.add(molGLTF);

      resolve({
        scene,
        camera,
        renderer,
        controls,
        molGLTF,
      });
      renderScene();
    });
  });
};
