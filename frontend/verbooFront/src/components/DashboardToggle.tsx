type DashboardToggleProps = {
  detailedView: boolean;
  setDetailedView: (value: boolean) => void;
};

export default function DashboardToggle({
  detailedView,
  setDetailedView,
}: DashboardToggleProps) {
  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={() => setDetailedView(!detailedView)}
        className="px-5 py-2 font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        {detailedView ? "Voltar para resumo" : "Ver detalhes"}
      </button>
    </div>
  );
}
