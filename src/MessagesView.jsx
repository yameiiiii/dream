import React, { useMemo, useState } from 'react';
import { ArrowLeft, CheckCheck, Clock3, MessageCircle, Send, ShieldCheck, Sparkles } from 'lucide-react';

const CONTACTS = [
  { id: 'mistdream', name: '雾岛眠', relation: '未关注', preview: '来自「鲸鱼背上的发光城市」', unread: false },
  { id: 'cloud17', name: '十七层云', relation: '互相关注', preview: '我也经常梦到学校。', unread: true },
  { id: 'nocturne', name: '早睡失败者', relation: '已回复', preview: '那列车后来开去哪里了？', unread: false }
];

const INITIAL_THREADS = {
  cloud17: { status: 'open', messages: [{ from: 'them', text: '我也经常梦到学校。' }, { from: 'me', text: '你梦里的学校也一直停在傍晚吗？' }] },
  nocturne: { status: 'open', messages: [{ from: 'me', text: '你的云中列车让我想到我昨晚的梦。' }, { from: 'them', text: '那列车后来开去哪里了？' }] },
  mistdream: { status: 'new', messages: [] }
};

export default function MessagesView({ initialDream, onBack }) {
  const initialId = initialDream?.handle?.replace('@', '') || 'mistdream';
  const [activeId, setActiveId] = useState(initialId);
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [draft, setDraft] = useState(initialDream ? `你好，我看到了你分享的「${initialDream.title}」，` : '');
  const activeContact = useMemo(() => CONTACTS.find((item) => item.id === activeId) || CONTACTS[0], [activeId]);
  const thread = threads[activeId] || { status: 'new', messages: [] };
  const awaitingReply = thread.status === 'awaiting';

  const send = () => {
    if (!draft.trim() || awaitingReply) return;
    setThreads((current) => ({
      ...current,
      [activeId]: {
        status: thread.status === 'new' ? 'awaiting' : 'open',
        messages: [...thread.messages, { from: 'me', text: draft.trim() }]
      }
    }));
    setDraft('');
  };

  const simulateReply = () => {
    setThreads((current) => ({
      ...current,
      [activeId]: {
        status: 'open',
        messages: [...thread.messages, { from: 'them', text: '谢谢你告诉我。这个画面也让我觉得很特别。' }]
      }
    }));
  };

  return (
    <section className="subpage messages-page">
      <header className="messages-heading"><button onClick={onBack}><ArrowLeft size={17} /> 返回广场</button><div><div className="eyebrow"><MessageCircle size={14} /> DREAM MESSAGES</div><h1>梦境私信</h1></div></header>
      <div className="messages-shell">
        <aside className="conversation-list">
          <header><h2>对话</h2><span>3</span></header>
          {CONTACTS.map((contact) => (
            <button key={contact.id} className={activeId === contact.id ? 'active' : ''} onClick={() => { setActiveId(contact.id); setDraft(''); }}>
              <span>{contact.name.slice(0, 1)}</span><div><b>{contact.name}</b><p>{contact.preview}</p></div><small>{contact.relation}</small>
            </button>
          ))}
        </aside>

        <section className="conversation-panel">
          <header><span className="conversation-avatar">{activeContact.name.slice(0, 1)}</span><div><b>{activeContact.name}</b><small>{activeContact.relation} · 解析内容不会随私信发送</small></div></header>
          <div className="message-policy"><ShieldCheck size={15} /><span>{thread.status === 'new' ? '你们尚未建立对话。你可以先发送 1 条私信。' : null}{awaitingReply ? '首条私信已送达。对方回复前，暂时不能继续发送。' : null}{thread.status === 'open' ? '对方已回复，对话已解锁。现在可以持续交流，无需互相关注。' : null}</span></div>
          <div className="message-stream">
            {thread.messages.length === 0 ? <div className="message-empty"><Sparkles size={25} /><h3>从一个具体的梦境感受开始</h3><p>首条私信建议说明你为什么想联系对方，避免发送联系方式或敏感信息。</p></div> : null}
            {thread.messages.map((message) => <div key={`${message.from}-${message.text}`} className={`bubble ${message.from}`}><p>{message.text}</p><small>{message.from === 'me' ? <><CheckCheck size={12} /> 已送达</> : '刚刚'}</small></div>)}
          </div>
          {awaitingReply ? <div className="reply-demo"><Clock3 size={15} /><span>等待对方回复</span><button onClick={simulateReply}>模拟对方回复</button></div> : null}
          <div className="message-composer"><input disabled={awaitingReply} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && send()} placeholder={awaitingReply ? '对方回复后可继续发送' : '输入私信……'} /><button disabled={awaitingReply || !draft.trim()} onClick={send}><Send size={17} /></button></div>
        </section>
      </div>
    </section>
  );
}
