import Dashboard from "./components/Dashboard";
import FeedbackList from "./components/FeedbackList";
import "./App.css";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Food Assistent</h1>
        <p className="text-gray-500 mt-2">
          Acompanhe métricas e visualize os feedbacks em tempo real
        </p>
      </header>

      <Dashboard />

      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Feedbacks Recebidos
        </h2>
        <FeedbackList />
      </section>

      <footer className="mt-20 text-center text-gray-600 text-sm">
        <p className="mb-2">
          Desenvolvido por:{" "}
          <span className="font-medium">Savas Constantin Petalas Neto</span>
        </p>
        <div className="flex justify-center gap-6 mt-2">
          <a
            href="https://github.com/savass33"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/savasneto"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
