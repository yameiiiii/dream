export const TRADITIONAL_ENTRIES = [
  {
    id: 'water', keywords: ['水', '海', '河', '湖', '雨', '淹', '洪'], title: '水、水势与涉水', grade: 'B',
    label: '传统梦书中多见',
    interpretation: '古代梦书通常按照水的清浊、涨落，以及涉水、落水等具体情境分别占断，并不存在“水等于财富”的统一结论。你描述的情境需要与原始条文逐项比对。',
    boundary: '这是历史梦占记录，不是现实预测。',
    source: '《敦煌本梦书》与通行《周公解梦》比对',
    url: 'https://zh.wikisource.org/wiki/%E5%91%A8%E5%85%AC%E8%A7%A3%E5%A4%A2'
  },
  {
    id: 'snake', keywords: ['蛇', '蟒'], title: '蛇与具体行动', grade: 'B',
    label: '传统梦书中多见',
    interpretation: '传统条目会区分蛇的颜色、数量、是否入宅、咬人或盘绕，相关占辞并不一致。“蛇必然代表背叛、性或怀孕”不是古籍中的统一结论。',
    boundary: '涉及疾病、生育或人际判断的条文不作确定性转述。',
    source: '《梦林玄解》古籍影像',
    url: 'https://ctext.org/library.pl?if=gb&res=3577&remap=gb'
  },
  {
    id: 'teeth', keywords: ['牙', '齿', '掉牙'], title: '牙齿脱落与变化', grade: 'A',
    label: '古籍有载',
    interpretation: '古籍中存在牙落、出血、再生等细分记录，不同版本会关联亲属、身体或身份变化，但结论并不统一。',
    boundary: '不采用“掉牙预示亲人死亡”等有伤害性的确定表述。',
    source: '《梦林玄解》古籍影像',
    url: 'https://ctext.org/library.pl?if=gb&res=3577&remap=gb'
  },
  {
    id: 'house', keywords: ['房', '屋', '家', '楼', '门'], title: '屋宅、门户与空间', grade: 'B',
    label: '传统梦书中多见',
    interpretation: '梦书常分别记录新建、修盖、登楼、门户破损或屋宅倒塌等情境，无法归纳为单一的“房屋代表自我”。',
    boundary: '只陈述文献记录，不据此判断家庭或现实吉凶。',
    source: '《梦林玄解》古籍影像',
    url: 'https://ctext.org/library.pl?if=gb&res=3577&remap=gb'
  },
  {
    id: 'fire', keywords: ['火', '燃烧', '着火'], title: '火势、地点与结果', grade: 'B',
    label: '传统梦书中多见',
    interpretation: '传统占辞会区分持火、燃火、火烧屋宅或山野等条件，可能同时出现兴旺、除忧或家宅不安等相反解释。',
    boundary: '火不等于固定的财运、愤怒或灾难。',
    source: '通行《周公解梦》文献入口',
    url: 'https://zh.wikisource.org/wiki/%E5%91%A8%E5%85%AC%E8%A7%A3%E5%A4%A2'
  },
  {
    id: 'flight', keywords: ['飞', '升空', '天空'], title: '飞行与升空', grade: 'C',
    label: '单一或后世文本',
    interpretation: '传统文本有飞、升天、腾空等条目，常与升迁、显达或异常征兆相连，但不完全对应现代人的自由飞行体验。',
    boundary: '需区分自主飞行、被带离与坠落等不同情境。',
    source: '《梦林玄解》古籍影像',
    url: 'https://ctext.org/library.pl?if=gb&res=3577&remap=gb'
  },
  {
    id: 'fall', keywords: ['坠', '掉下', '跌落', '下降'], title: '坠落与堕地', grade: 'C',
    label: '具体条文可核',
    interpretation: '古籍中可见从高处落下、坠水或堕地等具体动作，但未形成现代意义上统一的“坠落梦”解释。',
    boundary: '“坠落代表失控”属于现代心理化概括，不归入传统结论。',
    source: '《梦林玄解》古籍影像',
    url: 'https://ctext.org/library.pl?if=gb&res=3577&remap=gb'
  },
  {
    id: 'modern', keywords: ['学校', '教室', '考试', '追', '陌生人'], title: '现代生活型梦象', grade: 'D',
    label: '无稳定古籍对应',
    interpretation: '现代学校、迟到考试、陌生人或抽象追逐等体验，无法直接套入古代梦书。只有与读书、科举、见师长、被人逐等具体条文对应时才适合引用。',
    boundary: '不为了给出答案而拼接不相关的古籍条文。',
    source: '《周礼注疏》占梦制度背景',
    url: 'https://ctext.org/wiki.pl?if=gb&res=206690'
  }
];

export const PSYCHOLOGY_SOURCES = {
  continuity: {
    title: '清醒生活与梦的连续性', grade: 'A',
    insight: '研究较一致地发现，梦会选择性地吸收近期经历、持续关切、人物与情绪，但无法由单个元素反推出唯一事件。',
    question: '这个场景是否让你想到最近 1—7 天发生的事，或一件反复挂心的事？',
    url: 'https://academic.oup.com/scan/article-abstract/13/6/637/5032636'
  },
  emotion: {
    title: '情绪与记忆线索', grade: 'B',
    insight: '睡眠参与情绪与记忆加工，但不能据此断言某个梦正在“治愈”或揭示被压抑的记忆。梦里的感受通常比通用象征更值得记录。',
    question: '场景虽然不同，梦里最强烈的感受和最近哪种清醒情绪最相似？',
    url: 'https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2019.00459/full'
  },
  threat: {
    title: '威胁与应对方式', grade: 'C',
    insight: '追逐、受困或坠落等威胁主题较常见；它可能反映压力材料，也可能只是梦的叙事构造，不能用于诊断焦虑或创伤。',
    question: '梦里你在逃离、对抗、躲藏、求助，还是无法行动？结局有没有发生变化？',
    url: 'https://www.sciencedirect.com/science/article/pii/S1053810005000772'
  }
};

export function buildInterpretation(text) {
  const traditional = TRADITIONAL_ENTRIES.filter((item) => item.keywords.some((word) => text.includes(word)));
  const hasThreat = ['追', '逃', '坠', '掉下', '攻击', '害怕', '困'].some((word) => text.includes(word));
  const psychology = [PSYCHOLOGY_SOURCES.continuity, PSYCHOLOGY_SOURCES.emotion];
  if (hasThreat) psychology.push(PSYCHOLOGY_SOURCES.threat);
  return {
    traditional: traditional.length ? traditional.slice(0, 3) : [TRADITIONAL_ENTRIES[7]],
    psychology,
    symbols: traditional.length ? traditional.map((item) => item.title.split('与')[0]).slice(0, 3) : ['个人记忆', '梦中情绪', '近期经历']
  };
}
