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
      .then(setFeedbacks)
      .catch(console.error);
  }, []);

  if (!stats)
    return (
      <p className="p-6 text-gray-500 text-center">
        Nenhuma estatística encontrada
      </p>
    );

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-10 max-w-6xl mx-auto">
      <DashboardToggle
        detailedView={detailedView}
        setDetailedView={setDetailedView}
      />

      <StatsCards stats={stats} />

      {detailedView && feedbacks.length > 0 && (
        <div className="flex flex-col md:flex-row md:justify-center gap-6 mt-8">
          <FeedbackCharts stats={stats} feedbacks={feedbacks} />
        </div>
      )}
    </div>
  );
}
