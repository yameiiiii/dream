import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, AudioLines, BookOpen, Brain, ChevronRight, CircleStop, Clapperboard,
  Download, ExternalLink, Eye, Film, History, MessageCircle, MoonStar, Pause, Play, RotateCcw,
  Share2, ShieldCheck, Sparkles, Stars, UserRound, Users, WandSparkles, X
} from 'lucide-react';
import './styles.css';
import './dreamlight.css';
import './community.css';
import { buildInterpretation } from './knowledge.js';
import ArchiveView from './ArchiveView.jsx';
import AtlasView from './AtlasView.jsx';
import ProfileView from './ProfileView.jsx';
import CommunityView from './CommunityView.jsx';
import MessagesView from './MessagesView.jsx';
import { createDreamVideo, VIDEO_API_ENABLED, waitForDreamVideo } from './seedance.js';

const EXAMPLES = [
  '我梦见自己走在一座被海水淹没的城市里，天空是紫色的。我一直在找一个认识的人，但怎么也想不起他的名字。',
  '小时候的学校空无一人，阳光很亮，我推开每一间教室的门，却总能听到身后有人走路。',
  '我在没有尽头的电梯里不断下降，每一层打开都是同一片黑色森林。'
];

const STYLES = ['AI 智能匹配', '电影写实', '梦核怀旧', '超现实', '动画绘本', '暗黑惊悚'];

const SHOTS = [
  { index: '01', title: '沉没之城', text: '紫色天幕下，海水漫过空旷街道。镜头缓慢向前，城市没有任何声音。' },
  { index: '02', title: '独自穿行', text: '黑色长外套掠过水面，倒影在波纹里产生不自然的延迟。' },
  { index: '03', title: '无名之人', text: '远处人影转身离开。越靠近，建筑和记忆一起开始溶解。' }
];

