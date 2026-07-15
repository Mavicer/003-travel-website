/**
 * Demo 行程数据 — 预生成的个性化行程
 *
 * 每个目的地至少有一个 "default" 行程。
 * persona key 映射：couple / family / solo / friends → 对应不同同行者场景。
 * 当找不到精确匹配时，回退到 "default"。
 *
 * 这些行程与 destinations.ts 中的模板行程不同 —
 * 它们针对特定旅行者画像进行了个性化，使 AI 生成结果看起来更真实。
 */

import type { ItineraryDay } from './destinations';

interface DemoItinerary {
  title: string;
  overview: string;
  itinerary: ItineraryDay[];
}

export type PersonaKey = 'default' | 'couple' | 'family' | 'solo' | 'friends';

export const DEMO_ITINERARIES: Record<
  string,
  Partial<Record<PersonaKey, DemoItinerary>>
> = {
  /* ═══════════════════════════════════════════════════════════
     京都 — 情侣·浪漫文化之旅
     ═══════════════════════════════════════════════════════════ */
  kyoto: {
    couple: {
      title: '京都三日·禅意浪漫之旅',
      overview:
        '避开人潮的京都慢路线：清晨竹林、午后茶道、黄昏祇园。为情侣精选的浪漫时刻与安静角落。',
      itinerary: [
        {
          day: 1,
          title: '东山浪漫序章',
          items: [
            {
              time: '06:30',
              title: '岚山竹林晨光',
              description:
                '游客到来之前，与爱的人独享晨光穿透竹叶的魔法时刻。光线柔和，极适合拍照。',
              attractionId: 'arashiyama',
              type: '活动',
            },
            {
              time: '09:00',
              title: '和服散策',
              description:
                '在专业着付师帮助下换上精致的京友禅和服，挽手漫步于二年坂和三年坂的石板路。',
              type: '活动',
            },
            {
              time: '11:30',
              title: '抹茶与和果子',
              description:
                '在石塀小路深处的百年茶室，品尝手打抹茶与时令和果子。静谧的日式庭园是完美的背景。',
              type: '餐饮',
            },
            {
              time: '13:30',
              title: '清水寺祈愿',
              description:
                '登上清水舞台，在音羽瀑布前三道清泉各饮一口，许下两个人的愿望。',
              attractionId: 'kiyomizudera',
              type: '活动',
            },
            {
              time: '16:30',
              title: '哲学之道散步',
              description:
                '沿琵琶湖疏水缓缓而行，两旁樱花树影斑驳。找一张长椅坐下，静静看夕阳染红东山。',
              type: '活动',
            },
            {
              time: '19:00',
              title: '怀石料理晚宴',
              description:
                '在祇园附近的料亭享用季节怀石。八寸、向付、煮物、烧物——每一道都是京都的美学宣言。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 2,
          title: '禅意与市井',
          items: [
            {
              time: '07:30',
              title: '伏见稻荷晨拜',
              description:
                '清晨的千本鸟居几乎没有游客。两人牵手穿过朱红色的隧道，阳光从柱间倾泻而下。',
              attractionId: 'fushimi-inari',
              type: '活动',
            },
            {
              time: '10:30',
              title: '茶道体验',
              description:
                '在百年茶室中，茶道师为你们演绎一场完整的抹茶仪式。从帛纱的折叠到茶碗的转动，每一个动作都是时间的艺术。',
              type: '活动',
            },
            {
              time: '12:30',
              title: '锦市场寻味',
              description:
                '穿行于京都四百年的厨房。从渍物到抹茶甜点、从汤叶到京渍，分享每一口惊喜。',
              attractionId: 'nishiki-market',
              type: '餐饮',
            },
            {
              time: '14:30',
              title: '龙安寺枯山水',
              description:
                '并排坐在方丈庭前，面对十五块石头组成的枯山水。据说无论从哪个角度，都只能同时看到十四块——留一块给心中的圆满。',
              type: '活动',
            },
            {
              time: '17:00',
              title: '金阁寺夕照',
              description:
                '傍晚的金阁寺游客渐少。夕阳将金箔染成暖铜色，倒映在镜湖池中——这是京都一天中最温柔的时刻。',
              attractionId: 'kinkakuji',
              type: '活动',
            },
            {
              time: '19:30',
              title: '先斗町小巷晚餐',
              description:
                '在先斗町狭窄的巷弄中找到一家只有八个座位的居酒屋。清酒、烤串、和京都的夜。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 3,
          title: '慢时光告别',
          items: [
            {
              time: '09:00',
              title: '银阁寺与侘寂',
              description:
                '相比金阁的华丽，银阁的低调更接近京都的本质。在苔庭中慢行，感受「不足之美」。',
              type: '活动',
            },
            {
              time: '11:00',
              title: '精进料理',
              description:
                '在天龙寺或妙心寺品尝禅宗素斋。以时令蔬菜与豆腐为主角，清淡、精致、充满敬意。',
              type: '餐饮',
            },
            {
              time: '13:00',
              title: '伏见清酒之旅',
              description:
                '探访伏见的百年酒藏，品鉴三种不同精米步合的纯米大吟酿。为彼此挑选一瓶最喜欢的带回。',
              type: '活动',
            },
            {
              time: '15:30',
              title: '南禅寺水路阁',
              description:
                '明治时代的红砖水道桥与古老寺庙同框，是京都最独特的建筑对话。日落前最后一站。',
              type: '活动',
            },
            {
              time: '18:00',
              title: '鸭川纳凉',
              description:
                '买两罐啤酒，在鸭川河畔坐下。看暮色漫过三条大桥，听流水声与远处的三味线——这是京都送给你们的最后一份礼物。',
              type: '休息',
            },
            {
              time: '20:00',
              title: 'おばんざい告别晚餐',
              description:
                '在巷弄深处的家庭料理店，品尝京都人的日常滋味。简单、温暖、让人想再回来。',
              type: '餐饮',
            },
          ],
        },
      ],
    },
    default: {
      title: '京都三日·古都深度漫游',
      overview:
        '从东山到岚山，从禅寺到市井——用三天时间走进京都的灵魂深处。',
      itinerary: [
        {
          day: 1,
          title: '东山文化漫步',
          items: [
            {
              time: '07:00',
              title: '清水寺晨景',
              description:
                '清晨登清水寺舞台，俯瞰京都晨雾中的街巷。游客尚少，适合静心感受。',
              attractionId: 'kiyomizudera',
              type: '活动',
            },
            {
              time: '10:00',
              title: '二年坂·三年坂',
              description:
                '沿石板坡道漫步，探访手作陶器与京果子老铺。',
              type: '活动',
            },
            {
              time: '12:00',
              title: '汤豆腐午餐',
              description:
                '在南禅寺附近的百年豆腐老店，品尝京都名物汤豆腐。',
              type: '餐饮',
            },
            {
              time: '14:30',
              title: '银阁寺与哲学之道',
              description:
                '感受东山文化的侘寂美学，沿琵琶湖疏水散步。',
              type: '活动',
            },
            {
              time: '17:00',
              title: '祇园花见小路',
              description:
                '黄昏时分于花见小路漫步，偶遇盛装舞妓匆匆而过的身影。',
              attractionId: 'gion',
              type: '活动',
            },
            {
              time: '19:00',
              title: '先斗町居酒屋',
              description:
                '在京都最古老的夜生活街区享用庶民美食与地酒。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 2,
          title: '岚山与禅意',
          items: [
            {
              time: '06:30',
              title: '岚山竹林',
              description:
                '在游客到来之前独享晨光中的竹林小径。',
              attractionId: 'arashiyama',
              type: '活动',
            },
            {
              time: '09:00',
              title: '天龙寺庭园',
              description: '参观世界遗产枯山水庭园与曹源池。',
              type: '活动',
            },
            {
              time: '11:30',
              title: '精进料理',
              description: '在天龙寺内品尝禅宗素斋。',
              type: '餐饮',
            },
            {
              time: '14:00',
              title: '金阁寺',
              description:
                '参观金箔闪耀的鹿苑寺，镜湖池中倒影令人屏息。',
              attractionId: 'kinkakuji',
              type: '活动',
            },
            {
              time: '16:30',
              title: '龙安寺石庭',
              description:
                '面对枯山水石庭静坐，体会禅宗「以心传心」的意境。',
              type: '活动',
            },
            {
              time: '19:00',
              title: '河原町晚餐',
              description: '在京都最繁华的街区寻找心仪的餐厅。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 3,
          title: '伏见与市井',
          items: [
            {
              time: '07:30',
              title: '伏见稻荷大社',
              description:
                '穿过千本鸟居隧道，清晨光线穿过朱红柱间洒下神圣光影。',
              attractionId: 'fushimi-inari',
              type: '活动',
            },
            {
              time: '10:30',
              title: '锦市场',
              description:
                '穿行于京都厨房，品尝渍物、京果子与抹茶甜点。',
              attractionId: 'nishiki-market',
              type: '活动',
            },
            {
              time: '12:30',
              title: '市场午餐',
              description: '在锦市场附近的立食寿司店体验京都人的午餐节奏。',
              type: '餐饮',
            },
            {
              time: '14:30',
              title: '伏见酒藏',
              description:
                '探访百年酒造，品鉴三种纯米大吟酿。',
              type: '活动',
            },
            {
              time: '17:00',
              title: '京都站空中走廊',
              description:
                '在京都站的空中步道俯瞰整座城市，作为旅程的尾声。',
              type: '活动',
            },
            {
              time: '19:00',
              title: '告别晚餐',
              description:
                '在京都站伊势丹的美食街挑选心仪的餐厅，为旅程画上圆满句号。',
              type: '餐饮',
            },
          ],
        },
      ],
    },
  },

  /* ═══════════════════════════════════════════════════════════
     圣托里尼 — 蜜月·日落与美酒
     ═══════════════════════════════════════════════════════════ */
  santorini: {
    couple: {
      title: '圣托里尼三日·蜜月日落之旅',
      overview:
        '悬崖上的私人时刻：双体船日落、火山酒庄、悬崖晚餐。爱琴海为你们的爱情做背景。',
      itinerary: [
        {
          day: 1,
          title: '伊亚初见',
          items: [
            {
              time: '09:00',
              title: '伊亚小镇漫步',
              description:
                '在游客涌入之前探索伊亚的蓝顶教堂与白墙小巷，独享悬崖上的宁静。',
              attractionId: 'oia',
              type: '活动',
            },
            {
              time: '12:00',
              title: '悬崖午餐',
              description:
                '在俯瞰火山口的露台餐厅享用希腊沙拉、烤章鱼与冰镇 Assyrtiko。',
              type: '餐饮',
            },
            {
              time: '14:30',
              title: 'Santo 酒庄品鉴',
              description:
                '悬崖边的现代酒庄，为你们预留了最佳观景位。品鉴 6 款火山风土葡萄酒。',
              attractionId: 'santo-winery',
              type: '活动',
            },
            {
              time: '17:30',
              title: '伊亚日落',
              description:
                '占据城堡遗址的最佳观景点，见证天空从金色烧成绯红。这一刻只属于两个人。',
              attractionId: 'oia',
              type: '活动',
            },
            {
              time: '20:30',
              title: '悬崖烛光晚餐',
              description:
                '在伊亚最浪漫的悬崖餐厅，以地中海的星空佐餐。提前预订的靠海双人桌。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 2,
          title: '火山与海洋',
          items: [
            {
              time: '09:30',
              title: '双体船巡游',
              description:
                '乘豪华双体船环游火山口。甲板上只有你们和爱琴海的蓝。',
              type: '活动',
            },
            {
              time: '11:30',
              title: '火山岛温泉',
              description:
                '在帕利亚卡梅尼的硫磺温泉中浸泡，感受千年火山的余温。',
              attractionId: 'hot-springs',
              type: '活动',
            },
            {
              time: '13:00',
              title: '船上烧烤午餐',
              description:
                '船长亲自烤制的海鲜大餐，配以无限量冰镇白葡萄酒。',
              type: '餐饮',
            },
            {
              time: '15:30',
              title: '红沙滩浮潜',
              description:
                '在火山岩红沙滩的碧蓝海水中浮潜，探索海底火山地貌。',
              attractionId: 'red-beach',
              type: '活动',
            },
            {
              time: '18:00',
              title: '海上日落',
              description:
                '从海上回望圣托里尼，看夕阳将白色悬崖染成金橙色——比陆地视角更震撼。',
              type: '活动',
            },
            {
              time: '20:30',
              title: 'Ammoudi 湾海鲜',
              description:
                '在悬崖下的渔港品尝当日捕捞，章鱼在月光下晾晒，海浪轻拍脚下。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 3,
          title: '内陆与告别',
          items: [
            {
              time: '09:00',
              title: '皮尔戈斯城堡',
              description:
                '登圣托里尼最高点，360度俯瞰全岛。在废弃的城堡中寻找只属于你们的秘密角落。',
              type: '活动',
            },
            {
              time: '11:00',
              title: '希腊烹饪课',
              description:
                '在当地人家中一起学习制作番茄炸饼、蚕豆泥与蜂蜜核桃千层酥。两个人一起下厨的记忆最珍贵。',
              type: '活动',
            },
            {
              time: '13:30',
              title: '自制午餐',
              description:
                '在洒满阳光的露台上品尝亲手制作的希腊料理。你们的手艺，地中海的味道。',
              type: '餐饮',
            },
            {
              time: '15:30',
              title: '悬崖步道徒步',
              description:
                '费拉至伊亚的 10 公里绝美步道。牵手走过蓝顶教堂、火山悬崖与无尽海景。',
              type: '活动',
            },
            {
              time: '18:00',
              title: '最后一场日落',
              description:
                '在伊亚城堡遗址与圣托里尼告别。这一次不拍照——只用心记住。',
              type: '活动',
            },
            {
              time: '20:30',
              title: '米其林告别晚宴',
              description:
                '在悬崖边的 fine dining 餐厅享受创新希腊料理。为蜜月之旅画上完美的句号。',
              type: '餐饮',
            },
          ],
        },
      ],
    },
    default: {
      title: '圣托里尼三日·蓝白梦幻之旅',
      overview:
        '悬崖小镇、火山温泉、爱琴海日落——在地中海最浪漫的岛屿度过完美的三天。',
      itinerary: [
        {
          day: 1,
          title: '悬崖小镇与日落',
          items: [
            {
              time: '09:00',
              title: '费拉漫步',
              description:
                '沿悬崖步道探索首府小镇，逛手作店铺与艺术画廊。',
              attractionId: 'fira',
              type: '活动',
            },
            {
              time: '12:00',
              title: '悬崖午餐',
              description: '在费拉悬崖边的希腊餐厅享用烤章鱼与希腊沙拉。',
              type: '餐饮',
            },
            {
              time: '14:30',
              title: '阿克罗蒂里遗址',
              description: '探访爱琴海的庞贝古城。',
              attractionId: 'akrotiri',
              type: '活动',
            },
            {
              time: '16:30',
              title: 'Santo 酒庄',
              description: '悬崖品酒，等待日落的暖金色光芒。',
              attractionId: 'santo-winery',
              type: '活动',
            },
            {
              time: '18:30',
              title: '伊亚日落',
              description: '在世界最美日落点见证天空从金色到绯红。',
              attractionId: 'oia',
              type: '活动',
            },
            {
              time: '20:00',
              title: '伊亚晚餐',
              description: '在悬崖露台享用地中海海鲜盛宴。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 2,
          title: '火山与海洋',
          items: [
            {
              time: '09:00',
              title: '红沙滩',
              description: '在火山岩红沙滩游泳与浮潜。',
              attractionId: 'red-beach',
              type: '活动',
            },
            {
              time: '11:00',
              title: '火山岛温泉',
              description: '乘船前往火山岛，在硫磺温泉中放松。',
              attractionId: 'hot-springs',
              type: '活动',
            },
            {
              time: '13:00',
              title: '船上烧烤午餐',
              description: '在双体船上享用希腊式烧烤海鲜。',
              type: '餐饮',
            },
            {
              time: '15:30',
              title: '自由浮潜',
              description: '在爱琴海清澈的海水中探索海底世界。',
              type: '活动',
            },
            {
              time: '17:00',
              title: '日落巡航',
              description: '从海上回望圣托里尼的日落。',
              type: '活动',
            },
            {
              time: '20:00',
              title: '海鲜大餐',
              description: '在 Ammoudi 湾品尝当日渔获。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 3,
          title: '内陆与慢时光',
          items: [
            {
              time: '09:00',
              title: '皮尔戈斯城堡',
              description: '登圣托里尼最高点俯瞰全岛。',
              type: '活动',
            },
            {
              time: '11:00',
              title: '希腊烹饪课',
              description: '学习三道传统希腊菜。',
              type: '活动',
            },
            {
              time: '13:30',
              title: '自制午餐',
              description: '品尝亲手制作的希腊料理。',
              type: '餐饮',
            },
            {
              time: '15:00',
              title: '悬崖步道徒步',
              description: '费拉至伊亚 10 公里绝美徒步线。',
              type: '活动',
            },
            {
              time: '18:00',
              title: '最后一场日落',
              description: '在伊亚与圣托里尼告别。',
              type: '活动',
            },
            {
              time: '20:30',
              title: '告别晚餐',
              description: '悬崖边的 fine dining 告别之夜。',
              type: '餐饮',
            },
          ],
        },
      ],
    },
  },

  /* ═══════════════════════════════════════════════════════════
     班夫 — 独行·极致自然探索
     ═══════════════════════════════════════════════════════════ */
  banff: {
    solo: {
      title: '班夫三日·独行荒野之旅',
      overview:
        '一个人的落基山脉：日出、冰川、野生动物。用三天时间与真正的自己独处。',
      itinerary: [
        {
          day: 1,
          title: '班夫镇与硫磺山',
          items: [
            {
              time: '07:00',
              title: '弓河瀑布晨跑',
              description:
                '沿弓河步道晨跑，晨雾在水面升腾，麋鹿可能在河对岸饮水。独行者的班夫初体验。',
              type: '活动',
            },
            {
              time: '09:30',
              title: '硫磺山缆车',
              description:
                '8分钟登顶硫磺山，在海拔2281米的山顶观景台360度独享六条山脉的壮丽。',
              attractionId: 'banff-gondola',
              type: '活动',
            },
            {
              time: '12:00',
              title: '山顶午餐',
              description:
                '在 Sky Bistro 靠窗的单人座，对着落基山脉享用午餐。一个人的风景更完整。',
              type: '餐饮',
            },
            {
              time: '14:00',
              title: '强斯顿峡谷徒步',
              description:
                '沿悬崖步道深入石灰岩峡谷。独自穿越瀑布水帘的刺激，只有你自己能体会。',
              attractionId: 'johnston-canyon',
              type: '活动',
            },
            {
              time: '17:30',
              title: '班夫上温泉',
              description:
                '在海拔1585米的天然温泉中浸泡，雪山环绕——这是独行者最好的自我犒赏。',
              attractionId: 'banff-upper-springs',
              type: '活动',
            },
            {
              time: '19:30',
              title: '精酿啤酒与牛排',
              description:
                '在班夫镇的精酿酒吧，点一杯本地 IPA 和一份 AAA 级牛排。吧台是最好的单人座。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 2,
          title: '路易斯湖与冰原大道',
          items: [
            {
              time: '05:30',
              title: '梦莲湖日出',
              description:
                '凌晨独行至梦莲湖，在寂静中等待日照十峰的圣光时刻。这是只有早起者能得到的奖赏。',
              attractionId: 'moraine-lake',
              type: '活动',
            },
            {
              time: '09:00',
              title: '路易斯湖独木舟',
              description:
                '一个人划独木舟在翡翠色的冰川湖上，雪山与松林环绕。只有桨声打破寂静。',
              attractionId: 'lake-louise',
              type: '活动',
            },
            {
              time: '12:00',
              title: '湖畔野餐',
              description:
                '在路易斯湖边找一块平坦的岩石，享用从班夫镇带来的三明治和热咖啡。',
              type: '餐饮',
            },
            {
              time: '14:00',
              title: '冰原大道自驾',
              description:
                '沿全球最美高山公路北上，在每一个观景台随心停留。一个人的自驾——节奏完全由你掌控。',
              type: '活动',
            },
            {
              time: '17:00',
              title: '哥伦比亚冰原',
              description:
                '乘坐冰原雪车登上万年冰川。独自站在北美洲最大的冰原上，感受地球的呼吸。',
              attractionId: 'columbia-icefield',
              type: '活动',
            },
            {
              time: '20:00',
              title: '山林小屋晚餐',
              description:
                '在冰原大道旁的木屋旅馆，壁炉旁的晚餐治愈一天的疲惫。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 3,
          title: '荒野与告别',
          items: [
            {
              time: '06:00',
              title: '阳光草甸徒步',
              description:
                '在高山草甸的野花海中独自徒步。呼吸海拔2300米的纯净空气，俯瞰三座翡翠湖泊。',
              type: '活动',
            },
            {
              time: '11:00',
              title: '野生动物巡游',
              description:
                '跟随专业向导沿弓河河谷寻找麋鹿、山羊与黑熊。相机准备好——这是你与荒野的对话。',
              type: '活动',
            },
            {
              time: '13:00',
              title: '班夫镇午餐',
              description:
                '在手工巧克力店买一块枫糖巧克力，再找一个安静的咖啡角落。',
              type: '餐饮',
            },
            {
              time: '15:00',
              title: '弓谷公园道',
              description:
                '最后一段自驾——沿弓谷公园道缓缓而行，与落基山脉说再见。',
              type: '活动',
            },
            {
              time: '18:00',
              title: '告别温泉',
              description:
                '最后一次泡在班夫上温泉中，让雪山和星空成为这三天的最后记忆。',
              attractionId: 'banff-upper-springs',
              type: '活动',
            },
            {
              time: '20:00',
              title: '烤肉晚宴',
              description:
                '在班夫最有名的烤肉餐厅，以烟熏排骨与枫糖甜点为旅程画上句号。',
              type: '餐饮',
            },
          ],
        },
      ],
    },
    default: {
      title: '班夫三日·落基山脉精华',
      overview:
        '翡翠湖泊、万年冰川、高山温泉——在加拿大最壮丽的国家公园度过完美的三天。',
      itinerary: [
        {
          day: 1,
          title: '班夫镇与硫磺山',
          items: [
            {
              time: '09:00',
              title: '班夫镇漫步',
              description:
                '探访弓河瀑布与班夫温泉酒店，感受高山小镇风情。',
              type: '活动',
            },
            {
              time: '11:00',
              title: '硫磺山缆车',
              description: '登顶硫磺山，360度俯瞰落基山脉。',
              attractionId: 'banff-gondola',
              type: '活动',
            },
            {
              time: '13:00',
              title: '山顶午餐',
              description: '在 Sky Bistro 享受高山午餐。',
              type: '餐饮',
            },
            {
              time: '15:00',
              title: '强斯顿峡谷徒步',
              description: '沿悬崖步道深入峡谷。',
              attractionId: 'johnston-canyon',
              type: '活动',
            },
            {
              time: '18:00',
              title: '上温泉',
              description: '在雪山环抱中舒缓疲惫。',
              attractionId: 'banff-upper-springs',
              type: '活动',
            },
            {
              time: '20:00',
              title: '班夫镇晚餐',
              description: '木屋餐厅的加拿大牛排与精酿啤酒。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 2,
          title: '路易斯湖与梦莲湖',
          items: [
            {
              time: '06:00',
              title: '梦莲湖日出',
              description: '经典的十峰环抱日出画面。',
              attractionId: 'moraine-lake',
              type: '活动',
            },
            {
              time: '09:00',
              title: '路易斯湖泛舟',
              description: '在翡翠色湖面上划独木舟。',
              attractionId: 'lake-louise',
              type: '活动',
            },
            {
              time: '11:30',
              title: '湖畔徒步',
              description: '沿湖岸步道徒步至茶屋。',
              type: '活动',
            },
            {
              time: '13:00',
              title: '费尔蒙城堡午餐',
              description: '湖景窗边的精致午餐。',
              type: '餐饮',
            },
            {
              time: '15:30',
              title: '冰原大道南段',
              description: '沿冰原大道南下，停靠弓湖与佩托湖。',
              type: '活动',
            },
            {
              time: '19:00',
              title: '返回班夫',
              description: '精酿酒吧结束充实的一天。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 3,
          title: '冰原与冰川',
          items: [
            {
              time: '07:00',
              title: '冰原大道全程',
              description: '沿全球最美高山公路北上。',
              type: '交通',
            },
            {
              time: '10:00',
              title: '哥伦比亚冰原',
              description: '冰原雪车登上万年冰川。',
              attractionId: 'columbia-icefield',
              type: '活动',
            },
            {
              time: '12:30',
              title: '冰原中心午餐',
              description: '落地窗前欣赏冰川。',
              type: '餐饮',
            },
            {
              time: '14:00',
              title: '冰川天空步道',
              description: '280米高玻璃步道俯瞰峡谷。',
              type: '活动',
            },
            {
              time: '16:00',
              title: '野生动物巡游',
              description: '黄昏时分寻找野生动物。',
              type: '活动',
            },
            {
              time: '19:30',
              title: '告别晚餐',
              description: '烟熏排骨与枫糖甜点。',
              type: '餐饮',
            },
          ],
        },
      ],
    },
  },

  /* ═══════════════════════════════════════════════════════════
     阿马尔菲海岸 — 朋友·海岸自驾
     ═══════════════════════════════════════════════════════════ */
  'amalfi-coast': {
    friends: {
      title: '阿马尔菲三日·好友海岸自驾',
      overview:
        '敞篷车、柠檬酒、悬崖公路——与最好的朋友在南意海岸度过最自由的夏天。',
      itinerary: [
        {
          day: 1,
          title: '波西塔诺初探',
          items: [
            {
              time: '09:00',
              title: '波西塔诺漫步',
              description:
                '从海滩拾级而上，穿行于精品店与陶瓷工坊之间。每个人买一件手工纪念品。',
              attractionId: 'positano',
              type: '活动',
            },
            {
              time: '12:00',
              title: '海滩披萨午餐',
              description:
                '在 Marina Grande 海滩边分享一张那不勒斯风格的玛格丽特披萨和冰镇啤酒。',
              type: '餐饮',
            },
            {
              time: '14:30',
              title: '私人游船探险',
              description:
                '包一艘传统 Gozzo 木船，沿海岸探索海蚀洞与隐秘海滩。在翡翠洞中轮流跳水。',
              type: '活动',
            },
            {
              time: '17:30',
              title: 'Le Sirenuse 香槟',
              description:
                '在波西塔诺最著名的露台酒吧，点一瓶冰镇起泡酒，为第一天的冒险干杯。',
              type: '餐饮',
            },
            {
              time: '20:00',
              title: '悬崖晚餐',
              description:
                '在家庭经营的悬崖餐厅分享海鲜拼盘与手工意面。柠檬树下，笑声和海风混在一起。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 2,
          title: '众神之路与拉韦洛',
          items: [
            {
              time: '06:30',
              title: '众神之路徒步',
              description:
                '清晨出发，在晨光中沿 7 公里悬崖步道徒步。互相拍照，互相鼓励爬完最后一个上坡。',
              attractionId: 'path-of-gods',
              type: '活动',
            },
            {
              time: '10:30',
              title: '诺切莱咖啡',
              description:
                '在徒步终点的小村庄喝一杯意式浓缩。腿有点酸，但成就感满满。',
              type: '餐饮',
            },
            {
              time: '11:30',
              title: '拉韦洛花园',
              description:
                '探访鲁菲洛别墅与辛波内别墅。在「无限露台」上合影——这张照片值得装裱。',
              attractionId: 'ravello',
              type: '活动',
            },
            {
              time: '13:30',
              title: '悬崖露台午餐',
              description:
                '在拉韦洛悬崖露台分享意式拼盘、橄榄油面包与一瓶冰镇 Falanghina。',
              type: '餐饮',
            },
            {
              time: '16:00',
              title: '阿马尔菲大教堂',
              description:
                '参观阿拉伯-诺曼风格的千年大教堂。62级台阶上去，每个人许一个愿。',
              attractionId: 'amalfi-cathedral',
              type: '活动',
            },
            {
              time: '19:00',
              title: '阿马尔菲海鲜晚餐',
              description:
                '在海港边的家庭餐厅，点满一桌当日海鲜。Limoncello shot 开场，Limoncello shot 结束。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 3,
          title: '柠檬海岸与告别',
          items: [
            {
              time: '09:00',
              title: '柠檬园探访',
              description:
                '在百年柠檬梯田间漫步。亲手制作一瓶 Limoncello——带回家给没法来的朋友。',
              type: '活动',
            },
            {
              time: '11:00',
              title: '烹饪课挑战',
              description:
                '在露台厨房中比赛谁做的意面最好。输的人负责洗碗，赢的人获得所有人的赞美。',
              type: '活动',
            },
            {
              time: '13:30',
              title: '自制午餐',
              description:
                '在悬崖露台享用亲手制作的意式午餐。自己做的意面，怎么都好吃。',
              type: '餐饮',
            },
            {
              time: '15:30',
              title: '弗罗雷峡湾',
              description:
                '探访意大利唯一的峡湾。最后一次跳进翡翠色海水——这是南意给你们的告别礼物。',
              attractionId: 'fiordo-furore',
              type: '活动',
            },
            {
              time: '17:30',
              title: '海岸公路自驾',
              description:
                '敞篷车、SS163 公路、夕阳、音乐、最好的朋友。在每一个观景台停车尖叫。',
              type: '活动',
            },
            {
              time: '20:00',
              title: '告别晚宴',
              description:
                '在柠檬树下的家庭餐厅，点满一桌菜，开一瓶五年前酿的 Limoncello。为这段旅程——也为下一段。',
              type: '餐饮',
            },
          ],
        },
      ],
    },
    default: {
      title: '阿马尔菲三日·甜蜜生活之旅',
      overview:
        '悬崖小镇、柠檬海岸、地中海美食——在意大利最美丽的海岸线度过完美的三天。',
      itinerary: [
        {
          day: 1,
          title: '波西塔诺与海岸初探',
          items: [
            {
              time: '09:00',
              title: '波西塔诺漫步',
              description: '从海滩拾级而上，穿梭于精品店与陶瓷工坊之间。',
              attractionId: 'positano',
              type: '活动',
            },
            {
              time: '12:00',
              title: '海滩午餐',
              description: '海鲜意面与冰镇白葡萄酒。',
              type: '餐饮',
            },
            {
              time: '14:30',
              title: '私人游船',
              description: '乘传统木船探索海蚀洞与隐秘海滩。',
              type: '活动',
            },
            {
              time: '17:00',
              title: '波西塔诺日落',
              description: 'Le Sirenuse 的香槟酒吧。',
              type: '活动',
            },
            {
              time: '20:00',
              title: '米其林晚餐',
              description: '悬崖边的创新坎帕尼亚料理。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 2,
          title: '众神之路与拉韦洛',
          items: [
            {
              time: '06:30',
              title: '众神之路徒步',
              description: '晨光中沿悬崖步道徒步。',
              attractionId: 'path-of-gods',
              type: '活动',
            },
            {
              time: '10:30',
              title: '诺切莱咖啡',
              description: '徒步终点的一杯意式浓缩。',
              type: '餐饮',
            },
            {
              time: '11:30',
              title: '拉韦洛花园',
              description: '鲁菲洛别墅与辛波内别墅。',
              attractionId: 'ravello',
              type: '活动',
            },
            {
              time: '13:30',
              title: '悬崖露台午餐',
              description: '拉韦洛悬崖上的意式午餐。',
              type: '餐饮',
            },
            {
              time: '16:00',
              title: '阿马尔菲大教堂',
              description: '千年阿拉伯-诺曼风格教堂。',
              attractionId: 'amalfi-cathedral',
              type: '活动',
            },
            {
              time: '19:00',
              title: '阿马尔菲晚餐',
              description: '海港边的当日海鲜与手工意面。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 3,
          title: '柠檬海岸与慢生活',
          items: [
            {
              time: '09:00',
              title: '柠檬园探访',
              description: '百年柠檬梯田与 Limoncello 酿造。',
              type: '活动',
            },
            {
              time: '11:00',
              title: '烹饪课',
              description: '学习手工意面与意式甜点。',
              type: '活动',
            },
            {
              time: '13:30',
              title: '品尝自己的作品',
              description: '悬崖露台上的自制午餐。',
              type: '餐饮',
            },
            {
              time: '15:30',
              title: '弗罗雷峡湾',
              description: '意大利唯一的峡湾游泳。',
              attractionId: 'fiordo-furore',
              type: '活动',
            },
            {
              time: '17:30',
              title: '海岸公路自驾',
              description: 'SS163 公路的夕阳驾驶。',
              type: '活动',
            },
            {
              time: '20:00',
              title: '告别晚餐',
              description: '柠檬树下的南意盛宴。',
              type: '餐饮',
            },
          ],
        },
      ],
    },
  },

  /* ═══════════════════════════════════════════════════════════
     巴厘岛 — 独自·灵修养生
     ═══════════════════════════════════════════════════════════ */
  bali: {
    solo: {
      title: '巴厘岛三日·灵修觉醒之旅',
      overview:
        '一个人的巴厘岛：日出瑜伽、圣泉净化、丛林冥想。在众神之岛与自己的灵魂对话。',
      itinerary: [
        {
          day: 1,
          title: '乌布灵性初探',
          items: [
            {
              time: '06:30',
              title: '丛林日出瑜伽',
              description:
                '在乌布丛林上方的瑜伽馆迎接晨光。闭上眼，听见的是鸟鸣、风声和自己的呼吸。',
              type: '活动',
            },
            {
              time: '09:00',
              title: '德格拉朗梯田漫步',
              description:
                '清晨薄雾中的千年梯田，一个人走在田埂上。每一步都是与大地最原始的连接。',
              attractionId: 'tegallalang',
              type: '活动',
            },
            {
              time: '11:30',
              title: '有机素食午餐',
              description:
                '在稻田旁的有机咖啡馆，一碗 Buddha Bowl 配鲜榨果汁。身体需要的，其实很简单。',
              type: '餐饮',
            },
            {
              time: '14:00',
              title: '圣泉寺净化仪式',
              description:
                '在千年圣泉的水流下接受净化。祭司的祝福声中，让泉水带走你不需要的一切。',
              attractionId: 'tirta-empul',
              type: '活动',
            },
            {
              time: '17:00',
              title: '乌布皇宫冥想',
              description:
                '黄昏时分在乌布皇宫的庭院中静坐。传统甘美兰音乐从远处飘来，像另一个时空的回音。',
              type: '活动',
            },
            {
              time: '19:30',
              title: '丛林晚餐',
              description:
                '在竹屋餐厅中享用巴厘岛 fine dining 素食。一个人吃饭，也可以很丰盛。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 2,
          title: '火山与圣猴',
          items: [
            {
              time: '02:00',
              title: '巴图尔火山日出',
              description:
                '凌晨出发，在星空下独自攀登。当太阳从阿贡火山身后升起，所有的疲惫都值得。',
              attractionId: 'mount-batur',
              type: '活动',
            },
            {
              time: '07:00',
              title: '火山顶早餐',
              description:
                '蒸汽烹煮的鸡蛋和热茶。海拔 1717 米的早餐，可能是你一生中最好吃的一顿。',
              type: '餐饮',
            },
            {
              time: '11:00',
              title: '咖啡庄园探访',
              description:
                '品尝猫屎咖啡与巴厘香草茶。在庄园的吊床上小憩——独行者有无限的时间可以挥霍。',
              type: '活动',
            },
            {
              time: '14:00',
              title: '酒店休息与按摩',
              description:
                '返回酒店，享受巴厘岛传统按摩。90分钟——让酸痛的身体重新焕发活力。',
              type: '休息',
            },
            {
              time: '16:30',
              title: '圣猴森林',
              description:
                '在古树与苔藓覆盖的石像间漫步。猴子是这里的主人，我们只是过客。',
              attractionId: 'monkey-forest',
              type: '活动',
            },
            {
              time: '19:00',
              title: '乌布市场夜市',
              description:
                '逛乌布夜市，一个人想吃什么就吃什么。沙爹、烤玉米、椰汁糯米饭——街头美食就是最好的晚餐。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 3,
          title: '灵性与告别',
          items: [
            {
              time: '06:30',
              title: '最后一场日出瑜伽',
              description:
                '在丛林瑜伽馆做最后一场拜日式。三天的时间，你已经能摸到脚尖了。',
              type: '活动',
            },
            {
              time: '09:00',
              title: '银器手作工坊',
              description:
                '在匠人指导下，亲手打一枚银戒。刻上 "Bali" 和一个日期——这是你送给自己的礼物。',
              type: '活动',
            },
            {
              time: '11:30',
              title: '巴厘烹饪课',
              description:
                '逛传统市场采购香料，然后学习制作沙爹、咖喱与巴厘甜品。这是你能带回家的巴厘岛。',
              type: '活动',
            },
            {
              time: '14:00',
              title: '自制午餐',
              description:
                '品尝自己亲手烹饪的巴厘盛宴。一个人的厨房，也可以很有仪式感。',
              type: '餐饮',
            },
            {
              time: '16:00',
              title: '海神庙日落',
              description:
                '驱车前往海神庙，在海中巨石上的千年庙宇前等待日落。这是巴厘岛给你的最后祝福。',
              attractionId: 'tanah-lot',
              type: '活动',
            },
            {
              time: '19:30',
              title: '告别晚餐',
              description:
                '在悬崖边的海鲜餐厅以印度洋晚霞佐餐。向众神之岛举杯——感谢这三天的觉醒。',
              type: '餐饮',
            },
          ],
        },
      ],
    },
    default: {
      title: '巴厘岛三日·众神之岛精华',
      overview:
        '千年寺庙、翠绿梯田、火山日出、丛林瑜伽——在巴厘岛找到身心灵的平衡。',
      itinerary: [
        {
          day: 1,
          title: '乌布文化与艺术',
          items: [
            {
              time: '07:00',
              title: '德格拉朗梯田',
              description: '清晨薄雾中漫步千年梯田。',
              attractionId: 'tegallalang',
              type: '活动',
            },
            {
              time: '09:30',
              title: '圣猴森林',
              description: '古寺与苔藓石像间遇见巴厘猕猴。',
              attractionId: 'monkey-forest',
              type: '活动',
            },
            {
              time: '12:00',
              title: '乌布午餐',
              description: '稻田旁的有机咖啡馆。',
              type: '餐饮',
            },
            {
              time: '14:00',
              title: '银器工坊',
              description: '亲手打造银饰。',
              type: '活动',
            },
            {
              time: '16:30',
              title: '圣泉寺净化',
              description: '千年圣泉中的传统净化仪式。',
              attractionId: 'tirta-empul',
              type: '活动',
            },
            {
              time: '19:00',
              title: '乌布晚餐',
              description: '丛林中的创意巴厘料理。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 2,
          title: '火山与海洋',
          items: [
            {
              time: '02:00',
              title: '巴图尔火山日出',
              description: '星空下攀登至火山口。',
              attractionId: 'mount-batur',
              type: '活动',
            },
            {
              time: '07:00',
              title: '火山顶早餐',
              description: '蒸汽烹煮的鸡蛋与热茶。',
              type: '餐饮',
            },
            {
              time: '11:00',
              title: '咖啡庄园探访',
              description: '品尝猫屎咖啡与巴厘香草茶。',
              type: '活动',
            },
            {
              time: '13:00',
              title: '午餐与休整',
              description: '返回酒店休息。',
              type: '休息',
            },
            {
              time: '17:00',
              title: '乌鲁瓦图寺',
              description: '悬崖寺庙的 Kecak 火舞与日落。',
              attractionId: 'uluwatu',
              type: '活动',
            },
            {
              time: '20:00',
              title: '金巴兰海鲜烧烤',
              description: '海滩上的炭火海鲜烧烤。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 3,
          title: '灵性与告别',
          items: [
            {
              time: '06:30',
              title: '日出瑜伽',
              description: '丛林瑜伽馆中迎接晨光。',
              type: '活动',
            },
            {
              time: '09:00',
              title: '传统市场',
              description: '采购香料与手工艺品。',
              type: '活动',
            },
            {
              time: '10:30',
              title: '巴厘烹饪课',
              description: '学习三道巴厘经典菜肴。',
              type: '活动',
            },
            {
              time: '13:30',
              title: '自制午餐',
              description: '品尝亲手烹饪的巴厘盛宴。',
              type: '餐饮',
            },
            {
              time: '15:00',
              title: '海神庙日落',
              description: '海中千年古寺的日落时分。',
              attractionId: 'tanah-lot',
              type: '活动',
            },
            {
              time: '19:00',
              title: '告别晚餐',
              description: '悬崖海鲜餐厅的印度洋晚霞。',
              type: '餐饮',
            },
          ],
        },
      ],
    },
  },

  /* ═══════════════════════════════════════════════════════════
     巴塔哥尼亚 — 极限·荒野徒步
     ═══════════════════════════════════════════════════════════ */
  patagonia: {
    solo: {
      title: '巴塔哥尼亚三日·荒野觉醒之旅',
      overview:
        '冰川、巨峰、无尽荒野。在世界尽头与自己对话——这是属于探险者的成人礼。',
      itinerary: [
        {
          day: 1,
          title: '冰川日',
          items: [
            {
              time: '08:00',
              title: '抵达冰川国家公园',
              description:
                '从埃尔卡拉法特出发前往佩里托莫雷诺冰川。沿途的巴塔哥尼亚草原一望无际。',
              type: '交通',
            },
            {
              time: '10:00',
              title: '冰川观景步道',
              description:
                '沿 4 公里步道系统从不同角度欣赏冰川全景。每隔数分钟，巨冰崩落入湖——那声音像地球的叹息。',
              attractionId: 'perito-moreno',
              type: '活动',
            },
            {
              time: '12:00',
              title: '冰川徒步',
              description:
                '穿上冰爪踏上万年蓝冰。穿越冰裂缝与蓝洞——脚下是几万年前的冰雪。',
              type: '活动',
            },
            {
              time: '14:00',
              title: '野餐午餐',
              description:
                '在冰川观景台享用巴塔哥尼亚风味野餐。三明治配冰川全景——地球上最好的午餐风景。',
              type: '餐饮',
            },
            {
              time: '16:00',
              title: '冰崩观赏',
              description:
                '静待巨冰从 70 米高处崩落湖中的震撼瞬间。每个人都会屏住呼吸。',
              type: '活动',
            },
            {
              time: '20:00',
              title: '庄园烤肉晚宴',
              description:
                '在百年巴塔哥尼亚庄园，柴火慢烤全羊配马尔贝克红酒。与来自世界各地的旅行者分享故事。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 2,
          title: '菲茨罗伊朝圣',
          items: [
            {
              time: '02:00',
              title: '凌晨出发',
              description:
                '在巴塔哥尼亚的星空下开始徒步。头灯照亮脚下，银河照亮头顶——这一刻只属于你。',
              type: '活动',
            },
            {
              time: '06:00',
              title: '菲茨罗伊日出',
              description:
                '在 Laguna de los Tres 见证 "火烧菲茨罗伊"。当第一缕阳光将山峰染成玫瑰金——眼泪会自己流出来。',
              attractionId: 'fitz-roy',
              type: '活动',
            },
            {
              time: '09:00',
              title: '山间早餐',
              description:
                '在冰川湖畔享用便携早餐。冻红的手指捧着热咖啡，眼睛里装满了一生的风景。',
              type: '餐饮',
            },
            {
              time: '12:00',
              title: '返回埃尔查尔滕',
              description:
                '下山途中，看到凌晨黑暗中错过的沿途美景。路不一样了——因为你不一样了。',
              type: '活动',
            },
            {
              time: '15:00',
              title: '精酿啤酒庆祝',
              description:
                '在埃尔查尔滕的精酿酒吧，点一杯巴塔哥尼亚 IPA。你做到了。',
              type: '餐饮',
            },
            {
              time: '19:00',
              title: '木屋休息',
              description:
                '在木屋旅馆的壁炉旁，写下今天的日记。窗外是菲茨罗伊峰的最后一缕光。',
              type: '休息',
            },
          ],
        },
        {
          day: 3,
          title: '荒野与告别',
          items: [
            {
              time: '09:00',
              title: '骑马穿越草原',
              description:
                '跟随高乔牧人骑上克里奥尔马，穿越巴塔哥尼亚金色草原。没有信号、没有噪音——只有风和你。',
              type: '活动',
            },
            {
              time: '12:00',
              title: '牧场午餐',
              description:
                '在安第斯山麓的牧场享用传统 asado 烤肉。柴火的烟味和烤肉的香气混在巴塔哥尼亚的风里。',
              type: '餐饮',
            },
            {
              time: '14:00',
              title: '托雷湖徒步',
              description:
                '短程徒步至托雷峰冰湖。湖面上漂浮着巨型浮冰——蓝得不像话。',
              attractionId: 'laguna-torre',
              type: '活动',
            },
            {
              time: '17:00',
              title: '告别日落',
              description:
                '在埃尔查尔滕的观景台，最后一次看着巴塔哥尼亚的群峰沉默。三天前你还是个陌生人——现在这片荒野已经是你的一部分。',
              type: '活动',
            },
            {
              time: '20:00',
              title: '告别晚餐',
              description:
                '一杯马尔贝克红酒与烤羊排。向巴塔哥尼亚举杯——不是为了告别，而是为了感谢。',
              type: '餐饮',
            },
          ],
        },
      ],
    },
    default: {
      title: '巴塔哥尼亚三日·世界尽头之旅',
      overview:
        '万年冰川、锯齿巨峰、荒野草原——在南美洲最南端的壮丽荒野中挑战自我。',
      itinerary: [
        {
          day: 1,
          title: '冰川日',
          items: [
            {
              time: '08:00',
              title: '抵达冰川国家公园',
              description: '从埃尔卡拉法特出发前往佩里托莫雷诺冰川。',
              type: '交通',
            },
            {
              time: '10:00',
              title: '冰川观景步道',
              description: '从不同角度欣赏冰川全景。',
              attractionId: 'perito-moreno',
              type: '活动',
            },
            {
              time: '12:00',
              title: '冰川徒步',
              description: '穿冰爪踏上万年蓝冰。',
              type: '活动',
            },
            {
              time: '14:00',
              title: '野餐午餐',
              description: '冰川观景台的巴塔哥尼亚风味。',
              type: '餐饮',
            },
            {
              time: '16:00',
              title: '冰崩观赏',
              description: '巨冰从 70 米高处崩落湖中。',
              type: '活动',
            },
            {
              time: '20:00',
              title: '庄园烤肉晚宴',
              description: '百年庄园的柴火慢烤全羊。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 2,
          title: '菲茨罗伊朝圣',
          items: [
            {
              time: '02:00',
              title: '凌晨出发',
              description: '星空下向巴塔哥尼亚最壮丽的山峰徒步。',
              type: '活动',
            },
            {
              time: '06:00',
              title: '菲茨罗伊日出',
              description: '见证火烧菲茨罗伊的神圣时刻。',
              attractionId: 'fitz-roy',
              type: '活动',
            },
            {
              time: '09:00',
              title: '山间早餐',
              description: '冰川湖畔的便携早餐。',
              type: '餐饮',
            },
            {
              time: '12:00',
              title: '返回埃尔查尔滕',
              description: '下山途中欣赏错过的沿途美景。',
              type: '活动',
            },
            {
              time: '15:00',
              title: '小镇午餐',
              description: '精酿啤酒吧庆祝登顶。',
              type: '餐饮',
            },
            {
              time: '19:00',
              title: '日落休息',
              description: '木屋壁炉旁放松酸痛的肌肉。',
              type: '休息',
            },
          ],
        },
        {
          day: 3,
          title: '荒野与告别',
          items: [
            {
              time: '09:00',
              title: '骑马穿越草原',
              description: '跟随高乔牧人穿越巴塔哥尼亚草原。',
              type: '活动',
            },
            {
              time: '12:00',
              title: '牧场午餐',
              description: '安第斯山麓的 asado 烤肉。',
              type: '餐饮',
            },
            {
              time: '14:00',
              title: '托雷湖徒步',
              description: '漂浮着巨型浮冰的高山冰湖。',
              attractionId: 'laguna-torre',
              type: '活动',
            },
            {
              time: '17:00',
              title: '告别日落',
              description: '与巴塔哥尼亚群峰的最后告别。',
              type: '活动',
            },
            {
              time: '20:00',
              title: '告别晚餐',
              description: '马尔贝克红酒与烤羊排。',
              type: '餐饮',
            },
          ],
        },
      ],
    },
  },

  /* ═══════════════════════════════════════════════════════════
     上海 — 情侣·都市摩登之旅
     ═══════════════════════════════════════════════════════════ */
  shanghai: {
    couple: {
      title: '上海三日·摩登浪漫之旅',
      overview:
        '外滩的百年风华、法租界的梧桐浪漫、陆家嘴的未来之光——为都市恋人定制的上海精致假期。',
      itinerary: [
        {
          day: 1,
          title: '外滩与老城厢',
          items: [
            {
              time: '09:00',
              title: '外滩晨间漫步',
              description:
                '从外白渡桥出发，牵着手沿黄浦江西岸漫步。清晨的外滩人少，万国建筑群在晨光中格外温柔。',
              attractionId: 'the-bund',
              type: '活动',
            },
            {
              time: '11:00',
              title: '豫园与城隍庙',
              description:
                '在江南园林的假山回廊间穿行，在九曲桥上喂锦鲤。然后去南翔馒头店分享一笼小笼包。',
              attractionId: 'yu-garden',
              type: '活动',
            },
            {
              time: '12:30',
              title: '南翔馒头店',
              description:
                '上海最负盛名的小笼包。两个人分一笼原味，一笼蟹粉——醋和姜丝的搭配是灵魂。',
              type: '餐饮',
            },
            {
              time: '14:30',
              title: '新天地下午茶',
              description:
                '在石库门老建筑改造的精品咖啡馆中享受午后时光。选一个二楼靠窗的位子，看弄堂里的人来人往。',
              attractionId: 'xintiandi',
              type: '活动',
            },
            {
              time: '17:30',
              title: '陆家嘴云端日落',
              description:
                '登上上海中心118层观光厅，在云端看日落染红黄浦江。城市在你们脚下——这一刻只属于两个人。',
              attractionId: 'lujiazui',
              type: '活动',
            },
            {
              time: '20:00',
              title: '外滩江景晚餐',
              description:
                '在外滩的江景餐厅享用创新本帮菜。窗外的外滩灯火是上海为你们准备的浪漫背景。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 2,
          title: '梧桐与艺术',
          items: [
            {
              time: '09:30',
              title: '法租界单车漫游',
              description:
                '从武康大楼开始，骑车穿行于梧桐树下的文艺街区。阳光透过叶隙洒在红砖墙上，你们是这画面的一部分。',
              attractionId: 'french-concession',
              type: '活动',
            },
            {
              time: '11:30',
              title: '安福路 Brunch',
              description:
                '在安福路最chic的咖啡馆享受悠闲的早午餐。牛油果吐司配冰美式——上海式的周末仪式。',
              type: '餐饮',
            },
            {
              time: '14:00',
              title: '西岸美术馆',
              description:
                '在黄浦江畔的世界级美术馆中感受当代艺术。互相解读看不懂的作品——这是恋人之间的专属游戏。',
              attractionId: 'west-bund',
              type: '活动',
            },
            {
              time: '17:00',
              title: '思南公馆下午茶',
              description:
                '在百年花园洋房中享受老上海的优雅下午茶。银制餐具、三层点心架、窗外玫瑰园——仪式感满分。',
              type: '休息',
            },
            {
              time: '19:30',
              title: '黄浦江夜游',
              description:
                '乘游船在黄浦江上飘荡45分钟。外滩的古典与陆家嘴的未来在夜色中同框——是合照的最佳时机。',
              type: '活动',
            },
            {
              time: '21:00',
              title: 'Speakeasy 酒吧',
              description:
                '在法租界老洋房二楼找到那家没有招牌的鸡尾酒吧。昏暗的灯光、爵士乐、两杯特调——上海的夜才刚开始。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 3,
          title: '弄堂与告别',
          items: [
            {
              time: '08:30',
              title: '弄堂早餐',
              description:
                '在静安寺附近的弄堂深处，找到阿姨摆的小摊。咸豆浆、粢饭团、油条——这是上海人从小吃到大的清晨味道。',
              type: '餐饮',
            },
            {
              time: '10:30',
              title: '田子坊寻宝',
              description:
                '穿行于泰康路的弄堂迷宫。在手作小店中为彼此挑选一件独一无二的纪念品。',
              type: '活动',
            },
            {
              time: '12:30',
              title: '本帮菜午餐',
              description:
                '在老字号品尝红烧肉、油爆虾、腌笃鲜。浓油赤酱的本帮菜，是上海写给味蕾的情书。',
              type: '餐饮',
            },
            {
              time: '14:30',
              title: 'M50创意园',
              description:
                '在莫干山路旧工厂改造的艺术区中探索画廊。买一幅年轻艺术家的版画——这是你们可以带回家的上海。',
              type: '活动',
            },
            {
              time: '17:00',
              title: '外滩告别日落',
              description:
                '回到外滩，在浦江边找一张长椅。看太阳从陆家嘴摩天楼之间落下去，天空从金到粉到紫——这是上海给你们的告别礼物。',
              attractionId: 'the-bund',
              type: '活动',
            },
            {
              time: '19:30',
              title: '告别晚宴',
              description:
                '在外滩源的米其林餐厅，以一顿精致的创新料理为上海之旅画上完美的句号。',
              type: '餐饮',
            },
          ],
        },
      ],
    },
    default: {
      title: '上海三日·都市精华之旅',
      overview:
        '从外滩的百年风华到陆家嘴的未来之光，从梧桐树下的老洋房到世界级艺术殿堂——上海的三天，浓缩了中国最精彩的都市体验。',
      itinerary: [
        {
          day: 1,
          title: '外滩与老城厢',
          items: [
            {
              time: '09:00',
              title: '外滩漫步',
              description: '从外白渡桥出发，沿黄浦江欣赏万国建筑群。',
              attractionId: 'the-bund',
              type: '活动',
            },
            {
              time: '11:00',
              title: '豫园',
              description: '探访上海保存最完好的明代江南园林。',
              attractionId: 'yu-garden',
              type: '活动',
            },
            {
              time: '12:30',
              title: '南翔小笼包',
              description: '在豫园内品尝上海最正宗的小笼包。',
              type: '餐饮',
            },
            {
              time: '14:30',
              title: '上海博物馆',
              description: '在人民广场参观中国古代艺术珍品。',
              type: '活动',
            },
            {
              time: '17:00',
              title: '新天地',
              description: '在石库门建筑群中感受上海的新旧交融。',
              attractionId: 'xintiandi',
              type: '活动',
            },
            {
              time: '19:30',
              title: '新天地晚餐',
              description: '在老建筑里的精品餐厅品尝融合上海菜。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 2,
          title: '梧桐区与当代上海',
          items: [
            {
              time: '09:30',
              title: '法租界单车漫游',
              description: '骑车穿行于梧桐树下的文艺街区。',
              attractionId: 'french-concession',
              type: '活动',
            },
            {
              time: '11:30',
              title: '安福路 Brunch',
              description: '在网红咖啡馆享受悠闲早午餐。',
              type: '餐饮',
            },
            {
              time: '14:00',
              title: '西岸美术馆',
              description: '在黄浦江畔感受中国当代艺术。',
              attractionId: 'west-bund',
              type: '活动',
            },
            {
              time: '16:30',
              title: '陆家嘴登高',
              description: '登上海中心俯瞰城市全景。',
              attractionId: 'lujiazui',
              type: '活动',
            },
            {
              time: '19:00',
              title: '黄浦江夜游',
              description: '乘船欣赏两岸灯火。',
              type: '活动',
            },
            {
              time: '20:00',
              title: '外滩晚餐',
              description: '在江景餐厅享用创新本帮料理。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 3,
          title: '弄堂与日常',
          items: [
            {
              time: '08:30',
              title: '弄堂早餐',
              description: '在静安寺弄堂里寻找老上海早点。',
              type: '餐饮',
            },
            {
              time: '10:30',
              title: '田子坊',
              description: '穿行于泰康路的创意弄堂。',
              type: '活动',
            },
            {
              time: '12:30',
              title: '本帮菜午餐',
              description: '在老字号品尝红烧肉与油爆虾。',
              type: '餐饮',
            },
            {
              time: '14:30',
              title: 'M50创意园',
              description: '在旧工厂改造的艺术区中探索画廊。',
              type: '活动',
            },
            {
              time: '17:00',
              title: '思南公馆下午茶',
              description: '在百年花园洋房中享受老上海时光。',
              type: '休息',
            },
            {
              time: '19:30',
              title: '告别晚餐',
              description: '以一顿精致料理为上海之行画上句号。',
              type: '餐饮',
            },
          ],
        },
      ],
    },
  },

  /* ═══════════════════════════════════════════════════════════
     九寨沟 — 独行·自然疗愈之旅
     ═══════════════════════════════════════════════════════════ */
  jiuzhaigou: {
    solo: {
      title: '九寨沟三日·自然疗愈之旅',
      overview:
        '五彩海子、原始森林、藏寨炊烟——在人间仙境中与自己独处，让大自然治愈都市里疲惫的灵魂。',
      itinerary: [
        {
          day: 1,
          title: '日则沟精华',
          items: [
            {
              time: '07:00',
              title: '镜海晨光',
              description:
                '清晨无风时独自抵达镜海。湖面如镜，雪峰与森林完美倒映——这份宁静是你给自己的礼物。',
              attractionId: 'mirror-lake',
              type: '活动',
            },
            {
              time: '09:00',
              title: '五花海漫游',
              description:
                '在阳光直射湖面时到达五花海。一个人趴在栈道栏杆上，看水底的古木在五色湖水中若隐若现——大自然才是最好的艺术家。',
              attractionId: 'five-flower-lake',
              type: '活动',
            },
            {
              time: '11:00',
              title: '原始森林深呼吸',
              description:
                '沿日则沟栈道深入原始针叶林。松萝垂挂，空气中负氧离子爆表。闭上眼睛，只听见风声和鸟鸣。',
              attractionId: 'primeval-forest',
              type: '活动',
            },
            {
              time: '12:30',
              title: '诺日朗简餐',
              description: '在景区内的诺日朗游客中心享用川味简餐。一个人吃饭的好处：想吃什么都行。',
              type: '餐饮',
            },
            {
              time: '14:00',
              title: '诺日朗瀑布',
              description:
                '站在270米宽的瀑布前，水雾扑面。一个人看瀑布不需要说话——只需要感受大自然的磅礴之力。',
              attractionId: 'nuorilang-falls',
              type: '活动',
            },
            {
              time: '18:00',
              title: '藏家牦牛肉火锅',
              description:
                '在沟口的藏家乐，一个人也要点一份牦牛肉火锅。热腾腾的汤锅配青稞酒——这是对徒步一天最好的犒赏。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 2,
          title: '树正沟与藏文化',
          items: [
            {
              time: '07:30',
              title: '树正瀑布群',
              description:
                '晨光中独自走过数十个钙华瀑布。水流在丛林间奔流而下——一个人可以按自己的节奏停下来拍照。',
              attractionId: 'shuzheng-waterfalls',
              type: '活动',
            },
            {
              time: '10:00',
              title: '树正群海',
              description:
                '沿栈道穿行于大小不一的海子之间。每一个都如宝石般碧蓝——一个人独享这片蓝色的奢侈。',
              type: '活动',
            },
            {
              time: '12:00',
              title: '树正寨藏式午餐',
              description:
                '在树正寨品尝酥油茶、青稞饼与牦牛酸奶。和藏族阿妈聊聊天——一个人的旅行更容易遇到意外的温暖。',
              type: '餐饮',
            },
            {
              time: '14:00',
              title: '扎如寺祈福',
              description:
                '参访千年本教寺庙。一个人转动经筒、悬挂经幡——在海拔3000米的雪山下，为自己和家人祈福。',
              attractionId: 'zarhu-temple',
              type: '活动',
            },
            {
              time: '16:30',
              title: '藏寨探访',
              description:
                '走进当地藏民的家。喝一碗酥油茶，听老人讲述九寨沟的故事。独行者的旅途中最珍贵的往往是这些偶然的相遇。',
              type: '活动',
            },
            {
              time: '19:00',
              title: '锅庄舞之夜',
              description:
                '在藏寨广场与当地人一起围着篝火跳舞。没有人问你从哪里来——在这片星空下，大家都是旅人。',
              type: '活动',
            },
          ],
        },
        {
          day: 3,
          title: '秘境与告别',
          items: [
            {
              time: '06:30',
              title: '日出摄影',
              description:
                '在专业向导带领下前往最佳机位，捕捉清晨第一缕光照亮雪山的瞬间。一个人的日出——不用等任何人，只需要对自己负责。',
              type: '活动',
            },
            {
              time: '09:00',
              title: '熊猫海与箭竹海',
              description:
                '探访日则沟的第一对姐妹海子。在游客大潮到来之前，独享这片碧蓝的宁静。',
              type: '活动',
            },
            {
              time: '12:00',
              title: '川西风味午餐',
              description:
                '在沟口的川菜馆点一份水煮牦牛肉与松茸炖鸡。一个人也要好好吃饭——这是九寨沟教会你的事。',
              type: '餐饮',
            },
            {
              time: '14:00',
              title: '九寨天堂温泉',
              description:
                '在雪山环抱的温泉中舒缓两天的疲惫。闭上眼睛，回忆这三天的每一帧画面——这是九寨沟给你的最后礼物。',
              type: '休息',
            },
            {
              time: '16:30',
              title: '藏族手工艺品',
              description:
                '在沟口购买藏族手工唐卡、牦牛毛围巾与松茸干货。带一份九寨沟回家——给你和你在乎的人。',
              type: '活动',
            },
            {
              time: '19:00',
              title: '告别晚餐',
              description:
                '以一顿丰盛的川西料理为独自一人的九寨沟之旅画上句号。回去之后，你会有很多故事可以讲。',
              type: '餐饮',
            },
          ],
        },
      ],
    },
    default: {
      title: '九寨沟三日·人间仙境之旅',
      overview:
        '五彩海子、钙华瀑布、原始森林、藏寨风情——在世界上最美的自然景观中度过难忘的三天。',
      itinerary: [
        {
          day: 1,
          title: '日则沟精华',
          items: [
            {
              time: '07:00',
              title: '镜海晨光',
              description: '清晨无风时拍摄完美的雪山森林倒影。',
              attractionId: 'mirror-lake',
              type: '活动',
            },
            {
              time: '09:00',
              title: '五花海',
              description: '在阳光直射时欣赏五色湖水奇观。',
              attractionId: 'five-flower-lake',
              type: '活动',
            },
            {
              time: '11:00',
              title: '原始森林徒步',
              description: '沿日则沟栈道深入原始针叶林。',
              attractionId: 'primeval-forest',
              type: '活动',
            },
            {
              time: '12:30',
              title: '诺日朗餐厅',
              description: '在游客中心品尝川味简餐。',
              type: '餐饮',
            },
            {
              time: '14:00',
              title: '诺日朗瀑布',
              description: '欣赏中国最宽钙华瀑布的壮美。',
              attractionId: 'nuorilang-falls',
              type: '活动',
            },
            {
              time: '18:00',
              title: '藏家晚餐',
              description: '牦牛肉火锅与青稞酒。',
              type: '餐饮',
            },
          ],
        },
        {
          day: 2,
          title: '树正沟与藏文化',
          items: [
            {
              time: '07:30',
              title: '树正瀑布群',
              description: '数十个钙华瀑布在丛林间奔流。',
              attractionId: 'shuzheng-waterfalls',
              type: '活动',
            },
            {
              time: '10:00',
              title: '树正群海',
              description: '穿行于如宝石般碧蓝的海子之间。',
              type: '活动',
            },
            {
              time: '12:00',
              title: '藏式午餐',
              description: '酥油茶、青稞饼与牦牛酸奶。',
              type: '餐饮',
            },
            {
              time: '14:00',
              title: '扎如寺',
              description: '转动经筒，悬挂经幡祈福。',
              attractionId: 'zarhu-temple',
              type: '活动',
            },
            {
              time: '16:30',
              title: '藏寨探访',
              description: '走进藏民的家，了解传统文化。',
              type: '活动',
            },
            {
              time: '19:00',
              title: '锅庄舞之夜',
              description: '与藏民围着篝火跳舞。',
              type: '活动',
            },
          ],
        },
        {
          day: 3,
          title: '秘境与告别',
          items: [
            {
              time: '06:30',
              title: '日出摄影',
              description: '在专业向导带领下拍摄晨光。',
              type: '活动',
            },
            {
              time: '09:00',
              title: '熊猫海与箭竹海',
              description: '日则沟最后的秘境海子。',
              type: '活动',
            },
            {
              time: '12:00',
              title: '川西风味午餐',
              description: '水煮牦牛肉与松茸炖鸡。',
              type: '餐饮',
            },
            {
              time: '14:00',
              title: '温泉放松',
              description: '在雪山环抱中舒缓疲惫。',
              type: '休息',
            },
            {
              time: '16:30',
              title: '购买伴手礼',
              description: '唐卡、牦牛毛围巾与松茸。',
              type: '活动',
            },
            {
              time: '19:00',
              title: '告别晚餐',
              description: '以丰盛的川西料理告别九寨沟。',
              type: '餐饮',
            },
          ],
        },
      ],
    },
  },
};
