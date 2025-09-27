type DashboardToggleProps = {
  detailedView: boolean;
  setDetailedView: (value: boolean) => void;
};

export default function DashboardToggle({
  detailedView,
  setDetailedView,
}: DashboardToggleProps) {
  return (
    <div className="flex justify-end mb-6">
      <button
        onClick={() => setDetailedView(!detailedView)}
        className="px-5 py-2 font-semibold rounded-xl bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-colors duration-300"
      >
        {detailedView ? "Voltar para Resumo" : "Ver Detalhes"}
      </button>
    </div>
  );
}
