import React, { useMemo, useState } from 'react';
import { CalendarDays, ChevronRight, Clock3, Film, Heart, Search, SlidersHorizontal, Sparkles, Tags, TrendingUp, X } from 'lucide-react';

const DAY = 86400000;
const daysAgo = (count) => new Date(Date.now() - count * DAY);
const pad = (value) => String(value).padStart(2, '0');
const iso = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const displayDate = (date) => `${pad(date.getMonth() + 1)} · ${pad(date.getDate())}`;

const DREAMS = [
  { id: 1, date: daysAgo(0), title: '紫色海城', excerpt: '城市被海水淹没，我一直在寻找一个想不起名字的人。', moods: ['寻找', '不安'], symbols: ['水', '城市', '陌生人'], color: 'lilac', duration: '00:15', hasVideo: true, parsed: true, favorite: true },
  { id: 2, date: daysAgo(2), title: '空荡的学校', excerpt: '午后的教室没有人，但身后的脚步始终没有停下。', moods: ['怀旧', '不安'], symbols: ['学校', '走廊', '脚步'], color: 'peach', duration: null, hasVideo: false, parsed: true, favorite: false },
  { id: 3, date: daysAgo(5), title: '云层之上', excerpt: '我没有翅膀，却能平静地飞过发光的云和很远的山。', moods: ['自由', '平静'], symbols: ['飞行', '天空', '山'], color: 'sky', duration: '00:12', hasVideo: true, parsed: false, favorite: true },
  { id: 4, date: daysAgo(12), title: '没有尽头的电梯', excerpt: '电梯一直下降，每次开门都是同一片深色森林。', moods: ['困惑', '不安'], symbols: ['下降', '电梯', '森林'], color: 'sage', duration: null, hasVideo: false, parsed: false, favorite: false },
  { id: 5, date: daysAgo(39), title: '雨后的车站', excerpt: '列车不断经过，却没有一班停靠在我面前。', moods: ['等待', '平静'], symbols: ['雨', '车站', '列车'], color: 'blue', duration: '00:10', hasVideo: true, parsed: true, favorite: false },
  { id: 6, date: daysAgo(76), title: '长满植物的房间', excerpt: '绿色藤蔓从窗边生长，慢慢覆盖了整个房间。', moods: ['好奇', '平静'], symbols: ['房屋', '植物', '窗户'], color: 'sage', duration: null, hasVideo: false, parsed: true, favorite: true }
];

const DATE_FILTERS = [
  { id: 'all', label: '全部记录' },
  { id: 'week', label: '近 7 天' },
  { id: 'month', label: '本月' },
  { id: 'quarter', label: '近 3 个月' },
  { id: 'custom', label: '自定义日期' }
];
const MOODS = ['全部情绪', '平静', '怀旧', '寻找', '困惑', '不安', '自由'];
const SUMMARY = {
  week: [
    { name: '平静', value: 32, color: '#91b8c6' }, { name: '不安', value: 28, color: '#b68eae' },
    { name: '怀旧', value: 18, color: '#d8aa9f' }, { name: '寻找', value: 14, color: '#a999c8' }, { name: '自由', value: 8, color: '#91a7cc' }
  ],
  month: [
    { name: '不安', value: 30, color: '#b68eae' }, { name: '平静', value: 26, color: '#91b8c6' },
    { name: '寻找', value: 19, color: '#a999c8' }, { name: '怀旧', value: 15, color: '#d8aa9f' }, { name: '自由', value: 10, color: '#91a7cc' }
  ]
};

function statusText(dream) {
  if (dream.hasVideo && dream.parsed) return '影像与解析已完成';
  if (dream.hasVideo) return '已有梦境影像';
  if (dream.parsed) return '已完成解析';
  return '仅文字记录';
}

