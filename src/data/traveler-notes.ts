export type NoteMood = '日出' | '美食' | '冒险' | '文化' | '放松' | '夜景';

export interface TravelerNote {
  id: string;
  nickname: string;
  destination: string;
  title: string;
  content: string;
  date?: string;
  mood?: NoteMood;
  /** true for sample/demo data — rendered with a subtle demo badge */
  isSample?: boolean;
}

export const MOOD_OPTIONS: NoteMood[] = ['日出', '美食', '冒险', '文化', '放松', '夜景'];

const MOOD_COLORS: Record<NoteMood, string> = {
  '日出': '#E07B5A',
  '美食': '#E07B5A',
  '冒险': '#9B7BC8',
  '文化': '#C8A87B',
  '放松': '#6BAF7B',
  '夜景': '#7B9FC8',
};

export function moodColor(mood: NoteMood): string {
  return MOOD_COLORS[mood] || '#C8884B';
}

export const SAMPLE_NOTES: TravelerNote[] = [
  {
    id: 'sample-1',
    nickname: '云游志',
    destination: '杭州',
    title: '西湖晨雾中的三十分钟',
    content:
      '清晨六点从北山路出发，沿着苏堤往湖心方向走。雾很大，十米外的雷峰塔只剩下一个模糊的轮廓。湖面上有摇橹船缓缓划过，船娘的背影在雾中像一幅水墨画。走到第三座桥时太阳突然破雾而出，整个西湖在三十秒内从灰白变成金色。旁边一个拿着长焦的大叔低声说了一句："等了三天，等的就是这一刻。"',
    date: '2026年3月',
    mood: '日出',
    isSample: true,
  },
  {
    id: 'sample-2',
    nickname: '北境来访',
    destination: '法罗群岛',
    title: '在世界尽头敲开一扇门',
    content:
      'Gjógv村的客栈老板是个退休渔民，听说我从中国来，执意要给我看他的"收藏"——一整个抽屉的明信片，全是过去二十年住客从世界各地寄来的。最远的一张来自智利。他说每年冬天风暴封岛的时候，他就翻这些明信片，想象那些曾经来过的人此刻在做什么。"你回去以后，也给我寄一张吧。"他在我的账单背面写下了地址。',
    date: '2025年8月',
    mood: '冒险',
    isSample: true,
  },
  {
    id: 'sample-3',
    nickname: '花椒少女',
    destination: '重庆',
    title: '防空洞里的第九宫格',
    content:
      '本地朋友带我去了她从小吃到大的洞子火锅。防空洞很深，越往里走空气越辣。点的是微辣——"重庆的微辣"，她特意强调。第九宫格在红油里翻滚的时候，隔壁桌的大叔递过来一盘刚涮好的鹅肠："妹儿，趁热。"在重庆，火锅不是一个人的事，半条防空洞都是你的饭搭子。',
    date: '2026年1月',
    mood: '美食',
    isSample: true,
  },
  {
    id: 'sample-4',
    nickname: '长安月',
    destination: '西安',
    title: '在城墙上骑完一圈日落',
    content:
      '租了一辆老式永久牌自行车，从永宁门上城墙。下午四点半，阳光正好把城墙砖染成琥珀色。顺时针骑，每到一个转角就停下来拍一张——同一个位置，不同的光线。骑完一整圈用了两小时零七分钟，回到起点的时候太阳刚好沉到钟楼背后。城墙上有人在放风筝，是一只巨大的燕子风筝，飞得比大雁塔还高。',
    date: '2026年4月',
    mood: '文化',
    isSample: true,
  },
  {
    id: 'sample-5',
    nickname: '岛屿笔记',
    destination: '圣托里尼',
    title: '迷路在蓝白之间',
    content:
      '本来要去那个著名的蓝顶教堂拍照，结果在Oia的小巷里彻底迷路了。每一条窄巷都通向一片新的蓝，每一级台阶都引向一个不同的白。最后放弃了找路，随便坐在一户人家的台阶上，看着太阳把整个爱琴海一寸一寸地染成橘色。没拍到蓝顶教堂，但拍到了更好看的——一个老奶奶在自家门口喂猫，身后是整片金色的海。',
    date: '2025年9月',
    mood: '放松',
    isSample: true,
  },
];
