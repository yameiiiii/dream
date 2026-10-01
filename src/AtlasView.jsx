import React, { useMemo, useState } from 'react';
import { BookOpen, Brain, ChevronRight, Cloud, Flame, Home, Search, Sparkles, Waves, Wind } from 'lucide-react';

const SYMBOLS = [
  { id: 'water', name: '水', category: '自然', count: 3, icon: Waves, tone: 'blue', keywords: ['海', '河流', '淹没'], traditional: '古代梦书会按照水的清浊、涨落以及涉水、落水等情境分别占断，不存在统一的“水等于财富”。', psychology: '比起固定象征，可以关注梦里的水给你带来的感受，以及它是否与近期难以控制或不断变化的经历相似。', question: '水是平静、清澈，还是让你无法前进？' },
  { id: 'flight', name: '飞行', category: '动作', count: 2, icon: Wind, tone: 'purple', keywords: ['升空', '漂浮', '云层'], traditional: '传统文本有飞、升天、腾空等条目，解释随人物身份和动作结果变化，不能直接对应现代自由飞行体验。', psychology: '飞行梦没有统一解释，可以观察自主感、身体感受和落地方式。', question: '你能控制方向，还是被力量带走？' },
  { id: 'house', name: '房屋', category: '空间', count: 2, icon: Home, tone: 'peach', keywords: ['家', '门', '房间'], traditional: '梦书分别记录新建、修盖、登楼、门户破损或屋宅倒塌等具体情境。', psychology: '熟悉或陌生的房间可能吸收现实记忆，但不能直接等同于人格结构。', question: '哪个房间最熟悉？你是否愿意进入？' },
  { id: 'fire', name: '火', category: '自然', count: 1, icon: Flame, tone: 'rose', keywords: ['燃烧', '火光', '烟'], traditional: '传统占辞会区分持火、燃火、火烧屋宅或山野，可能出现相反解释。', psychology: '火的意义取决于温度、危险感、距离和你在梦里的行动。', question: '你在取暖、观察、扑灭，还是逃离？' },
  { id: 'cloud', name: '天空', category: '自然', count: 2, icon: Cloud, tone: 'sky', keywords: ['云', '月亮', '星星'], traditional: '天象类条目常与时代观念和身份秩序相连，需要结合具体版本阅读。', psychology: '辽阔空间可能伴随自由、渺小或不确定感，个人体验比通用词典更重要。', question: '抬头时，你感到轻松还是失去方向？' },
  { id: 'stranger', name: '陌生人', category: '人物', count: 2, icon: Sparkles, tone: 'sage', keywords: ['人影', '故人', '面孔'], traditional: '抽象的陌生人没有稳定古籍对应，只在能匹配具体人物关系与行动时引用条目。', psychology: '梦中人物常混合不同记忆特征，不必假设他一定代表某个真实的人。', question: '你更在意他的身份，还是他让你产生的感受？' }
];

export default function AtlasView() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('全部');
  const [active, setActive] = useState(SYMBOLS[0]);
  const categories = ['全部', '自然', '人物', '空间', '动作'];
  const filtered = useMemo(() => SYMBOLS.filter((item) => {
    const hit = `${item.name}${item.keywords.join('')}`.includes(query.trim());
    return hit && (category === '全部' || item.category === category);
  }), [query, category]);
  const Icon = active.icon;

  return (
    <section className="subpage atlas-page">
      <header className="subpage-hero atlas-hero">
        <div>
          <div className="eyebrow"><Sparkles size={14} /> PERSONAL SYMBOL ATLAS</div>
          <h1>意象图谱</h1>
          <p>不是通用答案，而是一张随着记录不断生长的个人梦境地图。</p>
        </div>
        <div className="atlas-count"><b>16</b><span>已收集意象</span><small>跨越 4 个梦境</small></div>
      </header>

      <div className="atlas-layout">
        <div className="atlas-browser">
          <div className="atlas-tools">
            <label><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索意象" /></label>
            <div>{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
          </div>
          <div className="symbol-grid">
            {filtered.map((symbol) => {
              const SymbolIcon = symbol.icon;
              return (
                <button key={symbol.id} className={`symbol-card ${symbol.tone} ${active.id === symbol.id ? 'selected' : ''}`} onClick={() => setActive(symbol)}>
                  <span className="symbol-icon"><SymbolIcon size={22} /></span>
                  <span className="symbol-name"><b>{symbol.name}</b><small>{symbol.category} · 出现 {symbol.count} 次</small></span>
                  <ChevronRight size={16} />
                </button>
              );
            })}
          </div>
          {!filtered.length && <div className="atlas-empty">暂时没有匹配的意象</div>}
        </div>

        <aside className={`symbol-detail ${active.tone}`}>
          <div className="detail-head"><span><Icon size={26} /></span><div><small>{active.category} · 出现 {active.count} 次</small><h2>{active.name}</h2></div></div>
          <div className="detail-keywords">{active.keywords.map((keyword) => <b key={keyword}>{keyword}</b>)}</div>
          <div className="detail-section"><div><BookOpen size={16} />传统解梦</div><p>{active.traditional}</p><small>传统梦占记录，不构成现实预测</small></div>
          <div className="detail-section psychology"><div><Brain size={16} />心理观察</div><p>{active.psychology}</p><blockquote>{active.question}</blockquote></div>
          <div className="detail-history"><span>在你的梦中</span><div className="history-line"><i /><p><b>09 · 18</b> 紫色海城</p></div><div className="history-line"><i /><p><b>08 · 04</b> 雨后的车站</p></div></div>
        </aside>
      </div>
    </section>
  );
}