function App() {
  const params = new URLSearchParams(window.location.search);
  const [page, setPage] = useState(() => ['community', 'archive', 'atlas', 'messages', 'profile'].includes(params.get('page')) ? params.get('page') : 'create');
  const [messageDream, setMessageDream] = useState(null);
  const [dream, setDream] = useState(EXAMPLES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [stage, setStage] = useState(() => new URLSearchParams(window.location.search).get('view') === 'result' ? 'result' : 'input');
  const [progress, setProgress] = useState(0);
  const [activeShot, setActiveShot] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(true);
  const [accessCode, setAccessCode] = useState('');
  const [generationError, setGenerationError] = useState('');
  const [generationLabel, setGenerationLabel] = useState('正在把梦境拆解为画面语言');
  const [videoUrl, setVideoUrl] = useState('');
  const [analysisMode, setAnalysisMode] = useState(() => new URLSearchParams(window.location.search).get('analysis') === 'psychology' ? 'psychology' : 'traditional');
  const interpretation = useMemo(() => buildInterpretation(dream), [dream]);

  useEffect(() => {
    if (stage !== 'generating' || VIDEO_API_ENABLED) return;
    const timer = setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          clearInterval(timer);
          setTimeout(() => setStage('result'), 350);
          return 100;
        }
        return Math.min(value + 2, 100);
      });
    }, 70);
    return () => clearInterval(timer);
  }, [stage]);

  const progressLabel = useMemo(() => {
    if (progress < 25) return '正在理解梦境中的人物与空间';
    if (progress < 52) return '正在设计光线、色彩与镜头';
    if (progress < 78) return '正在生成三个梦境片段';
    return '正在合成声音与影像';
  }, [progress]);

  const startGeneration = async () => {
    if (!dream.trim()) return;
    if (VIDEO_API_ENABLED && !accessCode.trim()) {
      setGenerationError('请输入作品演示访问码后再生成');
      return;
    }

    setGenerationError('');
    setVideoUrl('');
    setProgress(VIDEO_API_ENABLED ? 8 : 0);
    setGenerationLabel('正在把梦境拆解为画面语言');
    setStage('generating');

    if (!VIDEO_API_ENABLED) return;

    try {
      const task = await createDreamVideo({ dream, style, accessCode: accessCode.trim() });
      if (!task.id) throw new Error('任务已提交，但没有返回任务 ID');
      setProgress(18);
      setGenerationLabel('视频任务已提交，正在等待 Seedance');
      const result = await waitForDreamVideo(task.id, accessCode.trim(), (nextProgress, label) => {
        setProgress(nextProgress);
        setGenerationLabel(label);
      });
      setVideoUrl(result.videoUrl);
      setStage('result');
    } catch (error) {
      setGenerationError(error.message || '视频生成失败，请稍后重试');
      setStage('input');
    }
  };

  return (
    <main className="app-shell">
      <div className="grain" />
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <nav className="nav">
        <button className="brand" onClick={() => { setPage('create'); setStage('input'); }} aria-label="返回首页">
          <span className="brand-mark"><MoonStar size={20} /></span>
          <span>REVERIE</span>
        </button>
        <div className="nav-center">
          <button className={page === 'create' ? 'nav-item active' : 'nav-item'} onClick={() => { setPage('create'); setStage('input'); }}>造梦</button>
          <button className={page === 'community' ? 'nav-item active' : 'nav-item'} onClick={() => setPage('community')}>梦境广场</button>
          <button className={page === 'archive' ? 'nav-item active' : 'nav-item'} onClick={() => setPage('archive')}>梦境记录</button>
          <button className={page === 'atlas' ? 'nav-item active' : 'nav-item'} onClick={() => setPage('atlas')}>意象图谱</button>
        </div>
        <button className={page === 'profile' ? 'history-button profile-button active-profile' : 'history-button profile-button'} onClick={() => setPage('profile')}><UserRound size={17} /><span>亚美</span></button>
      </nav>

      {page === 'create' && stage === 'input' && (
        <section className="hero-view">
          <div className="eyebrow"><Stars size={14} /> AI DREAM CINEMA · BETA</div>
          <h1>让潜意识，<br /><em>再次显影。</em></h1>
          <p className="hero-copy">描述你记得的片段。AI 将解构情绪、空间与意象，<br className="desktop-break" />把不可复述的梦，转化为一段属于你的电影。</p>

          <div className="composer-wrap">
            <div className="composer-glow" />
            <div className="composer">
              <div className="composer-head">
                <span><Eye size={17} /> 描述你的梦</span>
                <span className="privacy-dot">仅你可见</span>
              </div>
              <textarea
                value={dream}
                onChange={(event) => setDream(event.target.value)}
                placeholder="从你还记得的画面开始……地点、人物、颜色，或者一种说不清的感受。"
                maxLength={500}
              />
              <div className="composer-meta">
                <button className="voice-button"><AudioLines size={17} /> 语音描述</button>
                <span>{dream.length} / 500</span>
              </div>
              <div className="style-row">
                <div className="style-title"><WandSparkles size={16} /> 影像风格</div>
                <div className="style-chips">
                  {STYLES.map((item) => (
                    <button key={item} className={style === item ? 'chip selected' : 'chip'} onClick={() => setStyle(item)}>
                      {item === 'AI 智能匹配' && <Sparkles size={13} />}{item}
                    </button>
                  ))}
                </div>
              </div>
              {VIDEO_API_ENABLED ? (
                <label className="access-code-field">
                  <span><ShieldCheck size={14} /> 作品演示访问码</span>
                  <input type="password" value={accessCode} onChange={(event) => setAccessCode(event.target.value)} placeholder="防止公开链接被他人消耗额度" autoComplete="off" />
                </label>
              ) : null}
              {generationError ? <div className="generation-error">{generationError}</div> : null}
              <button className="generate-button" onClick={startGeneration} disabled={!dream.trim()}>
                <span>{VIDEO_API_ENABLED ? '调用 Seedance 生成梦境' : '生成我的梦境'}</span><ArrowRight size={19} />
              </button>
            </div>
          </div>

          <div className="inspiration">
            <span>不知道如何开始？</span>
            {EXAMPLES.slice(1).map((item, index) => (
              <button key={item} onClick={() => setDream(item)}>
                {index === 0 ? '空荡的学校' : '没有尽头的电梯'}<ChevronRight size={14} />
              </button>
            ))}
          </div>

          <div className="feature-strip">
            <div><Clapperboard size={19} /><span><b>多镜头叙事</b>自动重构梦境时序</span></div>
            <div><Sparkles size={19} /><span><b>动态视觉设计</b>每个梦都有独立风格</span></div>
            <div><MoonStar size={19} /><span><b>双视角解析</b>传统意象与心理观察</span></div>
          </div>
        </section>
      )}

      {page === 'create' && stage === 'generating' && (
        <section className="generating-view">
          <button className="close-button" onClick={() => setStage('input')}><X size={18} /></button>
          <div className="portal">
            <div className="portal-ring ring-one" />
            <div className="portal-ring ring-two" />
            <div className="portal-core"><MoonStar size={42} /></div>
          </div>
          <div className="progress-number">{String(progress).padStart(2, '0')}<sup>%</sup></div>
          <h2>{VIDEO_API_ENABLED ? generationLabel : progressLabel}</h2>
          <p>识别到的氛围：孤独 · 神秘 · 轻微不安</p>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          <div className="generation-steps">
            {['理解梦境', '设计分镜', '生成影像', '合成完成'].map((item, index) => {
              const thresholds = [5, 28, 55, 86];
              return <span key={item} className={progress >= thresholds[index] ? 'done' : ''}>{item}</span>;
            })}
          </div>
        </section>
      )}

      {page === 'create' && stage === 'result' && (
        <section className="result-view">
          <header className="result-header">
            <div>
              <div className="eyebrow"><Sparkles size={14} /> DREAM NO. 0007</div>
              <h2>紫色海城</h2>
              <p>基于你的描述，AI 选择了「电影超现实」视觉方案</p>
            </div>
            <div className="result-actions">
              <button onClick={() => setStage('input')}><RotateCcw size={17} /> 再造一个梦</button>
              <button onClick={() => setPage('community')}><Share2 size={17} /> 分享到广场</button>
              <button className="primary-small"><Download size={17} /> 保存影片</button>
            </div>
          </header>

          <div className="result-grid">
            <div className="cinema-panel">
              {videoUrl ? (
                <div className="dream-frame generated-frame">
                  <video className="generated-video" src={videoUrl} controls autoPlay muted={!sound} playsInline />
                  <div className="film-label">SEEDANCE 2.5 / GENERATED DREAM</div>
                </div>
              ) : (
                <div className={`dream-frame scene-${activeShot + 1}`}>
                  <div className="frame-vignette" />
                  <div className="scene-city">
                    <span className="tower t1" /><span className="tower t2" /><span className="tower t3" /><span className="tower t4" />
                  </div>
                  <div className="dream-moon" />
                  <div className="water-lines" />
                  <div className="silhouette" />
                  <div className="film-label">REVERIE / SCENE {String(activeShot + 1).padStart(2, '0')}</div>
                  <button className="play-button" onClick={() => setPlaying(!playing)}>
                    {playing ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                  </button>
                  <button className="sound-button" onClick={() => setSound(!sound)}>
                    {sound ? <AudioLines size={18} /> : <CircleStop size={18} />}
                  </button>
                </div>
              )}
              <div className="timeline">
                {SHOTS.map((shot, index) => (
                  <button key={shot.index} className={activeShot === index ? 'shot active-shot' : 'shot'} onClick={() => setActiveShot(index)}>
                    <span>{shot.index}</span><div><b>{shot.title}</b><small>00:{String(index * 5).padStart(2, '0')} — 00:{String((index + 1) * 5).padStart(2, '0')}</small></div>
                  </button>
                ))}
              </div>
            </div>

            <aside className="interpretation-panel knowledge-panel">
              <div className="panel-title"><MoonStar size={18} /><span>梦境解析</span><small>双知识体系 · 独立呈现</small></div>
              <div className="knowledge-tabs" role="tablist" aria-label="梦境解析体系">
                <button className={analysisMode === 'traditional' ? 'knowledge-tab active' : 'knowledge-tab'} onClick={() => setAnalysisMode('traditional')}>
                  <BookOpen size={15} /><span>传统解梦<small>古籍与民俗记录</small></span>
                </button>
                <button className={analysisMode === 'psychology' ? 'knowledge-tab active' : 'knowledge-tab'} onClick={() => setAnalysisMode('psychology')}>
                  <Brain size={15} /><span>心理观察<small>研究与反思提示</small></span>
                </button>
              </div>

              {analysisMode === 'traditional' ? (
                <div className="knowledge-content">
                  <div className="system-note traditional-note">
                    <ShieldCheck size={15} />
                    <p><b>传统梦占记录</b>，按古籍来源与具体情境呈现，不作为科学事实或现实预测。</p>
                  </div>
                  <div className="symbol-row">
                    <span>识别到的梦象</span>
                    <div>{interpretation.symbols.map((symbol) => <b key={symbol}>{symbol}</b>)}</div>
                  </div>
                  {interpretation.traditional.map((item, index) => (
                    <article className="knowledge-entry" key={item.id}>
                      <div className="entry-meta"><span>{String(index + 1).padStart(2, '0')}</span><b>证据 {item.grade}</b><em>{item.label}</em></div>
                      <h3>{item.title}</h3>
                      <p>{item.interpretation}</p>
                      <div className="entry-boundary">边界：{item.boundary}</div>
                      <a href={item.url} target="_blank" rel="noreferrer">来源：{item.source}<ExternalLink size={12} /></a>
                    </article>
                  ))}
                  <div className="source-legend">A 原始文献可核 · B 跨版本可核 · C 单一后世文本 · D 现代民俗或无稳定对应</div>
                </div>
              ) : (
                <div className="knowledge-content">
                  <div className="system-note psychology-note">
                    <ShieldCheck size={15} />
                    <p><b>非诊断性心理观察</b>，不提供固定象征解释，优先关注你的情绪、近期经历与行动方式。</p>
                  </div>
                  {interpretation.psychology.map((item, index) => (
                    <article className="knowledge-entry psychology-entry" key={item.title}>
                      <div className="entry-meta"><span>{String(index + 1).padStart(2, '0')}</span><b>证据 {item.grade}</b><em>研究框架</em></div>
                      <h3>{item.title}</h3>
                      <p>{item.insight}</p>
                      <div className="reflection-question"><Sparkles size={14} /><span>{item.question}</span></div>
                      <a href={item.url} target="_blank" rel="noreferrer">查看研究来源<ExternalLink size={12} /></a>
                    </article>
                  ))}
                  <div className="support-note">如果梦境持续造成明显痛苦、影响睡眠或日间生活，建议咨询医生、睡眠专科或心理专业人员。</div>
                </div>
              )}
              <button className="ask-button">继续记录你的联想 <ArrowRight size={17} /></button>
            </aside>
          </div>

          <section className="storyboard">
            <div className="section-heading"><div><span>STORYBOARD</span><h3>梦境分镜</h3></div><button><Film size={16} /> 修改分镜</button></div>
            <div className="storyboard-grid">
              {SHOTS.map((shot, index) => (
                <article key={shot.index} onClick={() => setActiveShot(index)}>
                  <div className={`mini-scene mini-${index + 1}`}><span>{shot.index}</span></div>
                  <h4>{shot.title}</h4><p>{shot.text}</p>
                </article>
              ))}
            </div>
          </section>
        </section>
      )}
      {page === 'community' && <CommunityView onCreate={() => { setPage('create'); setStage('input'); }} onMessage={(selectedDream) => { setMessageDream(selectedDream); setPage('messages'); }} />}
      {page === 'archive' && <ArchiveView onCreate={() => { setPage('create'); setStage('input'); }} onOpenDream={() => { setPage('create'); setStage('result'); }} />}
      {page === 'atlas' && <AtlasView />}
      {page === 'messages' && <MessagesView initialDream={messageDream} onBack={() => setPage('community')} />}
      {page === 'profile' && <ProfileView onCreate={() => { setPage('create'); setStage('input'); }} onArchive={() => setPage('archive')} />}
      <div className="mobile-nav" aria-label="移动端导航">
        <button className={page === 'community' ? 'active' : ''} onClick={() => setPage('community')}><Users size={18} /><span>广场</span></button>
        <button className={page === 'archive' ? 'active' : ''} onClick={() => setPage('archive')}><History size={18} /><span>记录</span></button>
        <button className={page === 'create' ? 'active mobile-create' : 'mobile-create'} onClick={() => { setPage('create'); setStage('input'); }}><Sparkles size={18} /><span>造梦</span></button>
        <button className={page === 'messages' ? 'active' : ''} onClick={() => { setMessageDream(null); setPage('messages'); }}><MessageCircle size={18} /><span>消息</span></button>
        <button className={page === 'profile' ? 'active' : ''} onClick={() => setPage('profile')}><UserRound size={18} /><span>我的</span></button>
      </div>
      <footer><span>REVERIE · 梦境重现</span><span>梦境解析仅供娱乐与自我观察，不构成医疗或心理诊断建议。</span></footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
