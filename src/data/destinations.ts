export interface Coordinates {
  lat: number;
  lng: number;
}

export interface MapViewport {
  center: Coordinates;
  zoom: number;
  pitch?: number;
  bearing?: number;
}

export type AtmosphereTag =
  | '浪漫' | '宁静' | '冒险' | '文化' | '禅意'
  | '野性' | '温暖' | '历史' | '热带' | '奢华';

export interface Highlight {
  icon: string;
  title: string;
  description: string;
}

export interface Attraction {
  id: string;
  name: string;
  coordinates: Coordinates;
  description: string;
  image?: string;
  category: '地标' | '自然' | '美食' | '博物馆' | '寺庙' | '观景点' | '活动';
  rating?: number;
  bestTime?: string;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  category: '美食' | '文化' | '自然' | '户外' | '养生' | '夜生活';
  duration?: string;
  difficulty?: '轻松' | '适中' | '挑战';
}

export interface ItineraryDay {
  day: number;
  title: string;
  items: {
    time: string;
    title: string;
    description: string;
    attractionId?: string;
    type: '活动' | '餐饮' | '休息' | '交通' | '住宿';
  }[];
}

export interface SeasonInfo {
  season: '春' | '夏' | '秋' | '冬';
  months: string;
  description: string;
  temperature: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface PracticalInfo {
  language: string;
  currency: string;
  timezone: string;
  visa?: string;
  bestSeason?: string;
  averageCost?: string;
}

export interface Destination {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  id: string;
  coordinates: Coordinates;
  mapViewport: MapViewport;
  introduction: string;
  atmosphere: AtmosphereTag[];
  highlights: Highlight[];
  attractions: Attraction[];
  experiences: Experience[];
  itinerary: ItineraryDay[];
  seasons: SeasonInfo[];
  practicalInfo: PracticalInfo;
  aiTags?: string[];
  aiTravelStyle?: string;
}

export const DESTINATIONS: Destination[] = [
  // ══════════════════════════════════════════════════════════════
  // 京都 — 参考目的地（完整数据）
  // ══════════════════════════════════════════════════════════════
  {
    id: 'kyoto',
    image:
      '/destinations/kyoto.jpg',
    title: '京都',
    subtitle: '日本',
    description:
      '竹林深处的古寺，百年的静谧，遇见樱吹雪的空气。',

    coordinates: { lat: 35.0116, lng: 135.7681 },
    mapViewport: { center: { lat: 35.0116, lng: 135.7681 }, zoom: 12, pitch: 40, bearing: -10 },

    atmosphere: ['禅意', '宁静', '文化', '历史'],

    introduction: `京都，日本千年古都，是传统美学与精神沉淀的原点。这里没有东京的喧嚣与大阪的热闹，只有寺庙的钟声、茶道的仪式、和服掠过石板路的窸窣声响。

    在这座城市，时间似乎被拉长。清晨的岚山竹林里，阳光穿过竹叶洒下斑驳光影；午后的龙安寺枯山水前，白沙的纹理是僧侣每日新绘的禅语；傍晚的祇园巷弄中，舞妓的木屐声敲打着百年石板路。京都的美，不在于某一个惊艳的瞬间，而在于每一个日常细节里流淌的从容。

    这里四季分明，春日樱花如雪，夏日祇园祭典如火，秋日枫叶似锦，冬日雪落金阁。每一次造访，京都都会向你展露不同的面容——它是一座你永远无法一次读懂的城市，也因此值得一生去亲近。`,

    highlights: [
      { icon: 'Trees', title: '岚山竹林', description: '漫步于高耸入云的竹林小径，感受阳光穿透竹叶的静谧时刻' },
      { icon: 'Building2', title: '金阁寺', description: '金箔包裹的禅寺倒映于镜湖池中，日本美学的极致表达' },
      { icon: 'Coffee', title: '抹茶之道', description: '在百年茶室中体验茶道仪式，品一碗手打抹茶的苦与甘' },
      { icon: 'Sparkles', title: '祇园花见小路', description: '黄昏时分，偶遇盛装舞妓匆匆穿行于百年木造町屋之间' },
    ],

    attractions: [
      {
        id: 'fushimi-inari',
        name: '伏见稻荷大社',
        coordinates: { lat: 34.9671, lng: 135.7727 },
        description: '数以千计的朱红色鸟居连绵至稻荷山顶，形成一条通往神域的隧道。清晨或傍晚时分光线最佳。',
        category: '寺庙',
        rating: 5,
        bestTime: '清晨 7:00-9:00 或傍晚 16:00-18:00',
      },
      {
        id: 'kinkakuji',
        name: '金阁寺',
        coordinates: { lat: 35.0394, lng: 135.7292 },
        description: '舍利殿全身以金箔包裹，倒映于镜湖池中。三岛由纪夫曾以此为题材写下同名小说。冬日雪景最为震撼。',
        category: '地标',
        rating: 5,
        bestTime: '上午 9:00-10:30',
      },
      {
        id: 'arashiyama',
        name: '岚山竹林',
        coordinates: { lat: 35.0170, lng: 135.6712 },
        description: '位于岚山脚下的竹林小径，数百米高的竹竿遮天蔽日。清晨人少时可听见风吹竹叶的天籁。',
        category: '自然',
        rating: 5,
        bestTime: '清晨 6:00-8:00',
      },
      {
        id: 'kiyomizudera',
        name: '清水寺',
        coordinates: { lat: 34.9949, lng: 135.7850 },
        description: '悬空于山腰的木质舞台，以139根巨柱支撑。春季樱花环绕，秋日枫叶如火，四季皆景。',
        category: '寺庙',
        rating: 5,
        bestTime: '清晨或黄昏',
      },
      {
        id: 'gion',
        name: '祇园',
        coordinates: { lat: 35.0036, lng: 135.7761 },
        description: '京都最著名的花街，保留了大量传统木造町屋。傍晚时分可能遇见真正的舞妓赶往茶屋。',
        category: '观景点',
        rating: 4,
        bestTime: '傍晚 17:00-19:00',
      },
      {
        id: 'nishiki-market',
        name: '锦市场',
        coordinates: { lat: 35.0049, lng: 135.7675 },
        description: '京都四百年的厨房，从渍物到抹茶甜点，从鲜鱼到京野菜，四百米的长廊里藏着京都人的味觉密码。',
        category: '美食',
        rating: 4,
        bestTime: '上午 10:00-14:00',
      },
    ],

    experiences: [
      {
        id: 'tea-ceremony',
        title: '茶道体验',
        description: '在百年茶室中，跟随茶道师完成一场正式的抹茶仪式。从扇子的摆放到手心的温度，每一个动作都是禅。',
        category: '文化',
        duration: '1.5 小时',
        difficulty: '轻松',
      },
      {
        id: 'kimono-walk',
        title: '和服散策',
        description: '换上精致的京友禅和服，漫步于清水寺与二年坂的石板路上。专业着付师为你打理每一个细节。',
        category: '文化',
        duration: '半天',
        difficulty: '轻松',
      },
      {
        id: 'shojin-ryori',
        title: '精进料理',
        description: '在天龙寺或妙心寺品尝禅宗素斋。以时令蔬菜与豆腐为主角，用五感体会「食事即修行」的禅意。',
        category: '美食',
        duration: '1.5 小时',
        difficulty: '轻松',
      },
      {
        id: 'nishiki-food-tour',
        title: '锦市场美食巡礼',
        description: '跟随本地向导穿梭于锦市场的四百米长廊，品尝渍物、京果子、抹茶、汤豆腐和当季鲜鱼。',
        category: '美食',
        duration: '2 小时',
        difficulty: '轻松',
      },
      {
        id: 'fushimi-sake',
        title: '伏见清酒之旅',
        description: '探访伏见地区的百年酒藏，了解名水与酒米的相遇，品尝三种不同精米步合的纯米大吟酿。',
        category: '美食',
        duration: '半天',
        difficulty: '轻松',
      },
    ],

    itinerary: [
      {
        day: 1,
        title: '东山文化漫步',
        items: [
          { time: '08:00', title: '清水寺', description: '清晨登清水寺舞台，俯瞰京都晨雾', attractionId: 'kiyomizudera', type: '活动' },
          { time: '10:30', title: '二年坂·三年坂', description: '沿石板坡道漫步，探访手作陶器与京果子店', type: '活动' },
          { time: '12:00', title: '湯豆腐午餐', description: '在南禅寺附近品尝京都名物汤豆腐', type: '餐饮' },
          { time: '14:30', title: '茶道体验', description: '在百年茶室中体验抹茶仪式', type: '活动' },
          { time: '17:00', title: '祇园散步', description: '黄昏时分于花见小路偶遇舞妓身影', attractionId: 'gion', type: '活动' },
          { time: '19:00', title: '怀石料理', description: '在料亭享用季节怀石，品味京料理的精髓', type: '餐饮' },
        ],
      },
      {
        day: 2,
        title: '岚山与禅意',
        items: [
          { time: '06:30', title: '岚山竹林', description: '在游客到来之前，独享晨光中的竹林', attractionId: 'arashiyama', type: '活动' },
          { time: '09:00', title: '天龙寺', description: '参观世界遗产枯山水庭园', type: '活动' },
          { time: '11:00', title: '精进料理', description: '在天龙寺内品尝禅宗素斋', type: '餐饮' },
          { time: '13:30', title: '金阁寺', description: '参观金箔闪耀的鹿苑寺', attractionId: 'kinkakuji', type: '活动' },
          { time: '16:00', title: '伏见稻荷', description: '穿过千本鸟居，登顶稻荷山赏日落', attractionId: 'fushimi-inari', type: '活动' },
          { time: '19:30', title: '居酒屋晚餐', description: '在河原町小巷的居酒屋享用庶民美食', type: '餐饮' },
        ],
      },
      {
        day: 3,
        title: '市井与味觉',
        items: [
          { time: '09:00', title: '锦市场', description: '穿行于京都厨房，品尝京渍物与抹茶甜点', attractionId: 'nishiki-market', type: '活动' },
          { time: '11:30', title: '伏见酒藏', description: '参观百年酒造，品鉴三种纯米大吟酿', type: '活动' },
          { time: '13:00', title: '和食午餐', description: '在伏见地区品尝酒粕拉面或酒藏午餐', type: '餐饮' },
          { time: '15:00', title: '银阁寺', description: '探访东山文化的另一颗明珠，感受侘寂美学', type: '活动' },
          { time: '17:30', title: '哲学之道', description: '沿琵琶湖疏水散步，樱花季时尤为梦幻', type: '活动' },
          { time: '19:00', title: 'おばんざい晚餐', description: '品尝京都家常料理，感受京都人的日常滋味', type: '餐饮' },
        ],
      },
    ],

    seasons: [
      { season: '春', months: '3月-5月', description: '樱花满开，哲学之道与圆山公园是赏樱名所', temperature: '10°C - 22°C', rating: 5 },
      { season: '夏', months: '6月-8月', description: '祇园祭贯穿整个七月，鸭川纳凉床开放', temperature: '24°C - 35°C', rating: 3 },
      { season: '秋', months: '9月-11月', description: '枫叶染红岚山与东福寺，是摄影的黄金季节', temperature: '15°C - 26°C', rating: 5 },
      { season: '冬', months: '12月-2月', description: '金阁寺雪景绝美，游客稀少，温泉与锅物料理最宜', temperature: '1°C - 10°C', rating: 4 },
    ],

    practicalInfo: {
      language: '日语，旅游区英语基本通用',
      currency: '日元 (JPY)',
      timezone: 'UTC+9 (东九区)',
      visa: '日本签证（需提前办理）',
      bestSeason: '3月-5月, 10月-11月',
      averageCost: '¥8,000-18,000 (不含国际机票)',
    },

    aiTags: ['寺庙', '茶道', '和食', '枫叶', '樱花', '摄影', '禅修'],
    aiTravelStyle: '慢节奏古都漫游 — 适合文化旅行者、美食爱好者、摄影创作者与心灵探索者',
  },

  // ══════════════════════════════════════════════════════════════
  // 圣托里尼
  // ══════════════════════════════════════════════════════════════
  {
    id: 'santorini',
    image:
      '/destinations/santorini.jpg',
    title: '圣托里尼',
    subtitle: '希腊',
    description:
      '白色悬崖坠入爱琴海的蔚蓝 — 这里的日落，将重新定义你对美的想象。',
    coordinates: { lat: 36.3932, lng: 25.4615 },
    mapViewport: { center: { lat: 36.3932, lng: 25.4615 }, zoom: 12, pitch: 40, bearing: 20 },

    atmosphere: ['浪漫', '宁静', '奢华'],

    introduction: `圣托里尼，爱琴海上的月牙形岛屿，是希腊诸岛中最令人心醉的一颗明珠。蓝顶白墙的教堂矗立于悬崖之上，俯瞰着深蓝色的火山口海面——这里的每一帧画面，都像是从明信片中裁剪而出。

    这座岛屿诞生于一次史前火山大爆发，留下了举世罕见的火山口地貌。悬崖上的小镇伊亚和费拉，如同积木般层层叠叠地搭建在三百米高的火山岩壁上，狭窄的巷道、手工作坊、露天餐厅在每一个转角带来惊喜。而脚下那片深邃的海水，至今仍守护着活火山的余温。

    但圣托里尼真正的魔力在黄昏时分降临。当夕阳缓缓沉入爱琴海，天空从金色烧成绯红，再渐渐过渡为深紫——那一刻，全世界仿佛都屏住了呼吸。有人说，看过伊亚的日落，就再也无法将就其他的黄昏。`,

    highlights: [
      { icon: 'Sunset', title: '伊亚日落', description: '在世界最美日落点，见证天空从金色到绯红的完整过渡' },
      { icon: 'Church', title: '蓝顶教堂', description: '寻找那些出现在无数旅行封面上的经典蓝顶白墙画面' },
      { icon: 'Flame', title: '火山岛温泉', description: '乘船探访活火山口，在硫磺温泉中浸泡爱琴海的暖意' },
      { icon: 'Wine', title: '火山岩酒庄', description: '品尝生长于火山灰土壤中的独特 Assyrtiko 白葡萄酒' },
    ],

    attractions: [
      {
        id: 'oia',
        name: '伊亚小镇',
        coordinates: { lat: 36.4618, lng: 25.3753 },
        description: '圣托里尼最上镜的悬崖小镇，蓝顶教堂与白色房屋层叠而下，日落时分人潮涌动但绝对值得。',
        category: '观景点',
        rating: 5,
        bestTime: '日落前 1 小时',
      },
      {
        id: 'fira',
        name: '费拉',
        coordinates: { lat: 36.4161, lng: 25.4320 },
        description: '圣托里尼首府，悬崖边遍布餐厅与精品店。可乘缆车下至旧港，或骑驴沿阶梯攀登。',
        category: '观景点',
        rating: 4,
        bestTime: '下午至傍晚',
      },
      {
        id: 'red-beach',
        name: '红沙滩',
        coordinates: { lat: 36.3484, lng: 25.3964 },
        description: '由火山岩侵蚀形成的独特色彩沙滩，红色峭壁环抱着碧蓝海水，是地质奇观与游泳天堂。',
        category: '自然',
        rating: 4,
        bestTime: '上午 9:00-12:00',
      },
      {
        id: 'akrotiri',
        name: '阿克罗蒂里遗址',
        coordinates: { lat: 36.3514, lng: 25.4034 },
        description: '被称为"爱琴海的庞贝"，公元前17世纪火山爆发掩埋的米诺斯文明古城，保存极为完好。',
        category: '博物馆',
        rating: 5,
        bestTime: '上午',
      },
      {
        id: 'santo-winery',
        name: 'Santo 酒庄',
        coordinates: { lat: 36.3648, lng: 25.3891 },
        description: '悬崖边的现代酒庄，品鉴火山岩风土的 Assyrtiko 与 Vinsanto 甜酒，配以180度无敌海景。',
        category: '美食',
        rating: 4,
        bestTime: '下午 16:00-18:00',
      },
      {
        id: 'hot-springs',
        name: '帕利亚卡梅尼温泉',
        coordinates: { lat: 36.3998, lng: 25.3885 },
        description: '乘船至火山岛，在浅湾处的海底硫磺温泉中浸泡。海水因矿物质呈现独特的乳绿色。',
        category: '活动',
        rating: 4,
        bestTime: '上午或午后',
      },
    ],

    experiences: [
      {
        id: 'sunset-cruise',
        title: '日落双体船巡游',
        description: '乘坐豪华双体船环游火山口，在甲板上以无敌视角观赏伊亚日落。含海鲜烧烤晚餐与无限量白葡萄酒。',
        category: '自然',
        duration: '5 小时',
        difficulty: '轻松',
      },
      {
        id: 'wine-tour',
        title: '火山酒庄之旅',
        description: '探访三座火山岩酒庄，了解独特的 kouloura 藤蔓编织法，品鉴 12 款火山风土葡萄酒。',
        category: '美食',
        duration: '半天',
        difficulty: '轻松',
      },
      {
        id: 'hiking-fira-oia',
        title: '悬崖步道徒步',
        description: '从费拉到伊亚的 10 公里悬崖步道，全程爱琴海美景相伴。途经数个蓝顶教堂，是摄影爱好者的天堂。',
        category: '自然',
        duration: '3-4 小时',
        difficulty: '适中',
      },
      {
        id: 'cooking-class',
        title: '希腊烹饪课',
        description: '在当地人家中学习制作正宗希腊菜肴——番茄炸饼、蚕豆泥、烤羊排和蜂蜜核桃千层酥。',
        category: '美食',
        duration: '3 小时',
        difficulty: '轻松',
      },
    ],

    itinerary: [
      {
        day: 1,
        title: '悬崖小镇与日落',
        items: [
          { time: '09:00', title: '费拉漫步', description: '沿悬崖步道探索首府小镇，逛手作店铺与艺术画廊', attractionId: 'fira', type: '活动' },
          { time: '12:00', title: '悬崖午餐', description: '在费拉悬崖边的希腊餐厅享用烤章鱼与希腊沙拉', type: '餐饮' },
          { time: '14:30', title: '阿克罗蒂里遗址', description: '探访爱琴海的庞贝古城', attractionId: 'akrotiri', type: '活动' },
          { time: '16:30', title: 'Santo 酒庄', description: '悬崖品酒，等待日落的暖金色光芒', attractionId: 'santo-winery', type: '活动' },
          { time: '18:30', title: '伊亚日落', description: '占据最佳观景点，见证世界最美日落', attractionId: 'oia', type: '活动' },
          { time: '20:00', title: '伊亚晚餐', description: '在悬崖露台享用地中海海鲜盛宴', type: '餐饮' },
        ],
      },
      {
        day: 2,
        title: '火山与海洋',
        items: [
          { time: '09:00', title: '红沙滩', description: '在火山岩红沙滩游泳与浮潜', attractionId: 'red-beach', type: '活动' },
          { time: '11:00', title: '火山岛温泉', description: '乘船前往火山岛，在硫磺温泉中放松', attractionId: 'hot-springs', type: '活动' },
          { time: '13:00', title: '船上烧烤午餐', description: '在双体船上享用希腊式烧烤海鲜', type: '餐饮' },
          { time: '15:30', title: '自由浮潜', description: '在爱琴海清澈的海水中探索海底世界', type: '活动' },
          { time: '17:00', title: '日落巡航', description: '从海上回望圣托里尼，看夕阳将白色悬崖染成金色', type: '活动' },
          { time: '20:00', title: '海鲜大餐', description: '在 Ammoudi 湾的海鲜餐厅品尝当日渔获', type: '餐饮' },
        ],
      },
      {
        day: 3,
        title: '内陆探索与慢时光',
        items: [
          { time: '09:00', title: '皮尔戈斯城堡', description: '登圣托里尼最高点，360度俯瞰全岛', type: '活动' },
          { time: '11:00', title: '希腊烹饪课', description: '在本地人家中学习三道传统希腊菜', type: '活动' },
          { time: '13:30', title: '自制午餐', description: '品尝自己亲手制作的希腊料理', type: '餐饮' },
          { time: '15:00', title: '悬崖步道徒步', description: '费拉至伊亚 10 公里绝美徒步线', type: '活动' },
          { time: '18:00', title: '最后一场日落', description: '在伊亚城堡遗址与圣托里尼告别', type: '活动' },
          { time: '20:30', title: '告别晚餐', description: '在悬崖边的 fine dining 餐厅享受告别之夜', type: '餐饮' },
        ],
      },
    ],

    seasons: [
      { season: '春', months: '4月-5月', description: '野花盛开，游客尚少，气温宜人适合徒步探索', temperature: '15°C - 24°C', rating: 4 },
      { season: '夏', months: '6月-9月', description: '旺季。阳光灿烂，海水温暖，但人潮涌动物价高涨', temperature: '24°C - 35°C', rating: 3 },
      { season: '秋', months: '10月-11月', description: '海水仍暖，游客渐散，光线柔和摄影最佳', temperature: '18°C - 26°C', rating: 5 },
      { season: '冬', months: '12月-3月', description: '多数店铺歇业，岛屿归于宁静，适合独处与写作', temperature: '10°C - 16°C', rating: 2 },
    ],

    practicalInfo: {
      language: '希腊语，旅游区英语通用',
      currency: '欧元 (EUR)',
      timezone: 'UTC+2 (东二区)',
      visa: '申根签证（需提前办理）',
      bestSeason: '4月-5月, 9月-10月',
      averageCost: '€150-350/天 (不含国际机票)',
    },

    aiTags: ['日落', '蜜月', '海岛', '美食', '葡萄酒', '摄影', '火山'],
    aiTravelStyle: '浪漫海岛慢旅行 — 适合情侣蜜月、摄影创作者与葡萄酒爱好者',
  },

  // ══════════════════════════════════════════════════════════════
  // 班夫
  // ══════════════════════════════════════════════════════════════
  {
    id: 'banff',
    image:
      '/destinations/banff.jpg',
    title: '班夫',
    subtitle: '加拿大',
    description:
      '落基山脉怀抱着蓝绿色的湖泊 — 原始荒野中，壁炉的温暖在等你。',
    coordinates: { lat: 51.1784, lng: -115.5708 },
    mapViewport: { center: { lat: 51.1784, lng: -115.5708 }, zoom: 11, pitch: 50, bearing: -30 },

    atmosphere: ['野性', '宁静', '冒险'],

    introduction: `班夫国家公园，加拿大落基山脉的皇冠明珠，是地球上最接近完美荒野的地方之一。这里的湖泊蓝得不真实——路易斯湖与梦莲湖倒映着维多利亚冰川，那种介于翡翠与蓝宝石之间的色彩，被旅行者称为"落基山蓝"。

    这片土地是野生动物的王国。清晨驾车穿越冰原大道，你可能会与麋鹿、山羊、甚至黑熊不期而遇。而日落时分，硫磺山温泉的蒸气在雪山背景下升腾——浸泡在40度的天然温泉中，头顶是漫天繁星，眼前是雪山剪影，这是班夫独有的奢侈。

    但班夫不只是野性的——班夫镇是一座精致的高山小镇，木屋建筑散落在弓河两岸，独立咖啡馆、手工巧克力店与户外装备商店和谐共处。这里是冒险者的客厅，也是疲惫灵魂的庇护所。`,

    highlights: [
      { icon: 'Waves', title: '路易斯湖', description: '冰川融水滋养的翡翠色湖泊，夏季泛舟、冬季滑冰，四季皆有魔力' },
      { icon: 'Route', title: '冰原大道', description: '全球最美高山公路之一，230 公里穿越雪山、冰川与瀑布' },
      { icon: 'Mountain', title: '硫磺山', description: '乘缆车登顶，360度俯瞰六条山脉与班夫镇的全景画卷' },
      { icon: 'Flame', title: '班夫上温泉', description: '在海拔 1585 米的天然温泉中，让雪山成为你的浴室壁画' },
    ],

    attractions: [
      {
        id: 'lake-louise',
        name: '路易斯湖',
        coordinates: { lat: 51.4154, lng: -116.1780 },
        description: '落基山脉最具标志性的湖泊，翡翠色湖水倒映着维多利亚冰川。夏季可泛舟，冬季可滑冰。',
        category: '自然',
        rating: 5,
        bestTime: '清晨 7:00-9:00（避开人流）',
      },
      {
        id: 'moraine-lake',
        name: '梦莲湖',
        coordinates: { lat: 51.3225, lng: -116.1858 },
        description: '曾经出现在加元纸币上的经典画面，蓝绿色湖水被十座雪峰环绕，日出时分最为震撼。',
        category: '自然',
        rating: 5,
        bestTime: '日出 5:30-7:00',
      },
      {
        id: 'banff-gondola',
        name: '硫磺山缆车',
        coordinates: { lat: 51.1478, lng: -115.5559 },
        description: '8分钟登顶硫磺山，在海拔2281米的山顶观景台360度俯瞰弓河谷地与六条山脉。',
        category: '观景点',
        rating: 5,
        bestTime: '上午 9:00-11:00 或日落前',
      },
      {
        id: 'johnston-canyon',
        name: '强斯顿峡谷',
        coordinates: { lat: 51.2466, lng: -115.8417 },
        description: '沿悬崖步道深入石灰岩峡谷，穿过瀑布水帘，冬季结冰后成为攀冰圣地。',
        category: '自然',
        rating: 4,
        bestTime: '上午 8:00-11:00',
      },
      {
        id: 'columbia-icefield',
        name: '哥伦比亚冰原',
        coordinates: { lat: 52.2203, lng: -117.2246 },
        description: '北美最大的冰原，乘坐巨大的冰原雪车登上阿萨巴斯卡冰川，在万年冰面上行走。',
        category: '自然',
        rating: 5,
        bestTime: '上午',
      },
      {
        id: 'banff-upper-springs',
        name: '班夫上温泉',
        coordinates: { lat: 51.1507, lng: -115.5605 },
        description: '天然硫磺温泉，水温恒定38-40°C。在蒸腾的雾气中欣赏朗德山雪峰，是班夫最经典的体验之一。',
        category: '活动',
        rating: 4,
        bestTime: '傍晚或夜晚',
      },
    ],

    experiences: [
      {
        id: 'lake-louise-canoe',
        title: '路易斯湖泛舟',
        description: '在翡翠色的冰川湖面上划独木舟，雪山与松林环绕，只有桨声与风声。是落基山脉最具代表性的体验。',
        category: '自然',
        duration: '1-2 小时',
        difficulty: '轻松',
      },
      {
        id: 'icefield-parkway-drive',
        title: '冰原大道自驾',
        description: '驾驶穿越全球最美高山公路，沿途停靠弓湖、佩托湖、哥伦比亚冰原等经典观景点。随时可能遇见野生动物。',
        category: '自然',
        duration: '全天',
        difficulty: '轻松',
      },
      {
        id: 'sunshine-hiking',
        title: '阳光草甸徒步',
        description: '夏季高山草甸鲜花盛开，在海拔 2300 米的山脊上漫步，俯瞰三座翡翠湖泊。',
        category: '自然',
        duration: '4-6 小时',
        difficulty: '适中',
      },
      {
        id: 'wildlife-safari',
        title: '野生动物巡游',
        description: '跟随专业向导在黄昏时分沿弓河河谷巡游，寻找麋鹿、山羊、黑熊与灰熊的踪迹。',
        category: '户外',
        duration: '3 小时',
        difficulty: '轻松',
      },
    ],

    itinerary: [
      {
        day: 1,
        title: '班夫镇与硫磺山',
        items: [
          { time: '09:00', title: '班夫镇漫步', description: '探访弓河瀑布与班夫温泉酒店，感受高山小镇风情', type: '活动' },
          { time: '11:00', title: '硫磺山缆车', description: '登顶硫磺山，360 度俯瞰落基山脉', attractionId: 'banff-gondola', type: '活动' },
          { time: '13:00', title: '山顶午餐', description: '在 Sky Bistro 享受海拔 2281 米的高山午餐', type: '餐饮' },
          { time: '15:00', title: '强斯顿峡谷徒步', description: '沿悬崖步道深入峡谷，穿越瀑布', attractionId: 'johnston-canyon', type: '活动' },
          { time: '18:00', title: '上温泉', description: '在雪山环抱的温泉中舒缓一天疲惫', attractionId: 'banff-upper-springs', type: '活动' },
          { time: '20:00', title: '班夫镇晚餐', description: '在木屋餐厅品尝加拿大 AAA 级牛排与精酿啤酒', type: '餐饮' },
        ],
      },
      {
        day: 2,
        title: '路易斯湖与梦莲湖',
        items: [
          { time: '06:00', title: '梦莲湖日出', description: '在日出时分拍摄经典的十峰环抱画面', attractionId: 'moraine-lake', type: '活动' },
          { time: '09:00', title: '路易斯湖泛舟', description: '在翡翠色湖面上划独木舟', attractionId: 'lake-louise', type: '活动' },
          { time: '11:30', title: '湖畔徒步', description: '沿路易斯湖岸步道徒步至茶屋', type: '活动' },
          { time: '13:00', title: '费尔蒙城堡午餐', description: '在路易斯湖费尔蒙城堡酒店的湖景窗边用餐', type: '餐饮' },
          { time: '15:30', title: '冰原大道南段', description: '沿冰原大道南下，停靠弓湖与佩托湖', type: '活动' },
          { time: '19:00', title: '返回班夫', description: '在小镇的手工精酿酒吧结束充实的一天', type: '餐饮' },
        ],
      },
      {
        day: 3,
        title: '冰原大道冒险',
        items: [
          { time: '07:00', title: '冰原大道全程', description: '清晨出发，沿全球最美高山公路北上', type: '交通' },
          { time: '10:00', title: '哥伦比亚冰原', description: '乘坐冰原雪车登上万年冰川', attractionId: 'columbia-icefield', type: '活动' },
          { time: '12:30', title: '冰原中心午餐', description: '在冰原探索中心的落地窗前用餐', type: '餐饮' },
          { time: '14:00', title: '冰川天空步道', description: '站在 280 米高的玻璃步道上，俯瞰森瓦普塔峡谷', type: '活动' },
          { time: '16:00', title: '野生动物巡游', description: '黄昏时分沿弓河河谷寻找野生动物', type: '活动' },
          { time: '19:30', title: '班夫告别晚餐', description: '在班夫最有名的烤肉餐厅享用烟熏排骨与枫糖甜点', type: '餐饮' },
        ],
      },
    ],

    seasons: [
      { season: '春', months: '4月-5月', description: '融雪季节，瀑布水量充沛，山谷野花初绽，游客稀少', temperature: '0°C - 15°C', rating: 3 },
      { season: '夏', months: '6月-9月', description: '旺季。日照长达16小时，所有徒步路线与湖泊活动全面开放', temperature: '8°C - 24°C', rating: 5 },
      { season: '秋', months: '9月-10月', description: '落叶松变金黄，游客渐少，是摄影和清静旅行的最佳时节', temperature: '-2°C - 16°C', rating: 4 },
      { season: '冬', months: '11月-3月', description: '滑雪、雪鞋徒步、冰走峡谷、北极光——冰雪世界的极致体验', temperature: '-15°C - -2°C', rating: 4 },
    ],

    practicalInfo: {
      language: '英语 / 法语',
      currency: '加拿大元 (CAD)',
      timezone: 'UTC-7 (山地时间)',
      visa: '加拿大签证（需提前办理）',
      bestSeason: '6月-9月',
      averageCost: 'CAD $200-500/天 (不含国际机票)',
    },

    aiTags: ['雪山', '冰川湖', '徒步', '野生动物', '自驾', '摄影', '温泉'],
    aiTravelStyle: '极致自然冒险 — 适合户外运动爱好者、风光摄影师与公路旅行玩家',
  },

  // ══════════════════════════════════════════════════════════════
  // 阿马尔菲海岸
  // ══════════════════════════════════════════════════════════════
  {
    id: 'amalfi-coast',
    image:
      '/destinations/amalfi-coast.jpg',
    title: '阿马尔菲海岸',
    subtitle: '意大利',
    description:
      '悬崖小镇倾泻入地中海 — 柠檬园、梯田风光、甜蜜生活。',
    coordinates: { lat: 40.6333, lng: 14.6000 },
    mapViewport: { center: { lat: 40.6333, lng: 14.6000 }, zoom: 11, pitch: 45, bearing: -10 },

    atmosphere: ['浪漫', '温暖', '奢华'],

    introduction: `阿马尔菲海岸，联合国教科文组织世界遗产，50公里蜿蜒海岸线上散落着13座悬崖小镇——每一座都像是一幅中世纪油画。彩色房屋从峭壁倾泻而下，直落入第勒尼安海的蔚蓝深处，柠檬树的芬芳弥漫在每一条鹅卵石小巷中。

    这里是"甜蜜生活"（La Dolce Vita）的诞生地之一。清晨在波西塔诺的露台上喝一杯浓缩咖啡，午后在阿马尔菲大教堂的阴影下品尝柠檬冰沙，傍晚驾驶敞篷车沿163号公路追逐地中海的晚霞——生活在这里被拉伸成一种艺术形式。

    阿马尔菲的魅力不只是风景，更是味觉的盛宴。海岸柠檬酿制的 Limoncello、新鲜捕捞的海鲜、手工意面配番茄与罗勒——每一餐都在提醒你，为什么意大利人把吃饭当作一天中最重要的事。`,

    highlights: [
      { icon: 'Building2', title: '波西塔诺', description: '彩色房屋垂挂于悬崖的绝美小镇，是意大利最具画面感的目的地之一' },
      { icon: 'Church', title: '阿马尔菲大教堂', description: '阿拉伯-诺曼风格的辉煌杰作，62级台阶通往天堂的回廊' },
      { icon: 'Leaf', title: '众神之路', description: '悬挂在悬崖半山腰的千年古道，每一步都是地中海全景' },
      { icon: 'Palette', title: '拉韦洛别墅', description: '悬崖顶上的花园宫殿，曾启发瓦格纳创作歌剧《帕西法尔》' },
    ],

    attractions: [
      {
        id: 'positano',
        name: '波西塔诺',
        coordinates: { lat: 40.6281, lng: 14.4848 },
        description: '阿马尔菲海岸最具代表性的小镇，彩色房屋层层叠叠垂入海中。精品店、陶瓷工坊与海滩俱乐部散布其间。',
        category: '观景点',
        rating: 5,
        bestTime: '全天，黄昏最佳',
      },
      {
        id: 'amalfi-cathedral',
        name: '阿马尔菲大教堂',
        coordinates: { lat: 40.6344, lng: 14.6028 },
        description: '9世纪建造的圣安德烈大教堂，融合了阿拉伯-诺曼-拜占庭风格。青铜大门来自君士坦丁堡，回廊被称为"天堂"。',
        category: '地标',
        rating: 5,
        bestTime: '上午',
      },
      {
        id: 'ravello',
        name: '拉韦洛',
        coordinates: { lat: 40.6494, lng: 14.6125 },
        description: '坐落在海拔365米的悬崖之巅，以两座绝世花园——鲁菲洛别墅与辛波内别墅闻名。每年夏季举办室内音乐节。',
        category: '观景点',
        rating: 5,
        bestTime: '下午',
      },
      {
        id: 'path-of-gods',
        name: '众神之路',
        coordinates: { lat: 40.6310, lng: 14.4927 },
        description: '从阿杰罗拉到诺切莱的7公里悬崖步道，悬挂在山腰俯瞰整个海岸。传说中众神就是沿这条路降临人间。',
        category: '自然',
        rating: 5,
        bestTime: '清晨 7:00-10:00',
      },
      {
        id: 'fiordo-furore',
        name: '弗罗雷峡湾',
        coordinates: { lat: 40.6302, lng: 14.5483 },
        description: '意大利唯一的峡湾，狭窄的裂缝深入峭壁深处，翡翠色海水上架着一座30米高的拱桥。',
        category: '自然',
        rating: 4,
        bestTime: '上午至下午',
      },
      {
        id: 'villa-cimbrone',
        name: '辛波内别墅',
        coordinates: { lat: 40.6478, lng: 14.6139 },
        description: '拉韦洛的绝美花园别墅，"无限露台"悬于悬崖边缘，装饰着18世纪大理石胸像，是南意最浪漫的观景台。',
        category: '地标',
        rating: 5,
        bestTime: '下午，日落前',
      },
    ],

    experiences: [
      {
        id: 'lemon-tour',
        title: '柠檬园品鉴之旅',
        description: '在百年柠檬梯田中漫步，了解阿马尔菲大柠檬（Sfusato）的种植传统，亲手制作一瓶 Limoncello。',
        category: '美食',
        duration: '2 小时',
        difficulty: '轻松',
      },
      {
        id: 'cooking-class-amalfi',
        title: '悬崖烹饪课',
        description: '在俯瞰地中海的露台上学习制作手工意面、番茄酱与柠檬提拉米苏，配以当地葡萄酒。',
        category: '美食',
        duration: '3 小时',
        difficulty: '轻松',
      },
      {
        id: 'boat-tour',
        title: '海岸私人游船',
        description: '乘传统 Gozzo 木船沿海岸航行，探访隐秘海蚀洞与无人海滩。在翡翠洞中游泳，配以冰镇起泡酒。',
        category: '自然',
        duration: '半天',
        difficulty: '轻松',
      },
      {
        id: 'ceramic-workshop',
        title: '维耶特里陶瓷工坊',
        description: '在海岸最著名的陶瓷小镇，跟随匠人学习手绘传统地中海图案的陶瓷工艺。',
        category: '文化',
        duration: '2 小时',
        difficulty: '轻松',
      },
    ],

    itinerary: [
      {
        day: 1,
        title: '波西塔诺与海岸初探',
        items: [
          { time: '09:00', title: '波西塔诺漫步', description: '从海滩拾级而上，穿梭于精品店与陶瓷工坊之间', attractionId: 'positano', type: '活动' },
          { time: '12:00', title: '海滩午餐', description: '在 Marina Grande 海滩边享用海鲜意面与冰镇白葡萄酒', type: '餐饮' },
          { time: '14:30', title: '私人游船', description: '乘传统木船沿海岸探索海蚀洞与隐秘海滩', type: '活动' },
          { time: '17:00', title: '波西塔诺日落', description: '在 Le Sirenuse 酒店的香槟酒吧观赏日落', type: '活动' },
          { time: '20:00', title: '米其林晚餐', description: '在悬崖边的 fine dining 餐厅品尝创新坎帕尼亚料理', type: '餐饮' },
        ],
      },
      {
        day: 2,
        title: '众神之路与拉韦洛',
        items: [
          { time: '06:30', title: '众神之路徒步', description: '清晨出发，在晨光中沿 7 公里悬崖步道徒步', attractionId: 'path-of-gods', type: '活动' },
          { time: '10:30', title: '诺切莱咖啡', description: '在徒步终点的小村庄喝一杯意式浓缩', type: '餐饮' },
          { time: '11:30', title: '拉韦洛花园', description: '探访鲁菲洛别墅与辛波内别墅的绝世花园', attractionId: 'ravello', type: '活动' },
          { time: '13:30', title: '悬崖露台午餐', description: '在拉韦洛悬崖露台享用意式午餐', type: '餐饮' },
          { time: '16:00', title: '阿马尔菲大教堂', description: '参观阿拉伯-诺曼风格的千年大教堂', attractionId: 'amalfi-cathedral', type: '活动' },
          { time: '19:00', title: '阿马尔菲晚餐', description: '在阿马尔菲海港边品尝当日海鲜与手工意面', type: '餐饮' },
        ],
      },
      {
        day: 3,
        title: '柠檬海岸与慢生活',
        items: [
          { time: '09:00', title: '柠檬园探访', description: '在百年柠檬梯田间漫步，了解 Limoncello 酿造', type: '活动' },
          { time: '11:00', title: '烹饪课', description: '学习手工意面与意式甜点的制作秘诀', type: '活动' },
          { time: '13:30', title: '品尝自己的作品', description: '在悬崖露台享用亲手制作的意式午餐', type: '餐饮' },
          { time: '15:30', title: '弗罗雷峡湾', description: '探访意大利唯一的峡湾，在翡翠色海水中游泳', attractionId: 'fiordo-furore', type: '活动' },
          { time: '17:30', title: '海岸公路自驾', description: '沿 SS163 公路驾驶，在每一个观景台停留', type: '活动' },
          { time: '20:00', title: '告别晚餐', description: '在柠檬树下的家庭餐厅享用最后一顿南意盛宴', type: '餐饮' },
        ],
      },
    ],

    seasons: [
      { season: '春', months: '4月-5月', description: '柠檬花盛开，气温宜人，徒步最佳时节', temperature: '14°C - 24°C', rating: 5 },
      { season: '夏', months: '6月-9月', description: '旺季。海滩与游船体验最佳，但人潮汹涌物价高涨', temperature: '22°C - 33°C', rating: 3 },
      { season: '秋', months: '10月-11月', description: '阳光温和，海水仍暖，柑橘丰收，是蜜月旅行的完美选择', temperature: '15°C - 25°C', rating: 5 },
      { season: '冬', months: '12月-3月', description: '多数酒店与餐厅歇业，但圣诞灯火温暖，适合清静旅居', temperature: '8°C - 15°C', rating: 2 },
    ],

    practicalInfo: {
      language: '意大利语，旅游区英语基本通用',
      currency: '欧元 (EUR)',
      timezone: 'UTC+1 (中欧时间)',
      visa: '申根签证（需提前办理）',
      bestSeason: '4月-5月, 9月-10月',
      averageCost: '€200-450/天 (不含国际机票)',
    },

    aiTags: ['海岸', '美食', '蜜月', '自驾', '摄影', '徒步', '葡萄酒'],
    aiTravelStyle: '甜蜜生活慢旅行 — 适合甜蜜情侣、美食爱好者与地中海文化追寻者',
  },

  // ══════════════════════════════════════════════════════════════
  // 巴厘岛
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bali',
    image:
      '/destinations/bali.jpg',
    title: '巴厘岛',
    subtitle: '印度尼西亚',
    description:
      '翠绿梯田与神圣庙宇 — 这座岛屿，灵性与自然同频共振。',
    coordinates: { lat: -8.3405, lng: 115.0920 },
    mapViewport: { center: { lat: -8.3405, lng: 115.0920 }, zoom: 10, pitch: 30, bearing: 0 },

    atmosphere: ['禅意', '热带', '文化'],

    introduction: `巴厘岛，众神之岛，是一个让灵魂找到归宿的地方。这里不同于任何其他海岛——它不仅有碧海蓝天，更有一千年的印度教文化沉淀在每一块石雕、每一座庙宇、每一缕焚香之中。清晨的乌布，薄雾在梯田上方飘荡，寺庙的钟声与鸟鸣交织，空气中混合着鸡蛋花的甜香与焚香的清冽。

    在巴厘岛，灵性不是高高在上的哲学，而是日常生活的一部分。每家每户的门前都摆放着小小的祭品盒（Canang Sari），用棕榈叶编织，盛放着鲜花与米饭——这是献给众神的一日三餐。而这种对精神的关注，也延伸到了巴厘人的待客之道：按摩、瑜伽、冥想、素食——养生在这里不是潮流，而是千年传承的生活方式。

    但巴厘岛也是感官的盛宴。从水明漾的日落海滩酒吧到乌布的有机咖啡馆，从街头沙爹的烟火气到 fine dining 餐厅的创意料理，从冲浪圣地的浪花到丛林深处的瀑布——这座岛屿总有一面恰好契合你的频率。`,

    highlights: [
      { icon: 'Mountain', title: '德格拉朗梯田', description: '千年苏巴克灌溉系统创造的人间奇迹，翡翠色阶梯延伸至天际' },
      { icon: 'Temple', title: '海神庙', description: '海中巨石上的千年庙宇，涨潮时如漂浮海面，日落时分最为神圣' },
      { icon: 'Droplets', title: '圣泉寺', description: '在千年圣泉的水流下接受净化仪式，体验巴厘岛的精神内核' },
      { icon: 'Sunset', title: '乌鲁瓦图断崖', description: '70 米悬崖上的海景寺庙，搭配震撼的 Kecak 火舞表演' },
    ],

    attractions: [
      {
        id: 'tegallalang',
        name: '德格拉朗梯田',
        coordinates: { lat: -8.4315, lng: 115.2795 },
        description: '乌布最上镜的梯田，千年"苏巴克"水利系统的杰作。清晨薄雾弥漫时最为梦幻，是巴厘岛最具代表性的画面。',
        category: '自然',
        rating: 5,
        bestTime: '清晨 7:00-9:00',
      },
      {
        id: 'tanah-lot',
        name: '海神庙',
        coordinates: { lat: -8.6213, lng: 115.0868 },
        description: '16世纪建造于海中巨礁之上，涨潮时如漂浮于海面。日落时分金光照耀庙宇轮廓，是巴厘岛最神圣的时刻。',
        category: '寺庙',
        rating: 5,
        bestTime: '日落前 1 小时',
      },
      {
        id: 'uluwatu',
        name: '乌鲁瓦图寺',
        coordinates: { lat: -8.8291, lng: 115.0849 },
        description: '建于70米悬崖之巅的海神庙，可俯瞰印度洋无尽蓝海。黄昏时的 Kecak 火舞表演不容错过。',
        category: '寺庙',
        rating: 5,
        bestTime: '傍晚 17:00-19:00',
      },
      {
        id: 'tirta-empul',
        name: '圣泉寺',
        coordinates: { lat: -8.4164, lng: 115.3150 },
        description: '千年圣泉从地下涌出，巴厘人相信此水可净化身心。游客可参与传统沐浴仪式，在祭司祝福中接受洗礼。',
        category: '寺庙',
        rating: 4,
        bestTime: '上午',
      },
      {
        id: 'monkey-forest',
        name: '圣猴森林',
        coordinates: { lat: -8.5187, lng: 115.2586 },
        description: '乌布市中心的自然保护区，超过600只长尾猕猴栖息于古树与寺庙之间。古老石像覆盖着苔藓，神秘而野趣。',
        category: '自然',
        rating: 4,
        bestTime: '上午 9:00-11:00',
      },
      {
        id: 'mount-batur',
        name: '巴图尔火山',
        coordinates: { lat: -8.2422, lng: 115.3752 },
        description: '凌晨出发，在星空下攀登至1717米的山顶，在火山口旁等待日出云海照亮阿贡火山的壮丽瞬间。',
        category: '自然',
        rating: 5,
        bestTime: '凌晨 2:00 出发',
      },
    ],

    experiences: [
      {
        id: 'water-purification',
        title: '圣泉净化仪式',
        description: '在圣泉寺的千年圣水中接受传统净化仪式。身穿巴厘传统服饰，在祭司引导下完成完整的沐浴祈祷流程。',
        category: '文化',
        duration: '1.5 小时',
        difficulty: '轻松',
      },
      {
        id: 'silver-class',
        title: '银器手作工坊',
        description: '在乌布的银器匠人工作室中，学习传统工艺，亲手打造一枚专属银戒或吊坠。',
        category: '文化',
        duration: '2-3 小时',
        difficulty: '轻松',
      },
      {
        id: 'balinese-cooking',
        title: '巴厘烹饪课',
        description: '清晨逛传统市场采购香料，然后回到稻田旁的开放厨房学习制作沙爹、咖喱与巴厘特色甜品。',
        category: '美食',
        duration: '4 小时',
        difficulty: '轻松',
      },
      {
        id: 'sunrise-yoga',
        title: '日出瑜伽冥想',
        description: '在乌布丛林上方的瑜伽馆中，迎着晨光完成一场哈他瑜伽与冥想——巴厘式清晨的最佳打开方式。',
        category: '养生',
        duration: '1.5 小时',
        difficulty: '轻松',
      },
    ],

    itinerary: [
      {
        day: 1,
        title: '乌布文化与艺术',
        items: [
          { time: '07:00', title: '德格拉朗梯田', description: '在清晨薄雾中漫步千年梯田', attractionId: 'tegallalang', type: '活动' },
          { time: '09:30', title: '圣猴森林', description: '在古寺与苔藓石像间遇见巴厘猕猴', attractionId: 'monkey-forest', type: '活动' },
          { time: '12:00', title: '乌布午餐', description: '在稻田旁的有机咖啡馆享用健康碗', type: '餐饮' },
          { time: '14:00', title: '银器工坊', description: '在匠人指导下亲手打造银饰', type: '活动' },
          { time: '16:30', title: '圣泉寺净化', description: '在千年圣泉中接受传统净化仪式', attractionId: 'tirta-empul', type: '活动' },
          { time: '19:00', title: '乌布晚餐', description: '在丛林中的 fine dining 餐厅享用创意巴厘料理', type: '餐饮' },
        ],
      },
      {
        day: 2,
        title: '火山与海洋',
        items: [
          { time: '02:00', title: '巴图尔火山日出', description: '凌晨出发，在星空下攀登至火山口', attractionId: 'mount-batur', type: '活动' },
          { time: '07:00', title: '火山顶早餐', description: '在火山口旁享用蒸汽烹煮的鸡蛋与热茶', type: '餐饮' },
          { time: '11:00', title: '咖啡庄园探访', description: '探访咖啡种植园，品尝猫屎咖啡与巴厘香草茶', type: '活动' },
          { time: '13:00', title: '午餐与休整', description: '返回酒店休息，享受泳池与按摩', type: '休息' },
          { time: '17:00', title: '乌鲁瓦图寺', description: '在悬崖寺庙观赏 Kecak 火舞与印度洋日落', attractionId: 'uluwatu', type: '活动' },
          { time: '20:00', title: '金巴兰海鲜烧烤', description: '在海滩上赤脚享用炭火海鲜烧烤', type: '餐饮' },
        ],
      },
      {
        day: 3,
        title: '灵性与告别',
        items: [
          { time: '06:30', title: '日出瑜伽', description: '在丛林瑜伽馆中迎接巴厘岛的晨光', type: '活动' },
          { time: '09:00', title: '传统市场', description: '逛乌布传统市场，采购香料与手工艺品', type: '活动' },
          { time: '10:30', title: '巴厘烹饪课', description: '在稻田旁的厨房学习三道巴厘经典菜肴', type: '活动' },
          { time: '13:30', title: '自制午餐', description: '品尝自己亲手烹饪的巴厘盛宴', type: '餐饮' },
          { time: '15:00', title: '海神庙日落', description: '在日落时分探访海中千年古寺', attractionId: 'tanah-lot', type: '活动' },
          { time: '19:00', title: '告别晚餐', description: '在悬崖边的海鲜餐厅以印度洋晚霞佐餐', type: '餐饮' },
        ],
      },
    ],

    seasons: [
      { season: '春', months: '4月-6月', description: '旱季开端，雨量少、湿度低，是旅行的最佳时节', temperature: '24°C - 32°C', rating: 5 },
      { season: '夏', months: '7月-9月', description: '旺季。天气晴好，海浪适合冲浪，酒店价格最高', temperature: '23°C - 31°C', rating: 4 },
      { season: '秋', months: '10月-12月', description: '雨季初临，午后阵雨后空气清新，游客渐少价格回落', temperature: '24°C - 33°C', rating: 3 },
      { season: '冬', months: '1月-3月', description: '雨季高峰但多为短暂骤雨，稻田最翠绿，适合瑜伽旅修', temperature: '24°C - 32°C', rating: 3 },
    ],

    practicalInfo: {
      language: '印尼语，旅游区英语通用',
      currency: '印尼盾 (IDR)',
      timezone: 'UTC+8 (东八区，与中国同时区)',
      visa: '落地签或电子签（中国护照）',
      bestSeason: '4月-9月',
      averageCost: 'IDR 800,000-3,000,000/天 (不含国际机票)',
    },

    aiTags: ['寺庙', '梯田', '瑜伽', '冲浪', '美食', '养生', '火山'],
    aiTravelStyle: '灵性海岛慢生活 — 适合瑜伽修行者、素食主义者、冲浪玩家与文化探索者',
  },

