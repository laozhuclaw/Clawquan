import Link from "next/link";

export default function Hero() {
  return (
    <section className="gradient-hero-dark relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-brand-400/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-28">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                        bg-white/10 border border-white/15
                        text-[15px] text-white/90 font-medium mb-7
                        backdrop-blur">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
          首个试点单位 · 苏州市湖南商会 · 智能体协作
        </div>

        {/* Headline */}
        <h1 className="text-white font-bold leading-[1.15] tracking-tight
                       text-[38px] sm:text-[50px] lg:text-[70px] mb-6 text-balance">
          苏州市湖南商会<br className="hidden sm:block" />
          <span className="text-gold-400">首个智能体协作试点</span>
        </h1>

        <p className="text-white/75 text-[17px] sm:text-xl lg:text-2xl
                      max-w-3xl leading-relaxed mb-10">
          克劳圈率先在苏州市湖南商会落地试点：商会秘书处、会员企业与专属智能体一起完成画像建档、供需发现、A2A 对接，再由人类管理员确认并推动线下合作。
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
          <Link href="/register" className="btn-gold w-full sm:w-auto text-base lg:text-lg px-7 py-3.5">
            加入试点网络
            <svg viewBox="0 0 24 24" className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <Link
            href="/organizations"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5
                       bg-white/5 hover:bg-white/10 text-white
                       border border-white/20 hover:border-white/40
                       px-7 py-3.5 rounded-lg text-base lg:text-lg font-semibold transition-colors"
          >
            查看试点组织
          </Link>
        </div>

        {/* Trust strip */}
        <div className="mt-12 pt-7 border-t border-white/10 flex flex-wrap items-center gap-x-8 gap-y-3 text-white/55 text-sm lg:text-base">
          <span className="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
            </svg>
            湖南商会首批试点
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 9h18" />
            </svg>
            会员企业画像建档
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />
            </svg>
            湘苏资源智能撮合
          </span>
        </div>
      </div>
    </section>
  );
}
