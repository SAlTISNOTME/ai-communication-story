'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { studyData } from '@/data/study';
import { copy, type Language } from '@/data/copy';

const localizedLabel = (lang: Language, label: string) => copy[lang].dataLabels[label as keyof typeof copy.en.dataLabels] ?? label;
const itemLevelLabel = (lang: Language, index: number) => `${studyData.impact[index].level} / ${localizedLabel(lang, studyData.impact[index].label)}`;

function Hero({ lang, setLang }: { lang: Language; setLang: (lang: Language) => void }) {
  const c = copy[lang];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  return <section ref={ref} className="hero" aria-labelledby="hero-title">
    <header className="topbar"><a href="#top" className="wordmark">FIELDNOTES<span> / 01</span></a><div className="topbar-actions"><a href="#gap" className="top-link">{c.researchStory} <ArrowUpRight size={14} /></a><div className="language-toggle" role="group" aria-label={c.languageLabel}><button type="button" aria-pressed={lang === 'zh'} onClick={() => setLang('zh')}>CN</button><button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button></div></div></header>
    <motion.div className="hero-content" style={{ scale, opacity }}>
      <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .2 }}>{c.heroKicker}</motion.p>
      <h1 id="hero-title" key={lang} className={lang === 'zh' ? 'hero-title-zh' : undefined}><span className="title-line"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .8, ease: [.22, 1, .36, 1], delay: .28 }}>{c.heroFirst}</motion.span><i>{c.heroComing}</i></span><span className="title-line title-second"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .8, ease: [.22, 1, .36, 1], delay: .43 }}>{c.heroSecond}</motion.span><b><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .8, ease: [.22, 1, .36, 1], delay: .56 }}>{c.heroReady}</motion.span></b></span></h1>
      <div className="hero-foot"><div><p className="hero-subtitle">{lang === 'en' ? <>Artificial Intelligence<br />in Communication Management</> : <>传播管理中的<br />人工智能</>}</p><p className="hero-cn">{c.heroChineseLine}</p></div><div className="hero-study"><span className="lime-dot" /> {c.heroStudy}<br /> {lang === 'en' ? `OF ${studyData.sample.toLocaleString()} ${c.practitioners}` : `${studyData.sample.toLocaleString()} ${c.practitioners}`}</div></div>
    </motion.div>
    <a className="scroll-cue" href="#gap"><span>{c.scrollExplore}</span><ArrowDown size={16} /></a>
    <div className="hero-index">01 — 11</div>
  </section>;
}

function ImpactGap({ lang }: { lang: Language }) {
  const c = copy[lang];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const steps = Array.from(document.querySelectorAll<HTMLElement>('.gap-step'));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(steps.indexOf(visible.target as HTMLElement));
    }, { threshold: [0.2, 0.45, 0.7], rootMargin: '-18% 0px -18% 0px' });
    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);
  return <section id="gap" className="gap-section" aria-labelledby="gap-title">
    <div className="gap-intro"><p className="eyebrow"><span className="section-number">01</span> / {c.gap.section}</p><h2 id="gap-title" className={lang === 'zh' ? 'gap-title-zh' : undefined}>{lang === 'zh' ? <><span>{c.gap.title}</span><br /><em>{c.gap.emphasis}</em></> : <>{c.gap.title}<br /><em>{c.gap.emphasis}</em></>}</h2></div>
    <div className="gap-story">
      <div className="gap-sticky" aria-live="polite"><span className="gap-level">{itemLevelLabel(lang, active)}</span><motion.strong key={active} className="gap-sticky-number" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>{studyData.impact[active].display}</motion.strong><div className="gap-sticky-rule"><motion.i animate={{ scaleX: studyData.impact[active].value / 100 }} transition={{ duration: .55 }} /></div><span className="gap-scroll-hint">{c.gap.scrollHint}</span></div>
      <div className="gap-steps">{studyData.impact.map((item, index) => { const label = localizedLabel(lang, item.label); return <article className={`gap-step ${active === index ? 'is-active' : ''}`} key={item.level} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} tabIndex={0} aria-label={`${item.level}: ${item.display} — ${label}`}><span>{item.level} / 0{index + 1}</span><h3>{label}</h3><p>{c.gap.descriptions[index]}</p><b>{item.display}</b></article>; })}</div>
    </div>
    <div className="gap-outro"><span className="outro-mark">↓</span><p>{c.gap.conclusion}<br /><strong>{c.gap.conclusionStrong}</strong></p><span className="interpretation">{c.gap.interpretation}</span></div>
  </section>;
}

