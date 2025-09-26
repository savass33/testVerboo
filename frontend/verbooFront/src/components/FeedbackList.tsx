import { useEffect, useState } from "react";
import { getFeedbacks, type Feedback } from "../services/api"; // função que chamará a API Flask

interface Feedback {
  id: number;
  category: string;
  customer_name: string;
  franchise_unit: string;
  dish?: string;
  notes: string;
  timestamp: string;
}

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    getFeedbacks()
      .then((res) => setFeedbacks(res.data))
      .catch((e) => console.error(e));
  }, []);

  if (!feedbacks) {
    return <p className="p-4">Carregando...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Feedbacks Recebidos</h2>
      {feedbacks.length === 0 ? (
        <p>Nenhum feedback encontrado</p>
      ) : (
        <ul className="space-y-4">
          {feedbacks.map((fb) => (
            <li key={fb.id} className="bg-white shadow p-4 rounded">
              <p>
                <strong>{fb.customer_name}</strong> ({fb.franchise_unit}) -{" "}
                {fb.category}
              </p>
              <p>
                <em>{fb.notes}</em>
              </p>
              {fb.dish && <p>Prato: {fb.dish}</p>}
              <p className="text-sm text-gray-500">
                Registrado em: {fb.timestamp}
              </p>
              <hr className="mt-2" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
