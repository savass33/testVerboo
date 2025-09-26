import type { Feedback, Stats } from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

type FeedbackChartsProps = { feedbacks: Feedback[]; stats: Stats };

const PIE_COLORS = ["#00C49F", "#FF4D4F"]; // verde = elogio, vermelho = reclamação

export default function FeedbackCharts({
  feedbacks,
  stats,
}: FeedbackChartsProps) {
  const franchiseData = feedbacks.reduce<{ name: string; count: number }[]>(
    (acc, fb) => {
      const existing = acc.find((f) => f.name === fb.franchise_unit);
      if (existing) existing.count += 1;
      else acc.push({ name: fb.franchise_unit, count: 1 });
      return acc;
    },
    []
  );

  const pieData = [
    { name: "Elogios", value: stats.compliment },
    { name: "Reclamações", value: stats.complaint },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          Distribuição por Franquia
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={franchiseData}>
            <XAxis dataKey="name" />
            <YAxis />
            <RechartsTooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Elogios vs Reclamações</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <RechartsTooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
