import { useEffect, useState } from "react";
import {
  getStats,
  getFeedbacks,
  type Stats,
  type Feedback,
} from "../services/api";
import StatsCards from "./StatsCards";
import FeedbackCharts from "./FeedbackCharts";
import DashboardToggle from "./DashboardToggle";

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [detailedView, setDetailedView] = useState(true); // já inicia detalhado

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data))
      .catch(console.error);
    getFeedbacks()
      .then((res) => setFeedbacks(res.data))
      .catch(console.error);
  }, []);

  if (!stats)
    return <p className="p-4 text-gray-700">Carregando estatísticas...</p>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Toggle resumo/detalhado */}
      <DashboardToggle
        detailedView={detailedView}
        setDetailedView={setDetailedView}
      />

      {/* Cards de estatísticas */}
      {stats && <StatsCards stats={stats} />}

      {/* Gráficos detalhados */}
      {detailedView && feedbacks.length > 0 && (
        <div className="mt-8">
          <FeedbackCharts feedbacks={feedbacks} stats={stats!} />
        </div>
      )}
    </div>
  );
}
