interface MenuItem {
  id: number;
  name: string;
  detail: string;
  tag: string[];
  colorMeshName: string;
  color: Color[];
  pop: Pop;
  features: Feature[];
  model: string;
  image: string;
  scale: number[];
  rotation: number[];
  position: number[];
  cameraPos: number[];
  modelHeight: number;
}

interface Color {
  text: string;
  value: string;
  id: string;
  src: string;
}

interface Feature {
  name: string;
  clipName: string;
}

interface Pop {
  title: string;
  content: string;
  media?: string;
}