function ResearchDesign({ lang }: { lang: Language }) {
  const c = copy[lang].research;
  return <section className="research-design" aria-labelledby="design-title">
    <div className="design-heading"><p className="eyebrow"><span className="section-number">02</span> / {c.section}</p><h2 id="design-title">{c.title}<br /><em>{c.emphasis}</em><br />{c.last}</h2><p className="design-summary">{c.summary} <strong>{studyData.sample.toLocaleString()}</strong> {c.ending}</p></div>
    <div className="research-questions" aria-label={c.questionsLabel}>{studyData.researchQuestions.map((question, i) => <article className="research-question" key={question.id}><span className="rq-id">{question.id}</span><p>{c.questions[i]}</p><span className="rq-index">0{i + 1}</span></article>)}</div>
  </section>;
}

function Sample({ lang }: { lang: Language }) {
  const c = copy[lang].sample;
  const profile = studyData.sampleProfile;
  return <section className="sample-section" aria-labelledby="sample-title">
    <div className="sample-header"><div><p className="eyebrow"><span className="section-number">03</span> / {c.section}</p><h2 id="sample-title" className={lang === 'zh' ? 'sample-title-zh' : undefined}>{lang === 'zh' ? c.title : <>{c.title}<br /><em>{c.emphasis}</em></>}</h2></div><div className="sample-total"><span>{c.analysed}</span><strong>{profile.analysed.toLocaleString()}</strong><small>{c.of} {profile.completed.toLocaleString()} {c.completed}</small></div></div>
    <p className="sample-recruitment">{c.recruitment}</p>
    <div className="sample-facts"><div><span>{c.fieldwork}</span><strong>{lang === 'en' ? profile.fieldwork : c.fieldworkValue}</strong></div><div><span>{c.countries}</span><strong>{profile.invitedCountries}</strong></div><div><span>{c.age}</span><strong>{profile.age}</strong></div></div>
    <div className="sample-grid">
      <SampleChart lang={lang} title={c.chartTitles[0]} subtitle={c.chartSubtitles[0]} data={profile.gender} />
      <SampleChart lang={lang} title={c.chartTitles[1]} subtitle={c.chartSubtitles[1]} data={profile.education} />
      <SampleChart lang={lang} title={c.chartTitles[2]} subtitle={c.chartSubtitles[2]} data={[{ label: '10+ years', ...profile.experienceOverTenYears }]} />
      <SampleChart lang={lang} title={c.chartTitles[3]} subtitle={c.chartSubtitles[3]} data={[{ label: 'Head, CEO or team leader', ...profile.leadershipPositions }]} />
      <SampleChart lang={lang} title={c.chartTitles[4]} subtitle={c.chartSubtitles[4]} data={profile.organizationTypes} />
      <SampleChart lang={lang} title={c.chartTitles[5]} subtitle={c.chartSubtitles[5]} data={profile.workAreas} />
      <SampleChart lang={lang} title={c.chartTitles[6]} subtitle={c.chartSubtitles[6]} data={profile.regions} />
    </div>
    <p className="sample-footnote">{c.footnote}</p>
  </section>;
}

