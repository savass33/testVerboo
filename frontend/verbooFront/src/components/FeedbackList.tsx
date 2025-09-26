import { useEffect, useState } from "react";
import { getFeedbacks, type Feedback } from "../services/api";
import dayjs from "dayjs";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [expanded, setExpanded] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    franchise: "",
    category: "",
    customer: "",
    keyword: "",
    date: "",
  });

  const categoryMap: Record<string, string> = {
    compliment: "Elogio",
    complaint: "Reclamação",
  };

  useEffect(() => {
    getFeedbacks()
      .then((res) => setFeedbacks(res.data))
      .catch(console.error);
  }, []);

  const toggleExpanded = (id: number) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const filtered = feedbacks.filter((fb) => {
    const matchesFranchise = filters.franchise
      ? fb.franchise_unit
          .toLowerCase()
          .includes(filters.franchise.toLowerCase())
      : true;
    const matchesCategory = filters.category
      ? categoryMap[fb.category]
          .toLowerCase()
          .includes(filters.category.toLowerCase())
      : true;
    const matchesCustomer = filters.customer
      ? fb.customer_name.toLowerCase().includes(filters.customer.toLowerCase())
      : true;
    const matchesKeyword = filters.keyword
      ? fb.notes.toLowerCase().includes(filters.keyword.toLowerCase())
      : true;
    const matchesDate = filters.date
      ? dayjs(fb.timestamp).format("YYYY-MM-DD") === filters.date
      : true;
    return (
      matchesFranchise &&
      matchesCategory &&
      matchesCustomer &&
      matchesKeyword &&
      matchesDate
    );
  });

  return (
    <div>
      {/* Filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          placeholder="Franquia"
          className="border rounded px-3 py-2"
          value={filters.franchise}
          onChange={(e) =>
            setFilters({ ...filters, franchise: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Categoria"
          className="border rounded px-3 py-2"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cliente"
          className="border rounded px-3 py-2"
          value={filters.customer}
          onChange={(e) => setFilters({ ...filters, customer: e.target.value })}
        />
        <input
          type="text"
          placeholder="Palavra-chave"
          className="border rounded px-3 py-2"
          value={filters.keyword}
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
        />
        <input
          type="date"
          className="border rounded px-3 py-2"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-600">Nenhum feedback encontrado</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((fb) => {
            const isExpanded = expanded.includes(fb.id!);
            const isComplaint = fb.category === "complaint";

            return (
              <div
                key={fb.id}
                className={`p-4 rounded-lg shadow-lg border-l-4 transition hover:scale-105 ${
                  isComplaint
                    ? "bg-red-50 border-red-600"
                    : "bg-green-50 border-green-600"
                }`}
              >
                {/* Header: cliente + franquia */}
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {fb.customer_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {fb.franchise_unit} {/*cidade/estado opcional*/}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      isComplaint
                        ? "bg-red-600 text-white"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    {isComplaint ? "Reclamação" : "Elogio"}
                  </span>
                </div>

                {/* Prato ou serviço */}
                {fb.dish && (
                  <p className="text-sm font-medium mb-2">🍽 {fb.dish}</p>
                )}

                {/* Notas resumidas/expandíveis */}
                <p
                  className="text-gray-700 cursor-pointer"
                  onClick={() => toggleExpanded(fb.id!)}
                >
                  {isExpanded ? fb.notes : fb.notes.split("\n")[0]}
                  {fb.notes.includes("\n") && (
                    <span className="text-blue-600 ml-1">
                      {isExpanded ? " (menos)" : "..."}
                    </span>
                  )}
                </p>

                {/* Timestamp */}
                <p className="mt-2 text-xs text-gray-500">
                  {dayjs(fb.timestamp).format("DD/MM/YYYY HH:mm")}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
