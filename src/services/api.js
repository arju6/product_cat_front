import axios from "axios";

const API_URL = "https://product-cat-server-1.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const getProducts = async () => (await api.get("/products")).data;
export const getProduct = async (id) => (await api.get(`/products/${id}`)).data;
export const createProduct = async (product) =>
  (await api.post("/products", product)).data;
export const updateProduct = async (id, product) =>
  (await api.put(`/products/${id}`, product)).data;
export const deleteProduct = async (id) =>
  (await api.delete(`/products/${id}`)).data;
