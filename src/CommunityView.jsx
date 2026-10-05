import React, { useMemo, useState } from 'react';
import { Bookmark, Heart, MessageCircle, MoreHorizontal, Play, Send, Sparkles, UserCheck, UserPlus, X } from 'lucide-react';

const DREAMS = [
  {
    id: 1,
    userId: 'mistdream',
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
    userId: 'cloud17',
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
    userId: 'nocturne',
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

function DreamCard({ dream, isFollowing, onToggleFollow, onOpenComments }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [echoed, setEchoed] = useState(false);

  return (
    <article className="community-card social-card">
      <div className={`community-visual ${dream.theme}`}>
        <button className="community-play single-video-button" aria-label={`播放${dream.title}`}><Play size={24} fill="currentColor" /></button>
      </div>
      <div className="community-card-body">
        <h2 className="community-card-title">{dream.title}</h2>
        <header className="community-author">
          <span className={`community-avatar avatar-${dream.id}`}>{dream.author.slice(0, 1)}</span>
          <div><b>{dream.author}</b><small>{dream.handle} · {dream.time}</small></div>
          <button className={isFollowing ? 'follow-button following' : 'follow-button'} onClick={() => onToggleFollow(dream.userId)}>
            {isFollowing ? <><UserCheck size={14} />已关注</> : <><UserPlus size={14} />关注</>}
          </button>
          <button className="more-button" aria-label="更多操作"><MoreHorizontal size={18} /></button>
        </header>
        <p>{dream.excerpt}</p>
        <div className="community-tags">
          {dream.symbols.map((tag) => <span key={tag}>#{tag}</span>)}
          {dream.moods.map((tag) => <span className="mood-tag" key={tag}>#{tag}</span>)}
        </div>
        <footer className="community-actions">
          <button className={liked ? 'active' : ''} onClick={() => setLiked(!liked)}><Heart size={18} fill={liked ? 'currentColor' : 'none'} /> {dream.likes + (liked ? 1 : 0)}</button>
          <button onClick={() => onOpenComments(dream)}><MessageCircle size={18} /> {dream.comments}</button>
          <button className={echoed ? 'active' : ''} onClick={() => setEchoed(!echoed)}><Sparkles size={18} /> {echoed ? '共梦' : dream.echoes}</button>
          <button className={saved ? 'active push-right' : 'push-right'} onClick={() => setSaved(!saved)}><Bookmark size={18} fill={saved ? 'currentColor' : 'none'} /></button>
        </footer>
      </div>
    </article>
  );
}

export default function CommunityView({ following, onToggleFollow }) {
  const [filter, setFilter] = useState('推荐');
  const [activeDream, setActiveDream] = useState(null);
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [comment, setComment] = useState('');
  const filteredDreams = useMemo(() => {
    if (filter === '关注') return DREAMS.filter((item) => following.includes(item.userId));
    if (filter === '同城') return DREAMS.slice(0, 2);
    return DREAMS;
  }, [filter, following]);

  const submitComment = () => {
    if (!comment.trim()) return;
    setComments([...comments, { name: '亚美', text: comment.trim(), time: '刚刚' }]);
    setComment('');
  };

  return (
    <section className="subpage community-page social-home xhs-home">
      <div className="community-toolbar social-tabs xhs-tabs">
        <div>{['关注', '推荐', '同城'].map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div>
      </div>

      <div className="community-layout social-layout feed-only">
        <div className="community-feed social-feed">
          {filteredDreams.map((item) => <DreamCard key={item.id} dream={item} isFollowing={following.includes(item.userId)} onToggleFollow={onToggleFollow} onOpenComments={setActiveDream} />)}
          {!filteredDreams.length ? <div className="feed-empty"><UserPlus size={28} /><h3>还没有关注的人</h3><p>从推荐页关注感兴趣的梦境作者，他们的分享会出现在这里。</p></div> : null}
        </div>
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
