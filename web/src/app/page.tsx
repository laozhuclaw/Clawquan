import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AgentList from "./components/AgentList";
import BottomNav from "./components/BottomNav";

export default function Home() {
  return (
    <main className="min-h-screen pb-20 lg:pb-0">
      <Navbar />
      <Hero />
      <AgentList />
      <BottomNav />
    </main>
  );
}
