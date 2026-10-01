import React from 'react';
import { Bell, ChevronRight, Cloud, Download, EyeOff, Heart, LockKeyhole, MoonStar, Palette, Settings, ShieldCheck, Sparkles, UserRound } from 'lucide-react';

const SETTINGS = [
  { icon: LockKeyhole, title: '隐私与数据', text: '梦境默认仅自己可见', action: '管理' },
  { icon: Palette, title: '生成偏好', text: 'AI 智能匹配 · 温馨梦幻', action: '设置' },
  { icon: Bell, title: '记录提醒', text: '每天 08:30 提醒记录梦境', action: '调整' },
  { icon: Download, title: '导出档案', text: '导出梦境、情绪和意象记录', action: '导出' }
];

export default function ProfileView({ onCreate, onArchive }) {
  return (
    <section className="subpage profile-page">
      <header className="profile-hero">
        <div className="profile-avatar"><MoonStar size={34} /><i /></div>
        <div className="profile-identity"><div className="eyebrow">PERSONAL DREAM SPACE</div><h1>亚美的梦境空间</h1><p>从 2026 年 8 月开始记录 · 已连续记录 6 天</p></div>
        <button className="subpage-primary" onClick={onCreate}><Sparkles size={17} /> 记录一个新梦</button>
      </header>

      <div className="profile-stats">
        <div><span>梦境记录</span><b>12</b><small>其中 7 个生成了影像</small></div>
        <div><span>收集意象</span><b>16</b><small>水出现得最频繁</small></div>
        <div><span>情绪观察</span><b>3 期</b><small>2 份周报 · 1 份月报</small></div>
        <div><span>个人收藏</span><b>04</b><small>只对自己可见</small></div>
      </div>

      <div className="profile-grid">
        <section className="profile-card journey-card">
          <div className="profile-card-head"><div><span>SEPTEMBER JOURNEY</span><h2>九月梦境旅程</h2></div><button onClick={onArchive}>查看完整档案 <ChevronRight size={15} /></button></div>
          <div className="journey-visual">
            <div className="journey-moon"><MoonStar size={24} /></div>
            <div className="journey-path"><i /><i /><i /><i /></div>
            <div className="journey-copy"><span>本月关键词</span><h3>寻找 · 水 · 开放空间</h3><p>你记录了 4 个梦。月中“不安”较集中，月底的梦境开始出现更多平静水面和开阔天空。</p></div>
          </div>
          <div className="journey-dates"><div><b>06</b><span>云层之上</span></div><div><b>12</b><span>空荡学校</span></div><div><b>18</b><span>紫色海城</span></div><div className="active"><b>29</b><span>今日记录</span></div></div>
        </section>

        <aside className="profile-card privacy-card">
          <div className="privacy-icon"><ShieldCheck size={24} /></div><span>隐私状态</span><h2>你的梦境仅自己可见</h2><p>当前没有公开分享的梦境。生成内容、情绪记录和心理观察均保存在个人空间。</p>
          <div className="privacy-row"><EyeOff size={15} /><span>默认可见范围</span><b>仅自己</b></div>
          <div className="privacy-row"><Cloud size={15} /><span>云端同步</span><b>已开启</b></div>
        </aside>
      </div>

      <section className="profile-settings">
        <div className="profile-card-head"><div><span>YOUR PREFERENCES</span><h2>个人设置</h2></div><Settings size={18} /></div>
        <div className="settings-grid">{SETTINGS.map((item) => { const Icon = item.icon; return <button key={item.title}><i><Icon size={18} /></i><div><b>{item.title}</b><span>{item.text}</span></div><em>{item.action}</em><ChevronRight size={15} /></button>; })}</div>
      </section>

      <div className="profile-footer-note"><Heart size={14} /> REVERIE 会尊重你的记录边界，不会将梦境解析描述为确定预测或心理诊断。</div>
    </section>
  );
}
