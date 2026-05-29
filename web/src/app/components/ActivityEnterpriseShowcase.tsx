import Link from "next/link";

const IMAGE = {
  chamberMeeting: "/demo-images/generated-chamber-meeting.jpg",
  enterpriseVisit: "/demo-images/generated-enterprise-visit.jpg",
  hunanGroup: "/demo-images/hn-chamber-group.jpg",
  hunanActivity: "/demo-images/hn-activity-2026-b.jpg",
  hunanEnterprise: "/demo-images/hn-enterprise-jiang.jpg",
  defenseActivity: "/demo-images/sz81-activity-a.jpg",
  defenseBase: "/demo-images/dndt-hero.jpg",
  lumlux: "/demo-images/lumlux-product.jpg",
  dndtShowroom: "/demo-images/dndt-showroom.jpg",
  yuantai: "/demo-images/yuantai-banner.jpg",
};

const ACTIVITIES = [
  {
    org: "苏州市社会组织总会",
    title: "四家重点组织智能体协同演示会",
    date: "6月上旬",
    location: "苏州 · 总会秘书处",
    image: IMAGE.hunanActivity,
    body: "总会调度官牵头，把湖南商会、南通商会、北京商会、全民国防教育协会的活动、企业和需求放到同一张协作表。",
    outputs: ["组织画像补全", "智能体互联演示", "客户现场闭环讲解"],
  },
  {
    org: "湖南商会 × 全民国防教育协会",
    title: "企业国防教育与装备科普共创日",
    date: "6月中旬",
    location: "东南e馆 / 神机营实践基地",
    image: IMAGE.defenseActivity,
    body: "围绕宏瑞达科技、东南电梯、神机营体育等单位，形成装备检测、工业研学、国防教育实践的组合活动。",
    outputs: ["研学路线", "活动安全清单", "企业公益品牌内容"],
  },
  {
    org: "南通商会 × 北京商会",
    title: "科技成果转化与工程落地闭门会",
    date: "6月下旬",
    location: "苏州工业园区",
    image: IMAGE.enterpriseVisit,
    body: "北京商会导入科技与服务资源，南通商会组织绿色建筑、工程总包、咨询工程和物流企业承接落地。",
    outputs: ["联合方案", "询价跟进表", "项目负责人清单"],
  },
];

const ENTERPRISES = [
  {
    name: "苏州纽克斯电源技术股份有限公司",
    org: "苏州市湖南商会",
    image: IMAGE.hunanEnterprise,
    focus: "植物补光、数字农业、控制系统",
    body: "可与国防教育实践基地、现代农业研学和科普展示活动做内容联动。",
    tags: ["制造业", "农业科技", "湘商资源"],
  },
  {
    name: "江苏中享绿色建筑产业发展有限公司",
    org: "苏州市南通商会",
    image: IMAGE.enterpriseVisit,
    focus: "绿色建筑、基地建设、空间改造",
    body: "适合承接协会活动空间、企业展厅、研学基地和公共服务场景建设。",
    tags: ["会长单位", "绿色建筑", "工程服务"],
  },
  {
    name: "苏州京泰建筑工程",
    org: "苏州市北京商会",
    image: IMAGE.yuantai,
    focus: "厂房总包、办公空间、工程协调",
    body: "可与南通商会工程链条联合报价，承接在苏京商与兄弟商会的空间改造需求。",
    tags: ["京商资源", "厂房改造", "总包服务"],
  },
  {
    name: "东南电梯股份有限公司",
    org: "苏州市全民国防教育协会",
    image: IMAGE.dndtShowroom,
    focus: "装备制造、航天科普、工业研学",
    body: "东南e馆可作为企业研学和国防教育实践活动的高质量承接点。",
    tags: ["副会长单位", "实践基地", "装备制造"],
  },
];