  // ══════════════════════════════════════════════════════════════
  // 巴塔哥尼亚
  // ══════════════════════════════════════════════════════════════
  {
    id: 'patagonia',
    image:
      '/destinations/patagonia.jpg',
    title: '巴塔哥尼亚',
    subtitle: '阿根廷',
    description:
      '锯齿般的山峰俯瞰着冰川 — 在世界尽头，发现内心深处的起点。',
    coordinates: { lat: -49.3315, lng: -72.8865 },
    mapViewport: { center: { lat: -49.3315, lng: -72.8865 }, zoom: 9, pitch: 60, bearing: -20 },

    atmosphere: ['野性', '冒险', '宁静'],

    introduction: `巴塔哥尼亚，南美洲最南端的荒野，是一片让你同时感到渺小与力量的奇异土地。这里的风有自己的名字——安第斯山脉在西面拦截了太平洋的水汽，造就了地球上最壮观的冰原与最锯齿状的花岗岩山峰。每当黎明将菲茨罗伊峰染成玫瑰色的那一刻，你会明白为什么探险家们将这里称为"世界的尽头"。

    这片土地的尺度是惊人的。佩里托莫雷诺冰川以每天两米的速度向前推进，巨大的冰墙不时崩落，发出雷鸣般的巨响落入阿根廷湖。百内国家公园的三座花岗岩塔峰，在巴塔哥尼亚著名的强风中巍然矗立，挑战着每一位徒步者的意志。这里是世界上为数不多可以让你真正感受到地球原始力量的地方。

    但巴塔哥尼亚并非只有粗犷。在埃尔查尔滕小镇的木屋旅馆里，炉火噼啪作响，阿根廷马尔贝克红酒在杯中晃动，窗外就是世界上最壮丽的山景。在这里，每一次终点都像是新世界的起点。`,

    highlights: [
      { icon: 'Triangle', title: '菲茨罗伊峰', description: '巴塔哥尼亚最上镜的山峰，日出时如火烧般从地平线跃起' },
      { icon: 'Mountain', title: '佩里托莫雷诺冰川', description: '地球上为数不多仍在增长的冰川，近距离感受冰崩的雷霆之威' },
      { icon: 'Compass', title: '百内国家公园', description: '世界顶级徒步天堂，三塔、法国谷、格雷冰川——三条经典线路各具魅力' },
      { icon: 'Globe', title: '火地岛', description: '泛美公路的终点，在世界最南端的城市感受"天涯海角"的孤独与浪漫' },
    ],

    attractions: [
      {
        id: 'fitz-roy',
        name: '菲茨罗伊峰',
        coordinates: { lat: -49.2714, lng: -73.0433 },
        description: '海拔3405米的花岗岩巨峰，被当地人称"El Chaltén"（冒烟的山）。日出时分山体被染成玫瑰金色，是全世界徒步者的朝圣地。',
        category: '自然',
        rating: 5,
        bestTime: '日出时分',
      },
      {
        id: 'perito-moreno',
        name: '佩里托莫雷诺冰川',
        coordinates: { lat: -50.4965, lng: -73.1377 },
        description: '面积250平方公里、冰墙高达70米的巨型冰川。每隔数分钟便有巨冰崩落入湖，轰鸣声震撼人心。',
        category: '自然',
        rating: 5,
        bestTime: '上午至下午',
      },
      {
        id: 'torres-del-paine',
        name: '百内国家公园',
        coordinates: { lat: -51.0068, lng: -73.0855 },
        description: '世界生物圈保护区，三座标志性花岗岩塔峰耸立在巴塔哥尼亚草原之上。W线与O线徒步是全球十佳徒步路线。',
        category: '自然',
        rating: 5,
        bestTime: '全天，日出与日落最佳',
      },
      {
        id: 'ushuaia',
        name: '火地岛（乌斯怀亚）',
        coordinates: { lat: -54.8019, lng: -68.3030 },
        description: '世界最南端的城市，泛美公路的终点。乘复古蒸汽火车探访火地岛国家公园，或乘船驶向比格尔海峡的企鹅岛。',
        category: '地标',
        rating: 4,
        bestTime: '全天',
      },
      {
        id: 'glacier-grey',
        name: '格雷冰川',
        coordinates: { lat: -51.0140, lng: -73.2225 },
        description: '百内国家公园内的蓝色冰川，可乘船近距离观赏或冰上徒步。冰蓝色的隧道与裂缝是摄影师的梦想素材。',
        category: '自然',
        rating: 5,
        bestTime: '上午',
      },
      {
        id: 'laguna-torre',
        name: '托雷湖',
        coordinates: { lat: -49.3215, lng: -73.0000 },
        description: '徒步8小时抵达的高山冰湖，湖面上漂浮着冰川崩落的巨型浮冰，背景是险峻的托雷峰。',
        category: '自然',
        rating: 4,
        bestTime: '日出时分',
      },
    ],

    experiences: [
      {
        id: 'ice-trekking',
        title: '冰川徒步',
        description: '穿上冰爪踏上万年蓝冰，在专业向导带领下深入冰川腹地。穿越冰裂缝与蓝洞隧道，喝一杯冰川威士忌。',
        category: '户外',
        duration: '半天或全天',
        difficulty: '适中',
      },
      {
        id: 'fitz-roy-hike',
        title: '菲茨罗伊日出徒步',
        description: '凌晨2点出发，在星空下徒步4小时抵达 Laguna de los Tres 观景台，等待巴塔哥尼亚最神圣的日出。',
        category: '户外',
        duration: '8-10 小时',
        difficulty: '挑战',
      },
      {
        id: 'horseback-riding',
        title: '骑马穿越草原',
        description: '跟随高乔牧人骑上克里奥尔马，穿过巴塔哥尼亚草原与原始森林，以传统游牧方式探索安第斯山麓。',
        category: '户外',
        duration: '半天',
        difficulty: '适中',
      },
      {
        id: 'estancia-dinner',
        title: '庄园烤肉晚宴',
        description: '在百年巴塔哥尼亚庄园中，享用柴火慢烤的全羊与阿根廷马尔贝克红酒，听高乔牧人吉他弹唱。',
        category: '美食',
        duration: '3 小时',
        difficulty: '轻松',
      },
    ],

    itinerary: [
      {
        day: 1,
        title: '冰川日',
        items: [
          { time: '08:00', title: '抵达冰川国家公园', description: '从埃尔卡拉法特出发前往佩里托莫雷诺冰川', type: '交通' },
          { time: '10:00', title: '冰川观景步道', description: '沿4公里步道系统从不同角度欣赏冰川全景', attractionId: 'perito-moreno', type: '活动' },
          { time: '12:00', title: '冰川徒步', description: '穿冰爪踏上万年蓝冰，深入冰川腹地', type: '活动' },
          { time: '14:00', title: '野餐午餐', description: '在冰川观景台享用巴塔哥尼亚风味野餐', type: '餐饮' },
          { time: '16:00', title: '冰崩观赏', description: '静待巨冰从70米高处崩落湖中的震撼瞬间', type: '活动' },
          { time: '20:00', title: '庄园烤肉晚宴', description: '在百年庄园中享用柴火慢烤全羊', type: '餐饮' },
        ],
      },
      {
        day: 2,
        title: '菲茨罗伊朝圣',
        items: [
          { time: '02:00', title: '凌晨出发', description: '在星空下开始向巴塔哥尼亚最壮丽的山峰徒步', type: '活动' },
          { time: '06:00', title: '菲茨罗伊日出', description: '在 Laguna de los Tres 见证火烧菲茨罗伊的神圣时刻', attractionId: 'fitz-roy', type: '活动' },
          { time: '09:00', title: '山间早餐', description: '在冰川湖畔享用便携早餐，享受一生一次的风景', type: '餐饮' },
          { time: '12:00', title: '返回埃尔查尔滕', description: '沿原路下山，欣赏之前黑暗中错过的沿途美景', type: '活动' },
          { time: '15:00', title: '小镇午餐', description: '在埃尔查尔滕的精酿啤酒吧庆祝登顶', type: '餐饮' },
          { time: '19:00', title: '日落休息', description: '在木屋旅馆的壁炉旁放松酸痛的肌肉', type: '休息' },
        ],
      },
      {
        day: 3,
        title: '荒野马背与世界尽头',
        items: [
          { time: '09:00', title: '骑马穿越草原', description: '跟随高乔牧人骑马穿越巴塔哥尼亚金色草原', type: '活动' },
          { time: '12:00', title: '牧场午餐', description: '在安第斯山麓的牧场享用传统 asado 烤肉', type: '餐饮' },
          { time: '14:00', title: '托雷湖徒步', description: '短程徒步前往托雷峰冰湖，湖面漂浮着巨型浮冰', attractionId: 'laguna-torre', type: '活动' },
          { time: '17:00', title: '告别日落', description: '在埃尔查尔滕的观景台与巴塔哥尼亚的群峰告别', type: '活动' },
          { time: '20:00', title: '告别晚餐', description: '以一杯马尔贝克红酒与烤羊排为巴塔哥尼亚之旅画上句号', type: '餐饮' },
        ],
      },
    ],

    seasons: [
      { season: '春', months: '10月-11月', description: '野花初绽，风力渐弱，游客尚少，是徒步的完美窗口', temperature: '5°C - 16°C', rating: 4 },
      { season: '夏', months: '12月-2月', description: '旺季。日照长达18小时，所有路线全面开放，是徒步黄金季节', temperature: '8°C - 20°C', rating: 5 },
      { season: '秋', months: '3月-4月', description: '山毛榉林转红金黄，摄影光线绝佳，但风力增大', temperature: '3°C - 14°C', rating: 4 },
      { season: '冬', months: '5月-9月', description: '大雪封山，多数步道关闭，但是冰雪探险与雪景摄影的独特季节', temperature: '-5°C - 5°C', rating: 2 },
    ],

    practicalInfo: {
      language: '西班牙语，旅游区英语基本通用',
      currency: '阿根廷比索 (ARS)',
      timezone: 'UTC-3 (阿根廷时间)',
      visa: '中国护照免签（阿根廷）',
      bestSeason: '11月-3月',
      averageCost: 'ARS 80,000-250,000/天 (不含国际机票)',
    },

    aiTags: ['冰川', '雪山', '徒步', '荒野', '摄影', '极限运动', '马背'],
    aiTravelStyle: '极致荒野探险 — 适合硬核徒步爱好者、风光摄影师与冒险精神不灭的旅行者',
  },

