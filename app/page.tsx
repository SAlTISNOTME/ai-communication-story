'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { studyData } from '@/data/study';

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  return <section ref={ref} className="hero" aria-labelledby="hero-title">
    <header className="topbar"><a href="#top" className="wordmark">FIELDNOTES<span> / 01</span></a><a href="#gap" className="top-link">A research story <ArrowUpRight size={14} /></a></header>
    <motion.div className="hero-content" style={{ scale, opacity }}>
      <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .2 }}>COMMUNICATION × ARTIFICIAL INTELLIGENCE</motion.p>
      <h1 id="hero-title"><span className="title-line"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .8, ease: [.22, 1, .36, 1], delay: .28 }}>AI IS</motion.span><i>COMING.</i></span><span className="title-line title-second"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .8, ease: [.22, 1, .36, 1], delay: .43 }}>ARE WE</motion.span><b><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .8, ease: [.22, 1, .36, 1], delay: .56 }}>READY?</motion.span></b></span></h1>
      <div className="hero-foot"><div><p className="hero-subtitle">Artificial Intelligence<br />in Communication Management</p><p className="hero-cn">AI来了，我们准备好了吗？</p></div><div className="hero-study"><span className="lime-dot" /> A CROSS-NATIONAL STUDY<br /> OF {studyData.sample.toLocaleString()} PRACTITIONERS</div></div>
    </motion.div>
    <a className="scroll-cue" href="#gap"><span>SCROLL TO EXPLORE</span><ArrowDown size={16} /></a>
    <div className="hero-index">01 — 11</div>
  </section>;
}

function ImpactGap() {
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
    <div className="gap-intro"><p className="eyebrow"><span className="section-number">01</span> / THE GAP</p><h2 id="gap-title">Everyone expects AI to change communication.<br /><em>But the closer it gets to us,<br />the smaller the perceived impact.</em></h2></div>
    <div className="gap-story">
      <div className="gap-sticky" aria-live="polite"><span className="gap-level">{studyData.impact[active].level} / {studyData.impact[active].label}</span><motion.strong key={active} className="gap-sticky-number" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>{studyData.impact[active].display}</motion.strong><div className="gap-sticky-rule"><motion.i animate={{ scaleX: studyData.impact[active].value / 100 }} transition={{ duration: .55 }} /></div><span className="gap-scroll-hint">SCROLL TO MOVE FROM PROFESSION TO PERSON ↓</span></div>
      <div className="gap-steps">{studyData.impact.map((item, index) => <article className={`gap-step ${active === index ? 'is-active' : ''}`} key={item.level} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} tabIndex={0} aria-label={`${item.level}: ${item.display} expect a significant impact on ${item.label.toLowerCase()}`}><span>{item.level} / 0{index + 1}</span><h3>{item.label}</h3><p>{index === 0 ? 'Across the profession, change feels inevitable.' : index === 1 ? 'At the organizational scale, that expectation contracts.' : 'At the scale of personal work, the perceived impact is smaller still.'}</p><b>{item.display}</b></article>)}</div>
    </div>
    <div className="gap-outro"><span className="outro-mark">↓</span><p>THE CLOSER AI GETS TO ME,<br /><strong>THE SMALLER THE PERCEIVED IMPACT.</strong></p><span className="interpretation">A visual interpretation of the study’s findings</span></div>
  </section>;
}

function ResearchDesign() {
  return <section className="research-design" aria-labelledby="design-title">
    <div className="design-heading"><p className="eyebrow"><span className="section-number">02</span> / RESEARCH DESIGN</p><h2 id="design-title">DESIGN /<br /><em>METHODOLOGY /</em><br />APPROACH</h2><p className="design-summary">A quantitative cross-national study among <strong>{studyData.sample.toLocaleString()}</strong> European communication practitioners investigated four research questions.</p></div>
    <div className="research-questions" aria-label="Four research questions">{studyData.researchQuestions.map((question, i) => <article className="research-question" key={question.id}><span className="rq-id">{question.id}</span><p>{question.text}</p><span className="rq-index">0{i + 1}</span></article>)}</div>
  </section>;
}

