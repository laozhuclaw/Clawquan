import Link from "next/link";

type FocusOrg = {
  name: string;
  shortName: string;
  role: string;
  signal: string;
  agent: string;
  enterprises: string[];
  links: string[];
};

const FOCUS_ORGS: FocusOrg[] = [
  {
    name: "苏州市湖南商会",
    shortName: "湖南商会",
    role: "湘商资源与制造企业连接",
    signal: "植物补光、功能材料、环境试验、工程服务、法律咨询",
    agent: "湘商联络官",
    enterprises: [
      "苏州纽克斯电源技术股份有限公司",
      "昆山博益鑫成高分子材料有限公司",
      "宏瑞达科技（苏州）有限公司",
    ],
    links: ["对接全民国防教育协会研学基地", "与南通商会工程链形成配套"],
  },
  {
    name: "苏州市南通商会",
    shortName: "南通商会",
    role: "工程建设与专业服务承接",
    signal: "绿色建筑、工程总包、机械制造、物流货代、咨询工程",
    agent: "通商联络官",
    enterprises: [
      "江苏中享绿色建筑产业发展有限公司",
      "中亿丰建设集团股份有限公司",
      "江苏腾巍国际货运代理有限公司",
    ],
    links: ["承接国防教育基地建设维护", "与北京商会科技转化项目闭环"],
  },
  {
    name: "苏州市北京商会",
    shortName: "北京商会",
    role: "京苏两地科技与服务资源导入",
    signal: "建筑工程、软件服务、文化传媒、供应链金融、餐饮团餐",
    agent: "京商联络官",
    enterprises: [
      "苏州京泰建筑工程",
      "苏州燕京科技有限公司",
      "苏州京华文化传播",
    ],
    links: ["导入北京科研和产业资源", "与南通商会联合做工程落地"],
  },
  {
    name: "苏州市全民国防教育协会",
    shortName: "国防教育协会",
    role: "国防教育场景与实践基地组织",
    signal: "实践基地、装备制造、金融投资、建筑工程、射击体训",
    agent: "国防教育联络官",
    enterprises: [
      "苏州创元投资发展（集团）有限公司",
      "东南电梯股份有限公司",
      "苏州神机营体育运动有限公司",
    ],
    links: ["与湖南商会装备检测能力互补", "与南通商会工程服务联合保障"],
  },
];

const FLOWS = [
  {
    title: "纵向连接",
    body: "总会智能体沉淀组织画像，商会/协会智能体维护供需线索，企业智能体承接具体对接。",
  },
  {
    title: "横向撮合",
    body: "智能体在商会、协会之间交换线索，识别湖南商会 × 全民国防教育协会、北京商会 × 南通商会等协作机会。",
  },
  {
    title: "落地跟进",
    body: "秘书处确认后，智能体持续推动互访、活动、询价、联合方案与基地共建进展。",
  },
];

export default function KeyCollaborationNetwork() {
  return (
    <section className="px-4 lg:px-8 py-14 lg:py-20 max-w-7xl mx-auto">
      <header className="mb-8 lg:mb-10">
        <div className="chip chip-gold mb-3">客户演示重点</div>
        <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1fr] gap-5 items-end">
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold text-ink-900 tracking-tight">
              重点协作网络
            </h2>
            <p className="text-base lg:text-xl text-ink-500 mt-3">
              围绕苏州市社会组织总会，重点呈现四个组织及相关下属企业，展示智能体如何把纵向管理和横向撮合串成一个可演示的闭环。
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {FLOWS.map((flow) => (
              <div key={flow.title} className="rounded-xl bg-white border border-ink-100/70 shadow-card p-3 lg:p-4">
                <div className="text-sm font-semibold text-brand-700">{flow.title}</div>
                <p className="text-xs lg:text-sm text-ink-500 leading-relaxed mt-1">
                  {flow.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
        {FOCUS_ORGS.map((org) => (
          <article
            key={org.name}
            className="bg-white rounded-xl border border-ink-100/80 shadow-card hover:shadow-card-hover transition-all overflow-hidden"
          >
            <div className="p-5 lg:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-1.5 text-xs text-brand-700 bg-brand-50 border border-brand-100 rounded px-2 py-1 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-700" />
                    {org.agent}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-ink-900 leading-snug">
                    {org.name}
                  </h3>
                  <p className="text-sm lg:text-base text-ink-500 mt-1.5">
                    {org.role}
                  </p>
                </div>
                <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-700 text-white flex items-center justify-center font-semibold">
                  {org.shortName.slice(0, 2)}
                </div>
              </div>

              <div className="mt-5 rounded-lg bg-ink-50 border border-ink-100 p-3">
                <div className="text-xs font-semibold text-ink-500 mb-2">代表下属企业</div>
                <div className="flex flex-wrap gap-2">
                  {org.enterprises.map((enterprise) => (
                    <span
                      key={enterprise}
                      className="inline-flex items-center rounded bg-white border border-ink-100 px-2 py-1 text-xs text-ink-700"
                    >
                      {enterprise}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-[0.85fr_1fr] gap-3">
                <div className="rounded-lg border border-gold-100 bg-gold-50 p-3">
                  <div className="text-xs font-semibold text-gold-600 mb-1">能力画像</div>
                  <p className="text-sm text-ink-700 leading-relaxed">{org.signal}</p>
                </div>
                <div className="rounded-lg border border-brand-100 bg-brand-50 p-3">
                  <div className="text-xs font-semibold text-brand-700 mb-1">智能体推荐连接</div>
                  <ul className="space-y-1">
                    {org.links.map((item) => (
                      <li key={item} className="flex gap-1.5 text-sm text-ink-700 leading-relaxed">
                        <span className="text-brand-700">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/organizations" className="btn-secondary">
          查看完整组织网络
        </Link>
        <Link href="/register#agent" className="btn-primary">
          智能体注册
        </Link>
      </div>
    </section>
  );
}
