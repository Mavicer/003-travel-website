import type { AtmosphereTag } from './destinations';

export interface TravelTheme {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  atmosphere: AtmosphereTag[];
  suitableFor: string;
  destinationIds: string[];
  highlight: string;
  /** Theme-specific image — visually represents the travel style, not a destination cover */
  image: string;
  imageAlt: string;
  visualDescription: string;
  mood: string;
  visualCategory: 'landscape' | 'cultural' | 'food' | 'adventure' | 'romance';
}

export const TRAVEL_THEMES: TravelTheme[] = [
  {
    id: 'nature',
    title: '自然探索',
    subtitle: 'Wilderness & Wonder',
    description:
      '深入地球最壮丽的荒野。从落基山脉的冰峰到巴塔哥尼亚的冰川，从九寨沟的五彩池到班夫的路易斯湖——这些目的地是为那些渴望与自然对话的旅行者准备的。每一步都是对大地之美的朝圣。',
    icon: 'Mountain',
    atmosphere: ['野性', '宁静', '冒险'],
    suitableFor: '户外爱好者、风光摄影师、自然疗愈追寻者',
    destinationIds: ['banff', 'patagonia', 'jiuzhaigou'],
    highlight: '穿越三大洲的荒野奇观 — 从北美洲的冰峰到南美洲的冰川，再到亚洲的彩林秘境。',
    image: '/journeys/nature.jpg',
    imageAlt: '雪山倒映在碧蓝湖面上的壮丽自然景观',
    visualDescription: '冰峰倒映在镜面般的湖水中，展现自然的恢弘与纯净——这是荒野探索者终其一生追寻的画面。',
    mood: '敬畏与宁静并存——面对大地的原始力量，内心反而找到最深的平静。',
    visualCategory: 'landscape',
  },
  {
    id: 'culture',
    title: '文化沉浸',
    subtitle: 'Heritage & Soul',
    description:
      '在古寺的晨钟中醒来，在茶道的仪式里感受时间的重量。京都的千年禅意与巴厘岛的灵性传统，为你打开一扇通往另一种生活方式的窗。这些旅程不是走马观花，而是与当地文化进行的一场深度对话。',
    icon: 'Landmark',
    atmosphere: ['禅意', '文化', '宁静'],
    suitableFor: '文化探索者、历史爱好者、心灵旅行者',
    destinationIds: ['kyoto', 'bali'],
    highlight: '从东方禅宗到海岛灵性 — 两种古老文明的沉浸式对话。',
    image: '/journeys/culture.jpg',
    imageAlt: '日本传统寺庙庭院中的枯山水禅意景观',
    visualDescription: '枯山水的砂纹如同时光的纹理，每一道耙痕都是修行者的呼吸——文化之旅从这里开始，慢下来，看见看不见的。',
    mood: '静谧中的深度——在传统与仪式中重新发现时间的质感与生命的意义。',
    visualCategory: 'cultural',
  },
  {
    id: 'photography',
    title: '摄影之旅',
    subtitle: 'Light & Landscape',
    description:
      '追逐光线，捕捉瞬间。从圣托里尼的蓝白交响到九寨沟的秋色泼墨，从巴塔哥尼亚的晨曦金山到阿马尔菲的悬崖落日——这些目的地是大自然为摄影师搭建的完美影棚。每一个转角都在等待你的镜头。',
    icon: 'Camera',
    atmosphere: ['浪漫', '野性', '宁静'],
    suitableFor: '摄影创作者、社交媒体旅行者、视觉艺术爱好者',
    destinationIds: ['santorini', 'jiuzhaigou', 'patagonia', 'amalfi-coast'],
    highlight: '四大洲的视觉盛宴 — 蓝色穹顶、五彩森林、金色冰川与悬崖海岸。',
    image: '/journeys/photography.jpg',
    imageAlt: '金色晨光中云雾缭绕的火山群峰壮丽景观',
    visualDescription: '黎明时分，第一缕阳光穿透云层洒在火山群峰之上——这是摄影师梦寐以求的黄金时刻。',
    mood: '追逐光线的兴奋与等待后的满足——每一次快门都是对自然之美的致敬。',
    visualCategory: 'landscape',
  },
  {
    id: 'culinary',
    title: '美食体验',
    subtitle: 'Flavors & Traditions',
    description:
      '用舌尖丈量世界。从京都的怀石料理到上海的本帮菜，从阿马尔菲的手工意面到巴厘岛的香料盛宴——美食从来不只是食物，它是土地的记忆、文化的密码、人与人之间最温暖的连接。',
    icon: 'Utensils',
    atmosphere: ['温暖', '文化', '奢华'],
    suitableFor: '美食爱好者、烹饪探索者、文化旅行者',
    destinationIds: ['kyoto', 'shanghai', 'amalfi-coast', 'bali'],
    highlight: '跨越四国的味觉地图 — 从东亚精致料理到地中海家常味道。',
    image: '/journeys/culinary.jpg',
    imageAlt: '精心摆盘的美食与新鲜食材——从街头小吃到精致料理的味觉之旅',
    visualDescription: '食物是最诚实的文化大使——它不讲理论，只讲味道。从街头烟火到餐桌艺术，每一口都是旅行。',
    mood: '温暖、亲切、充满烟火气——美食旅行是关于连接：与土地、与厨师、与同桌的人。',
    visualCategory: 'food',
  },
  {
    id: 'adventure',
    title: '冒险路线',
    subtitle: 'Adrenaline & Discovery',
    description:
      '为那些不满足于舒适区的旅行者。在巴塔哥尼亚的冰川上徒步，在班夫的冰原大道自驾，在九寨沟的原始森林中穿越——这些旅程考验你的体能，回报你一生难忘的风景与故事。',
    icon: 'Compass',
    atmosphere: ['冒险', '野性', '宁静'],
    suitableFor: '户外运动爱好者、极限挑战者、自驾旅行玩家',
    destinationIds: ['patagonia', 'banff', 'jiuzhaigou'],
    highlight: '从冰川徒步到冰原自驾 — 三场挑战体能与意志的荒野冒险。',
    image: '/journeys/adventure.jpg',
    imageAlt: '雪峰之下辽阔山谷中的徒步路线——挑战与壮丽并存的冒险之地',
    visualDescription: '山谷在脚下铺展，雪峰在远方召唤——冒险不是与自然对抗，而是走进它的怀抱，接受它的考验与馈赠。',
    mood: '热血与敬畏交织——每一次呼吸都是高海拔的馈赠，每一步都是对自我的超越。',
    visualCategory: 'adventure',
  },
  {
    id: 'romance',
    title: '浪漫假日',
    subtitle: 'Romance & Serenity',
    description:
      '为两个人的世界留白。圣托里尼的日落、阿马尔菲的海风、巴厘岛的稻田——这些目的地天生就是为浪漫而生。慢下来，牵手走过悬崖小径，在星空下共进晚餐，让时间只属于你们。',
    icon: 'Heart',
    atmosphere: ['浪漫', '奢华', '温暖'],
    suitableFor: '蜜月情侣、纪念日旅行者、追求慢生活的伴侣',
    destinationIds: ['santorini', 'amalfi-coast', 'bali'],
    highlight: '三座海岛的浪漫约定 — 从爱琴海到第勒尼安海，再到印度洋。',
    image: '/journeys/romance.jpg',
    imageAlt: '夕阳下海边建筑与金色天空——浪漫旅行目的地的经典画面',
    visualDescription: '黄昏将海天染成金色，白色建筑在落日余晖中静静伫立——浪漫不是刻意的仪式，而是和对的人在对的地方，什么都不做也很美。',
    mood: '温暖、慵懒、甜蜜——时间慢下来，世界只剩下两个人。',
    visualCategory: 'romance',
  },
];
