interface AgentCardProps {
  icon: string;
  name: string;
  description: string;
  category: string;
  users: string;
}

export default function AgentCard({ icon, name, description, category, users }: AgentCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1 active:scale-[0.98]">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>
      <div className="flex justify-between text-xs text-gray-400 mb-4">
        <span>{category}</span>
        <span>{users}</span>
      </div>
      <button className="w-full py-3 bg-green-500 text-white rounded-lg font-medium transition-all duration-300 hover:bg-green-600 active:scale-[0.98]">
        立即试用
      </button>
    </div>
  );
}