  // ══════════════════════════════════════════════════════════════
  // 上海
  // ══════════════════════════════════════════════════════════════
  {
    id: 'shanghai',
    image:
      '/destinations/shanghai.jpg',
    title: '上海',
    subtitle: '中国',
    description:
      '浦江两岸的百年繁华 — 梧桐深处是老上海的呢喃，摩天楼上是中国的新高度。',

    coordinates: { lat: 31.2304, lng: 121.4737 },
    mapViewport: { center: { lat: 31.2304, lng: 121.4737 }, zoom: 11, pitch: 40, bearing: 0 },

    atmosphere: ['奢华', '文化', '温暖', '冒险'],

    introduction: `上海，中国最具国际气息的都市，是近代中国开埠以来中西文化碰撞的前沿。外滩的万国建筑群在黄浦江边矗立百年，对岸的陆家嘴摩天楼群每天都在刷新天际线——这座城市同时活在1920年代的Art Deco与2020年代的未来主义里。

    但上海不只有摩天大楼。梧桐树下的法租界，藏着这座城市最柔软的一面。清晨的弄堂里，阿姨们拎着竹篮去买菜，油条在锅里滋滋作响；午后的武康路咖啡馆，阳光透过法国梧桐洒在斑驳的红砖墙上；夜晚的外滩，老克勒们在和平饭店的爵士吧里随着萨克斯轻轻摇摆。上海的魔力正在于这种对比：最前卫的与最怀旧的、最国际的与最本地的——它们在同一座城市里和谐共存。

    这是一座永不疲倦的城市。无论是米其林三星的分子料理还是弄堂口的葱油拌面，无论是K11的艺术展还是豫园的灯会，上海总有一种方式让你感受到它的脉搏。来这里不是为了看风景——而是为了感受一座城市可以有多大的可能性。`,

    highlights: [
      { icon: 'Building2', title: '外滩万国建筑群', description: '黄浦江畔的百年建筑博物馆，52幢风格各异的大楼讲述着上海的黄金年代' },
      { icon: 'Landmark', title: '陆家嘴天际线', description: '上海中心、环球金融中心、金茂大厦——三座摩天楼定义了亚洲最具未来感的天际线' },
      { icon: 'Coffee', title: '法租界梧桐街区', description: '武康路、安福路、五原路——在百年梧桐树下喝一杯精品咖啡，感受老上海的慢时光' },
      { icon: 'Palette', title: '当代艺术先锋', description: '从西岸美术馆到PSA当代艺术博物馆，上海是中国当代艺术最活跃的阵地' },
    ],

    attractions: [
      {
        id: 'the-bund',
        name: '外滩',
        coordinates: { lat: 31.2400, lng: 121.4905 },
        description: '黄浦江西岸1.5公里长的百年建筑群，被誉为"万国建筑博览"。夜晚灯光亮起时最为壮观，对岸陆家嘴的摩天楼群尽收眼底。',
        category: '地标',
        rating: 5,
        bestTime: '傍晚至夜晚',
      },
      {
        id: 'lujiazui',
        name: '陆家嘴金融区',
        coordinates: { lat: 31.2357, lng: 121.5012 },
        description: '中国最具标志性的CBD天际线。上海中心大厦632米，是中国第一高楼，118层观光厅可360度俯瞰整座城市。',
        category: '观景点',
        rating: 5,
        bestTime: '下午至日落时分',
      },
      {
        id: 'yu-garden',
        name: '豫园',
        coordinates: { lat: 31.2272, lng: 121.4926 },
        description: '建于明代的江南古典园林，假山、水池、亭台、回廊——在摩天楼的环绕下，守护着上海最后的明代雅韵。',
        category: '地标',
        rating: 5,
        bestTime: '上午 9:00-11:00',
      },
      {
        id: 'french-concession',
        name: '法租界',
        coordinates: { lat: 31.2093, lng: 121.4460 },
        description: '梧桐树覆盖的静谧街区，百年老洋房散落其间。武康大楼、巴金故居、各式独立咖啡馆与买手店——这里是上海最文艺的角落。',
        category: '观景点',
        rating: 5,
        bestTime: '午后至傍晚',
      },
      {
        id: 'west-bund',
        name: '西岸艺术区',
        coordinates: { lat: 31.1667, lng: 121.4575 },
        description: '黄浦江西岸的滨江艺术走廊，聚集了龙美术馆、余德耀美术馆、西岸美术馆等众多国际级艺术机构。',
        category: '博物馆',
        rating: 4,
        bestTime: '下午',
      },
      {
        id: 'xintiandi',
        name: '新天地',
        coordinates: { lat: 31.2195, lng: 121.4745 },
        description: '石库门老建筑改造而成的时尚街区，传统里弄与现代商业的完美融合。精品餐厅、酒吧、设计师店铺林立。',
        category: '美食',
        rating: 4,
        bestTime: '傍晚至夜间',
      },
    ],

    experiences: [
      {
        id: 'bund-walk',
        title: '外滩晨跑或夜行',
        description: '沿黄浦江步道慢跑或散步，一侧是百年万国建筑，一侧是未来主义摩天楼——这是上海最经典的体验。',
        category: '文化',
        duration: '1 小时',
        difficulty: '轻松',
      },
      {
        id: 'dim-sum-tour',
        title: '老城厢点心之旅',
        description: '跟随美食向导探访城隍庙与老西门的老字号，品尝小笼包、生煎、葱油拌面、蟹壳黄等地道上海味道。',
        category: '美食',
        duration: '3 小时',
        difficulty: '轻松',
      },
      {
        id: 'french-concession-bike',
        title: '梧桐区单车漫游',
        description: '骑共享单车穿行于法租界的梧桐林荫道，在武康路、安福路、五原路的咖啡馆、书店与画廊间随心停留。',
        category: '文化',
        duration: '半天',
        difficulty: '轻松',
      },
      {
        id: 'huangpu-river-cruise',
        title: '黄浦江夜游',
        description: '乘游船在黄浦江上欣赏两岸灯火。外滩的古典与陆家嘴的未来在夜色中同框——上海最美的45分钟。',
        category: '夜生活',
        duration: '45 分钟',
        difficulty: '轻松',
      },
    ],

    itinerary: [
      {
        day: 1,
        title: '外滩与老城厢',
        items: [
          { time: '09:00', title: '外滩漫步', description: '从外白渡桥出发，沿黄浦江西岸向南漫步，逐一欣赏万国建筑群', attractionId: 'the-bund', type: '活动' },
          { time: '11:00', title: '豫园', description: '探访上海保存最完好的明代园林，在九曲桥上喂锦鲤', attractionId: 'yu-garden', type: '活动' },
          { time: '12:30', title: '南翔馒头店', description: '在豫园内的百年老店品尝正宗南翔小笼包', type: '餐饮' },
          { time: '14:30', title: '上海博物馆', description: '在人民广场参观中国古代艺术精品，青铜器与陶瓷收藏世界一流', type: '活动' },
          { time: '17:00', title: '新天地', description: '在石库门建筑群中寻找一家露台餐厅，享受傍晚的 aperitif', attractionId: 'xintiandi', type: '活动' },
          { time: '19:30', title: '新天地晚餐', description: '在新天地的精品餐厅品尝融合上海菜，感受老建筑里的新生活', type: '餐饮' },
        ],
      },
      {
        day: 2,
        title: '梧桐区与当代上海',
        items: [
          { time: '09:30', title: '法租界单车漫游', description: '从武康大楼出发，骑车穿行于梧桐树下的文艺街区', attractionId: 'french-concession', type: '活动' },
          { time: '11:30', title: '安福路Brunch', description: '在安福路的网红咖啡馆享受悠闲的早午餐', type: '餐饮' },
          { time: '13:30', title: '西岸美术馆', description: '在黄浦江畔的世界级美术馆中感受中国当代艺术的脉搏', attractionId: 'west-bund', type: '活动' },
          { time: '16:00', title: '陆家嘴登高', description: '登上海中心118层观光厅，在云端俯瞰上海全景', attractionId: 'lujiazui', type: '活动' },
          { time: '18:30', title: '黄浦江夜游', description: '乘船在黄浦江上看两岸灯火交相辉映', type: '活动' },
          { time: '20:00', title: '外滩晚餐', description: '在外滩的江景餐厅享用以东方美学呈现的创新料理', type: '餐饮' },
        ],
      },
      {
        day: 3,
        title: '弄堂与日常',
        items: [
          { time: '08:00', title: '弄堂早餐', description: '在静安寺附近的弄堂里寻找老上海早餐——咸豆浆、粢饭团、油条', type: '餐饮' },
          { time: '10:00', title: 'M50创意园', description: '在莫干山路的旧工厂改造艺术区中探索画廊与艺术家工作室', type: '活动' },
          { time: '12:30', title: '本帮菜午餐', description: '在老字号品尝红烧肉、油爆虾、腌笃鲜等经典上海本帮菜', type: '餐饮' },
          { time: '14:30', title: '田子坊', description: '穿行于泰康路的弄堂迷宫，在手作小店与创意工坊中淘宝', type: '活动' },
          { time: '17:00', title: '思南公馆下午茶', description: '在百年花园洋房中享受老上海的优雅下午茶时光', type: '休息' },
          { time: '19:30', title: '告别晚餐', description: '在法租界的隐秘小馆，以一顿精致的fusion料理为上海之旅画上句号', type: '餐饮' },
        ],
      },
    ],

    seasons: [
      { season: '春', months: '3月-5月', description: '梧桐抽新芽，气温宜人，是最适合在法租界散步的季节', temperature: '10°C - 22°C', rating: 5 },
      { season: '夏', months: '6月-8月', description: '炎热潮湿但有最好的夜生活，外滩夜风与露台酒吧是夏日专属', temperature: '25°C - 36°C', rating: 3 },
      { season: '秋', months: '9月-11月', description: '梧桐叶金黄，天气最舒适，是上海最美的季节。大闸蟹上市，美食爱好者不容错过', temperature: '15°C - 25°C', rating: 5 },
      { season: '冬', months: '12月-2月', description: '湿冷但圣诞与新年的上海分外浪漫，各大商场节日装饰璀璨', temperature: '2°C - 10°C', rating: 3 },
    ],

    practicalInfo: {
      language: '普通话、上海话，旅游区英语通用',
      currency: '人民币 (CNY)',
      timezone: 'UTC+8 (东八区)',
      visa: '无需签证（国内目的地）',
      bestSeason: '3月-5月, 9月-11月',
      averageCost: '¥500-1,500/天 (不含往返交通)',
    },

    aiTags: ['都市', '美食', '建筑', '夜景', '艺术', '摄影', '购物'],
    aiTravelStyle: '现代都市深度游 — 适合城市探索者、美食爱好者、艺术迷与建筑摄影玩家',
  },

