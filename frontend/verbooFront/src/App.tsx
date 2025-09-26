import Dashboard from "./components/Dashboard";
import FeedbackList from "./components/FeedbackList";
import "./App.css";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Painel de Feedbacks
        </h1>
        <p className="text-gray-500 mt-2">
          Resumo e detalhes dos feedbacks recebidos
        </p>
      </header>

      {/* Dashboard resumido e gráfico */}
      <Dashboard />

      {/* Lista de feedbacks detalhados */}
      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Feedbacks Recebidos
        </h2>
        <FeedbackList />
      </section>
    </div>
  );
}

export default App;
