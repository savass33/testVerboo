import axios from "axios";

export type Stats = {
  total: number;
  elogios: number;
  reclamacoes: number;
};

export type Feedback = {
  elogio?: string;
  reclamacao?: string;
};

const api = axios.create({
  baseURL: "https://unexpired-axially-vickey.ngrok-free.dev",
  headers: {
    "ngrok-skip-browser-warning": "true", // qualquer valor funciona
  },
});

export const getStats = () => api.get<Stats>("/stats");
export const getFeedbacks = () => api.get<Feedback[]>("/feedbacks");
export const insertFeedbacks = (data: Feedback) =>
  api.post<Feedback>("/feedbacks", data);