  // ══════════════════════════════════════════════════════════════
  // 九寨沟
  // ══════════════════════════════════════════════════════════════
  {
    id: 'jiuzhaigou',
    image:
      '/destinations/jiuzhaigou.jpg',
    title: '九寨沟',
    subtitle: '中国',
    description:
      '碧蓝海子倒映着雪峰与彩林 — 大自然在这里打翻了调色盘，每一眼都是不可复制的绝色。',

    coordinates: { lat: 33.2631, lng: 103.9186 },
    mapViewport: { center: { lat: 33.2631, lng: 103.9186 }, zoom: 12, pitch: 45, bearing: -20 },

    atmosphere: ['宁静', '野性', '冒险', '文化'],

    introduction: `九寨沟，位于四川省阿坝藏族羌族自治州，是中国最负盛名的自然景观之一，被联合国教科文组织列为世界自然遗产。这里的核心魅力来自118个高山湖泊——"海子"——每一个都呈现出令人难以置信的蓝绿色调。五花海、镜海、熊猫海、箭竹海……每一个名字后面都是一幅绝美的画卷。

    九寨沟的水是有灵魂的。湖水清澈到可以看到十几米深处横卧的古木，而水中丰富的矿物质与藻类在阳光折射下呈现出翡翠、宝蓝、碧绿、靛青——这些颜色鲜艳得让人觉得不真实。秋天的九寨沟更是人间仙境：五彩斑斓的枫叶与桦林倒映在碧蓝的海子中，远处的雪峰在蓝天白云下熠熠生辉——这里的秋天，让所有滤镜都显得多余。

    除了自然奇观，九寨沟周边还保留了浓郁的藏族文化。扎如寺的转经筒、藏家的青稞酒与酥油茶、热情奔放的锅庄舞——在这片净土上，大自然与人文和谐共生，每一个来访者都能找到内心的宁静。`,

    highlights: [
      { icon: 'Droplets', title: '五花海', description: '九寨沟的明信片级景观，湖水呈现五种颜色，清澈见底，古木横卧水底如同水下森林' },
      { icon: 'Waves', title: '诺日朗瀑布', description: '中国最宽的钙华瀑布，270米宽的白色水幕从翠绿的树丛间倾泻而下' },
      { icon: 'Mountain', title: '原始森林', description: '在海拔3000米的针叶林中徒步，松萝垂挂，空气清冽，偶遇松鼠与蓝马鸡' },
      { icon: 'Church', title: '扎如寺', description: '本教寺庙，转经筒与经幡在雪山背景下诉说着千年的藏地信仰' },
    ],

    attractions: [
      {
        id: 'five-flower-lake',
        name: '五花海',
        coordinates: { lat: 33.2197, lng: 103.8954 },
        description: '九寨沟最上镜的海子，因湖水深浅与沉积物不同而呈现鹅黄、墨绿、深蓝、宝蓝等色彩。水底的古木清晰可见。',
        category: '自然',
        rating: 5,
        bestTime: '上午 9:00-11:00（阳光直射湖面时色彩最丰富）',
      },
      {
        id: 'nuorilang-falls',
        name: '诺日朗瀑布',
        coordinates: { lat: 33.1856, lng: 103.8892 },
        description: '宽270米、落差24.5米的钙华瀑布，是中国最宽的瀑布。藏语意为"雄伟壮观"，秋季红叶映衬时尤为壮美。',
        category: '自然',
        rating: 5,
        bestTime: '上午至午后',
      },
      {
        id: 'mirror-lake',
        name: '镜海',
        coordinates: { lat: 33.2018, lng: 103.8934 },
        description: '水面如镜，完美倒映周围的雪山、森林与蓝天。清晨无风时最为震撼，倒影与实景难以分辨。',
        category: '自然',
        rating: 5,
        bestTime: '清晨 7:00-8:30（无风时）',
      },
      {
        id: 'primeval-forest',
        name: '原始森林',
        coordinates: { lat: 33.2402, lng: 103.9088 },
        description: '日则沟顶端的原始针叶林，松萝挂满枝头，空气中负氧离子含量极高。林间步道适合缓行冥想。',
        category: '自然',
        rating: 4,
        bestTime: '上午',
      },
      {
        id: 'shuzheng-waterfalls',
        name: '树正瀑布群',
        coordinates: { lat: 33.2087, lng: 103.8991 },
        description: '由数十个钙华瀑布组成的瀑布群，水流在树丛间穿行而下。秋叶季节色彩最为丰富。',
        category: '自然',
        rating: 5,
        bestTime: '全天',
      },
      {
        id: 'zarhu-temple',
        name: '扎如寺',
        coordinates: { lat: 33.2520, lng: 103.9110 },
        description: '始建于13世纪的本教寺庙，是九寨沟藏族文化的核心。转经筒、风马旗、酥油灯——在这里感受最纯粹的藏地信仰。',
        category: '寺庙',
        rating: 4,
        bestTime: '上午',
      },
    ],

    experiences: [
      {
        id: 'jiuzhai-hiking',
        title: '海子徒步穿越',
        description: '从五花海到诺日朗瀑布的徒步线，沿途经过多个绝美海子。秋天的彩林倒映在碧蓝湖水中，每一步都是风景。',
        category: '自然',
        duration: '4-5 小时',
        difficulty: '适中',
      },
      {
        id: 'tibetan-cuisine',
        title: '藏家晚餐体验',
        description: '在当地藏民家中品尝青稞酒、酥油茶、牦牛肉与糌粑。围着火炉听藏族老人讲述格萨尔王的故事。',
        category: '文化',
        duration: '2 小时',
        difficulty: '轻松',
      },
      {
        id: 'photography-tour',
        title: '日出摄影之旅',
        description: '清晨在专业摄影向导的带领下前往最佳机位，在游客到来之前捕获九寨沟最纯净的晨光。',
        category: '自然',
        duration: '3 小时',
        difficulty: '轻松',
      },
      {
        id: 'guozhuang-dance',
        title: '锅庄舞之夜',
        description: '在藏寨广场与当地人一起围着篝火跳锅庄舞。不需要会跳——这里欢迎每一个愿意加入的人。',
        category: '文化',
        duration: '1.5 小时',
        difficulty: '轻松',
      },
    ],

    itinerary: [
      {
        day: 1,
        title: '日则沟精华',
        items: [
          { time: '07:00', title: '镜海晨光', description: '清晨无风时抵达镜海，拍摄完美的雪山森林倒影', attractionId: 'mirror-lake', type: '活动' },
          { time: '09:00', title: '五花海', description: '在阳光直射湖面时欣赏传说中的五色湖水', attractionId: 'five-flower-lake', type: '活动' },
          { time: '11:00', title: '原始森林徒步', description: '沿日则沟栈道深入原始针叶林，呼吸最纯净的空气', attractionId: 'primeval-forest', type: '活动' },
          { time: '12:30', title: '诺日朗餐厅', description: '在景区内的诺日朗游客中心品尝川味简餐', type: '餐饮' },
          { time: '14:00', title: '诺日朗瀑布', description: '站在270米宽的瀑布前感受水雾扑面', attractionId: 'nuorilang-falls', type: '活动' },
          { time: '18:00', title: '藏家晚餐', description: '在沟口的藏家乐品尝牦牛肉火锅与青稞酒', type: '餐饮' },
        ],
      },
      {
        day: 2,
        title: '树正沟与藏族文化',
        items: [
          { time: '07:30', title: '树正瀑布群', description: '晨光中欣赏数十个钙华瀑布在丛林间奔流', attractionId: 'shuzheng-waterfalls', type: '活动' },
          { time: '10:00', title: '树正群海', description: '沿栈道穿行于大小不一的海子之间，每一个都如宝石般碧蓝', type: '活动' },
          { time: '12:00', title: '藏式午餐', description: '在树正寨品尝酥油茶、青稞饼与牦牛酸奶', type: '餐饮' },
          { time: '14:00', title: '扎如寺', description: '参访千年本教寺庙，转动经筒，悬挂经幡祈福', attractionId: 'zarhu-temple', type: '活动' },
          { time: '16:30', title: '藏寨探访', description: '走进当地藏民的家，了解九寨沟人的日常生活与传统文化', type: '活动' },
          { time: '19:00', title: '锅庄舞之夜', description: '与藏族同胞一起围着篝火跳锅庄舞，结束充实的一天', type: '活动' },
        ],
      },
      {
        day: 3,
        title: '深度探索与告别',
        items: [
          { time: '06:30', title: '日出摄影', description: '在专业向导带领下前往最佳机位，捕捉九寨沟清晨的第一缕光', type: '活动' },
          { time: '09:00', title: '熊猫海与箭竹海', description: '探访日则沟的第一对姐妹海子，在少有人至的清晨独享宁静', type: '活动' },
          { time: '12:00', title: '告别午餐', description: '在沟口的川菜馆品尝水煮牦牛肉与松茸炖鸡', type: '餐饮' },
          { time: '14:00', title: '九寨天堂温泉', description: '在雪山环抱的温泉中舒缓两天的疲惫——这是九寨沟给你的最后礼物', type: '休息' },
          { time: '17:00', title: '沟口纪念品', description: '购买藏族手工唐卡、牦牛毛围巾与松茸干货作为伴手礼', type: '活动' },
          { time: '19:00', title: '告别晚餐', description: '以一顿丰盛的川西料理为九寨沟之旅画上完美的句号', type: '餐饮' },
        ],
      },
    ],

    seasons: [
      { season: '春', months: '4月-5月', description: '冰雪消融，山花初绽，瀑布水量大增，游客尚少', temperature: '5°C - 18°C', rating: 4 },
      { season: '夏', months: '6月-8月', description: '绿意盎然，是避暑好去处。但正值雨季，偶有降雨影响能见度', temperature: '14°C - 26°C', rating: 3 },
      { season: '秋', months: '9月-11月', description: '九寨沟的黄金季节。彩林如火，碧水如镜，每一天都是一幅画', temperature: '3°C - 18°C', rating: 5 },
      { season: '冬', months: '12月-3月', description: '冰封瀑布、雪覆松林。蓝冰与白雪的九寨沟有一种纯粹的静谧之美', temperature: '-8°C - 5°C', rating: 4 },
    ],

    practicalInfo: {
      language: '普通话、藏语，旅游区普通话通用',
      currency: '人民币 (CNY)',
      timezone: 'UTC+8 (东八区)',
      visa: '无需签证（国内目的地）',
      bestSeason: '9月-11月',
      averageCost: '¥400-1,200/天 (不含往返交通)',
    },

    aiTags: ['湖泊', '森林', '摄影', '徒步', '自然', '藏族文化', '瀑布'],
    aiTravelStyle: '极致自然探索 — 适合风光摄影师、徒步爱好者与自然疗愈追寻者',
  },
];
