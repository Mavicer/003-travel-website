export type PhotoCategory = '自然' | '城市' | '人文' | '冒险' | '文化';

export interface GalleryPhoto {
  image: string;
  location: string;
  title: string;
  story: string;
  mood: string;
  category: PhotoCategory;
  /** Why this image was chosen — for future verification */
  imageRationale: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    image: '/gallery/01-mountain.jpg',
    location: '巴塔哥尼亚 · 阿根廷',
    title: '晨曦金山',
    story: '凌晨四点的寒风中等待，当第一缕阳光点燃菲茨罗伊峰的瞬间，所有的疲惫都化为对自然的敬畏。这一刻，光有了形状。',
    mood: '敬畏',
    category: '自然',
    imageRationale: '高山晨曦 alpenglow — 金色阳光与雪峰的戏剧性反差，体现自然摄影的极致光影追求',
  },
  {
    image: '/gallery/02-coast.jpg',
    location: '阿马尔菲海岸 · 意大利',
    title: '悬崖与蔚蓝',
    story: '第勒尼安海的蔚蓝在脚下铺展，白色村庄挂在悬崖上像一串珍珠。海风穿过柠檬树林，带着地中海独有的咸味与芬芳。',
    mood: '自由',
    category: '自然',
    imageRationale: '地中海海岸悬崖与彩色建筑 — 典型意大利沿海小镇的层次感与建筑色彩',
  },
  {
    image: '/gallery/03-city.jpg',
    location: '上海 · 中国',
    title: '不夜城的天际线',
    story: '从外滩望向陆家嘴，百年万国建筑群与未来主义摩天楼在黄浦江两岸对望。这座城市同时活在1920年代与明天。',
    mood: '活力',
    category: '城市',
    imageRationale: '现代都市天际线与水岸 — 摩天楼群与江面倒影构成的城市夜景，体现都市旅行的视觉张力',
  },
  {
    image: '/gallery/04-street.jpg',
    location: '京都 · 日本',
    title: '千本鸟居的晨光',
    story: '游客尚未到来之前，伏见稻荷的千本鸟居隧道里只有晨光穿过朱红立柱。每一步都踏在百年祈愿的影子里，时间是这里唯一的奢侈品。',
    mood: '静谧',
    category: '人文',
    imageRationale: '伏见稻荷大社千本鸟居隧道 — 朱红色连续廊柱是京都最标志性的文化符号，晨光与柱影的几何节奏体现日本传统美学',
  },
  {
    image: '/gallery/05-aurora.jpg',
    location: '冰岛 · 极北之地',
    title: '绿光之舞',
    story: '零下二十度的夜晚，极光在头顶无声翻涌。绿色光幔在星空间起舞，仿佛地球正在呼吸，而你恰好在此见证。',
    mood: '奇境',
    category: '冒险',
    imageRationale: '极光夜空 — 绿色光幔与星空是最具视觉冲击力的自然奇观之一，代表极地冒险旅行的终极追求',
  },
  {
    image: '/gallery/06-forest.jpg',
    location: '班夫国家公园 · 加拿大',
    title: '光之森林',
    story: '阳光穿过落基山脉的针叶林，在地上画出斑驳的光影。松针的气息混合着高海拔的冷空气，每一步都像走进了宫崎骏的动画世界。',
    mood: '宁静',
    category: '自然',
    imageRationale: '森林中的丁达尔效应 — 阳光穿过树冠形成的光束是自然摄影中最富诗意的瞬间',
  },
  {
    image: '/gallery/07-desert.jpg',
    location: '撒哈拉 · 摩洛哥',
    title: '沙海孤影',
    story: '沙漠的曲线在晨光中显形，每一道沙纹都是风写给大地的情书。骆驼的脚印延伸到视线尽头，在最寂静的地方，听见自己内心的回响。',
    mood: '孤寂',
    category: '冒险',
    imageRationale: '沙漠沙丘的几何曲线 — 晨光下的沙纹与阴影构成极简的自然雕塑，体现荒野的宏大与孤独',
  },
  {
    image: '/gallery/08-terrace.jpg',
    location: '巴厘岛 · 印度尼西亚',
    title: '众神的梯田',
    story: '德格拉朗的稻田在晨雾中醒来，层层叠叠的绿色阶梯是巴厘人写给大地的诗。水牛、棕榈、千年灌溉系统——这里的时间以另一种速度流动。',
    mood: '恬静',
    category: '文化',
    imageRationale: '热带梯田景观 — 层叠稻田与棕榈树构成的文化地貌，体现巴厘岛苏巴克灌溉系统的千年智慧',
  },
  {
    image: '/gallery/09-chongqing.jpg',
    location: '重庆 · 中国',
    title: '山城巷陌',
    story: '石板路在吊脚楼的阴影里蜿蜒向上，老巷子里的黄桷树根须穿过墙缝，在雾气和火锅味中野蛮生长。棒棒军扛着竹竿从你身边擦过，楼下麻将声叮当作响——这是重庆最真实的肌理，藏在洪崖洞的金色灯光背后。',
    mood: '滚烫',
    category: '城市',
    imageRationale: '重庆山城老街窄巷 — 层叠的建筑与上下蜿蜒的阶梯体现8D魔幻都市的日常肌理，与封面夜景形成互补视角',
  },
  {
    image: '/gallery/10-xian.jpg',
    location: '西安 · 中国',
    title: '回坊夜话',
    story: '暮色降临时，鼓楼背后的回民街才开始真正醒来。红柳烤肉的青烟在灯笼下升腾，掰馍的大爷手指翻飞，羊肉泡馍的香气混着孜然在空气里画出丝绸之路的地图。这座十三朝古都，在深夜的烟火里卸下了它厚重的历史盔甲。',
    mood: '温热',
    category: '人文',
    imageRationale: '回民街夜市灯笼下的美食摊位 — 展现西安千年古都的另一面：烟火气与人情味，与封面城墙形成动静对比',
  },
];