function Sample() {
  const profile = studyData.sampleProfile;
  return <section className="sample-section" aria-labelledby="sample-title">
    <div className="sample-header"><div><p className="eyebrow"><span className="section-number">03</span> / WHO ANSWERED</p><h2 id="sample-title">THE<br /><em>SAMPLE.</em></h2></div><div className="sample-total"><span>ANALYSED</span><strong>{profile.analysed.toLocaleString()}</strong><small>of {profile.completed.toLocaleString()} completed responses</small></div></div>
    <p className="sample-recruitment">{profile.recruitment}</p>
    <div className="sample-facts"><div><span>FIELDWORK</span><strong>{profile.fieldwork}</strong></div><div><span>EUROPEAN COUNTRIES</span><strong>{profile.invitedCountries}</strong></div><div><span>AVERAGE AGE</span><strong>{profile.age}</strong></div></div>
    <div className="sample-grid">
      <SampleChart title="GENDER" subtitle="Share of respondents" data={profile.gender} />
      <SampleChart title="EDUCATION" subtitle="Highest qualifications reported" data={profile.education} />
      <SampleChart title="EXPERIENCE" subtitle="More than ten years in communications" data={[{ label: '10+ years', ...profile.experienceOverTenYears }]} />
      <SampleChart title="LEADERSHIP" subtitle="In a leading position" data={[{ label: 'Head, CEO or team leader', ...profile.leadershipPositions }]} />
      <SampleChart title="ORGANISATION TYPE" subtitle="Where respondents worked" data={profile.organizationTypes} />
      <SampleChart title="AREAS OF WORK" subtitle="Top mentions · up to three responses" data={profile.workAreas} />
      <SampleChart title="REGION" subtitle="Respondents’ location" data={profile.regions} />
    </div>
    <p className="sample-footnote">Percentages and counts are reproduced from the published study. Work areas allowed up to three responses, so percentages do not sum to 100%.</p>
  </section>;
}

function SampleChart({ title, subtitle, data }: { title: string; subtitle: string; data: { label: string; value: number; count: number }[] }) {
  const [active, setActive] = useState(0);
  const current = data[active];
  return <section className="sample-chart" aria-label={`${title} data chart`}>
    <header className="sample-chart-heading"><div><h3>{title}</h3><p>{subtitle}</p></div><div className="sample-chart-value" aria-live="polite" aria-atomic="true"><strong>{current.value}%</strong><span>N = {current.count.toLocaleString()}</span></div></header>
    <div className="sample-bars">{data.map((entry, index) => <button type="button" key={entry.label} className={`sample-bar-row ${active === index ? 'is-active' : ''}`} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} aria-pressed={active === index} aria-label={`${entry.label}: ${entry.value} percent, N equals ${entry.count}`}><span className="sample-bar-label">{entry.label}</span><span className="sample-bar-track"><i style={{ width: `${entry.value}%` }} /></span><span className="sample-bar-percent">{entry.value}% · N {entry.count.toLocaleString()}</span></button>)}</div>
  </section>;
}

function AIQuiz() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const done = Object.keys(answers).length === studyData.aiCharacteristics.length;
  const score = studyData.aiCharacteristics.reduce((sum, item, i) => sum + (answers[i] === item.correct ? 1 : 0), 0);
  return <section className="story-section quiz-section" aria-labelledby="quiz-title"><p className="eyebrow"><span className="section-number">04</span> / KNOWLEDGE TEST</p><h2 id="quiz-title">DO YOU ACTUALLY<br /><em>KNOW AI?</em></h2><p className="section-lede">Before looking at the results, test your own understanding. Which statements describe artificial intelligence?</p>
    <ol className="quiz-list">{studyData.aiCharacteristics.map((item, i) => <li key={item.label} className="quiz-item"><span className="quiz-index">0{i + 1}</span><span className="quiz-label">{item.label}</span><div className="quiz-actions"><button aria-pressed={answers[i] === true} onClick={() => setAnswers({ ...answers, [i]: true })}>YES</button><button aria-pressed={answers[i] === false} onClick={() => setAnswers({ ...answers, [i]: false })}>NO</button></div></li>)}</ol>
    {done && <div className="quiz-result"><span>YOUR SCORE</span><strong>{score}<small> / 8</small></strong><p>The study found that only <b>15.4%</b> of respondents qualified as AI experts.</p></div>}
    <div className="response-heading"><span>WHAT RESPONDENTS ASSOCIATED WITH AI</span><span>SHARE</span></div>{studyData.aiCharacteristics.map(item => <div className="response-row" key={item.label}><span className="truth-tag">{item.correct ? 'AI CHARACTERISTIC' : 'MISCONCEPTION'}</span><span>{item.label}</span><b>{item.value}%</b></div>)}
  </section>;
}

