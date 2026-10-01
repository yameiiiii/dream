import React, { useState } from 'react';
import { Bookmark, Heart, MessageCircle, MoreHorizontal, Play, Send, Sparkles, UserPlus, Users, X } from 'lucide-react';

const DREAMS = [
  {
    id: 1,
    author: '雾岛眠',
    handle: '@mistdream',
    title: '在鲸鱼背上经过一座发光的城',
    excerpt: '海面没有风，鲸鱼每次呼吸，远处的灯就亮一盏。我知道城里有人在等我，但我没有急着靠岸。',
    symbols: ['鲸鱼', '海面', '远方城市'],
    moods: ['平静', '期待'],
    theme: 'ocean',
    likes: 328,
    comments: 42,
    echoes: 18,
    time: '12 分钟前'
  },
  {
    id: 2,
    author: '十七层云',
    handle: '@cloud17',
    title: '空荡学校的最后一间教室',
    excerpt: '夕阳一直停在放学前的那一分钟。我推开最后一扇门，看见小时候的自己正在擦黑板。',
    symbols: ['学校', '夕阳', '童年'],
    moods: ['怀念', '轻微不安'],
    theme: 'school',
    likes: 186,
    comments: 27,
    echoes: 31,
    time: '1 小时前'
  },
  {
    id: 3,
    author: '早睡失败者',
    handle: '@nocturne',
    title: '我在云层里找到一列慢车',
    excerpt: '车厢里每个人都戴着花做的面具，检票员没有问我去哪里，只说醒来之前都可以下车。',
    symbols: ['列车', '云层', '面具'],
    moods: ['自由', '好奇'],
    theme: 'cloud',
    likes: 512,
    comments: 68,
    echoes: 54,
    time: '昨天 23:48'
  }
];

const INITIAL_COMMENTS = [
  { name: '纸月亮', text: '我也梦到过类似的海面，但远处是一座没有窗户的房子。', time: '8 分钟前' },
  { name: '白昼信使', text: '这个画面的光线很安静，鲸鱼的呼吸节奏也很舒服。', time: '3 分钟前' }
];

function DreamCard({ dream, onOpenComments, onMessage }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [echoed, setEchoed] = useState(false);

  return (
    <article className="community-card">
      <div className={`community-visual ${dream.theme}`}>
        <div className="community-orb" />
        <button className="community-play" aria-label="播放梦境影像"><Play size={22} fill="currentColor" /></button>
        <span className="community-duration">00:15</span>
      </div>
      <div className="community-card-body">
        <header className="community-author">
          <span className={`community-avatar avatar-${dream.id}`}>{dream.author.slice(0, 1)}</span>
          <div><b>{dream.author}</b><small>{dream.handle} · {dream.time}</small></div>
          <button aria-label="更多操作"><MoreHorizontal size={18} /></button>
        </header>
        <h2>{dream.title}</h2>
        <p>{dream.excerpt}</p>
        <div className="community-tags">
          {dream.symbols.map((tag) => <span key={tag}>#{tag}</span>)}
          {dream.moods.map((tag) => <span className="mood-tag" key={tag}>#{tag}</span>)}
        </div>
        <div className="community-privacy-note">公开内容仅包含梦境描述与标签，不含梦境解析或个人情绪总结</div>
        <footer className="community-actions">
          <button className={liked ? 'active' : ''} onClick={() => setLiked(!liked)}><Heart size={17} fill={liked ? 'currentColor' : 'none'} /> {dream.likes + (liked ? 1 : 0)}</button>
          <button onClick={() => onOpenComments(dream)}><MessageCircle size={17} /> {dream.comments}</button>
          <button className={echoed ? 'active' : ''} onClick={() => setEchoed(!echoed)}><Sparkles size={17} /> {echoed ? '我也梦到过' : dream.echoes}</button>
          <button className={saved ? 'active push-right' : 'push-right'} onClick={() => setSaved(!saved)}><Bookmark size={17} fill={saved ? 'currentColor' : 'none'} /></button>
          <button className="message-author" onClick={() => onMessage(dream)}><Send size={16} /> 私信</button>
        </footer>
      </div>
    </article>
  );
}

export default function CommunityView({ onCreate, onMessage }) {
  const [filter, setFilter] = useState('推荐');
  const [activeDream, setActiveDream] = useState(null);
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [comment, setComment] = useState('');

  const submitComment = () => {
    if (!comment.trim()) return;
    setComments([...comments, { name: '亚美', text: comment.trim(), time: '刚刚' }]);
    setComment('');
  };

  return (
    <section className="subpage community-page">
      <header className="subpage-hero community-hero">
        <div><div className="eyebrow"><Users size={14} /> DREAM COMMONS</div><h1>梦境广场</h1><p>分享梦的画面与感受，在保持解析私密的前提下交流。</p></div>
        <button className="subpage-primary" onClick={onCreate}><Sparkles size={17} /> 记录并分享梦境</button>
      </header>

      <div className="community-toolbar">
        <div>{['推荐', '最新', '关注'].map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <span><UserPlus size={14} /> 未关注用户可发送 1 条私信；对方回复后即可继续对话</span>
      </div>

      <div className="community-layout">
        <div className="community-feed">{DREAMS.map((dream) => <DreamCard key={dream.id} dream={dream} onOpenComments={setActiveDream} onMessage={onMessage} />)}</div>
        <aside className="community-guide">
          <span>SHARING BOUNDARY</span><h3>分享边界</h3>
          <div><b>公开展示</b><p>影像、标题、描述、意象标签、情绪标签与互动数据。</p></div>
          <div><b>保持私密</b><p>传统解梦、心理观察、周/月情绪总结与私人补充记录。</p></div>
          <div><b>联系规则</b><p>未关注可发一条私信；对方回复后，双方即可持续对话。互相关注不再是私信的必要条件。</p></div>
        </aside>
      </div>

      {activeDream ? (
        <div className="comment-backdrop" onClick={() => setActiveDream(null)}>
          <aside className="comment-drawer" onClick={(event) => event.stopPropagation()}>
            <header><div><span>COMMENTS</span><h2>{activeDream.title}</h2></div><button onClick={() => setActiveDream(null)}><X size={19} /></button></header>
            <div className="comment-list">{comments.map((item) => <article key={`${item.name}-${item.time}-${item.text}`}><span>{item.name.slice(0, 1)}</span><div><b>{item.name}</b><p>{item.text}</p><small>{item.time} · 回复</small></div></article>)}</div>
            <div className="comment-composer"><input value={comment} onChange={(event) => setComment(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && submitComment()} placeholder="友善地回应这个梦……" /><button onClick={submitComment}><Send size={17} /></button></div>
          </aside>
        </div>
      ) : null}
    </section>
  );
}
