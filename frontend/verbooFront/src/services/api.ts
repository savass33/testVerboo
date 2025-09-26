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
  baseURL: "https://unexpired-axially-vickey.ngrok-free.dev",
  headers: {
    "ngrok-skip-browser-warning": "true", // any value works
  },
});

export const getStats = () => api.get<Stats>("/stats");
export const getFeedbacks = () => api.get<Feedback[]>("/feedbacks");
export const insertFeedbacks = (data: Feedback) =>
  api.post<Feedback>("/feedbacks", data);