function Adoption() {
  const [active, setActive] = useState<number | null>(null);
  const entries = Object.entries(studyData.adoption);
  const selected = active === null ? null : entries[active];
  return <section className="story-section adoption-section"><p className="eyebrow"><span className="section-number">05</span> / ADOPTION</p><h2>AI IS ALREADY<br /><em>HERE.</em></h2><div className="adoption-visual" role="group" aria-label="Explore AI adoption measures">{entries.map(([key, value], i) => <button type="button" className={`adoption-stat stat-${i} ${active === i ? 'is-active' : ''}`} key={key} aria-label={`${key}, ${value}%`} aria-pressed={active === i} onClick={() => setActive(i)} onFocus={() => setActive(i)} onMouseEnter={() => setActive(i)}><strong>{value}%</strong><span>{key.toUpperCase()}</span></button>)}</div><p className="adoption-readout" aria-live="polite">{selected ? <><strong>{selected[0].toUpperCase()}</strong> · {selected[1]}% OF RESPONDENTS</> : null}</p><p className="section-note">AI adoption and AI expertise were not significantly linked in the study.</p></section>;
}

function ImpactLevels() {
  const [selected, setSelected] = useState(0);
  const item = studyData.impact[selected];
  return <section className="levels-section" aria-labelledby="levels-title"><div className="levels-copy"><p className="eyebrow"><span className="section-number">06</span> / SCALE OF CHANGE</p><h2 id="levels-title">WHERE DOES<br />AI <em>MATTER?</em></h2><p className="levels-description">The expected impact changes with distance. Select a layer to explore the scale.</p><div className="levels-readout" aria-live="polite"><span>{item.level} / {item.label}</span><strong>{item.display}</strong><small>expect significant change at this level</small></div><div className="levels-controls" aria-label="Choose impact level">{studyData.impact.map((level, i) => <button key={level.level} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)}>{level.level}</button>)}</div></div><div className="levels-graphic" role="group" aria-label="Interactive impact levels">
    {[...studyData.impact].reverse().map((level, reversedIndex) => { const i = studyData.impact.length - 1 - reversedIndex; return <button type="button" key={level.level} className={`level-ring ring-${i} ${selected === i ? 'is-selected' : ''}`} aria-pressed={selected === i} aria-label={`${level.level}, ${level.label}, ${level.display}`} onClick={() => setSelected(i)} />; })}
    <div className={`level-active-caption active-caption-${selected}`} aria-hidden="true"><span>{item.level} / {item.label}</span><strong>{item.display}</strong></div>
  </div></section>;
}

function Challenges() { return <section className="story-section challenges-section"><p className="eyebrow"><span className="section-number">07</span> / IMPLEMENTATION</p><h2>WHAT STOPS<br />AI <em>ADOPTION?</em></h2><p className="section-lede">The barriers are already inside the room.</p><div className="challenge-list">{studyData.challenges.map((item, i) => <div className="challenge-row" key={item.label}><span className="challenge-index">0{i + 1}</span><span className="challenge-label">{item.label}</span><div className="challenge-track"><i style={{ width: `${(item.value / 4) * 100}%` }} /></div><b>M {item.value.toFixed(2)}</b></div>)}</div></section>; }

function Risks() { return <section className="risks-section"><p className="eyebrow"><span className="section-number">08</span> / PERCEIVED RISKS</p><h2>WHAT ARE WE<br /><em>AFRAID OF?</em></h2><div className="risk-context">OVERALL / N = {studyData.riskResponses.toLocaleString()} / 5-POINT LIKELIHOOD SCALE</div><div className="risk-field">{studyData.risks.map((item, i) => <div className={`risk-label risk-${i}`} key={item.label} style={{ left: `${((item.value - 1) / 4) * 100}%` }} title={`${item.label}: M ${item.value.toFixed(2)}, SD ${item.sd.toFixed(2)}`}><span>{item.label}</span><b>M {item.value.toFixed(2)} · SD {item.sd.toFixed(2)}</b></div>)}</div><div className="risk-scale"><span>1 / NOT LIKELY</span><span>5 / VERY LIKELY</span></div></section>; }

export default function Home() {
  return <main id="top"><Hero /><ImpactGap /><ResearchDesign /><Sample /><AIQuiz /><Adoption /><ImpactLevels /><Challenges /><Risks /><footer className="site-footer"><span>FIELDNOTES / RESEARCH IN MOTION</span><span>ZERFASS · HAGELSTEIN · TENCH / 2020</span></footer></main>;
}
