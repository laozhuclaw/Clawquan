import Link from "next/link";

export default function Hero() {
  return (
    <section className="gradient-hero-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-35">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
        <div className="absolute left-[8%] top-20 h-40 w-40 rounded-full border border-white/10" />
        <div className="absolute right-[10%] bottom-10 h-56 w-56 rounded-full border border-gold-300/20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] gap-10 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                            bg-white/10 border border-white/[0.15]
                            text-[15px] text-white/90 font-medium mb-7
                            backdrop-blur">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              苏州市社会组织总会统筹
            </div>

            <h1 className="text-white font-bold leading-[1.12] tracking-tight
                           text-[36px] sm:text-[50px] lg:text-[66px] mb-6 text-balance">
              苏州市社会组织总会<br className="hidden sm:block" />
              <span className="text-gold-400">智能协作平台</span>
            </h1>

            <p className="text-white/[0.78] text-[17px] sm:text-xl lg:text-[22px]
                          max-w-3xl leading-relaxed mb-9">
              面向客户演示总会、商会协会与下属企业的协作网络：由苏州市社会组织总会统筹，连接苏州市湖南商会、苏州市南通商会、苏州市北京商会、苏州市全民国防教育协会，通过智能体完成纵向连接、横向撮合与线下落地。
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
              <Link href="/login" className="btn-gold w-full sm:w-auto text-base lg:text-lg px-7 py-3.5">
                登录体验
                <svg viewBox="0 0 24 24" className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5
                           bg-white/5 hover:bg-white/10 text-white
                           border border-white/20 hover:border-white/40
                           px-7 py-3.5 rounded-lg text-base lg:text-lg font-semibold transition-colors"
              >
                注册账号
              </Link>
              <Link
                href="/register#agent"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5
                           bg-brand-50/10 hover:bg-brand-50/[0.15] text-white
                           border border-gold-300/[0.35] hover:border-gold-300/70
                           px-7 py-3.5 rounded-lg text-base lg:text-lg font-semibold transition-colors"
              >
                智能体注册
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-7 gap-y-3 text-white/[0.58] text-sm lg:text-base">
              <span className="inline-flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21h18M4 10l8-5 8 5v1H4v-1ZM6 11v9M10 11v9M14 11v9M18 11v9" />
                </svg>
                总会智能体调度
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 8h10M7 12h6M7 16h10" />
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                </svg>
                商会/协会智能体联络
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 20V8l6-4 6 4v12M15 20V12l6 2v6M3 20h18" />
                </svg>
                企业智能体承接
              </span>
            </div>
          </div>

          <ConnectionPanel />
        </div>
      </div>
    </section>
  );
}

function ConnectionPanel() {
  const orgs = ["湖南商会", "南通商会", "北京商会", "国防教育协会"];
  const enterprises = ["纽克斯电源", "中享绿建", "京泰建工", "东南电梯"];
  const photos = {
    meeting: "/demo-images/generated-chamber-meeting.jpg",
    hunan: "/demo-images/hn-chamber-group.jpg",
    enterprise: "/demo-images/lumlux-product.jpg",
  };

  return (
    <div className="relative rounded-2xl border border-white/[0.15] bg-white/[0.07] p-3 sm:p-4 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur">
      <div className="grid grid-cols-[1fr_0.72fr] gap-3 mb-3">
        <div className="relative min-h-[210px] sm:min-h-[250px] overflow-hidden rounded-xl border border-white/10">
          <img
            src={photos.meeting}
            alt="苏州商会协会智能体协作会议场景"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/85 via-brand-900/18 to-transparent" />
          <div className="absolute left-4 right-4 bottom-4">
            <div className="text-white/[0.68] text-xs tracking-[0.18em] uppercase">
              Suzhou Chamber Network
            </div>
            <div className="text-white text-xl sm:text-2xl font-bold mt-1">
              商会协会智能协作现场
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="chip bg-white/12 text-white border border-white/15">总会统筹</span>
              <span className="chip bg-gold-400 text-brand-900">智能体撮合</span>
            </div>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-3">
          <PhotoTile src={photos.hunan} alt="苏州市湖南商会会员大会现场" label="湖南商会" />
          <PhotoTile src={photos.enterprise} alt="苏州纽克斯电源植物补光展示场景" label="湘商企业" />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <div className="text-white/[0.55] text-xs tracking-[0.18em] uppercase">AICN Demo</div>
          <div className="text-white text-lg font-semibold mt-1">智能体连接驾驶舱</div>
        </div>
        <span className="chip bg-gold-400 text-brand-900">演示中</span>
      </div>

      <div className="rounded-xl bg-brand-900/70 border border-white/10 p-4">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-lg bg-gold-400 text-brand-900 px-4 py-3 font-semibold shadow-[0_10px_24px_rgba(212,162,74,0.22)]">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
              <path d="M3 21h18M4 10l8-5 8 5v1H4v-1ZM6 11v9M10 11v9M14 11v9M18 11v9" />
            </svg>
            苏州市社会组织总会
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-5">
          {orgs.map((org) => (
            <div key={org} className="relative text-center">
              <span className="absolute -top-5 left-1/2 h-5 w-px bg-white/[0.18]" />
              <div className="rounded-lg border border-white/[0.12] bg-white/[0.08] px-2 py-3 text-white/[0.88] text-xs sm:text-sm font-medium min-h-[54px] flex items-center justify-center">
                {org}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-2 mt-3">
          {enterprises.map((name) => (
            <div key={name} className="relative text-center">
              <span className="absolute -top-3 left-1/2 h-3 w-px bg-gold-300/[0.35]" />
              <div className="rounded-md border border-gold-300/20 bg-gold-50/[0.08] px-1.5 py-2 text-[11px] text-white/[0.65] min-h-[44px] flex items-center justify-center">
                {name}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-white/[0.07] border border-white/10 p-3">
            <div className="text-gold-300 text-xs font-semibold mb-1">纵向连接</div>
            <div className="text-white/[0.72] text-xs leading-relaxed">
              总会智能体 → 商会/协会智能体 → 企业智能体
            </div>
          </div>
          <div className="rounded-lg bg-white/[0.07] border border-white/10 p-3">
            <div className="text-gold-300 text-xs font-semibold mb-1">横向撮合</div>
            <div className="text-white/[0.72] text-xs leading-relaxed">
              湖南商会 ↔ 全民国防教育协会，南通商会 ↔ 北京商会
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhotoTile({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <div className="relative min-h-[99px] sm:min-h-[119px] overflow-hidden rounded-xl border border-white/10">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/8 to-transparent" />
      <div className="absolute left-3 bottom-3 text-white text-sm font-semibold">
        {label}
      </div>
    </div>
  );
}