export default function ArchiveView({ onOpenDream, onCreate }) {
  const [query, setQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('month');
  const [moodFilter, setMoodFilter] = useState('全部情绪');
  const [showMood, setShowMood] = useState(false);
  const [summaryPeriod, setSummaryPeriod] = useState('week');
  const [customRange, setCustomRange] = useState({ start: iso(daysAgo(30)), end: iso(new Date()) });

  const list = useMemo(() => DREAMS.filter((dream) => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const matchQuery = `${dream.title}${dream.excerpt}${dream.symbols.join('')}`.includes(query.trim());
    const matchMood = moodFilter === '全部情绪' || dream.moods.includes(moodFilter);
    let matchDate = true;
    if (dateFilter === 'week') matchDate = now - dream.date <= 7 * DAY;
    if (dateFilter === 'month') matchDate = dream.date >= startOfMonth;
    if (dateFilter === 'quarter') matchDate = now - dream.date <= 90 * DAY;
    if (dateFilter === 'custom') matchDate = dream.date >= new Date(`${customRange.start}T00:00:00`) && dream.date <= new Date(`${customRange.end}T23:59:59`);
    return matchQuery && matchMood && matchDate;
  }), [query, dateFilter, moodFilter, customRange]);

  const summary = SUMMARY[summaryPeriod];

  return (
    <section className="subpage archive-page">
      <header className="subpage-hero">
        <div>
          <div className="eyebrow"><CalendarDays size={14} /> PRIVATE DREAM ARCHIVE</div>
          <h1>梦境记录</h1>
          <p>按时间回看梦境，也观察一段时间内反复出现的情绪。</p>
        </div>
        <button className="subpage-primary" onClick={onCreate}><Sparkles size={17} /> 记录昨夜的梦</button>
      </header>

      <div className="archive-overview emotion-overview">
        <div><span>本月记录</span><b>04</b><small>比上月多 1 个梦</small></div>
        <div><span>连续记录</span><b>06 天</b><small>最长连续 9 天</small></div>
        <div><span>最常出现</span><b>水</b><small>本月出现 3 次</small></div>
        <div className="month-orbit"><i /><em>SEP</em><strong>29</strong><small>最近一次记录</small></div>
      </div>

      <section className="emotion-summary">
        <div className="emotion-summary-head">
          <div><div className="eyebrow"><TrendingUp size={13} /> EMOTION REVIEW</div><h2>情绪总结</h2></div>
          <div className="summary-tabs"><button className={summaryPeriod === 'week' ? 'active' : ''} onClick={() => setSummaryPeriod('week')}>本周</button><button className={summaryPeriod === 'month' ? 'active' : ''} onClick={() => setSummaryPeriod('month')}>本月</button></div>
        </div>
        <div className="emotion-summary-body">
          <div className="emotion-insight">
            <span>{summaryPeriod === 'week' ? '09.23 — 09.29' : '2026 年 9 月'}</span>
            <h3>{summaryPeriod === 'week' ? '整体趋于平静，但仍在寻找答案' : '不安感有所上升，平静仍是主要底色'}</h3>
            <p>{summaryPeriod === 'week' ? '本周记录的梦境以平静和不安并存为主。与上周相比，追逐类情节减少，开放空间和水面出现得更多。' : '本月“不安”在月中更集中，月底逐渐回落；“寻找”在三个梦中反复出现，建议继续观察它与近期事件的关系。'}</p>
            <small>仅基于你确认的梦中情绪标签生成，不构成心理评估。</small>
          </div>
          <div className="emotion-bars">
            {summary.map((item) => <div key={item.name}><span>{item.name}</span><div><i style={{ width: `${item.value * 2.4}%`, background: item.color }} /></div><b>{item.value}%</b></div>)}
          </div>
        </div>
      </section>

      <div className="archive-section-title"><div><span>DREAM TIMELINE</span><h2>按日期回看</h2></div><small>共 {DREAMS.length} 条梦境记录</small></div>
      <div className="archive-date-tabs" aria-label="日期筛选">
        {DATE_FILTERS.map((item) => <button key={item.id} className={dateFilter === item.id ? 'active' : ''} onClick={() => setDateFilter(item.id)}>{item.label}</button>)}
      </div>
      {dateFilter === 'custom' && <div className="custom-date-range"><label>开始日期<input type="date" value={customRange.start} onChange={(event) => setCustomRange({ ...customRange, start: event.target.value })} /></label><span>至</span><label>结束日期<input type="date" value={customRange.end} onChange={(event) => setCustomRange({ ...customRange, end: event.target.value })} /></label></div>}

      <div className="archive-tools redesigned">
        <label><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索梦境、地点或意象" /></label>
        <button className={showMood || moodFilter !== '全部情绪' ? 'mood-filter-button active' : 'mood-filter-button'} onClick={() => setShowMood(!showMood)}><SlidersHorizontal size={15} /> 情绪筛选{moodFilter !== '全部情绪' && <b>1</b>}</button>
      </div>
      {showMood && <div className="mood-filter-panel"><div><span>梦中情绪</span><small>每个梦可以保留多个情绪标签</small></div><div className="mood-filter-chips">{MOODS.map((mood) => <button key={mood} className={moodFilter === mood ? 'active' : ''} onClick={() => setMoodFilter(mood)}>{mood}</button>)}</div>{moodFilter !== '全部情绪' && <button className="clear-mood" onClick={() => setMoodFilter('全部情绪')}><X size={13} />清除</button>}</div>}

      <div className="archive-result-meta"><span>{list.length} 条记录</span><small>按记录时间倒序</small></div>
      <div className="archive-list">
        {list.map((dream) => <article className="archive-card" key={dream.id} onClick={() => onOpenDream(dream)}>
          <div className="archive-date"><b>{displayDate(dream.date)}</b><small>{dream.date.getFullYear()}</small></div>
          <div className={`archive-visual ${dream.color}`}><div className="archive-orb" /><span>{dream.hasVideo ? <><Film size={14} /> {dream.duration}</> : '文字梦境'}</span>{dream.favorite && <i className="favorite-mark"><Heart size={12} fill="currentColor" /></i>}</div>
          <div className="archive-copy"><div className="archive-card-meta"><div>{dream.moods.map((mood) => <span key={mood}>{mood}</span>)}</div><small>{statusText(dream)}</small></div><h2>{dream.title}</h2><p>{dream.excerpt}</p><div className="archive-tags"><Tags size={12} />{dream.symbols.map((symbol) => <b key={symbol}>{symbol}</b>)}</div></div>
          <button className="archive-open" aria-label={`打开${dream.title}`}><ChevronRight size={20} /></button>
        </article>)}
        {!list.length && <div className="archive-empty"><Clock3 size={28} /><h3>这个日期范围内没有记录</h3><p>调整日期范围、情绪或搜索关键词后再试。</p></div>}
      </div>
    </section>
  );
}
