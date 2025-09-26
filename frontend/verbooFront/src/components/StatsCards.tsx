import type { Stats } from "../services/api";

type StatsCardsProps = {
  stats: Stats;
};

export default function StatsCards({ stats }: StatsCardsProps) {
  const complimentsPerc = (stats.compliment / stats.total) * 100;
  const complaintPerc = (stats.complaint / stats.total) * 100;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-lg font-semibold">Total Feedbacks</h2>
        <p className="text-2xl">{stats.total}</p>
      </div>
      <div className="bg-green-50 shadow p-4 rounded">
        <h2 className="text-lg font-semibold">Elogios</h2>
        <p className="text-2xl text-green-600">{complimentsPerc.toFixed(2)}%</p>
      </div>
      <div className="bg-red-50 shadow p-4 rounded">
        <h2 className="text-lg font-semibold">Reclamações</h2>
        <p className="text-2xl text-red-600">{complaintPerc.toFixed(2)}%</p>
      </div>
    </div>
  );
}
