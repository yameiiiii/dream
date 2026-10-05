import React, { useState } from 'react';
import { Bookmark, ChevronRight, Grid3X3, Heart, LockKeyhole, MoonStar, Settings, UserCheck, Users, X } from 'lucide-react';

const RELATION_PEOPLE = [
  { id: 'cloud17', name: '十七层云', handle: '@cloud17', note: '互相关注 · 朋友' },
  { id: 'mistdream', name: '雾岛眠', handle: '@mistdream', note: '分享鲸鱼与海的梦' },
  { id: 'nocturne', name: '早睡失败者', handle: '@nocturne', note: '分享云中列车的梦' }
];

const MOCK_DREAMS = [
  { id: 'profile-1', title: '紫色海城', meta: '今天 · 15 秒', theme: 'lilac' },
  { id: 'profile-2', title: '通往森林的车站', meta: '9 月 28 日 · 12 秒', theme: 'forest' },
  { id: 'profile-3', title: '倒悬的月亮', meta: '9 月 21 日 · 18 秒', theme: 'ocean' }
];

export default function ProfileView({ onArchive, savedDreams = [], following = [] }) {
  const [tab, setTab] = useState('梦境');
  const [relationType, setRelationType] = useState('');
  const ownDreams = [...savedDreams.map((item) => ({ ...item, meta: new Date(item.createdAt).toLocaleDateString('zh-CN'), theme: 'lilac' })), ...MOCK_DREAMS];
  const relationList = relationType === '关注' ? RELATION_PEOPLE.filter((item) => following.includes(item.id)) : relationType === '朋友' ? RELATION_PEOPLE.slice(0, 1) : RELATION_PEOPLE;

  return (
    <section className="subpage profile-page social-profile">
      <div className="profile-cover"><div className="profile-cover-orb" /></div>
      <header className="profile-social-head">
        <div className="profile-avatar social-avatar"><MoonStar size={34} /><i /></div>
        <div className="profile-identity"><h1>覃亚美</h1><p>@yamei · 梦境记录者</p><span>把醒来前最后一帧保存下来。</span></div>
        <div className="profile-social-actions"><button><Settings size={16} />设置</button></div>
      </header>

      <div className="profile-social-stats">
        <button onClick={() => onArchive()}><b>{ownDreams.length}</b><span>梦境</span></button>
        <button onClick={() => setRelationType('关注')}><b>{following.length}</b><span>关注</span></button>
        <button onClick={() => setRelationType('粉丝')}><b>28</b><span>粉丝</span></button>
        <button onClick={() => setRelationType('朋友')}><b>1</b><span>朋友</span></button>
      </div>

      <div className="profile-quick-actions single">
        <button onClick={onArchive}><LockKeyhole size={17} /><span><b>私人梦境档案</b><small>查看自动保存的梦境、影像与情绪记录</small></span><ChevronRight size={16} /></button>
      </div>

      <div className="profile-content-tabs">
        <button className={tab === '梦境' ? 'active' : ''} onClick={() => setTab('梦境')}><Grid3X3 size={17} />梦境</button>
        <button className={tab === '收藏' ? 'active' : ''} onClick={() => setTab('收藏')}><Bookmark size={17} />收藏</button>
        <button className={tab === '喜欢' ? 'active' : ''} onClick={() => setTab('喜欢')}><Heart size={17} />喜欢</button>
      </div>

      {tab === '梦境' ? <div className="profile-dream-grid">{ownDreams.map((item) => <button className={`profile-dream-tile ${item.theme || 'lilac'}`} key={item.id}><span>{item.videoUrl ? '已生成影像' : '梦境记录'}</span><div><b>{item.title}</b><small>{item.meta}</small></div></button>)}</div> : <div className="profile-empty"><span>{tab === '收藏' ? <Bookmark size={27} /> : <Heart size={27} />}</span><h3>还没有{tab}内容</h3><p>在梦境广场遇到喜欢的内容，可以随时保存到这里。</p></div>}

      {relationType ? <div className="relation-backdrop" onClick={() => setRelationType('')}><aside className="relation-drawer" onClick={(event) => event.stopPropagation()}><header><div><small>RELATIONS</small><h2>我的{relationType}</h2></div><button onClick={() => setRelationType('')}><X size={19} /></button></header><div>{relationList.length ? relationList.map((person) => <article key={person.id}><span>{person.name.slice(0, 1)}</span><div><b>{person.name}</b><small>{person.handle} · {person.note}</small></div><button>{relationType === '朋友' ? <><UserCheck size={14} />朋友</> : '查看'}</button></article>) : <div className="relation-empty"><Users size={28} /><p>暂时没有记录</p></div>}</div></aside></div> : null}
    </section>
  );
}