function SampleChart({ lang, title, subtitle, data }: { lang: Language; title: string; subtitle: string; data: { label: string; value: number; count: number }[] }) {
  const c = copy[lang].sample;
  const [active, setActive] = useState(0);
  const localizedData = data.map((entry) => ({ ...entry, label: localizedLabel(lang, entry.label) }));
  const current = localizedData[active];
  return <section className="sample-chart" aria-label={c.chartLabel(title)}>
    <header className="sample-chart-heading"><div><h3>{title}</h3><p>{subtitle}</p></div><div className="sample-chart-value" aria-live="polite" aria-atomic="true"><strong>{current.value}%</strong><span>N = {current.count.toLocaleString()}</span></div></header>
    <div className="sample-bars">{localizedData.map((entry, index) => <button type="button" key={entry.label} className={`sample-bar-row ${active === index ? 'is-active' : ''}`} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} aria-pressed={active === index} aria-label={c.barLabel(entry.label, entry.value, entry.count.toLocaleString())}><span className="sample-bar-label">{entry.label}</span><span className="sample-bar-track"><i style={{ width: `${entry.value}%` }} /></span><span className="sample-bar-percent">{entry.value}% · N {entry.count.toLocaleString()}</span></button>)}</div>
  </section>;
}

function AIQuiz({ lang }: { lang: Language }) {
  const c = copy[lang].quiz;
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const done = Object.keys(answers).length === studyData.aiCharacteristics.length;
  const score = studyData.aiCharacteristics.reduce((sum, item, i) => sum + (answers[i] === item.correct ? 1 : 0), 0);
  return <section className="story-section quiz-section" aria-labelledby="quiz-title"><p className="eyebrow"><span className="section-number">04</span> / {c.section}</p><h2 id="quiz-title">{c.title}<br /><em>{c.emphasis}</em></h2><p className="section-lede">{c.lede}</p>
    <ol className="quiz-list">{studyData.aiCharacteristics.map((item, i) => <li key={item.label} className="quiz-item"><span className="quiz-index">0{i + 1}</span><span className="quiz-label">{localizedLabel(lang, item.label)}</span><div className="quiz-actions"><button type="button" aria-pressed={answers[i] === true} onClick={() => setAnswers({ ...answers, [i]: true })}>{c.yes}</button><button type="button" aria-pressed={answers[i] === false} onClick={() => setAnswers({ ...answers, [i]: false })}>{c.no}</button></div></li>)}</ol>
    {done && <div className="quiz-result"><span>{c.score}</span><strong>{score}<small> / 8</small></strong><p>{c.result} <b>15.4%</b> {c.experts}</p></div>}
    <div className="response-heading"><span>{c.associations}</span><span>{c.share}</span></div>{studyData.aiCharacteristics.map(item => <div className="response-row" key={item.label}><span className="truth-tag">{item.correct ? c.characteristic : c.misconception}</span><span>{localizedLabel(lang, item.label)}</span><b>{item.value}%</b></div>)}
  </section>;
}

function Adoption({ lang }: { lang: Language }) {
  const c = copy[lang].adoption;
  const [active, setActive] = useState<number | null>(null);
  const entries = Object.entries(studyData.adoption);
  const selected = active === null ? null : entries[active];
  return <section className="story-section adoption-section"><p className="eyebrow"><span className="section-number">05</span> / {c.section}</p><h2>AI {lang === 'en' ? 'IS ALREADY' : '已经'}<br /><em>{c.emphasis}</em></h2><div className="adoption-visual" role="group" aria-label={c.chartLabel}>{entries.map(([key, value], i) => <button type="button" className={`adoption-stat stat-${i} ${active === i ? 'is-active' : ''}`} key={key} aria-label={`${c.labels[i]}, ${value}%`} aria-pressed={active === i} onClick={() => setActive(i)} onFocus={() => setActive(i)} onMouseEnter={() => setActive(i)}><strong>{value}%</strong><span>{c.labels[i]}</span></button>)}</div><p className="adoption-readout" aria-live="polite">{selected ? <><strong>{c.labels[active!]}</strong> · {selected[1]}% {c.percentOfRespondents}</> : null}</p><p className="section-note">{c.note}</p></section>;
}