export default function ActivityEnterpriseShowcase() {
  return (
    <section className="px-4 lg:px-8 py-14 lg:py-20 bg-white border-y border-ink-100/70">
      <div className="max-w-7xl mx-auto">
        <header className="grid grid-cols-1 lg:grid-cols-[0.86fr_1fr] gap-6 lg:gap-10 items-end mb-8 lg:mb-10">
          <div>
            <div className="chip chip-brand mb-3">活动与企业素材</div>
            <h2 className="text-3xl lg:text-5xl font-bold text-ink-900 tracking-tight">
              把商会协会内容讲得更饱满
            </h2>
            <p className="text-base lg:text-xl text-ink-500 mt-3">
              首页补充活动场景、企业信息和照片化内容，让客户能直观看到总会、商会协会、下属企业之间的真实连接感。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 lg:gap-3">
            <ImageStrip src={IMAGE.hunanGroup} alt="苏州市湖南商会会员大会现场" label="湖南商会活动" />
            <ImageStrip src={IMAGE.defenseBase} alt="东南电梯东南e馆航天科普基地" label="协会实践基地" />
            <ImageStrip src={IMAGE.lumlux} alt="苏州纽克斯电源植物补光展示" label="下属企业能力" />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 mb-9 lg:mb-12">
          {ACTIVITIES.map((activity) => (
            <article
              key={activity.title}
              className="group bg-ink-50 rounded-xl border border-ink-100 overflow-hidden shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/78 via-brand-900/8 to-transparent" />
                <div className="absolute left-4 right-4 bottom-4">
                  <div className="text-white/70 text-xs">{activity.org}</div>
                  <h3 className="text-white text-lg lg:text-xl font-bold leading-snug mt-1">
                    {activity.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 lg:p-5">
                <div className="flex flex-wrap gap-2 text-xs text-ink-500 mb-3">
                  <span className="chip bg-white text-ink-700 border border-ink-100">{activity.date}</span>
                  <span className="chip chip-gold">{activity.location}</span>
                </div>
                <p className="text-sm lg:text-base text-ink-600 leading-relaxed">
                  {activity.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {activity.outputs.map((item) => (
                    <span key={item} className="text-xs rounded bg-white border border-ink-100 text-ink-600 px-2 py-1">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1fr] gap-6 lg:gap-8 items-start">
          <div className="lg:sticky lg:top-24">
            <div className="chip chip-gold mb-3">下属企业信息</div>
            <h3 className="text-2xl lg:text-4xl font-bold text-ink-900 tracking-tight">
              让企业不是名单，而是可承接的能力
            </h3>
            <p className="text-base text-ink-500 leading-relaxed mt-3">
              每家重点企业都绑定所属商会协会、能力标签和可落地场景，方便演示智能体如何把纵向组织关系变成横向合作机会。
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/organizations" className="btn-primary">
                查看组织网络
              </Link>
              <Link href="/community" className="btn-secondary">
                查看活动动态
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ENTERPRISES.map((enterprise) => (
              <article
                key={enterprise.name}
                className="bg-white rounded-xl border border-ink-100 shadow-card overflow-hidden"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={enterprise.image}
                    alt={enterprise.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 to-transparent" />
                  <div className="absolute left-3 bottom-3 text-white text-xs font-medium">
                    {enterprise.org}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-ink-900 leading-snug">
                    {enterprise.name}
                  </h4>
                  <div className="text-sm text-brand-700 font-semibold mt-2">
                    {enterprise.focus}
                  </div>
                  <p className="text-sm text-ink-600 leading-relaxed mt-2">
                    {enterprise.body}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {enterprise.tags.map((tag) => (
                      <span key={tag} className="chip bg-ink-50 text-ink-600 border border-ink-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageStrip({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <div className="relative h-28 sm:h-36 lg:h-44 rounded-xl overflow-hidden border border-ink-100 shadow-card">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/72 via-brand-900/5 to-transparent" />
      <span className="absolute left-3 right-3 bottom-3 text-white text-xs lg:text-sm font-semibold leading-snug">
        {label}
      </span>
    </div>
  );
}
