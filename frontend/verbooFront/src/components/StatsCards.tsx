import type { Stats } from "../services/api";
import { Tooltip } from "react-tooltip";

type StatsCardsProps = { stats: Stats };

export default function StatsCards({ stats }: StatsCardsProps) {
  const complimentsPerc = (stats.compliment / stats.total) * 100;
  const complaintPerc = (stats.complaint / stats.total) * 100;

  const cards = [
    {
      title: "Total Feedbacks",
      value: stats.total,
      color: "bg-white",
      tooltip: "Total de todos os feedbacks recebidos.",
    },
    {
      title: "Elogios",
      value: `${complimentsPerc.toFixed(2)}%`,
      color: "bg-green-50 text-green-600",
      tooltip: "Percentual de feedbacks positivos (elogios).",
    },
    {
      title: "Reclamações",
      value: `${complaintPerc.toFixed(2)}%`,
      color: "bg-red-50 text-red-600",
      tooltip: "Percentual de feedbacks negativos (reclamações).",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} shadow p-6 rounded-lg relative`}
          data-tooltip-id={card.title}
        >
          <h3 className="text-lg font-semibold">{card.title}</h3>
          <p className="text-3xl font-bold mt-2">{card.value}</p>
          <Tooltip id={card.title} place="top">
            {card.tooltip}
          </Tooltip>
        </div>
      ))}
    </div>
  );
}
