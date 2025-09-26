import Dashboard from "./components/Dashboard";
import FeedbackList from "./components/FeedbackList";
import "./App.css";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Sistema de Feedbacks
        </h1>
        <p className="text-gray-600 mt-2">
          Visão geral e detalhada de todos os feedbacks
        </p>
      </header>

      {/* Dashboard: resumo e gráficos */}
      <Dashboard />

      {/* Feedbacks detalhados */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Lista de Feedbacks
        </h2>
        <FeedbackList />
      </section>
    </div>
  );
}

export default App;