function ImpactLevels({ lang }: { lang: Language }) {
  const c = copy[lang].impact;
  const [selected, setSelected] = useState(0);
  const item = studyData.impact[selected];
  return <section className="levels-section" aria-labelledby="levels-title"><div className="levels-copy"><p className="eyebrow"><span className="section-number">06</span> / {c.section}</p><h2 id="levels-title" className={lang === 'zh' ? 'levels-title-zh' : undefined}>{lang === 'zh' ? <>人工智能对传播<br />管理的影响？</> : <>{c.title}<br />AI <em>{c.emphasis}</em></>}</h2><p className="levels-description">{c.description}</p><div className="levels-readout" aria-live="polite"><span>{itemLevelLabel(lang, selected)}</span><strong>{item.display}</strong><small>{c.note}</small></div><div className="levels-controls" role="group" aria-label={c.choose}>{studyData.impact.map((level, i) => <button key={level.level} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)}>{level.level}</button>)}</div></div><div className="levels-graphic" role="group" aria-label={c.choose}>
    {[...studyData.impact].reverse().map((level, reversedIndex) => { const i = studyData.impact.length - 1 - reversedIndex; const label = localizedLabel(lang, level.label); return <button type="button" key={level.level} className={`level-ring ring-${i} ${selected === i ? 'is-selected' : ''}`} aria-pressed={selected === i} aria-label={c.circleLabel(level.level, label, level.display)} onClick={() => setSelected(i)} />; })}
    <div className={`level-active-caption active-caption-${selected}`} aria-hidden="true"><span>{itemLevelLabel(lang, selected)}</span><strong>{item.display}</strong></div>
  </div></section>;
}

function Challenges({ lang }: { lang: Language }) { const c = copy[lang].challenges; return <section className="story-section challenges-section"><p className="eyebrow"><span className="section-number">07</span> / {c.section}</p><h2 className={lang === 'zh' ? 'challenges-title-zh' : undefined}>{lang === 'zh' ? <>应用人工智能<br />面临哪些挑战？</> : <>{c.title}<br />AI <em>{c.emphasis}</em></>}</h2><p className="section-lede">{c.lede}</p><div className="challenge-list">{studyData.challenges.map((item, i) => <div className="challenge-row" key={item.label}><span className="challenge-index">0{i + 1}</span><span className="challenge-label">{localizedLabel(lang, item.label)}</span><div className="challenge-track"><i style={{ width: `${(item.value / 4) * 100}%` }} /></div><b>M {item.value.toFixed(2)}</b></div>)}</div></section>; }

function Risks({ lang }: { lang: Language }) { const c = copy[lang].risks; return <section className="risks-section"><p className="eyebrow"><span className="section-number">08</span> / {c.section}</p><h2 className={lang === 'zh' ? 'risks-title-zh' : undefined}>{lang === 'zh' ? <>人工智能会带来<br />哪些风险？</> : <>{c.title}<br /><em>{c.emphasis}</em></>}</h2><div className="risk-context">{c.overall} / N = {studyData.riskResponses.toLocaleString()} / {c.scale}</div><div className="risk-field">{studyData.risks.map((item, i) => { const label = localizedLabel(lang, item.label); return <div className={`risk-label risk-${i}`} key={item.label} style={{ left: `${((item.value - 1) / 4) * 100}%` }} title={`${label}: M ${item.value.toFixed(2)}, SD ${item.sd.toFixed(2)}`}><span>{label}</span><b>M {item.value.toFixed(2)} · SD {item.sd.toFixed(2)}</b></div>; })}</div><div className="risk-scale"><span>1 / {c.unlikely}</span><span>5 / {c.veryLikely}</span></div></section>; }

export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const c = copy[lang];
  return <main id="top" lang={lang === 'zh' ? 'zh-Hans' : 'en'}><Hero lang={lang} setLang={setLang} /><ImpactGap lang={lang} /><ResearchDesign lang={lang} /><Sample lang={lang} /><AIQuiz lang={lang} /><Adoption lang={lang} /><ImpactLevels lang={lang} /><Challenges lang={lang} /><Risks lang={lang} /><footer className="site-footer"><span>FIELDNOTES / {c.footer}</span><span>ZERFASS · HAGELSTEIN · TENCH / 2020</span></footer></main>;
}
