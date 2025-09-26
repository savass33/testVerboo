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
  const [detailedView, setDetailedView] = useState(true);

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
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      {/* Toggle Resumo/Detalhado */}
      <div className="flex justify-end mb-4">
        <DashboardToggle
          detailedView={detailedView}
          setDetailedView={setDetailedView}
        />
      </div>

      {/* Cards de KPIs */}
      <StatsCards stats={stats} />

      {/* Gráficos detalhados */}
      {detailedView && feedbacks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <FeedbackCharts stats={stats} feedbacks={feedbacks} />
        </div>
      )}
    </div>
  );
}
