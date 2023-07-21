export const mockData: MenuItem[] = [
  {
    id: 1,
    name: "bebebus安全座椅",
    detail: "黄色，红色",
    tag: ["AR体验", "3D动画", "母婴用品"],
    colorMeshName: "GGHAPPY_GGHAPPY406_10054742852379_01",
    color: [
      {
        text: "红色",
        value: "#a33d39",
        id: "red",
        src: "/01red.png",
      },
      {
        text: "蓝色",
        value: "#395b96",
        id: "bbbb",
        src: "/01blue.png",
      },
      {
        text: "绿色",
        value: "#559775",
        id: "black",
        src: "/01green.png",
      },
    ],
    pop: {
      title: "pp环保硬板支撑",
      content: `
        pp环保硬板支撑，呵护新生儿脊椎发育；
        新生儿脊椎未完全发育软靠背无法有效塑形；
        座舱过宽容易让宝宝失去侧面支撑,在推行中产生晃动,伤害到宝宝头部和脊椎。ELTTL推车采用约34cm国际标准坐宽,给宝宝良好的侧面支撑,更好的支撑头部,更适宜新生儿使用。
        `,
      media: "http://192.168.36.2/elittle-pop-image.png",
    },
    features: [
      { name: "360旋转", clipName: "donghua01_GGHAPPY" },
      { name: "正向4档", clipName: "" },
      { name: "反向5档", clipName: "" },
    ],
    model: "/src/assets/models/gghappy.glb",
    image: "http://192.168.36.2/bebebus.png",
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    cameraPos: [0, 1, 2],
    modelHeight: 0.625,
  },
  {
    id: 2,
    name: "婴儿车 ",
    detail: "8+128G",
    tag: ["AR体验", "3C产品"],
    image: "http://192.168.36.2/iphone.png",
    pop: {
      title: "镜头",
      content:
        "手机镜头是现代人生活中必不可少的配件之一。它可以为我们的手机相机带来更多的拍摄可能，让我们的照片更加清晰、鲜明、美丽。手机镜头的种类繁多，有鱼眼镜头、微距镜头、广角镜头等，可以满足你不同的拍摄需求。在旅行、聚会、摄影等场合中，手机镜头可以为你的拍摄增添更多的乐趣和惊喜。",
    },
    features: [
      { name: "结构", clipName: "" },
      { name: "功能", clipName: "" },
      { name: "安全", clipName: "" },
    ],
    colorMeshName: "",
    color: [
      { text: "黄色", value: "#FFD851", id: "yellow", src: "" },
      { text: "红色", value: "#F95555", id: "red", src: "" },
    ],
    model: "/src/assets/models/elittle.glb",
    // model: "http://192.168.36.2/elittle.glb",
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    cameraPos: [0, 1, 2],
    modelHeight: 1,
  },
  {
    id: 3,
    name: "Apple/苹果iPhone 14",
    detail: "8+128G",
    tag: ["AR体验", "3C产品"],
    image: "http://192.168.36.2/iphone.png",
    pop: {
      title: "镜头",
      content:
        "手机镜头是现代人生活中必不可少的配件之一。它可以为我们的手机相机带来更多的拍摄可能，让我们的照片更加清晰、鲜明、美丽。手机镜头的种类繁多，有鱼眼镜头、微距镜头、广角镜头等，可以满足你不同的拍摄需求。在旅行、聚会、摄影等场合中，手机镜头可以为你的拍摄增添更多的乐趣和惊喜。",
    },
    features: [
      { name: "结构", clipName: "" },
      { name: "功能", clipName: "" },
      { name: "安全", clipName: "" },
    ],
    colorMeshName: "",
    color: [
      { text: "黄色", value: "#FFD851", id: "yellow", src: "" },
      { text: "红色", value: "#F95555", id: "red", src: "" },
    ],
    model: "/src/assets/models/iphone14.glb",
    // model: "http://192.168.36.2/elittle.glb",
    scale: [0.1, 0.1, 0.1],
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    cameraPos: [0, 1, 2],
    modelHeight: 2,
  },
];
