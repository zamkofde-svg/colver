import React, { useState, useEffect, useRef } from 'react'

// ─── Icons ───────────────────────────────────────────────────────────────────

const Icon = ({ path, size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={path} />
  </svg>
)

const Icons = {
  Phone: () => <Icon path="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.0 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />,
  Bell: () => <Icon path="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />,
  TrendingUp: () => <Icon path="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />,
  Shield: () => <Icon path="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  Zap: () => <Icon path="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  Users: () => <Icon path="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />,
  Check: () => <Icon path="M20 6L9 17l-5-5" />,
  X: () => <Icon path="M18 6L6 18M6 6l12 12" />,
  ChevronDown: () => <Icon path="M6 9l6 6 6-6" />,
  ChevronUp: () => <Icon path="M18 15l-6-6-6 6" />,
  BarChart: () => <Icon path="M12 20V10M18 20V4M6 20v-4" />,
  Eye: () => <Icon path="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 12a3 3 0 100-6 3 3 0 000 6z" />,
  Lock: () => <Icon path="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4" />,
  ArrowRight: () => <Icon path="M5 12h14M12 5l7 7-7 7" />,
  Star: () => <Icon path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  Activity: () => <Icon path="M22 12h-4l-3 9L9 3l-3 9H2" />,
  Target: () => <Icon path="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 18a6 6 0 100-12 6 6 0 000 12zM12 14a2 2 0 100-4 2 2 0 000 4z" />,
  Layers: () => <Icon path="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  Database: () => <Icon path="M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zM2 12c0 2.76 4.48 5 10 5s10-2.24 10-5M2 7c0 2.76 4.48 5 10 5s10-2.24 10-5" />,
  AlertTriangle: () => <Icon path="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" />,
  Menu: () => <Icon path="M3 12h18M3 6h18M3 18h18" />,
  Close: () => <Icon path="M18 6L6 18M6 6l12 12" />,
  Building: () => <Icon path="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10" />,
  Cpu: () => <Icon path="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />,
  MessageSquare: () => <Icon path="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />,
  Clock: () => <Icon path="M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2" />,
  Percent: () => <Icon path="M19 5L5 19M6.5 6.5h.01M17.5 17.5h.01M9 6.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM20 17.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />,
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n) => new Intl.NumberFormat('ru-RU').format(Math.round(n))

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// ─── Components ──────────────────────────────────────────────────────────────

const SectionTag = ({ children }) => (
  <span className="section-tag">{children}</span>
)

const GlassCard = ({ children, className = '', onClick, style }) => (
  <div
    className={`glass rounded-2xl p-6 transition-all duration-300 hover:border-white/10 ${className}`}
    onClick={onClick}
    style={style}
  >
    {children}
  </div>
)

const AlertMockup = () => (
  <div className="glass-red rounded-xl p-4 max-w-xs w-full animate-pulse-slow">
    <div className="flex items-start gap-3">
      <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 flex-shrink-0 animate-pulse" />
      <div className="flex-1 min-w-0">
        <div className="text-xs text-red-400 font-semibold uppercase tracking-wider mb-1">Алерт · COLVER</div>
        <div className="text-sm font-semibold text-white mb-1">Клиент на 15 млн остывает</div>
        <div className="text-xs text-slate-400 mb-3">Менеджер не отправил материалы после звонка</div>
        <button className="text-xs px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg font-semibold hover:bg-red-500/30 transition-colors">
          Спасти сделку →
        </button>
      </div>
    </div>
  </div>
)

const MockDashboard = () => (
  <div className="glass rounded-2xl p-5 w-full max-w-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Дашборд · сегодня</div>
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <div className="w-2 h-2 rounded-full bg-green-400" />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-2 mb-4">
      {[
        { label: 'Звонков', value: '142', color: 'text-blue-400' },
        { label: 'Алертов', value: '7', color: 'text-red-400' },
        { label: 'Оценка', value: '7.8', color: 'text-green-400' },
      ].map((m) => (
        <div key={m.label} className="glass rounded-lg p-2 text-center">
          <div className={`text-lg font-bold ${m.color}`}>{m.value}</div>
          <div className="text-xs text-slate-500">{m.label}</div>
        </div>
      ))}
    </div>
    <div className="space-y-2">
      <div className="text-xs text-slate-500 mb-2">Рейтинг менеджеров</div>
      {[
        { name: 'Алексей К.', score: 92, color: 'bg-green-500' },
        { name: 'Мария П.', score: 78, color: 'bg-blue-500' },
        { name: 'Дмитрий С.', score: 54, color: 'bg-yellow-500' },
        { name: 'Ирина В.', score: 31, color: 'bg-red-500' },
      ].map((m) => (
        <div key={m.name} className="flex items-center gap-2">
          <div className="text-xs text-slate-400 w-20 truncate">{m.name}</div>
          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full ${m.color} rounded-full transition-all`} style={{ width: `${m.score}%` }} />
          </div>
          <div className="text-xs font-semibold text-slate-300 w-6 text-right">{m.score}</div>
        </div>
      ))}
    </div>
  </div>
)

// ─── Header ──────────────────────────────────────────────────────────────────

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Возможности', id: 'features' },
    { label: 'Как работает', id: 'how' },
    { label: 'ROI', id: 'roi' },
    { label: 'Пилот', id: 'pilot' },
    { label: 'FAQ', id: 'faq' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-graphite-950/90 backdrop-blur-xl border-b border-white/5' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-white rounded-sm" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">COLVER</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <button
            onClick={() => scrollTo('contact')}
            className="btn-primary text-sm px-4 py-2"
          >
            Оставить заявку
          </button>
        </div>

        <button
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <Icons.Close /> : <Icons.Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-graphite-900/95 backdrop-blur-xl border-t border-white/5 px-4 py-4 space-y-3">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => { scrollTo(l.id); setMobileOpen(false) }}
              className="block w-full text-left text-sm text-slate-300 hover:text-white py-2 border-b border-white/5 transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { scrollTo('contact'); setMobileOpen(false) }}
            className="btn-primary w-full justify-center mt-2"
          >
            Оставить заявку
          </button>
        </div>
      )}
    </header>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

const TG_TOKEN = '5118071925:AAFZnreB3Gip_-ECwJGJm_8ou7DlZDMi4fc'
const TG_CHAT = '195170570'

const sendToTelegram = async (data, source) => {
  const text = `📋 Новая заявка (${source})\n\n👤 Имя: ${data.name}\n📞 Телефон: ${data.phone}\n🏢 Компания: ${data.company || '—'}`
  await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TG_CHAT, text }),
  })
}

const Hero = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', company: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await sendToTelegram(formData, 'Главная')
    setSubmitted(true)
  }

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-96 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <SectionTag>ИИ-система контроля продаж</SectionTag>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              Верните{' '}
              <span className="gradient-text-blue">10–15%</span>{' '}
              упущенной выручки из уже оплаченного трафика
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
              Пока рынок давит дорогим трафиком и падающей конверсией, менеджеры теряют горячих клиентов в звонках и мессенджерах. COLVER находит слитые сделки, показывает точки потерь и дает руководителю готовые сигналы к действию.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => scrollTo('contact')} className="btn-primary px-6 py-3">
                Записаться на диагностику
                <Icons.ArrowRight />
              </button>
              <button onClick={() => scrollTo('features')} className="btn-secondary px-6 py-3">
                Посмотреть возможности
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-600">
              20 минут. Без жёсткого впаривания. Покажем точки потерь на цифрах.
            </p>

            {/* Stats row */}
            <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-white/5">
              {[
                { value: '+14%', label: 'рост конверсии', sub: 'агентство, 18 брокеров' },
                { value: '8', label: 'спасённых сделок', sub: 'за первый месяц пилота' },
                { value: '100%', label: 'звонков под контролем', sub: 'вместо ручной выборки' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold gradient-text-blue">{s.value}</div>
                  <div className="text-sm text-slate-300 font-medium mt-0.5">{s.label}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — mockups + form */}
          <div className="flex flex-col gap-5 items-center lg:items-end">
            <AlertMockup />
            <MockDashboard />

            {/* Mini form */}
            <div className="glass rounded-2xl p-5 w-full max-w-sm">
              <div className="text-sm font-semibold text-white mb-4">Записаться на диагностику</div>
              {submitted ? (
                <div className="text-center py-4">
                  <div className="text-green-400 font-semibold mb-1">Заявка отправлена</div>
                  <div className="text-xs text-slate-500">Мы свяжемся с вами в течение рабочего дня</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {[
                    { key: 'name', placeholder: 'Ваше имя', type: 'text' },
                    { key: 'phone', placeholder: 'Телефон', type: 'tel' },
                    { key: 'company', placeholder: 'Компания', type: 'text' },
                  ].map((f) => (
                    <input
                      key={f.key}
                      type={f.type}
                      placeholder={f.placeholder}
                      value={formData[f.key]}
                      onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/8 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                      required
                    />
                  ))}
                  <button type="submit" className="btn-primary w-full justify-center">
                    Записаться
                  </button>
                  <p className="text-xs text-slate-600 text-center">Имя, телефон, компания — 15 секунд</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Results ─────────────────────────────────────────────────────────────────

const Results = () => {
  const metrics = [
    {
      value: '100+',
      unit: 'городов',
      label: 'Уже подключено внутри сети «Этажи» и используется в реальной работе отделов продаж',
      color: 'blue',
      accent: '#3b82f6',
    },
    {
      value: '500%+',
      unit: 'ROI',
      label: 'Высокая окупаемость за счёт возврата упущенных лидов и усиления контроля над продажами',
      color: 'emerald',
      accent: '#10b981',
    },
    {
      value: '15%+',
      unit: 'лидов',
      label: 'Клиентов, которых уже считали потерянными, система помогает находить и возвращать в работу',
      color: 'violet',
      accent: '#8b5cf6',
    },
    {
      value: '1–2',
      unit: 'сделки',
      label: 'В ряде сценариев инструмент отбивается уже за счёт одной-двух спасённых сделок в городе',
      color: 'amber',
      accent: '#f59e0b',
    },
  ]

  const colorMap = {
    blue:    { text: 'text-blue-400',    border: 'border-blue-500/20',   bg: 'rgba(59,130,246,0.06)',  glow: 'rgba(59,130,246,0.18)' },
    emerald: { text: 'text-emerald-400', border: 'border-emerald-500/20',bg: 'rgba(16,185,129,0.06)', glow: 'rgba(16,185,129,0.18)' },
    violet:  { text: 'text-violet-400',  border: 'border-violet-500/20', bg: 'rgba(139,92,246,0.06)', glow: 'rgba(139,92,246,0.18)' },
    amber:   { text: 'text-amber-400',   border: 'border-amber-500/20',  bg: 'rgba(245,158,11,0.06)', glow: 'rgba(245,158,11,0.18)' },
  }

  return (
    <section id="features" className="py-28 section-divider" style={{ background: 'linear-gradient(180deg, #0a0b0d 0%, #0c0e13 60%, #0a0b0d 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-16">
          <SectionTag>Доказанные результаты</SectionTag>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl">
            COLVER уже доказал эффективность в реальной сети продаж недвижимости
          </h2>
          <p className="mt-5 text-slate-400 text-lg max-w-2xl leading-relaxed">
            Решение уже используется внутри сети «Этажи» более года и показывает эффект в масштабе: по возврату лидов, окупаемости и управляемости продаж.
          </p>
        </div>

        {/* Main layout: trust block left + metric cards right */}
        <div className="grid lg:grid-cols-5 gap-6 mb-6">

          {/* Trust block — left, 2 cols */}
          <div
            className="lg:col-span-2 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.10) 0%, rgba(139,92,246,0.06) 100%)',
              border: '1px solid rgba(59,130,246,0.22)',
              boxShadow: '0 0 60px rgba(59,130,246,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Background glow orb */}
            <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div className="relative z-10">
              {/* Network badge */}
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}>
                <div className="w-2 h-2 rounded-full bg-blue-400" style={{ boxShadow: '0 0 6px rgba(59,130,246,0.8)' }} />
                <span className="text-blue-300 text-xs font-semibold tracking-wider uppercase">Сеть «Этажи»</span>
              </div>

              <div className="text-7xl font-black text-white leading-none mb-2" style={{ background: 'linear-gradient(135deg, #fff 0%, #93c5fd 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                100+
              </div>
              <div className="text-xl font-semibold text-slate-300 mb-4">городов подключено</div>

              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                COLVER развёрнут в реальной рабочей среде одной из крупнейших риелторских сетей России. Не пилот — промышленная эксплуатация более&nbsp;года.
              </p>

              <div className="space-y-3">
                {[
                  'Более 12 месяцев в промышленной эксплуатации',
                  'Реальные отделы продаж, реальные сделки',
                  'Непрерывный мониторинг качества звонков',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Партнёр внедрения</div>
              <div className="text-white font-bold text-lg">Сеть «Этажи»</div>
              <div className="text-slate-500 text-sm">Федеральная риелторская компания</div>
            </div>
          </div>

          {/* Metric cards grid — right, 3 cols */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {metrics.map((m) => {
              const c = colorMap[m.color]
              return (
                <div
                  key={m.value}
                  className={`rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-0.5`}
                  style={{
                    background: c.bg,
                    border: `1px solid ${c.glow.replace('0.18', '0.20')}`,
                    boxShadow: `0 0 0 0 ${c.glow}`,
                    transition: 'box-shadow 0.3s, transform 0.3s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 40px ${c.glow}` }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 0 0 transparent' }}
                >
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <div className={`text-5xl font-black ${c.text} leading-none`} style={{ fontVariantNumeric: 'tabular-nums' }}>
                        {m.value}
                      </div>
                      <div className={`text-base font-semibold ${c.text} opacity-70`}>{m.unit}</div>
                    </div>
                    <div className="mt-3 text-slate-300 text-sm leading-relaxed">{m.label}</div>
                  </div>
                  <div className="mt-4 h-px" style={{ background: `linear-gradient(90deg, ${c.glow.replace('0.18', '0.30')}, transparent)` }} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Value bar */}
        <div
          className="rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.25)' }}>
            <Icons.Shield />
          </div>
          <p className="text-slate-300 text-base leading-relaxed">
            <span className="text-white font-semibold">Вы внедряете не экспериментальный продукт,</span> а решение, которое уже прошло проверку в большом контуре продаж и показало быстрый финансовый эффект на практике.
          </p>
          <div className="flex-shrink-0 sm:ml-auto">
            <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold whitespace-nowrap">Проверено на практике</div>
            <div className="flex gap-1.5 mt-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-6 h-1.5 rounded-full" style={{ background: i < 5 ? '#3b82f6' : 'rgba(255,255,255,0.1)', opacity: 1 - i * 0.12 }} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─── Pain ────────────────────────────────────────────────────────────────────

const Pain = () => {
  const points = [
    'Не перезвонили вовремя — клиент ушёл к конкуренту',
    'Не отработали возражение — сделка зависла навсегда',
    'Не отправили материалы — интерес остыл',
    'Не зафиксировали следующий шаг — диалог оборвался',
    'Затянули с ответом в мессенджере — потеряли момент',
  ]

  return (
    <section className="py-24 section-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTag>Почему вы теряете деньги</SectionTag>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
              Рынок уже не прощает слабый контроль продаж
            </h2>
            <p className="mt-6 text-slate-400 leading-relaxed">
              Лиды в недвижимости стали дороже. Клиент думает дольше. Конкуренция за сделку выше. Каждый потерянный контакт обходится всё больнее.
            </p>
            <p className="mt-4 text-slate-400 leading-relaxed">
              В результате вы платите за привлечение, а деньги забирает тот, у кого выше скорость реакции, дисциплина и качество коммуникации.
            </p>
            <div className="mt-8 glass-red rounded-xl p-5">
              <div className="flex items-center gap-2 text-red-400 font-semibold text-sm mb-1">
                <Icons.AlertTriangle />
                Ключевой тезис
              </div>
              <div className="text-white font-medium">
                Сегодня слабая управляемость продаж = прямые потери выручки
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {points.map((p, i) => (
              <div key={i} className="glass rounded-xl p-4 flex items-start gap-3 hover:border-red-500/15 transition-colors">
                <div className="w-5 h-5 rounded-full bg-red-500/15 border border-red-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                </div>
                <span className="text-sm text-slate-300">{p}</span>
              </div>
            ))}
            <div className="glass rounded-xl p-4 text-center mt-2">
              <div className="text-xs text-slate-500">Менеджеры теряют клиентов по этим причинам каждый день</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ────────────────────────────────────────────────────────────

const HowItWorks = () => {
  const steps = [
    {
      num: '01',
      title: 'Находит потерянный момент',
      text: 'COLVER анализирует звонки и коммуникации, определяет, где менеджер не дожал клиента, нарушил SLA, не отправил материал или не довёл диалог до следующего шага.',
      icon: <Icons.Activity />,
      color: 'blue',
    },
    {
      num: '02',
      title: 'Показывает конкретную точку потери',
      text: 'Система показывает не просто "плохой звонок", а понятную причину: просадка на возражении, слабый follow-up, отсутствие целевого действия или ошибка конкретного менеджера.',
      icon: <Icons.Target />,
      color: 'purple',
    },
    {
      num: '03',
      title: 'Даёт готовое действие руководителю',
      text: 'РОП получает не тонну отчётов, а понятный список: кого срочно спасать, где разбирать ошибки, кого доучивать, а чьи практики масштабировать на команду.',
      icon: <Icons.Zap />,
      color: 'green',
    },
  ]

  const colorMap = {
    blue: { border: 'border-blue-500/20', bg: 'bg-blue-500/8', text: 'text-blue-400', num: 'text-blue-600' },
    purple: { border: 'border-purple-500/20', bg: 'bg-purple-500/8', text: 'text-purple-400', num: 'text-purple-600' },
    green: { border: 'border-green-500/20', bg: 'bg-green-500/8', text: 'text-green-400', num: 'text-green-600' },
  }

  return (
    <section id="how" className="py-24 section-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <SectionTag>Как работает</SectionTag>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
            COLVER превращает хаос в очередь управленческого внимания
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Не просто собирает данные. Показывает, где вы теряете деньги и что делать прямо сейчас.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {steps.map((s) => {
            const c = colorMap[s.color]
            return (
              <div
                key={s.num}
                className={`glass rounded-2xl p-6 border ${c.border} hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`text-5xl font-black ${c.num} opacity-30 leading-none`}>{s.num}</div>
                  <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center ${c.text}`}>
                    {s.icon}
                  </div>
                </div>
                <div className="text-white font-semibold text-lg mb-3">{s.title}</div>
                <div className="text-sm text-slate-400 leading-relaxed">{s.text}</div>
              </div>
            )
          })}
        </div>

        <div className="glass rounded-2xl p-6 text-center border border-blue-500/10">
          <p className="text-slate-300 max-w-2xl mx-auto">
            Вы быстрее реагируете, возвращаете часть упущенных лидов и строите{' '}
            <span className="text-white font-semibold">управляемый отдел продаж</span>{' '}
            вместо ручного тушения пожаров.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Dashboard Bento ─────────────────────────────────────────────────────────

const DashboardBento = () => (
  <section className="py-24 section-divider">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <SectionTag>Панель управления</SectionTag>
        <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
          С первого дня вы получаете не статистику,{' '}
          <span className="gradient-text-blue">а панель управления продажами</span>
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Card 1 — big */}
        <div className="glass glass-blue rounded-2xl p-6 lg:col-span-2 hover:border-blue-500/25 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400">
              <Icons.Eye />
            </div>
            <div>
              <div className="text-white font-semibold">100% прослушка и смысловой анализ</div>
              <div className="text-xs text-slate-500 mt-0.5">не по словам-маркерам, а по смыслу</div>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mb-5">
            Анализ возражений, тепла лида, договорённостей, целевых действий и качества коммуникации каждого звонка.
          </p>
          {/* Mini bar chart */}
          <div className="flex items-end gap-1.5 h-16">
            {[65, 80, 55, 90, 70, 85, 95, 60, 88, 75, 92, 78].map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-blue-500/30 hover:bg-blue-500/60 transition-colors"
                style={{ height: `${v}%` }}
              />
            ))}
          </div>
          <div className="text-xs text-slate-600 mt-2">Оценка звонков за 30 дней</div>
        </div>

        {/* Card 2 */}
        <div className="glass rounded-2xl p-6 hover:border-white/10 transition-colors">
          <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400 mb-4">
            <Icons.BarChart />
          </div>
          <div className="text-white font-semibold mb-2">Дашборд руководителя</div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Средняя оценка, пустые звонки, динамика по менеджерам, зоны просадки.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: '7.8', l: 'Ср. оценка', c: 'text-green-400' },
              { v: '12', l: 'Пустых', c: 'text-red-400' },
              { v: '↑4%', l: 'Динамика', c: 'text-blue-400' },
              { v: '3', l: 'Зоны риска', c: 'text-yellow-400' },
            ].map((m) => (
              <div key={m.l} className="glass rounded-lg p-2 text-center">
                <div className={`text-base font-bold ${m.c}`}>{m.v}</div>
                <div className="text-xs text-slate-600">{m.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3 — rankings */}
        <div className="glass rounded-2xl p-6 hover:border-white/10 transition-colors">
          <div className="w-9 h-9 rounded-lg bg-green-500/15 flex items-center justify-center text-green-400 mb-4">
            <Icons.Users />
          </div>
          <div className="text-white font-semibold mb-2">Рейтинг менеджеров</div>
          <p className="text-xs text-slate-400 mb-4">Объективный светофор команды</p>
          <div className="space-y-2.5">
            {[
              { name: 'Алексей К.', score: 92, color: 'bg-green-500', badge: '🟢' },
              { name: 'Мария П.', score: 78, color: 'bg-blue-500', badge: '🔵' },
              { name: 'Дмитрий С.', score: 54, color: 'bg-yellow-500', badge: '🟡' },
              { name: 'Ирина В.', score: 31, color: 'bg-red-500', badge: '🔴' },
            ].map((m) => (
              <div key={m.name} className="flex items-center gap-2">
                <span className="text-xs">{m.badge}</span>
                <div className="text-xs text-slate-300 w-20 truncate">{m.name}</div>
                <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${m.color} rounded-full`} style={{ width: `${m.score}%` }} />
                </div>
                <span className="text-xs font-semibold text-slate-400 w-5">{m.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4 — alerts */}
        <div className="glass glass-red rounded-2xl p-6 hover:border-red-500/25 transition-colors">
          <div className="w-9 h-9 rounded-lg bg-red-500/15 flex items-center justify-center text-red-400 mb-4">
            <Icons.Bell />
          </div>
          <div className="text-white font-semibold mb-2">Алерты и очередь внимания</div>
          <p className="text-xs text-slate-400 mb-4">Мгновенная сигнализация руководителю</p>
          <div className="space-y-2">
            {[
              { text: 'Клиент на 15 млн не получил follow-up', time: '2 мин назад' },
              { text: 'SLA нарушен — ответ более 4 часов', time: '18 мин назад' },
              { text: 'Менеджер не зафиксировал следующий шаг', time: '1 ч назад' },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1 flex-shrink-0 animate-pulse" />
                <div className="flex-1">
                  <div className="text-slate-300">{a.text}</div>
                  <div className="text-slate-600 mt-0.5">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 5 — analytics */}
        <div className="glass rounded-2xl p-6 hover:border-white/10 transition-colors">
          <div className="w-9 h-9 rounded-lg bg-orange-500/15 flex items-center justify-center text-orange-400 mb-4">
            <Icons.Layers />
          </div>
          <div className="text-white font-semibold mb-2">Аналитика потерь</div>
          <p className="text-xs text-slate-400 mb-4">Где команда системно теряет сделки</p>
          <div className="space-y-2">
            {[
              { label: 'Слабый follow-up', pct: 38, color: 'bg-orange-500' },
              { label: 'Нет целевого действия', pct: 27, color: 'bg-red-500' },
              { label: 'Нарушение SLA', pct: 21, color: 'bg-yellow-500' },
              { label: 'Просадка на возражении', pct: 14, color: 'bg-blue-500' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-2 text-xs">
                <div className="text-slate-400 flex-1 truncate">{l.label}</div>
                <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${l.color} rounded-full`} style={{ width: `${l.pct}%` }} />
                </div>
                <div className="text-slate-500 w-6 text-right">{l.pct}%</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="mt-6 glass rounded-2xl p-5 text-center border border-blue-500/10">
        <p className="text-slate-300 text-sm">
          Вы сразу получаете{' '}
          <span className="text-white font-semibold">100% контроль коммуникаций</span>{' '}
          и список конкретных действий для РОПа — без ручной прослушки и гадания на ощущениях.
        </p>
      </div>
    </div>
  </section>
)

// ─── ROI Calculator ──────────────────────────────────────────────────────────

const ROICalculator = () => {
  const [leads, setLeads] = useState(150)
  const [conv, setConv] = useState(8)
  const [check, setCheck] = useState(5000000)
  const [revealed, setRevealed] = useState(false)

  const currentRevenue = leads * (conv / 100) * check

  const scenarios = [
    { delta: 1, label: 'Консервативный', desc: '+1 п.п. к конверсии' },
    { delta: 2, label: 'Базовый', desc: '+2 п.п. к конверсии' },
    { delta: 3, label: 'Сильный', desc: '+3 п.п. к конверсии' },
  ]

  return (
    <section id="roi" className="py-24 section-divider">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <SectionTag>Калькулятор ROI</SectionTag>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
            Посчитайте, сколько денег вы теряете прямо сейчас
          </h2>
        </div>

        <div className="glass rounded-2xl p-8 border border-blue-500/10">
          <div className="grid md:grid-cols-3 gap-8 mb-8">

            {/* Slider 1 */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm text-slate-400">Лидов в месяц</label>
                <span className="text-white font-bold text-lg">{leads}</span>
              </div>
              <input
                type="range" min={20} max={1000} step={10} value={leads}
                onChange={(e) => setLeads(+e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>20</span><span>1000</span>
              </div>
            </div>

            {/* Slider 2 */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm text-slate-400">Текущая конверсия</label>
                <span className="text-white font-bold text-lg">{conv}%</span>
              </div>
              <input
                type="range" min={1} max={30} step={0.5} value={conv}
                onChange={(e) => setConv(+e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>1%</span><span>30%</span>
              </div>
            </div>

            {/* Slider 3 */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm text-slate-400">Средний чек</label>
                <span className="text-white font-bold text-lg">{fmt(check)} ₽</span>
              </div>
              <input
                type="range" min={500000} max={30000000} step={100000} value={check}
                onChange={(e) => setCheck(+e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>500 тыс</span><span>30 млн</span>
              </div>
            </div>
          </div>

          {/* Current revenue */}
          <div className="glass rounded-xl p-5 text-center mb-6">
            <div className="text-sm text-slate-500 mb-1">Текущая выручка в месяц</div>
            <div className="text-4xl font-black text-white">{fmt(currentRevenue)} ₽</div>
            <div className="text-xs text-slate-600 mt-1">
              {leads} лидов × {conv}% × {fmt(check)} ₽
            </div>
          </div>

          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              className="btn-primary w-full justify-center py-4 text-base"
            >
              Внедрить COLVER — посмотреть сценарии
              <Icons.ArrowRight />
            </button>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-4 mb-5">
                {scenarios.map((s, i) => {
                  const newRevenue = leads * ((conv + s.delta) / 100) * check
                  const gain = newRevenue - currentRevenue
                  const colors = [
                    'border-blue-500/25 bg-blue-500/5',
                    'border-purple-500/25 bg-purple-500/5',
                    'border-green-500/25 bg-green-500/8',
                  ]
                  const gainColors = ['text-blue-400', 'text-purple-400', 'text-green-400']
                  return (
                    <div key={i} className={`rounded-xl p-5 border ${colors[i]}`}>
                      <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${gainColors[i]}`}>
                        {s.label}
                      </div>
                      <div className="text-slate-400 text-xs mb-3">{s.desc}</div>
                      <div className="text-2xl font-bold text-white mb-1">{fmt(newRevenue)} ₽</div>
                      <div className={`text-sm font-semibold ${gainColors[i]}`}>+{fmt(gain)} ₽ / мес</div>
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-slate-600 text-center mb-4">
                Даже небольшой прирост конверсии на том же объёме лидов может вернуть сотни тысяч или миллионы рублей без увеличения рекламного бюджета.
              </p>
              <button onClick={() => scrollTo('contact')} className="btn-primary w-full justify-center py-4 text-base">
                Записаться на диагностику
                <Icons.ArrowRight />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── For Whom ────────────────────────────────────────────────────────────────

const ForWhom = () => (
  <section className="py-24 section-divider">
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <SectionTag>Целевая аудитория</SectionTag>
        <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">COLVER создан не для всех</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left — not for */}
        <div className="glass rounded-2xl p-6 border border-red-500/10">
          <div className="flex items-center gap-2 text-red-400 font-semibold mb-5">
            <Icons.X />
            Вам это не нужно, если:
          </div>
          <div className="space-y-3">
            {[
              'Вас устраивает, что часть лидов сгорает внутри отдела продаж',
              'Вы готовы и дальше вручную слушать звонки и контролировать менеджеров',
              'Вам достаточно красивых отчётов без реального влияния на выручку',
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-slate-400">
                <div className="w-4 h-4 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1 h-1 rounded-full bg-red-400" />
                </div>
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Right — for */}
        <div className="glass glass-green rounded-2xl p-6 border border-green-500/15">
          <div className="flex items-center gap-2 text-green-400 font-semibold mb-5">
            <Icons.Check />
            Вам это нужно, если:
          </div>
          <div className="space-y-3">
            {[
              'Вы понимаете, что на сложном рынке выигрывает тот, у кого выше конверсия',
              'Вы хотите точно знать, где и почему теряются сделки',
              'Вы хотите выжимать максимум из уже оплаченного трафика',
              'Вам нужен не отчёт, а инструмент управленческого влияния на деньги',
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <div className="w-4 h-4 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                </div>
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-slate-400 text-sm">
        COLVER — для прагматичных руководителей, которым нужен{' '}
        <span className="text-white font-medium">контроль, скорость реакции и возврат упущенной выручки.</span>
      </div>
    </div>
  </section>
)

// ─── Why No Scripting ─────────────────────────────────────────────────────────

const WhyNoScripts = () => (
  <section className="py-24 section-divider">
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTag>Без скриптовых наручников</SectionTag>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
            COLVER не убивает сильных менеджеров скриптами
          </h2>
          <p className="mt-6 text-slate-400 leading-relaxed">
            Обычная речевая аналитика часто работает как бездушный надзиратель: шаг в сторону от шаблона — минус балл. Это раздражает сильных брокеров и убивает инициативу.
          </p>
          <p className="mt-4 text-slate-400 leading-relaxed">
            COLVER оценивает не "красоту чтения скрипта", а качество процесса и итоговый результат. Если менеджер говорит по-своему, но ведёт клиента к сделке эффективно — система не наказывает за стиль.
          </p>
          <div className="mt-8 glass-green rounded-xl p-5 border border-green-500/15">
            <div className="text-green-400 font-semibold mb-1">Итог</div>
            <div className="text-white text-sm">
              Мы не ломаем сильных — мы находим их лучшие практики и помогаем масштабировать их на всю команду.
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { icon: <Icons.X />, bad: true, title: 'Обычная аналитика', text: 'Оценивает соответствие скрипту. Сильные менеджеры — под давлением. Результат снижается.' },
            { icon: <Icons.Check />, bad: false, title: 'COLVER', text: 'Оценивает процесс и результат. Сильные становятся ориентиром. Лучшие практики масштабируются.' },
          ].map((item) => (
            <div
              key={item.title}
              className={`glass rounded-2xl p-6 border ${item.bad ? 'border-red-500/10' : 'border-green-500/15'}`}
            >
              <div className={`flex items-center gap-2 mb-3 font-semibold ${item.bad ? 'text-red-400' : 'text-green-400'}`}>
                {item.icon}
                {item.title}
              </div>
              <p className="text-sm text-slate-400">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

// ─── Trust ───────────────────────────────────────────────────────────────────

const Trust = () => (
  <section className="py-24 section-divider">
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <div className="glass rounded-2xl p-10 border border-blue-500/10 text-center">
        <SectionTag>Почему нам можно верить</SectionTag>
        <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white max-w-2xl mx-auto">
          COLVER создан внутри реальной среды продаж недвижимости
        </h2>
        <p className="mt-6 text-slate-400 max-w-2xl mx-auto leading-relaxed">
          COLVER — продукт компании <span className="text-white font-medium">ESOFT</span>, технологической компании федеральной сети «Этажи». Мы строим решение на реальных сценариях продаж, на реальных коммуникациях, на практической логике руководителей и брокеров.
        </p>
        <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
          Система понимает специфику воронки, типовые возражения, логику работы отдела продаж и реальные точки, где теряются деньги.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          {[
            { label: 'ESOFT', sub: 'Технологическая компания группы «Этажи»', icon: <Icons.Building /> },
            { label: 'Отраслевая экспертиза', sub: 'Реальный опыт в продажах недвижимости', icon: <Icons.Layers /> },
            { label: 'Продуктовый подход', sub: 'Инструмент управленческого влияния на выручку', icon: <Icons.Target /> },
          ].map((b) => (
            <div key={b.label} className="glass rounded-xl p-4 flex items-center gap-3 min-w-48">
              <div className="text-blue-400">{b.icon}</div>
              <div className="text-left">
                <div className="text-white font-semibold text-sm">{b.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

// ─── Comparison Table ─────────────────────────────────────────────────────────

const ComparisonTable = () => {
  const rows = [
    {
      label: 'Объём контроля',
      rop: '3–5% звонков',
      base: '100%, по словам-маркерам',
      colver: '100%, смысловой анализ',
      ropBad: true,
    },
    {
      label: 'Скорость реакции',
      rop: 'Постфактум',
      base: 'Отчётность',
      colver: 'Мгновенные алерты',
      ropBad: true,
    },
    {
      label: 'Отраслевая логика',
      rop: 'Зависит от опыта',
      base: 'Универсальная',
      colver: 'Специфика недвижимости',
    },
    {
      label: 'Очередь действий',
      rop: '—',
      base: 'Обычно нет',
      colver: 'Да, для РОПа',
      ropBad: true,
    },
    {
      label: 'Контроль потерь',
      rop: 'Частично',
      base: 'Формально',
      colver: 'На уровне денег и этапов',
    },
    {
      label: 'Лучшие практики',
      rop: 'Вручную',
      base: 'Почти нет',
      colver: 'Выявляются и масштабируются',
    },
    {
      label: 'Человеческий фактор',
      rop: 'Высокий',
      base: 'Низкий',
      colver: 'Стремится к минимуму',
    },
  ]

  return (
    <section className="py-24 section-divider">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <SectionTag>Сравнение</SectionTag>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
            Почему COLVER эффективнее ручного контроля и обычной речевой аналитики
          </h2>
        </div>

        <div className="glass rounded-2xl overflow-hidden border border-white/5">
          {/* Header */}
          <div className="grid grid-cols-4 gap-px bg-white/5">
            <div className="bg-graphite-800 p-4 text-xs text-slate-500 font-medium uppercase tracking-wider">Параметр</div>
            <div className="bg-graphite-800 p-4 text-center">
              <div className="text-xs text-slate-400 font-semibold">Обычный РОП / ОКК</div>
            </div>
            <div className="bg-graphite-800 p-4 text-center">
              <div className="text-xs text-slate-400 font-semibold">Базовая речевая аналитика</div>
            </div>
            <div className="bg-blue-500/10 p-4 text-center">
              <div className="text-xs text-blue-400 font-bold">COLVER</div>
            </div>
          </div>

          {rows.map((r, i) => (
            <div
              key={i}
              className={`grid grid-cols-4 gap-px bg-white/3 ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}
            >
              <div className="bg-graphite-900 p-4 text-sm text-slate-300 font-medium">{r.label}</div>
              <div className="bg-graphite-900/80 p-4 text-center">
                <span className="text-sm text-slate-500">{r.rop}</span>
              </div>
              <div className="bg-graphite-900/80 p-4 text-center">
                <span className="text-sm text-slate-400">{r.base}</span>
              </div>
              <div className="bg-blue-500/5 p-4 text-center">
                <span className="text-sm text-blue-300 font-medium">{r.colver}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-slate-400 text-sm">
          COLVER — это не замена руководителю. Это{' '}
          <span className="text-white font-semibold">усилитель управленческого влияния на выручку.</span>
        </div>
      </div>
    </section>
  )
}

// ─── Pilot ───────────────────────────────────────────────────────────────────

const Pilot = () => {
  const included = [
    'Подключение телефонии',
    'Интеграция с CRM',
    'Настройка базовой логики контроля',
    'Дашборд руководителя',
    'Рейтинг менеджеров',
    'Аналитика потерь',
    'Алерты и очередь внимания',
  ]

  const steps = [
    { num: '1', title: 'Подключение', text: 'Интегрируемся в вашу инфраструктуру и запускаем сбор данных.' },
    { num: '2', title: 'Боевой мониторинг', text: 'COLVER анализирует реальный трафик и показывает потери, системные ошибки и проблемные сценарии.' },
    { num: '3', title: 'Результат на выходе', text: 'Список упущенных лидов, топ системных ошибок, очередь внимания для РОПа и рекомендации по масштабированию.' },
  ]

  return (
    <section id="pilot" className="py-24 section-divider">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <SectionTag>Пилот</SectionTag>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
            Безопасный пилот без нагрузки на вашу команду
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Запускаем пилот, быстро показываем эффект на ваших данных и только потом принимаем решение о масштабе.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Included */}
          <div className="glass rounded-2xl p-6">
            <div className="text-white font-semibold mb-4 flex items-center gap-2">
              <Icons.Check />
              Что входит в пилот
            </div>
            <div className="space-y-2.5">
              {included.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="glass rounded-2xl p-6">
            <div className="text-white font-semibold mb-4">Как проходит пилот</div>
            <div className="space-y-4">
              {steps.map((s) => (
                <div key={s.num} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/15 border border-blue-500/25 flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-400 mt-0.5">
                    {s.num}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{s.title}</div>
                    <div className="text-xs text-slate-400 mt-1 leading-relaxed">{s.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="glass glass-blue rounded-2xl p-6 border border-blue-500/15">
            <div className="text-white font-semibold mb-4 flex items-center gap-2">
              <Icons.Zap />
              Условия пилота
            </div>
            <div className="space-y-3 mb-6">
              <div className="glass rounded-xl p-3">
                <div className="text-sm font-semibold text-white mb-0.5">Интеграция и настройка</div>
                <div className="text-xs text-slate-400">За наш счёт — без затрат с вашей стороны</div>
              </div>
              <div className="glass rounded-xl p-3">
                <div className="text-sm font-semibold text-white mb-0.5">Оплата</div>
                <div className="text-xs text-slate-400">Только за фактическую обработку минут</div>
              </div>
              <div className="glass-blue rounded-xl p-3 border border-blue-500/20">
                <div className="text-2xl font-black gradient-text-blue">5–7 ₽</div>
                <div className="text-xs text-slate-400">за минуту · ставка снижается при росте объёма</div>
              </div>
            </div>
            <button onClick={() => scrollTo('contact')} className="btn-primary w-full justify-center">
              Запустить пилот
              <Icons.ArrowRight />
            </button>
            <p className="text-xs text-slate-600 text-center mt-3">
              Наша цель — быстро показать финансовый эффект на ваших данных
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Security ─────────────────────────────────────────────────────────────────

const Security = () => {
  const items = [
    { icon: <Icons.Shield />, label: 'NDA и юридическая ответственность' },
    { icon: <Icons.Lock />, label: 'Защищённый контур работы с данными' },
    { icon: <Icons.Database />, label: 'Шифрование данных' },
    { icon: <Icons.Eye />, label: 'Контроль доступа' },
    { icon: <Icons.Cpu />, label: 'Безопасная интеграция с CRM и телефонией' },
  ]

  return (
    <section className="py-24 section-divider">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="glass rounded-2xl p-10 border border-white/5">
          <div className="text-center mb-8">
            <SectionTag>Безопасность</SectionTag>
            <h2 className="mt-4 text-3xl font-bold text-white">Ваши данные — под защитой</h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm">
              Клиентская база, воронка продаж и сценарии работы менеджеров — чувствительная информация. Безопасность встроена в модель внедрения с первого дня.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {items.map((item, i) => (
              <div key={i} className="glass rounded-xl p-4 text-center hover:border-blue-500/20 transition-colors">
                <div className="text-blue-400 flex justify-center mb-3">{item.icon}</div>
                <div className="text-xs text-slate-300 font-medium leading-snug">{item.label}</div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            COLVER помогает усиливать продажи, не создавая лишних рисков для вашей базы и процессов.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQ = () => {
  const [open, setOpen] = useState(null)

  const items = [
    {
      q: 'Брокеры не начнут саботировать систему?',
      a: 'Нет, если внедрение сделано правильно. Мы не строим систему тотального наказания. COLVER помогает менеджерам не терять сделки, а руководителю — точечно усиливать команду.',
    },
    {
      q: 'У нас сложный продукт. COLVER это поймёт?',
      a: 'Да. Система работает не только по словам-маркерам, а по смыслу коммуникации, структуре диалога, договорённостям и целевым действиям. Плюс мы адаптируем логику под вашу специфику.',
    },
    {
      q: 'Насколько сложно это технически?',
      a: 'Для вашей команды — минимально. Подключение и базовую интеграцию мы берём на себя.',
    },
    {
      q: 'Когда можно увидеть первый эффект?',
      a: 'Первые сигналы, точки потерь и проблемные сценарии обычно видны уже на пилоте, после старта мониторинга реального трафика.',
    },
    {
      q: 'Нужен ли отдельный сотрудник со стороны клиента?',
      a: 'Нет. Обычно достаточно вовлечённого руководителя или РОПа, который будет работать с очередью внимания и использовать выводы системы.',
    },
  ]

  return (
    <section id="faq" className="py-24 section-divider">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <SectionTag>FAQ</SectionTag>
          <h2 className="mt-4 text-3xl font-bold text-white">Частые вопросы</h2>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden border border-white/5 hover:border-white/8 transition-colors">
              <button
                className="w-full flex items-center justify-between p-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-sm font-semibold text-white">{item.q}</span>
                <span className="text-slate-500 flex-shrink-0">
                  {open === i ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <div className="border-t border-white/5 pt-4 text-sm text-slate-400 leading-relaxed">
                    {item.a}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ───────────────────────────────────────────────────────────────

const FinalCTA = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', company: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await sendToTelegram(formData, 'Финальный блок')
    setSubmitted(true)
  }

  const steps = [
    'Мы связываемся с вами',
    'Проводим короткий разбор текущей ситуации',
    'Показываем, где именно вы можете вернуть деньги из уже оплаченного трафика',
    'Вы принимаете решение, опираясь на факты и цифры',
  ]

  return (
    <section id="contact" className="py-24 section-divider relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/6 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-12">
          <SectionTag>Финальный шаг</SectionTag>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white max-w-2xl mx-auto">
            Готовы увидеть, сколько денег теряется в вашем отделе продаж?
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Оставьте заявку на бесплатную диагностику. Разберём вашу ситуацию, покажем возможные точки потерь и объясним, как быстро запустить пилот на ваших данных.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div className="glass rounded-2xl p-8 border border-blue-500/10">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center mx-auto mb-4 text-green-400">
                  <Icons.Check />
                </div>
                <div className="text-white font-bold text-xl mb-2">Заявка отправлена</div>
                <div className="text-slate-400 text-sm">Мы свяжемся с вами в течение рабочего дня</div>
              </div>
            ) : (
              <>
                <div className="text-white font-bold text-xl mb-6">Записаться на бесплатную диагностику</div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: 'name', placeholder: 'Ваше имя', type: 'text' },
                    { key: 'phone', placeholder: 'Телефон', type: 'tel' },
                    { key: 'company', placeholder: 'Компания', type: 'text' },
                  ].map((f) => (
                    <input
                      key={f.key}
                      type={f.type}
                      placeholder={f.placeholder}
                      value={formData[f.key]}
                      onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/8 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                      required
                    />
                  ))}
                  <button type="submit" className="btn-primary w-full justify-center py-3.5 text-base">
                    Записаться на бесплатную диагностику
                    <Icons.ArrowRight />
                  </button>
                  <p className="text-xs text-slate-600 text-center">Имя, телефон, компания — заполнение займёт 15 секунд</p>
                </form>
              </>
            )}
          </div>

          {/* What happens after */}
          <div>
            <div className="text-slate-400 text-sm mb-5 font-medium">Что происходит после заявки:</div>
            <div className="space-y-4 mb-8">
              {steps.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/15 border border-blue-500/25 flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-400 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="text-sm text-slate-300">{s}</div>
                </div>
              ))}
            </div>
            <div className="glass rounded-xl p-4 border border-red-500/10">
              <div className="text-sm text-slate-400">
                Пока вы откладываете, часть ваших лидов продолжает{' '}
                <span className="text-red-400 font-medium">уходить конкурентам.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="border-t border-white/5 py-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
          <div className="w-2.5 h-2.5 border-2 border-white rounded-sm" />
        </div>
        <span className="font-bold text-white">COLVER</span>
        <span className="text-slate-600 text-xs ml-2">Продукт ESOFT · группа «Этажи»</span>
      </div>
      <div className="text-xs text-slate-700">
        © {new Date().getFullYear()} COLVER. ИИ-контроль звонков и коммуникаций.
      </div>
    </div>
  </footer>
)

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-graphite-950 text-slate-300">
      <Header />
      <main>
        <Hero />
        <Results />
        <Pain />
        <HowItWorks />
        <DashboardBento />
        <ROICalculator />
        <ForWhom />
        <WhyNoScripts />
        <Trust />
        <ComparisonTable />
        <Pilot />
        <Security />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
