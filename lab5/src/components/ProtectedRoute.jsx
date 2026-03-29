import api from "./api";

export const bookService = {
  getAll: async () => {
    const response = await api.get("/books");
    return response.data;
  },

  create: async (book) => {
    const response = await api.post("/books", book);
    return response.data;
  },

  update: async (id, book) => {
    const response = await api.put(`/books/${id}`, book);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/books/${id}`);
  },
};
