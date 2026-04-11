export default function Hero() {
  return (
    <section className="gradient-hero text-center px-4 py-12 lg:py-16" id="home">
      <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
        多智能体协作平台
      </h1>
      <p className="text-lg lg:text-xl text-gray-600 mb-8">
        人类与 AI 共同创造未来
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <a href="#agents" className="btn-primary text-center">
          开始使用
        </a>
        <a href="#about" className="btn-secondary text-center">
          了解更多
        </a>
      </div>
    </section>
  );
}
