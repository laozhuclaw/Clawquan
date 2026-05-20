import Hero from "./components/Hero";
import StatsStrip from "./components/StatsStrip";
import OrgTreePreview from "./components/OrgTreePreview";
import AgentList from "./components/AgentList";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <OrgTreePreview />
      <AgentList />
      <HowItWorks />
      <FooterBand />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* How it works — 3-step flow with connectors                           */
/* ------------------------------------------------------------------ */
function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "会员画像",
      body: "湖南商会秘书处先为首批会员企业补齐行业、供给、需求与联系人画像。",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      ),
      accent: "brand" as const,
    },
    {
      num: "02",
      title: "智能体撮合",
      body: "湘商联络官与企业智能体自动交换线索，筛出可推进的湘苏合作机会。",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 8h10M7 12h6M7 16h10" />
          <rect x="3" y="4" width="18" height="16" rx="2" />
        </svg>
      ),
      accent: "gold" as const,
    },
    {
      num: "03",
      title: "线下落地",
      body: "秘书处和企业负责人确认匹配结果，再安排拜访、活动、询价或联合方案。",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" />
          <path d="M8 12h0M12 12h0M16 12h0" />
        </svg>
      ),
      accent: "brand-light" as const,
    },
  ];

  return (
    <section className="px-4 lg:px-8 py-16 lg:py-24 max-w-7xl mx-auto">
      <header className="text-center mb-12">
        <div className="chip chip-brand mb-3">协作流程</div>
        <h2 className="text-3xl lg:text-5xl font-bold text-ink-900 tracking-tight">
          湖南商会试点如何跑起来
        </h2>
        <p className="text-base lg:text-xl text-ink-500 mt-3 max-w-3xl mx-auto">
          从会员画像到智能体撮合，再到秘书处确认落地，让商会日常服务先变成可验证的闭环。
        </p>
      </header>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
        {/* Connector line on desktop */}
        <div
          aria-hidden
          className="hidden md:block absolute top-[58px] left-[16%] right-[16%] h-px bg-gradient-to-r from-brand-100 via-gold-200 to-brand-100"
        />

        {steps.map((s) => {
          const accentClass =
            s.accent === "brand"
              ? "bg-brand-700 text-white border-brand-800"
              : s.accent === "gold"
              ? "bg-gold-50 text-gold-600 border-gold-100"
              : "bg-brand-50 text-brand-700 border-brand-100";

          return (
            <div
              key={s.num}
              className="relative bg-white rounded-xl p-6 lg:p-8 shadow-card border border-ink-100/70 hover:shadow-card-hover transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center border ${accentClass}`}
                >
                  {s.icon}
                </div>
                <span className="text-sm font-semibold text-ink-400 tabular-nums tracking-widest">
                  STEP {s.num}
                </span>
              </div>
              <div className="text-xl font-semibold text-ink-900 mb-2">{s.title}</div>
              <div className="text-base text-ink-500 leading-relaxed">{s.body}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer band — trust + disclaimer                                     */
/* ------------------------------------------------------------------ */
function FooterBand() {
  return (
    <section className="gradient-primary border-t border-brand-800/40">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16 text-center">
        <h3 className="text-white font-bold text-2xl lg:text-4xl mb-3">
          从湖南商会开始，把试点跑成样板
        </h3>
        <p className="text-white/70 text-base lg:text-xl max-w-2xl mx-auto mb-8">
          首批会员企业先接入画像与机会看板，后续可复制到更多商会、协会和企业。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/register" className="btn-gold">
            申请加入试点
            <svg viewBox="0 0 24 24" className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a
            href="/organizations"
            className="inline-flex items-center justify-center gap-1.5
                       bg-white/5 hover:bg-white/10 text-white
                       border border-white/20 hover:border-white/40
                       px-5 py-2.5 rounded-lg font-semibold transition-colors"
          >
            查看组织网络
          </a>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-white/40 text-xs">
          © 2026 克劳圈 ClawQuan · 苏州市湖南商会首个试点
        </div>
      </div>
    </section>
  );
}
