import { useEffect, useState } from "react";
import { getStats } from "../services/api"; // função que chamará a API Flask
import StatsCards from "./StatsCards"; // componente que mostra KPIs

export default function Dashboard() {
  type Stats = {
    total: number;
    elogios: number;
    reclamacoes: number;
  };

  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data))
      .catch((e) => console.error(e));
  }, []);

  if (!stats) {
    return <p className="p-4">Carregando estatísticas...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Painel de visão</h1>
      <StatsCards stats={stats}>{/* Adicao de graficos e listas */}</StatsCards>
    </div>
  );
}
