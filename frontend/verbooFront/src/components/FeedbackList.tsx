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
      .then(setFeedbacks)
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
      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {["Franquia", "Categoria", "Cliente", "Palavra-chave"].map(
          (label, idx) => (
            <input
              key={label}
              type="text"
              placeholder={label}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={
                idx === 0
                  ? filters.franchise
                  : idx === 1
                  ? filters.category
                  : idx === 2
                  ? filters.customer
                  : filters.keyword
              }
              onChange={(e) =>
                setFilters({
                  ...filters,
                  franchise: idx === 0 ? e.target.value : filters.franchise,
                  category: idx === 1 ? e.target.value : filters.category,
                  customer: idx === 2 ? e.target.value : filters.customer,
                  keyword: idx === 3 ? e.target.value : filters.keyword,
                })
              }
            />
          )
        )}
        <input
          type="date"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center">Nenhum feedback encontrado</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((fb) => {
            const isExpanded = expanded.includes(fb.id!);
            const isComplaint = fb.category === "complaint";

            return (
              <div
                key={fb.id}
                className={`p-4 rounded-xl shadow hover:shadow-lg transition transform hover:scale-105 border-l-4 ${
                  isComplaint
                    ? "bg-red-50 border-red-600"
                    : "bg-green-50 border-green-600"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {fb.customer_name}
                    </p>
                    <p className="text-sm text-gray-500">{fb.franchise_unit}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      isComplaint
                        ? "bg-red-600 text-white"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    {categoryMap[fb.category]}
                  </span>
                </div>

                {fb.dish && (
                  <p className="text-sm font-medium mb-2">🍽 {fb.dish}</p>
                )}

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

                <p className="mt-2 text-xs text-gray-400">
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
