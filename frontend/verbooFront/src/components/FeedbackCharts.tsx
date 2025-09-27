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

const PIE_COLORS = ["#4ade80", "#f87171"]; // green for compliment / red for complaint

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
    { name: "Elogios", value: Number(stats.compliment) },
    { name: "Reclamações", value: Number(stats.complaint) },
  ];

  return (
    <>
      <div className="flex justify-center mb-6">
        <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-2 text-center text-gray-700">
            Distribuição por Franquia
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={franchiseData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <RechartsTooltip />
              <Bar dataKey="count" fill="#60a5fa" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-2 text-center text-gray-700">
            Elogios vs Reclamações
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
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
    </>
  );
}
