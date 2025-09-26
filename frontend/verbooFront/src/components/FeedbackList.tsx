import { useEffect, useState } from "react";
import { getFeedbacks, type Feedback } from "../services/api"; // função que chamará a API Flask

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    getFeedbacks()
      .then((res) => {
        console.log("Feedbacks da API:", res.data);
        setFeedbacks(res.data);
      })
      .catch((e) => console.error(e));
  }, []);

  if (!feedbacks) {
    return <p className="p-4">Carregando...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Feedbacks</h1>
      {feedbacks.map((f, index) => (
        <div key={index} className="p-4 border rounded mb-2">
          {f.elogio && <p className="text-green-600">Elogio: {f.elogio}</p>}
          {f.reclamacao && (
            <p className="text-red-600">Reclamação: {f.reclamacao}</p>
          )}
        </div>
      ))}
    </div>
  );
}
