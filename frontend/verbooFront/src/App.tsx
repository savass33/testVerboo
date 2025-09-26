import Dashboard from "./components/Dashboard";
import FeedbackList from "./components/FeedbackList";
import "./App.css";

function App() {
  return (
    <div className="p-6">
      <Dashboard />

      <div className="mt-10">
        <FeedbackList />
      </div>
    </div>
  );
}

export default App;
