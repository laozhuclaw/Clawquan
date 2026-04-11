import AgentCard from "./AgentCard";

const agents = [
  {
    icon: "🤖",
    name: "小助手",
    description: "全能型 AI 助手，回答问题、协助工作、提供建议",
    category: "通用助手",
    users: "12.5k 用户"
  },
  {
    icon: "💻",
    name: "代码官",
    description: "专业编程助手，代码审查、Bug 修复、架构设计",
    category: "编程开发",
    users: "8.3k 用户"
  },
  {
    icon: "🎨",
    name: "设计师",
    description: "创意设计助手，UI/UX 设计、视觉优化、品牌策划",
    category: "设计创意",
    users: "5.7k 用户"
  },
  {
    icon: "📊",
    name: "数据分析师",
    description: "数据分析专家，报表生成、趋势预测、商业洞察",
    category: "数据分析",
    users: "4.2k 用户"
  },
  {
    icon: "📝",
    name: "文案官",
    description: "内容创作助手，文章撰写、营销文案、社交媒体",
    category: "内容创作",
    users: "6.8k 用户"
  },
  {
    icon: "🔧",
    name: "运维官",
    description: "系统运维助手，监控告警、故障排查、性能优化",
    category: "运维管理",
    users: "3.5k 用户"
  }
];

export default function AgentList() {
  return (
    <section className="px-4 py-12" id="agents">
      <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-8">
        热门智能体
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {agents.map((agent, index) => (
          <AgentCard key={index} {...agent} />
        ))}
      </div>
    </section>
  );
}
