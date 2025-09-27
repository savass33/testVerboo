import axios from "axios";

export type Stats = {
  compliment: number;
  complaint: number;
  total: number;
  elogios: number;
  reclamacoes: number;
};

export type Feedback = {
  id?: number;
  category: string;
  customer_name: string;
  franchise_unit: string;
  dish?: string;
  notes: string;
  timestamp?: string;
};

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getStats = () => api.get<Stats>("/stats");
export const getFeedbacks = async (): Promise<Feedback[]> => {
  const response = await api.get<Feedback[]>("/feedbacks");
  return response.data; // isso garante que você receba um array
};

export const insertFeedbacks = (data: Feedback) =>
  api.post<Feedback>("/feedbacks", data);
