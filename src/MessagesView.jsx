import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCheck, Clock3, Heart, MessageCircle, Search, Send, Star, UserCheck, UserPlus, Users } from 'lucide-react';

const CONTACTS = [
  { id: 'mistdream', name: '雾岛眠', handle: '@mistdream', preview: '来自「鲸鱼背上的发光城市」', unread: false, online: true },
  { id: 'cloud17', name: '十七层云', handle: '@cloud17', preview: '我也经常梦到学校。', unread: true, online: true },
  { id: 'nocturne', name: '早睡失败者', handle: '@nocturne', preview: '那列车后来开去哪里了？', unread: false, online: false }
];

const INITIAL_THREADS = {
  cloud17: { status: 'open', messages: [{ from: 'them', text: '我也经常梦到学校。' }, { from: 'me', text: '你梦里的学校也一直停在傍晚吗？' }] },
  nocturne: { status: 'open', messages: [{ from: 'me', text: '你的云中列车让我想到我昨晚的梦。' }, { from: 'them', text: '那列车后来开去哪里了？' }] },
  mistdream: { status: 'new', messages: [] }
};

const THREADS_KEY = 'reverie:message-threads';

function loadThreads() {
  try {
    return JSON.parse(window.localStorage.getItem(THREADS_KEY)) || INITIAL_THREADS;
  } catch {
    return INITIAL_THREADS;
  }
}

export default function MessagesView({ initialDream, following = [], onToggleFollow }) {
  const [activeId, setActiveId] = useState(initialDream?.userId || (initialDream ? 'mistdream' : null));
  const [threads, setThreads] = useState(loadThreads);
  const [text, setText] = useState('');
  const [tab, setTab] = useState('私信');
  const [query, setQuery] = useState('');
  const activeContact = CONTACTS.find((item) => item.id === activeId) || CONTACTS[0];
  const thread = threads[activeId] || { status: 'new', messages: [] };
  const filteredContacts = useMemo(() => CONTACTS.filter((item) => `${item.name}${item.handle}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const friends = CONTACTS.filter((item) => following.includes(item.id) && threads[item.id]?.status === 'open');

  useEffect(() => {
    window.localStorage.setItem(THREADS_KEY, JSON.stringify(threads));
  }, [threads]);

  const send = () => {
    if (!text.trim() || thread.status === 'awaiting') return;
    const nextStatus = thread.status === 'new' ? 'awaiting' : thread.status;
    setThreads({ ...threads, [activeId]: { ...thread, status: nextStatus, messages: [...thread.messages, { from: 'me', text: text.trim() }] } });
    setText('');
  };

  const simulateReply = () => {
    setThreads({ ...threads, [activeId]: { status: 'open', messages: [...thread.messages, { from: 'them', text: '谢谢你来找我。我也很想聊聊这个梦。' }] } });
  };

  const selectContact = (id) => {
    setActiveId(id);
    setTab('私信');
  };

  return (
    <section className="subpage messages-page social-messages">
      <header className="messages-titlebar"><div><span>消息</span></div></header>
      <div className="message-notification-grid">
        <button><i className="notice-like"><Heart size={20} fill="currentColor" /></i><span><b>赞和收藏</b><small>3 条新互动</small></span></button>
        <button><i className="notice-follow"><UserPlus size={20} /></i><span><b>新增关注</b><small>2 位新朋友</small></span></button>
        <button><i className="notice-comment"><MessageCircle size={20} /></i><span><b>评论和 @</b><small>1 条新评论</small></span></button>
        <button><i className="notice-system"><Star size={20} /></i><span><b>系统通知</b><small>梦境影像已生成</small></span></button>
      </div>
      <div className={activeId ? 'messages-shell conversation-open' : 'messages-shell list-only'}>
        <aside className="conversation-list">
          <div className="message-tabs"><button className={tab === '私信' ? 'active' : ''} onClick={() => setTab('私信')}>私信</button><button className={tab === '朋友' ? 'active' : ''} onClick={() => setTab('朋友')}>朋友 <span>{friends.length}</span></button></div>
          <label className="message-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索联系人" /></label>
          {tab === '私信' ? filteredContacts.map((contact) => {
            const itemThread = threads[contact.id] || { status: 'new', messages: [] };
            const lastMessage = itemThread.messages.at(-1)?.text || contact.preview;
            return <button className={activeId === contact.id ? 'active' : ''} onClick={() => selectContact(contact.id)} key={contact.id}><span className="contact-avatar">{contact.name.slice(0, 1)}{contact.online ? <i /> : null}</span><div><b>{contact.name}{contact.unread ? <em /> : null}</b><small>{lastMessage}</small></div><time>{contact.unread ? '刚刚' : '昨天'}</time></button>;
          }) : friends.length ? friends.map((contact) => <button className={activeId === contact.id ? 'active' : ''} onClick={() => selectContact(contact.id)} key={contact.id}><span className="contact-avatar">{contact.name.slice(0, 1)}</span><div><b>{contact.name}</b><small>互相关注 · 可以持续对话</small></div><UserCheck size={16} /></button>) : <div className="contacts-empty"><Users size={24} /><b>还没有朋友</b><small>互相关注并建立对话后，会显示在这里。</small></div>}
        </aside>

        {activeId ? <main className="conversation-panel">
          <header><button className="conversation-back" onClick={() => setActiveId(null)}><ArrowLeft size={17} /></button><span className="contact-avatar">{activeContact.name.slice(0, 1)}{activeContact.online ? <i /> : null}</span><div><b>{activeContact.name}</b><small>{following.includes(activeContact.id) ? '已关注 · ' : '未关注 · '}{thread.status === 'open' ? '可以持续对话' : '首次联系仅可发送 1 条'}</small></div><button className="chat-follow" onClick={() => onToggleFollow(activeContact.id)}>{following.includes(activeContact.id) ? <><UserCheck size={15} />已关注</> : <><UserPlus size={15} />关注</>}</button></header>
          <div className="message-stream">
            <div className="conversation-context"><MessageCircle size={16} /> 因梦境分享建立联系</div>
            {thread.messages.length ? thread.messages.map((message, index) => <div className={`bubble ${message.from}`} key={`${message.from}-${message.text}`}><p>{message.text}</p><small>{message.from === 'me' ? <CheckCheck size={12} /> : null} {index === thread.messages.length - 1 ? '12:26' : '昨天'}</small></div>) : <div className="empty-thread"><span>{activeContact.name.slice(0, 1)}</span><h3>向 {activeContact.name} 打个招呼</h3><p>你可以先发送一条消息。对方回复后，双方即可继续对话。</p></div>}
            {thread.status === 'awaiting' ? <div className="waiting-note"><Clock3 size={15} />首条消息已送达，等待对方回复</div> : null}
            {thread.status === 'awaiting' ? <button className="simulate-reply" onClick={simulateReply}>演示：对方回复</button> : null}
          </div>
          <div className="message-composer"><input value={text} disabled={thread.status === 'awaiting'} onChange={(event) => setText(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && send()} placeholder={thread.status === 'awaiting' ? '对方回复后可以继续发送' : '输入消息……'} /><button disabled={!text.trim() || thread.status === 'awaiting'} onClick={send}><Send size={17} /></button></div>
        </main> : null}
      </div>
    </section>
  );
}
