import * as THREE from "three";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class ThreeScene {
  target: HTMLCanvasElement;
  item: MenuItem;
  scene: THREE.Scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  gltf?: GLTF;
  isPlaying: boolean = false;

  constructor(options: { target: HTMLCanvasElement; item: MenuItem }) {
    this.target = options.target;
    this.item = options.item;
    const width = this.target.clientWidth;
    const height = this.target.clientHeight;

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    const [x, y, z] = this.item.cameraPos;
    this.camera.position.set(x, y, z);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.target,
      antialias: true,
    });
    this.renderer.setClearColor("#ffffff", 0);
    this.renderer.setSize(width * 2, height * 2, false);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.update();

    const light = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.rotation.set(40, 70, 0);
    this.scene.add(directionalLight);

    const renderScene = () => {
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        this.renderer.render(this.scene, this.camera);
      };
      animate();
    };

    this.gltf = undefined;
    const loader = new GLTFLoader();
    loader.load(this.item.model, (gltf) => {
      this.gltf = gltf;
      const model = gltf.scene;
      model.position.set(
        this.item.position[0],
        -this.item.modelHeight / 2,
        this.item.position[2]
      );
      model.rotation.set(
        this.item.rotation[0],
        this.item.rotation[1],
        this.item.rotation[2]
      );
      model.scale.set(
        this.item.scale[0],
        this.item.scale[1],
        this.item.scale[2]
      );
      this.scene.add(model);

      renderScene();
    });
  }

  playClip(clipName: string) {
    if (!this.gltf) return;
    if (this.isPlaying) return;
    const model = this.gltf.scene;
    const animations = this.gltf.animations;
    const mixer = new THREE.AnimationMixer(model);
    const clip = animations.filter((i) => (i.name = clipName))![0];
    const action = mixer.clipAction(clip);
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    action.play();
    mixer.addEventListener("finished", () => {
      this.isPlaying = false;
    });
    this.isPlaying = true;

    const clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();
      mixer.update(delta);
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(animate);
    };

    animate();
  }

  changeColor(path: string) {
    if (!this.gltf) return;
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(path, (texture) => {
      this.gltf!.scene.traverse((node) => {
        if (
          (node as THREE.Mesh).isMesh &&
          node.name === this.item.colorMeshName
        ) {
          //@ts-ignore
          node.material.map = texture;
          //@ts-ignore
          node.material.needsUpdate = true;
        }
      });
    });
  }

  resetCamera() {
    this.camera.position.set(
      this.item.cameraPos[0],
      this.item.cameraPos[1],
      this.item.cameraPos[2]
    );
  }
}
